import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { createAttachOnlyChromeError, tryConnectExisting, findExistingChromeDebugPort, getPageSession, waitForNewTab, clickElement, typeText, evaluate, sleep, type ChromeSession, type CdpConnection } from './cdp.ts';
import { loadWechatProfile, resolveWechatBrowserDebugPort, resolveWechatBrowserProfileDir } from './channel-profile.ts';

const WECHAT_URL = 'https://mp.weixin.qq.com/';

interface ImageInfo {
  placeholder: string;
  localPath: string;
  originalPath: string;
}

interface ArticleOptions {
  title: string;
  content?: string;
  htmlFile?: string;
  markdownFile?: string;
  theme?: string;
  color?: string;
  citeStatus?: boolean;
  author?: string;
  summary?: string;
  images?: string[];
  contentImages?: ImageInfo[];
  submit?: boolean;
  profileDir?: string;
  cdpPort?: number;
}

interface SaveDiagnostics {
  url: string;
  title: string;
  toastText: string;
  tips: string[];
  submitText: string;
  submitDisabled: boolean | null;
}

type SaveOutcomeStatus = 'confirmed' | 'failed' | 'uncertain';

const SAVE_SUCCESS_PATTERNS = [
  /保存成功/,
  /已保存/,
  /草稿已保存/,
  /draft saved/i,
];

const SAVE_FAILURE_PATTERNS = [
  /保存失败/,
  /操作失败/,
  /错误/,
  /异常/,
  /频繁/,
  /稍后再试/,
  /请重试/,
  /error/i,
  /fail(?:ed|ure)?/i,
];

async function waitForLogin(session: ChromeSession, timeoutMs = 120_000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const url = await evaluate<string>(session, 'window.location.href');
    if (url.includes('/cgi-bin/home')) return true;
    await sleep(2000);
  }
  return false;
}

async function waitForElement(session: ChromeSession, selector: string, timeoutMs = 10_000): Promise<boolean> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const found = await evaluate<boolean>(session, `!!document.querySelector('${selector}')`);
    if (found) return true;
    await sleep(500);
  }
  return false;
}

function classifySaveOutcome(diagnostics: SaveDiagnostics): { status: SaveOutcomeStatus; matchedText?: string } {
  const signals = [diagnostics.toastText, ...diagnostics.tips]
    .map((text) => text.trim())
    .filter(Boolean);

  for (const signal of signals) {
    if (SAVE_SUCCESS_PATTERNS.some((pattern) => pattern.test(signal))) {
      return { status: 'confirmed', matchedText: signal };
    }
  }

  for (const signal of signals) {
    if (SAVE_FAILURE_PATTERNS.some((pattern) => pattern.test(signal))) {
      return { status: 'failed', matchedText: signal };
    }
  }

  return { status: 'uncertain' };
}

async function readSaveDiagnostics(session: ChromeSession): Promise<SaveDiagnostics> {
  const raw = await evaluate<string>(session, `
    (function() {
      const toast = document.querySelector('.weui-desktop-toast, .weui-toast, .toast, [class*="toast"]');
      const tips = Array.from(document.querySelectorAll('.weui-desktop-tips, .weui-desktop-toast, .weui-toast, .tips, [class*="tips"], [class*="toast"]'))
        .map((element) => (element.textContent || '').trim())
        .filter(Boolean)
        .slice(0, 8);
      const submitButton = document.querySelector('#js_submit button, #js_submit');
      return JSON.stringify({
        url: window.location.href,
        title: document.title,
        toastText: toast ? (toast.textContent || '').trim() : '',
        tips,
        submitText: submitButton ? (submitButton.textContent || '').trim() : '',
        submitDisabled: submitButton ? !!submitButton.disabled : null,
      });
    })()
  `);

  try {
    return JSON.parse(raw) as SaveDiagnostics;
  } catch {
    return {
      url: '',
      title: '',
      toastText: '',
      tips: [],
      submitText: '',
      submitDisabled: null,
    };
  }
}

async function waitForSaveOutcome(session: ChromeSession, timeoutMs = 12_000): Promise<{ status: SaveOutcomeStatus; diagnostics: SaveDiagnostics; matchedText?: string }> {
  const start = Date.now();
  let diagnostics = await readSaveDiagnostics(session);

  while (Date.now() - start < timeoutMs) {
    diagnostics = await readSaveDiagnostics(session);
    const outcome = classifySaveOutcome(diagnostics);
    if (outcome.status !== 'uncertain') {
      return { ...outcome, diagnostics };
    }
    await sleep(500);
  }

  return { status: 'uncertain', diagnostics };
}

async function clickMenuByText(session: ChromeSession, text: string): Promise<void> {
  console.log(`[wechat] Clicking "${text}" menu...`);
  const posResult = await session.cdp.send<{ result: { value: string } }>('Runtime.evaluate', {
    expression: `
      (function() {
        const items = document.querySelectorAll('.new-creation__menu .new-creation__menu-item');
        for (const item of items) {
          const title = item.querySelector('.new-creation__menu-title');
          if (title && title.textContent?.trim() === '${text}') {
            item.scrollIntoView({ block: 'center' });
            const rect = item.getBoundingClientRect();
            return JSON.stringify({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
          }
        }
        return 'null';
      })()
    `,
    returnByValue: true,
  }, { sessionId: session.sessionId });

  if (posResult.result.value === 'null') throw new Error(`Menu "${text}" not found`);
  const pos = JSON.parse(posResult.result.value);

  await session.cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pos.x, y: pos.y, button: 'left', clickCount: 1 }, { sessionId: session.sessionId });
  await sleep(100);
  await session.cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pos.x, y: pos.y, button: 'left', clickCount: 1 }, { sessionId: session.sessionId });
}

async function copyImageToClipboard(imagePath: string): Promise<void> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const copyScript = path.join(__dirname, './copy-to-clipboard.ts');
  const result = spawnSync('bun', [copyScript, 'image', imagePath], { stdio: 'inherit' });
  if (result.status !== 0) throw new Error(`Failed to copy image: ${imagePath}`);
}

async function pasteInEditor(session: ChromeSession): Promise<void> {
  const modifiers = process.platform === 'darwin' ? 4 : 2;
  await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'v', code: 'KeyV', modifiers, windowsVirtualKeyCode: 86 }, { sessionId: session.sessionId });
  await sleep(50);
  await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'v', code: 'KeyV', modifiers, windowsVirtualKeyCode: 86 }, { sessionId: session.sessionId });
}

async function sendCopy(cdp?: CdpConnection, sessionId?: string): Promise<void> {
  if (cdp && sessionId) {
    // FIX: Use correct modifier for platform (4=Cmd on macOS, 2=Ctrl on others)
    const modifiers = process.platform === 'darwin' ? 4 : 2;
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'c', code: 'KeyC', modifiers, windowsVirtualKeyCode: 67 }, { sessionId });
    await sleep(50);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'c', code: 'KeyC', modifiers, windowsVirtualKeyCode: 67 }, { sessionId });
  } else if (process.platform === 'darwin') {
    spawnSync('osascript', ['-e', 'tell application "System Events" to keystroke "c" using command down']);
  } else if (process.platform === 'linux') {
    spawnSync('xdotool', ['key', 'ctrl+c']);
  }
}

async function sendPaste(cdp?: CdpConnection, sessionId?: string): Promise<void> {
  if (cdp && sessionId) {
    // FIX: Use correct modifier for platform (4=Cmd on macOS, 2=Ctrl on others)
    const modifiers = process.platform === 'darwin' ? 4 : 2;
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'v', code: 'KeyV', modifiers, windowsVirtualKeyCode: 86 }, { sessionId });
    await sleep(50);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'v', code: 'KeyV', modifiers, windowsVirtualKeyCode: 86 }, { sessionId });
  } else if (process.platform === 'darwin') {
    spawnSync('osascript', ['-e', 'tell application "System Events" to keystroke "v" using command down']);
  } else if (process.platform === 'linux') {
    spawnSync('xdotool', ['key', 'ctrl+v']);
  }
}

async function copyHtmlFromBrowser(cdp: CdpConnection, htmlFilePath: string, contentImages: ImageInfo[] = []): Promise<void> {
  const absolutePath = path.isAbsolute(htmlFilePath) ? htmlFilePath : path.resolve(process.cwd(), htmlFilePath);
  
  // FIX: 直接读取本地 HTML 文件，不通过浏览器打开
  console.log(`[wechat] Reading local HTML file: ${absolutePath}`);
  
  if (!fs.existsSync(absolutePath)) {
    throw new Error(`HTML file not found: ${absolutePath}`);
  }
  
  const htmlContent = fs.readFileSync(absolutePath, 'utf-8');
  
  // 提取 body 内容或整个 HTML
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const contentToCopy = bodyMatch ? bodyMatch[1] : htmlContent;
  
  console.log(`[wechat] HTML content loaded: ${contentToCopy.length} chars`);
  
  // 创建临时文件用于浏览器复制
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'wechat-html-'));
  const tempHtmlPath = path.join(tempDir, 'temp.html');
  
  // 构建完整的 HTML 文件（用于浏览器渲染）
  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { 
      font-family: -apple-system-font, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei UI", "Microsoft YaHei", Arial, sans-serif;
      padding: 20px;
      max-width: 680px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div id="content-to-copy">
    ${contentToCopy}
  </div>
</body>
</html>`;
  
  fs.writeFileSync(tempHtmlPath, fullHtml, 'utf-8');
  
  // 在浏览器中打开并复制
  const fileUrl = `file://${tempHtmlPath}`;
  console.log(`[wechat] Opening in browser for copy: ${fileUrl}`);
  
  const { targetId } = await cdp.send<{ targetId: string }>('Target.createTarget', { url: fileUrl });
  const { sessionId } = await cdp.send<{ sessionId: string }>('Target.attachToTarget', { targetId, flatten: true });

  await cdp.send('Page.enable', {}, { sessionId });
  await cdp.send('Runtime.enable', {}, { sessionId });
  await sleep(2000);

  // 替换图片为占位符
  if (contentImages.length > 0) {
    console.log('[wechat] Replacing img tags with placeholders...');
    const replacements = contentImages.map(img => ({ placeholder: img.placeholder, localPath: img.localPath }));
    await cdp.send<{ result: { value: unknown } }>('Runtime.evaluate', {
      expression: `
        (function() {
          const replacements = ${JSON.stringify(replacements)};
          for (const r of replacements) {
            const imgs = document.querySelectorAll('#content-to-copy img[src="' + r.localPath + '"], #content-to-copy img[data-local-path="' + r.localPath + '"], #content-to-copy img[src*="' + path.basename(r.localPath) + '"]');
            for (const img of imgs) {
              const text = document.createTextNode(r.placeholder);
              img.parentNode.replaceChild(text, img);
            }
          }
          return true;
        })()
      `,
      returnByValue: true,
    }, { sessionId });
    await sleep(500);
  }

  // 选择内容区域
  console.log('[wechat] Selecting content...');
  await cdp.send<{ result: { value: unknown } }>('Runtime.evaluate', {
    expression: `
      (function() {
        const content = document.querySelector('#content-to-copy');
        if (!content) return false;
        const range = document.createRange();
        range.selectNodeContents(content);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        return true;
      })()
    `,
    returnByValue: true,
  }, { sessionId });
  await sleep(300);

  // 复制到剪贴板
  console.log('[wechat] Copying to clipboard...');
  await sendCopy(cdp, sessionId);
  await sleep(1000);

  // 关闭临时标签
  console.log('[wechat] Closing temp tab...');
  await cdp.send('Target.closeTarget', { targetId });
  
  // 清理临时文件
  try {
    fs.unlinkSync(tempHtmlPath);
    fs.rmdirSync(tempDir);
  } catch (e) {
    // ignore cleanup errors
  }
}

async function pasteFromClipboardInEditor(session: ChromeSession, htmlContent?: string): Promise<void> {
  console.log('[wechat] Pasting content...');
  
  // FIX: If HTML content is provided, inject directly instead of using clipboard
  if (htmlContent) {
    console.log('[wechat] Injecting HTML directly...');
    await evaluate(session, `
      (function() {
        // Find body editor
        const allEditors = document.querySelectorAll('.ProseMirror');
        let editor = null;
        
        for (let i = 0; i < allEditors.length; i++) {
          const ed = allEditors[i];
          const isInSummary = ed.closest('#js_description') || 
                              ed.closest('.cover-desc') ||
                              ed.closest('[class*="summary"]') ||
                              ed.closest('[class*="cover"]');
          if (!isInSummary && ed.offsetHeight > 100) {
            editor = ed;
            break;
          }
        }
        
        if (!editor && allEditors.length >= 2) {
          editor = allEditors[1];
        }
        
        if (!editor) return false;
        
        // Clear existing content
        editor.innerHTML = '';
        
        // Create a container and set HTML
        const container = document.createElement('div');
        container.innerHTML = ${JSON.stringify(htmlContent)};
        
        // Move all children to editor
        while (container.firstChild) {
          editor.appendChild(container.firstChild);
        }
        
        // Trigger input events
        editor.dispatchEvent(new Event('input', { bubbles: true }));
        editor.dispatchEvent(new Event('change', { bubbles: true }));
        
        return true;
      })()
    `);
    await sleep(1000);
  } else {
    await sendPaste(session.cdp, session.sessionId);
    await sleep(1000);
  }
}

async function parseMarkdownWithPlaceholders(markdownPath: string, theme?: string, color?: string, citeStatus: boolean = true): Promise<{ title: string; author: string; summary: string; htmlPath: string; contentImages: ImageInfo[] }> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const mdToWechatScript = path.join(__dirname, 'md-to-wechat.ts');
  const args = [mdToWechatScript, markdownPath];
  if (theme) args.push('--theme', theme);
  if (color) args.push('--color', color);
  if (!citeStatus) args.push('--no-cite');

  const result = spawnSync('bun', args, { stdio: ['inherit', 'pipe', 'pipe'] });
  if (result.status !== 0) {
    const stderr = result.stderr?.toString() || '';
    throw new Error(`Failed to parse markdown: ${stderr}`);
  }

  const output = result.stdout.toString();
  return JSON.parse(output);
}

function parseHtmlMeta(htmlPath: string): { title: string; author: string; summary: string; contentImages: ImageInfo[] } {
  const content = fs.readFileSync(htmlPath, 'utf-8');

  let title = '';
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (titleMatch) title = titleMatch[1]!;

  let author = '';
  const authorMatch = content.match(/<meta\s+name=["']author["']\s+content=["']([^"']+)["']/i)
    || content.match(/<meta\s+content=["']([^"']+)["']\s+name=["']author["']/i);
  if (authorMatch) author = authorMatch[1]!;

  let summary = '';
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
    || content.match(/<meta\s+content=["']([^"']+)["']\s+name=["']description["']/i);
  if (descMatch) summary = descMatch[1]!;

  if (!summary) {
    const firstPMatch = content.match(/<p[^>]*>([^<]+)<\/p>/i);
    if (firstPMatch) {
      const text = firstPMatch[1]!.replace(/<[^>]+>/g, '').trim();
      if (text.length > 20) {
        summary = text.length > 120 ? text.slice(0, 117) + '...' : text;
      }
    }
  }

  const mdPath = htmlPath.replace(/\.html$/i, '.md');
  if (fs.existsSync(mdPath)) {
    const mdContent = fs.readFileSync(mdPath, 'utf-8');
    const fmMatch = mdContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (fmMatch) {
      const lines = fmMatch[1]!.split('\n');
      for (const line of lines) {
        const colonIdx = line.indexOf(':');
        if (colonIdx > 0) {
          const key = line.slice(0, colonIdx).trim();
          let value = line.slice(colonIdx + 1).trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }
          if (key === 'title' && !title) title = value;
          if (key === 'author' && !author) author = value;
          if ((key === 'description' || key === 'summary') && !summary) summary = value;
        }
      }
    }
  }

  const contentImages: ImageInfo[] = [];
  const imgRegex = /<img[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;
  const matches = [...content.matchAll(imgRegex)];
  for (const match of matches) {
    const [fullTag, src] = match;
    if (!src || src.startsWith('http')) continue;
    const localPathMatch = fullTag.match(/data-local-path=["']([^"']+)["']/);
    if (localPathMatch) {
      contentImages.push({
        placeholder: src,
        localPath: localPathMatch[1]!,
        originalPath: src,
      });
    }
  }

  return { title, author, summary, contentImages };
}

async function selectAndReplacePlaceholder(session: ChromeSession, placeholder: string): Promise<boolean> {
  const result = await session.cdp.send<{ result: { value: boolean } }>('Runtime.evaluate', {
    expression: `
      (function() {
        // FIX: Find body editor (not summary editor)
        const allEditors = document.querySelectorAll('.ProseMirror');
        let editor = null;
        
        for (let i = 0; i < allEditors.length; i++) {
          const ed = allEditors[i];
          const isInSummary = ed.closest('#js_description') || 
                              ed.closest('.cover-desc') ||
                              ed.closest('[class*="summary"]') ||
                              ed.closest('[class*="cover"]');
          if (!isInSummary && ed.offsetHeight > 100) {
            editor = ed;
            break;
          }
        }
        
        if (!editor && allEditors.length >= 2) {
          editor = allEditors[1];
        }
        
        if (!editor) return false;

        const placeholder = ${JSON.stringify(placeholder)};
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
        let node;

        while ((node = walker.nextNode())) {
          const text = node.textContent || '';
          let searchStart = 0;
          let idx;
          // Search for exact match (not prefix of longer placeholder like XIMGPH_1 in XIMGPH_10)
          while ((idx = text.indexOf(placeholder, searchStart)) !== -1) {
            const afterIdx = idx + placeholder.length;
            const charAfter = text[afterIdx];
            // Exact match if next char is not a digit
            if (charAfter === undefined || !/\\d/.test(charAfter)) {
              node.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });

              const range = document.createRange();
              range.setStart(node, idx);
              range.setEnd(node, idx + placeholder.length);
              const sel = window.getSelection();
              sel.removeAllRanges();
              sel.addRange(range);
              return true;
            }
            searchStart = afterIdx;
          }
        }
        return false;
      })()
    `,
    returnByValue: true,
  }, { sessionId: session.sessionId });

  return result.result.value;
}

async function pressDeleteKey(session: ChromeSession): Promise<void> {
  await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 }, { sessionId: session.sessionId });
  await sleep(50);
  await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Backspace', code: 'Backspace', windowsVirtualKeyCode: 8 }, { sessionId: session.sessionId });
}

async function removeExtraEmptyLineAfterImage(session: ChromeSession): Promise<boolean> {
  const removed = await evaluate<boolean>(session, `
    (function() {
      // FIX: Find body editor (not summary editor)
      const allEditors = document.querySelectorAll('.ProseMirror');
      let editor = null;
      
      for (let i = 0; i < allEditors.length; i++) {
        const ed = allEditors[i];
        const isInSummary = ed.closest('#js_description') || 
                            ed.closest('.cover-desc') ||
                            ed.closest('[class*="summary"]') ||
                            ed.closest('[class*="cover"]');
        if (!isInSummary && ed.offsetHeight > 100) {
          editor = ed;
          break;
        }
      }
      
      if (!editor && allEditors.length >= 2) {
        editor = allEditors[1];
      }
      
      if (!editor) return false;

      const sel = window.getSelection();
      if (!sel || sel.rangeCount === 0) return false;

      let node = sel.anchorNode;
      if (!node) return false;
      let element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
      if (!element || !editor.contains(element)) return false;

      const isEmptyParagraph = (el) => {
        if (!el || el.tagName !== 'P') return false;
        const text = (el.textContent || '').trim();
        if (text.length > 0) return false;
        return el.querySelectorAll('img, figure, video, iframe').length === 0;
      };

      const hasImage = (el) => {
        if (!el) return false;
        return !!el.querySelector('img, figure img, picture img');
      };

      const placeCursorAfter = (el) => {
        if (!el) return;
        const range = document.createRange();
        range.setStartAfter(el);
        range.collapse(true);
        sel.removeAllRanges();
        sel.addRange(range);
      };

      // Case 1: caret is inside an empty paragraph right after an image block.
      const emptyPara = element.closest('p');
      if (emptyPara && editor.contains(emptyPara) && isEmptyParagraph(emptyPara)) {
        const prev = emptyPara.previousElementSibling;
        if (prev && hasImage(prev)) {
          emptyPara.remove();
          placeCursorAfter(prev);
          return true;
        }
      }

      // Case 2: caret is on the image block itself; remove the next empty paragraph.
      const imageBlock = element.closest('figure, p');
      if (imageBlock && editor.contains(imageBlock) && hasImage(imageBlock)) {
        const next = imageBlock.nextElementSibling;
        if (next && isEmptyParagraph(next)) {
          next.remove();
          placeCursorAfter(imageBlock);
          return true;
        }
      }

      return false;
    })()
  `);

  if (removed) console.log('[wechat] Removed extra empty line after image.');
  return removed;
}

export async function postArticle(options: ArticleOptions): Promise<void> {
  const { title, content, htmlFile, markdownFile, theme, color, citeStatus = true, author, summary, images = [], submit = false, profileDir, cdpPort } = options;
  const profile = loadWechatProfile();
  const effectiveTheme = theme || profile.defaults.theme || 'magazine';
  const effectiveColor = color || profile.defaults.color || '#FF8C38';
  const effectiveProfileDir = profileDir || resolveWechatBrowserProfileDir(profile);
  const effectiveDebugPort = cdpPort ?? resolveWechatBrowserDebugPort(profile);
  let { contentImages = [] } = options;
  let effectiveTitle = title || '';
  let effectiveAuthor = author || '';
  let effectiveSummary = summary || '';
  let effectiveHtmlFile = htmlFile;

  if (markdownFile) {
    console.log(`[wechat] Parsing markdown: ${markdownFile}`);
    const parsed = await parseMarkdownWithPlaceholders(markdownFile, effectiveTheme, effectiveColor, citeStatus);
    effectiveTitle = effectiveTitle || parsed.title;
    effectiveAuthor = effectiveAuthor || parsed.author;
    effectiveSummary = effectiveSummary || parsed.summary;
    effectiveHtmlFile = parsed.htmlPath;
    contentImages = parsed.contentImages;
    console.log(`[wechat] Title: ${effectiveTitle || '(empty)'}`);
    console.log(`[wechat] Author: ${effectiveAuthor || '(empty)'}`);
    console.log(`[wechat] Summary: ${effectiveSummary || '(empty)'}`);
    console.log(`[wechat] Found ${contentImages.length} images to insert`);
  } else if (htmlFile && fs.existsSync(htmlFile)) {
    console.log(`[wechat] Parsing HTML: ${htmlFile}`);
    const meta = parseHtmlMeta(htmlFile);
    effectiveTitle = effectiveTitle || meta.title;
    effectiveAuthor = effectiveAuthor || meta.author;
    effectiveSummary = effectiveSummary || meta.summary;
    effectiveHtmlFile = htmlFile;
    if (meta.contentImages.length > 0) {
      contentImages = meta.contentImages;
    }
    console.log(`[wechat] Title: ${effectiveTitle || '(empty)'}`);
    console.log(`[wechat] Author: ${effectiveAuthor || '(empty)'}`);
    console.log(`[wechat] Summary: ${effectiveSummary || '(empty)'}`);
    console.log(`[wechat] Found ${contentImages.length} images to insert`);
  }

  if (!effectiveAuthor) {
    effectiveAuthor = profile.defaults.author || '';
  }

  if (effectiveTitle && effectiveTitle.length > 64) throw new Error(`Title too long: ${effectiveTitle.length} chars (max 64)`);
  if (!content && !effectiveHtmlFile) throw new Error('Either --content, --html, or --markdown is required');

  let cdp: CdpConnection;
  const chrome = null;

  // Chrome remote debugging line: attach existing session first, auto-launch the configured profile if missing.
  const portToTry = await findExistingChromeDebugPort({ explicitPort: cdpPort, preferredPort: effectiveDebugPort, profileDir: effectiveProfileDir });
  if (portToTry) {
    const existing = await tryConnectExisting(portToTry);
    if (existing) {
      console.log(`[cdp] Attached to Chrome remote debugging on port ${portToTry}`);
      cdp = existing;
    } else {
      const launched = await launchChrome(WECHAT_URL, effectiveProfileDir, effectiveDebugPort);
      console.log(`[cdp] Relaunched Chrome remote debugging on port ${launched.port}`);
      cdp = launched.cdp;
    }
  } else {
    const launched = await launchChrome(WECHAT_URL, effectiveProfileDir, effectiveDebugPort);
    console.log(`[cdp] Launched Chrome remote debugging on port ${launched.port}`);
    cdp = launched.cdp;
  }

  try {
    console.log('[wechat] Waiting for page load...');
    await sleep(3000);

    let session: ChromeSession;
    if (!chrome) {
      // Reusing existing Chrome: find an already-logged-in tab (has token in URL)
      const allTargets = await cdp.send<{ targetInfos: Array<{ targetId: string; url: string; type: string }> }>('Target.getTargets');
      const loggedInTab = allTargets.targetInfos.find(t => t.type === 'page' && t.url.includes('mp.weixin.qq.com') && t.url.includes('token='));
      const wechatTab = loggedInTab || allTargets.targetInfos.find(t => t.type === 'page' && t.url.includes('mp.weixin.qq.com'));

      if (wechatTab) {
        console.log(`[wechat] Reusing existing tab: ${wechatTab.url.substring(0, 80)}...`);
        const { sessionId: reuseSid } = await cdp.send<{ sessionId: string }>('Target.attachToTarget', { targetId: wechatTab.targetId, flatten: true });
        await cdp.send('Page.enable', {}, { sessionId: reuseSid });
        await cdp.send('Runtime.enable', {}, { sessionId: reuseSid });
        await cdp.send('DOM.enable', {}, { sessionId: reuseSid });
        session = { cdp, sessionId: reuseSid, targetId: wechatTab.targetId };

        // Navigate to home if not already there
        const currentUrl = await evaluate<string>(session, 'window.location.href');
        if (!currentUrl.includes('/cgi-bin/home')) {
          const tokenMatch = currentUrl.match(/[?&]token=([^&]+)/);
          const langMatch = currentUrl.match(/[?&]lang=([^&]+)/);
          const homeUrl = new URL(`${WECHAT_URL}cgi-bin/home`);
          homeUrl.searchParams.set('t', 'home/index');
          if (tokenMatch?.[1]) homeUrl.searchParams.set('token', tokenMatch[1]);
          if (langMatch?.[1]) homeUrl.searchParams.set('lang', decodeURIComponent(langMatch[1]));
          console.log(`[wechat] Navigating to home: ${homeUrl.toString()}`);
          await evaluate(session, `window.location.href = ${JSON.stringify(homeUrl.toString())}`);
          await sleep(5000);
          const afterNavUrl = await evaluate<string>(session, 'window.location.href');
          console.log(`[wechat] Current page after home nav: ${afterNavUrl}`);
        }
      } else {
        // No WeChat tab found, create one
        console.log('[wechat] No WeChat tab found, opening...');
        await cdp.send('Target.createTarget', { url: WECHAT_URL });
        await sleep(5000);
        session = await getPageSession(cdp, 'mp.weixin.qq.com');
      }
    } else {
      session = await getPageSession(cdp, 'mp.weixin.qq.com');
    }

    const url = await evaluate<string>(session, 'window.location.href');
    if (!url.includes('/cgi-bin/')) {
      console.log('[wechat] Not logged in. Please scan QR code...');
      const loggedIn = await waitForLogin(session);
      if (!loggedIn) throw new Error('Login timeout');
    }
    console.log('[wechat] Logged in.');
    await sleep(2000);

    // Wait for menu to be ready
    const menuReady = await waitForElement(session, '.new-creation__menu', 20_000);
    if (!menuReady) throw new Error('Home page menu did not load');

    const targets = await cdp.send<{ targetInfos: Array<{ targetId: string; url: string; type: string }> }>('Target.getTargets');
    const initialIds = new Set(targets.targetInfos.map(t => t.targetId));

    await clickMenuByText(session, '文章');
    await sleep(3000);

    const editorTargetId = await waitForNewTab(cdp, initialIds, 'mp.weixin.qq.com');
    console.log('[wechat] Editor tab opened.');

    const { sessionId } = await cdp.send<{ sessionId: string }>('Target.attachToTarget', { targetId: editorTargetId, flatten: true });
    session = { cdp, sessionId, targetId: editorTargetId };

    await cdp.send('Page.enable', {}, { sessionId });
    await cdp.send('Runtime.enable', {}, { sessionId });
    await cdp.send('DOM.enable', {}, { sessionId });

    await sleep(3000);

    if (effectiveTitle) {
      console.log('[wechat] Filling title...');
      await evaluate(session, `document.querySelector('#title').value = ${JSON.stringify(effectiveTitle)}; document.querySelector('#title').dispatchEvent(new Event('input', { bubbles: true }));`);
    }

    if (effectiveAuthor) {
      console.log('[wechat] Filling author...');
      await evaluate(session, `document.querySelector('#author').value = ${JSON.stringify(effectiveAuthor)}; document.querySelector('#author').dispatchEvent(new Event('input', { bubbles: true }));`);
    }

    await sleep(500);

    if (effectiveTitle) {
      const actualTitle = await evaluate<string>(session, `document.querySelector('#title')?.value || ''`);
      if (actualTitle === effectiveTitle) {
        console.log('[wechat] Title verified OK.');
      } else {
        console.warn(`[wechat] Title verification failed. Expected: "${effectiveTitle}", got: "${actualTitle}"`);
      }
    }

    console.log('[wechat] Clicking on BODY editor...');
    // FIX: WeChat has multiple ProseMirror editors. 
    // The body editor is typically the second one (index 1) or can be identified by parent
    await evaluate(session, `
      (function() {
        const allEditors = document.querySelectorAll('.ProseMirror');
        console.log('Found', allEditors.length, 'ProseMirror editors');
        
        // Try to find the body editor by checking parent containers
        let bodyEditor = null;
        
        // Method 1: Look for editor in main content area (not summary area)
        for (let i = 0; i < allEditors.length; i++) {
          const ed = allEditors[i];
          const parent = ed.parentElement;
          const grandparent = parent?.parentElement;
          
          // Check if this editor is inside the summary/cover section
          const isInSummary = ed.closest('#js_description') || 
                              ed.closest('.cover-desc') ||
                              ed.closest('[class*="summary"]') ||
                              ed.closest('[class*="cover"]');
          
          if (!isInSummary && ed.offsetHeight > 100) {
            bodyEditor = ed;
            console.log('Found body editor at index:', i, 'height:', ed.offsetHeight);
            break;
          }
        }
        
        // Method 2: Use the second editor if first method failed
        if (!bodyEditor && allEditors.length >= 2) {
          bodyEditor = allEditors[1];
          console.log('Using second editor as fallback');
        }
        
        if (bodyEditor) {
          bodyEditor.scrollIntoView({ block: 'center' });
          bodyEditor.focus();
          
          // Simulate a click
          const rect = bodyEditor.getBoundingClientRect();
          const clickX = rect.left + rect.width / 2;
          const clickY = rect.top + rect.height / 2;
          
          ['mousedown', 'click', 'mouseup'].forEach(eventType => {
            const event = new MouseEvent(eventType, {
              view: window,
              bubbles: true,
              cancelable: true,
              clientX: clickX,
              clientY: clickY
            });
            bodyEditor.dispatchEvent(event);
          });
          
          // Also use the CDP click if available
          return { x: clickX, y: clickY, found: true };
        }
        
        return { found: false };
      })()
    `);
    await sleep(1500);

    if (effectiveHtmlFile && fs.existsSync(effectiveHtmlFile)) {
      // FIX: Read HTML content and inject directly instead of using clipboard
      console.log(`[wechat] Reading HTML content from: ${effectiveHtmlFile}`);
      const htmlContent = fs.readFileSync(effectiveHtmlFile, 'utf-8');
      
      // Extract body content or use full HTML
      const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/i);
      const contentToInject = bodyMatch ? bodyMatch[1] : htmlContent;
      
      console.log('[wechat] Injecting HTML directly into editor...');
      await pasteFromClipboardInEditor(session, contentToInject);
      await sleep(3000);

      const editorHasContent = await evaluate<boolean>(session, `
        (function() {
          // Use same logic as click to find body editor
          const allEditors = document.querySelectorAll('.ProseMirror');
          let bodyEditor = null;
          
          for (let i = 0; i < allEditors.length; i++) {
            const ed = allEditors[i];
            const isInSummary = ed.closest('#js_description') || 
                                ed.closest('.cover-desc') ||
                                ed.closest('[class*="summary"]') ||
                                ed.closest('[class*="cover"]');
            if (!isInSummary && ed.offsetHeight > 100) {
              bodyEditor = ed;
              break;
            }
          }
          
          if (!bodyEditor && allEditors.length >= 2) {
            bodyEditor = allEditors[1];
          }
          
          if (!bodyEditor) return false;
          
          const text = bodyEditor.innerText?.trim() || '';
          return text.length > 0;
        })()
      `);
      if (editorHasContent) {
        console.log('[wechat] Body content verified OK.');
      } else {
        console.warn('[wechat] Body content verification failed: editor appears empty after paste.');
      }

      if (contentImages.length > 0) {
        console.log(`[wechat] Inserting ${contentImages.length} images...`);
        for (let i = 0; i < contentImages.length; i++) {
          const img = contentImages[i]!;
          console.log(`[wechat] [${i + 1}/${contentImages.length}] Processing: ${img.placeholder}`);

          // FIX: Read image as base64 and inject directly
          let base64Image: string;
          try {
            const imageBuffer = fs.readFileSync(img.localPath);
            const ext = path.extname(img.localPath).toLowerCase();
            const mimeType = ext === '.png' ? 'image/png' : ext === '.jpg' || ext === '.jpeg' ? 'image/jpeg' : 'image/png';
            base64Image = `data:${mimeType};base64,${imageBuffer.toString('base64')}`;
            console.log(`[wechat] Image loaded: ${Math.round(imageBuffer.length / 1024)}KB`);
          } catch (e) {
            console.warn(`[wechat] Failed to read image: ${img.localPath}`, e);
            continue;
          }

          // Inject image directly into editor
          const imageInjected = await evaluate<boolean>(session, `
            (function() {
              // Find body editor
              const allEditors = document.querySelectorAll('.ProseMirror');
              let editor = null;
              
              for (let i = 0; i < allEditors.length; i++) {
                const ed = allEditors[i];
                const isInSummary = ed.closest('#js_description') || 
                                    ed.closest('.cover-desc') ||
                                    ed.closest('[class*="summary"]') ||
                                    ed.closest('[class*="cover"]');
                if (!isInSummary && ed.offsetHeight > 100) {
                  editor = ed;
                  break;
                }
              }
              
              if (!editor && allEditors.length >= 2) {
                editor = allEditors[1];
              }
              
              if (!editor) return false;
              
              const placeholder = ${JSON.stringify(img.placeholder)};
              const base64Src = ${JSON.stringify(base64Image)};
              
              // Find placeholder text
              const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null, false);
              let node;
              
              while ((node = walker.nextNode())) {
                const text = node.textContent || '';
                let idx = text.indexOf(placeholder);
                if (idx !== -1) {
                  // Create image element
                  const imgEl = document.createElement('img');
                  imgEl.src = base64Src;
                  imgEl.style.maxWidth = '100%';
                  imgEl.style.display = 'block';
                  imgEl.style.margin = '20px auto';
                  
                  // Replace placeholder text with image
                  const range = document.createRange();
                  range.setStart(node, idx);
                  range.setEnd(node, idx + placeholder.length);
                  range.deleteContents();
                  range.insertNode(imgEl);
                  
                  // Trigger input event
                  editor.dispatchEvent(new Event('input', { bubbles: true }));
                  return true;
                }
              }
              return false;
            })()
          `);
          
          if (imageInjected) {
            console.log(`[wechat] Image ${i + 1} injected successfully`);
          } else {
            console.warn(`[wechat] Failed to inject image ${i + 1}, placeholder not found`);
          }
          
          await sleep(1000);
        }
        console.log('[wechat] All images processed.');
      }
    } else if (content) {
      for (const img of images) {
        if (fs.existsSync(img)) {
          console.log(`[wechat] Pasting image: ${img}`);
          await copyImageToClipboard(img);
          await sleep(500);
          await pasteInEditor(session);
          await sleep(2000);
          await removeExtraEmptyLineAfterImage(session);
        }
      }

      console.log('[wechat] Typing content...');
      await typeText(session, content);
      await sleep(1000);

      const editorHasContent = await evaluate<boolean>(session, `
        (function() {
          // FIX: Find body editor (not summary editor)
          const allEditors = document.querySelectorAll('.ProseMirror');
          let editor = null;
          
          for (let i = 0; i < allEditors.length; i++) {
            const ed = allEditors[i];
            const isInSummary = ed.closest('#js_description') || 
                                ed.closest('.cover-desc') ||
                                ed.closest('[class*="summary"]') ||
                                ed.closest('[class*="cover"]');
            if (!isInSummary && ed.offsetHeight > 100) {
              editor = ed;
              break;
            }
          }
          
          if (!editor && allEditors.length >= 2) {
            editor = allEditors[1];
          }
          
          if (!editor) return false;
          
          const text = editor.innerText?.trim() || '';
          return text.length > 0;
        })()
      `);
      if (editorHasContent) {
        console.log('[wechat] Body content verified OK.');
      } else {
        console.warn('[wechat] Body content verification failed: editor appears empty after typing.');
      }
    }

    if (effectiveSummary) {
      console.log(`[wechat] Filling summary (after content paste): ${effectiveSummary}`);
      await evaluate(session, `
        (function() {
          const el = document.querySelector('#js_description');
          if (!el) return;
          el.focus();
          el.select();
          el.value = ${JSON.stringify(effectiveSummary)};
          el.dispatchEvent(new Event('input', { bubbles: true }));
          el.dispatchEvent(new Event('change', { bubbles: true }));
          el.dispatchEvent(new Event('blur', { bubbles: true }));
        })()
      `);
      await sleep(500);

      const actualSummary = await evaluate<string>(session, `document.querySelector('#js_description')?.value || ''`);
      if (actualSummary === effectiveSummary) {
        console.log('[wechat] Summary verified OK.');
      } else {
        console.warn(`[wechat] Summary verification failed. Expected: "${effectiveSummary}", got: "${actualSummary}"`);
      }
    }

    console.log('[wechat] Saving as draft...');
    const submitClicked = await evaluate<boolean>(session, `
      (function() {
        const submitButton = document.querySelector('#js_submit button, #js_submit');
        if (!submitButton) return false;
        submitButton.click();
        return true;
      })()
    `);
    if (!submitClicked) {
      throw new Error('[wechat] Draft submit button not found.');
    }

    const saveOutcome = await waitForSaveOutcome(session);
    console.log(`[wechat] Save diagnostics: ${JSON.stringify(saveOutcome.diagnostics)}`);

    if (saveOutcome.status === 'confirmed') {
      console.log(`[wechat] Draft saved successfully${saveOutcome.matchedText ? `: ${saveOutcome.matchedText}` : '!'}`);
    } else if (saveOutcome.status === 'failed') {
      throw new Error(`[wechat] Draft save failed${saveOutcome.matchedText ? `: ${saveOutcome.matchedText}` : '.'}`);
    } else {
      console.log('[wechat] Save confirmation not observed; no failure signal detected. Treat the draft box as the source of truth.');
    }

    console.log('[wechat] Done. Browser window left open.');
  } finally {
    cdp.close();
  }
}

function printUsage(): never {
  console.log(`Post article to WeChat Official Account

Usage:
  bun wechat-article.ts [options]

Options:
  --title <text>     Article title (auto-extracted from markdown)
  --content <text>   Article content (use with --image)
  --html <path>      HTML file to paste (alternative to --content)
  --markdown <path>  Markdown file to convert and post (recommended)
  --theme <name>     Theme for markdown (default, grace, simple, modern, magazine; default comes from wechat profile)
  --color <hex>      Primary color override (default comes from wechat profile)
  --no-cite          Keep ordinary external links inline instead of moving them to bottom citations
  --author <name>    Author name (default: wechat profile default author)
  --summary <text>   Article summary
  --image <path>     Content image, can repeat (only with --content)
  --submit           Save as draft
  --profile <dir>    Chrome profile directory (default: GanFan Media wechat profile)
  --cdp-port <port>  Connect to existing Chrome debug port instead of launching new instance

Examples:
  bun wechat-article.ts --markdown article.md
  bun wechat-article.ts --markdown article.md --theme grace --submit
  bun wechat-article.ts --markdown article.md --theme grace --color "#FF8C38" --submit
  bun wechat-article.ts --title "标题" --content "内容" --image img.png
  bun wechat-article.ts --title "标题" --html article.html --submit

Markdown mode:
  Images in markdown are converted to placeholders. After pasting HTML,
  each placeholder is selected, scrolled into view, deleted, and replaced
  with the actual image via paste.
`);
  process.exit(0);
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);
  if (args.includes('--help') || args.includes('-h')) printUsage();

  const images: string[] = [];
  let title: string | undefined;
  let content: string | undefined;
  let htmlFile: string | undefined;
  let markdownFile: string | undefined;
  let theme: string | undefined;
  let color: string | undefined;
  let citeStatus = true;
  let author: string | undefined;
  let summary: string | undefined;
  let submit = false;
  let profileDir: string | undefined;
  let cdpPort: number | undefined;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]!;
    if (arg === '--title' && args[i + 1]) title = args[++i];
    else if (arg === '--content' && args[i + 1]) content = args[++i];
    else if (arg === '--html' && args[i + 1]) htmlFile = args[++i];
    else if (arg === '--markdown' && args[i + 1]) markdownFile = args[++i];
    else if (arg === '--theme' && args[i + 1]) theme = args[++i];
    else if (arg === '--color' && args[i + 1]) color = args[++i];
    else if (arg === '--cite') citeStatus = true;
    else if (arg === '--no-cite') citeStatus = false;
    else if (arg === '--author' && args[i + 1]) author = args[++i];
    else if (arg === '--summary' && args[i + 1]) summary = args[++i];
    else if (arg === '--image' && args[i + 1]) images.push(args[++i]!);
    else if (arg === '--submit') submit = true;
    else if (arg === '--profile' && args[i + 1]) profileDir = args[++i];
    else if (arg === '--cdp-port' && args[i + 1]) cdpPort = parseInt(args[++i]!, 10);
  }

  if (!markdownFile && !htmlFile && !title) { console.error('Error: --title is required (or use --markdown/--html)'); process.exit(1); }
  if (!markdownFile && !htmlFile && !content) { console.error('Error: --content, --html, or --markdown is required'); process.exit(1); }

  await postArticle({ title: title || '', content, htmlFile, markdownFile, theme, color, citeStatus, author, summary, images, submit, profileDir, cdpPort });
}

main().then(() => {
  process.exit(0);
}).catch((err) => {
  console.error(`Error: ${err instanceof Error ? err.message : String(err)}`);
  process.exit(1);
});
