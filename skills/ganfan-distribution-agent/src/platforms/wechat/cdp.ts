import { spawn } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import process from 'node:process';
import { resolveWechatBrowserProfileDir } from './channel-profile.ts';

const WECHAT_BROWSER_STATE_FILE = '.ganfan-browser.json';

interface WechatBrowserState {
  port: number;
  profileDir: string;
  updatedAt: string;
  chromePath?: string;
  pid?: number | null;
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (!address || typeof address === 'string') {
        server.close(() => reject(new Error('Unable to allocate a free TCP port.')));
        return;
      }
      const port = address.port;
      server.close((err) => {
        if (err) reject(err);
        else resolve(port);
      });
    });
  });
}

export function findChromeExecutable(): string | undefined {
  const override = process.env.WECHAT_BROWSER_CHROME_PATH?.trim();
  if (override && fs.existsSync(override)) return override;

  const candidates: string[] = [];
  switch (process.platform) {
    case 'darwin':
      candidates.push(
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
        '/Applications/Chromium.app/Contents/MacOS/Chromium',
      );
      break;
    case 'win32':
      candidates.push(
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      );
      break;
    default:
      candidates.push('/usr/bin/google-chrome', '/usr/bin/chromium');
      break;
  }

  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return undefined;
}

export function getDefaultProfileDir(): string {
  return resolveWechatBrowserProfileDir();
}

function normalizePort(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) return value;
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value.trim(), 10);
    if (Number.isInteger(parsed) && parsed > 0) return parsed;
  }
  return null;
}

function getWechatBrowserStatePath(profileDir: string): string {
  return path.join(profileDir, WECHAT_BROWSER_STATE_FILE);
}

export function readWechatBrowserState(profileDir: string = getDefaultProfileDir()): WechatBrowserState | null {
  const statePath = getWechatBrowserStatePath(profileDir);
  if (!fs.existsSync(statePath)) return null;

  try {
    const parsed = JSON.parse(fs.readFileSync(statePath, 'utf-8')) as Partial<WechatBrowserState>;
    const port = normalizePort(parsed.port);
    if (!port) return null;
    return {
      port,
      profileDir: typeof parsed.profileDir === 'string' && parsed.profileDir ? parsed.profileDir : profileDir,
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
      chromePath: typeof parsed.chromePath === 'string' ? parsed.chromePath : undefined,
      pid: typeof parsed.pid === 'number' ? parsed.pid : null,
    };
  } catch {
    return null;
  }
}

function writeWechatBrowserState(profileDir: string, state: WechatBrowserState): void {
  const statePath = getWechatBrowserStatePath(profileDir);
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, 'utf-8');
}

function rememberWechatBrowserPort(profileDir: string, port: number, chromePath?: string, pid?: number | null): void {
  if (!fs.existsSync(profileDir)) return;
  writeWechatBrowserState(profileDir, {
    port,
    profileDir,
    updatedAt: new Date().toISOString(),
    chromePath,
    pid: pid ?? null,
  });
}

async function fetchJson<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

async function waitForChromeDebugPort(port: number, timeoutMs: number): Promise<string> {
  const start = Date.now();
  let lastError: unknown = null;

  while (Date.now() - start < timeoutMs) {
    try {
      const version = await fetchJson<{ webSocketDebuggerUrl?: string }>(`http://127.0.0.1:${port}/json/version`);
      if (version.webSocketDebuggerUrl) return version.webSocketDebuggerUrl;
      lastError = new Error('Missing webSocketDebuggerUrl');
    } catch (error) {
      lastError = error;
    }
    await sleep(200);
  }

  throw new Error(`Chrome debug port not ready: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
}

async function hasChromeDebugEndpoint(port: number): Promise<boolean> {
  try {
    const version = await fetchJson<{ webSocketDebuggerUrl?: string }>(`http://127.0.0.1:${port}/json/version`);
    return !!version.webSocketDebuggerUrl;
  } catch {
    return false;
  }
}

async function readDevToolsActivePort(profileDir: string): Promise<number | null> {
  const portFile = path.join(profileDir, 'DevToolsActivePort');
  if (!fs.existsSync(portFile)) return null;

  try {
    const content = fs.readFileSync(portFile, 'utf-8').trim();
    if (!content) return null;
    const [portLine] = content.split(/\r?\n/);
    const port = normalizePort(portLine);
    if (!port) return null;
    return (await hasChromeDebugEndpoint(port)) ? port : null;
  } catch {
    return null;
  }
}

function buildManualChromeCommand(url: string, profileDir: string, port: number, chromePath?: string): string {
  const executable = chromePath?.trim() || '<chrome-path>';
  return `${JSON.stringify(executable)} --remote-debugging-port=${port} --user-data-dir=${JSON.stringify(profileDir)} ${JSON.stringify(url)}`;
}

async function canBindPort(port: number): Promise<boolean> {
  return await new Promise((resolve) => {
    const server = net.createServer();
    server.unref();
    server.once('error', () => resolve(false));
    server.listen(port, '127.0.0.1', () => {
      server.close(() => resolve(true));
    });
  });
}

async function resolveLaunchPort(preferredPort?: number): Promise<number> {
  const preferred = normalizePort(preferredPort);
  if (!preferred) {
    throw new Error('[cdp] Shared automation Chrome requires an explicit fixed debug port.');
  }
  if (await canBindPort(preferred)) return preferred;
  throw new Error(
    `[cdp] Shared automation Chrome port ${preferred} is occupied by another process. ` +
      'The GanFan Media shared browser line now uses a fixed port; stop the conflicting process and retry.',
  );
}

function buildSharedChromeMessage(url: string, profileDir: string, preferredPort?: number): string {
  const port = normalizePort(preferredPort) ?? 9222;
  const chromePath = findChromeExecutable();

  return [
    `[cdp] Shared automation Chrome profile = ${profileDir}`,
    '[cdp] X 与微信共用同一个 automation Chrome profile；默认会先 attach，不存在时再自动拉起。',
    `[cdp] Manual launch example: ${buildManualChromeCommand(url, profileDir, port, chromePath)}`,
  ].join('\n');
}

export function createAttachOnlyChromeError(url: string, profileDir?: string, preferredPort?: number): Error {
  return new Error(buildSharedChromeMessage(url, profileDir ?? getDefaultProfileDir(), preferredPort));
}

function uniquePorts(...ports: Array<number | null | undefined>): number[] {
  return ports
    .map((port) => normalizePort(port))
    .filter((port, index, all): port is number => port !== null && all.indexOf(port) === index);
}

async function validateAndRememberPort(port: number, profileDir?: string): Promise<number | null> {
  if (!(await hasChromeDebugEndpoint(port))) return null;
  if (profileDir) rememberWechatBrowserPort(profileDir, port);
  return port;
}

export class CdpConnection {
  private ws: WebSocket;
  private nextId = 0;
  private pending = new Map<number, { resolve: (v: unknown) => void; reject: (e: Error) => void; timer: ReturnType<typeof setTimeout> | null }>();
  private eventHandlers = new Map<string, Set<(params: unknown) => void>>();

  private constructor(ws: WebSocket) {
    this.ws = ws;
    this.ws.addEventListener('message', (event) => {
      try {
        const data = typeof event.data === 'string' ? event.data : new TextDecoder().decode(event.data as ArrayBuffer);
        const msg = JSON.parse(data) as { id?: number; method?: string; params?: unknown; result?: unknown; error?: { message?: string } };

        if (msg.method) {
          const handlers = this.eventHandlers.get(msg.method);
          if (handlers) handlers.forEach((h) => h(msg.params));
        }

        if (msg.id) {
          const pending = this.pending.get(msg.id);
          if (pending) {
            this.pending.delete(msg.id);
            if (pending.timer) clearTimeout(pending.timer);
            if (msg.error?.message) pending.reject(new Error(msg.error.message));
            else pending.resolve(msg.result);
          }
        }
      } catch {}
    });

    this.ws.addEventListener('close', () => {
      for (const [id, pending] of this.pending.entries()) {
        this.pending.delete(id);
        if (pending.timer) clearTimeout(pending.timer);
        pending.reject(new Error('CDP connection closed.'));
      }
    });
  }

  static async connect(url: string, timeoutMs: number): Promise<CdpConnection> {
    const ws = new WebSocket(url);
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('CDP connection timeout.')), timeoutMs);
      ws.addEventListener('open', () => { clearTimeout(timer); resolve(); });
      ws.addEventListener('error', () => { clearTimeout(timer); reject(new Error('CDP connection failed.')); });
    });
    return new CdpConnection(ws);
  }

  on(method: string, handler: (params: unknown) => void): void {
    if (!this.eventHandlers.has(method)) this.eventHandlers.set(method, new Set());
    this.eventHandlers.get(method)!.add(handler);
  }

  async send<T = unknown>(method: string, params?: Record<string, unknown>, options?: { sessionId?: string; timeoutMs?: number }): Promise<T> {
    const id = ++this.nextId;
    const message: Record<string, unknown> = { id, method };
    if (params) message.params = params;
    if (options?.sessionId) message.sessionId = options.sessionId;

    const timeoutMs = options?.timeoutMs ?? 15_000;

    const result = await new Promise<unknown>((resolve, reject) => {
      const timer = timeoutMs > 0 ? setTimeout(() => { this.pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, timeoutMs) : null;
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify(message));
    });

    return result as T;
  }

  close(): void {
    try { this.ws.close(); } catch {}
  }
}

export interface ChromeSession {
  cdp: CdpConnection;
  sessionId: string;
  targetId: string;
}

export async function tryConnectExisting(port: number): Promise<CdpConnection | null> {
  try {
    const version = await fetchJson<{ webSocketDebuggerUrl?: string }>(`http://127.0.0.1:${port}/json/version`);
    if (version.webSocketDebuggerUrl) {
      const cdp = await CdpConnection.connect(version.webSocketDebuggerUrl, 5_000);
      return cdp;
    }
  } catch {}
  return null;
}

export async function findExistingChromeDebugPort(options: { explicitPort?: number; preferredPort?: number; profileDir?: string } = {}): Promise<number | null> {
  const profileDir = options.profileDir ?? getDefaultProfileDir();
  const statePort = readWechatBrowserState(profileDir)?.port ?? null;
  const activePort = await readDevToolsActivePort(profileDir);

  for (const port of uniquePorts(options.explicitPort, options.preferredPort, activePort, statePort)) {
    const validPort = await validateAndRememberPort(port, profileDir);
    if (validPort) return validPort;
  }

  return null;
}

export async function launchChrome(
  url: string,
  profileDir: string = getDefaultProfileDir(),
  preferredPort?: number,
): Promise<{ cdp: CdpConnection; port: number; launched: true }> {
  const chromePath = findChromeExecutable();
  if (!chromePath) throw new Error('[cdp] Chrome not found. Set WECHAT_BROWSER_CHROME_PATH if needed.');

  fs.mkdirSync(profileDir, { recursive: true });
  const port = await resolveLaunchPort(preferredPort);

  console.log(`[cdp] Launching shared automation Chrome (profile: ${profileDir}, port: ${port})`);
  const chrome = spawn(chromePath, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-blink-features=AutomationControlled',
    '--start-maximized',
    url,
  ], { stdio: 'ignore', detached: true });
  chrome.unref();
  rememberWechatBrowserPort(profileDir, port, chromePath, chrome.pid ?? null);

  try {
    const wsUrl = await waitForChromeDebugPort(port, 60_000);
    const cdp = await CdpConnection.connect(wsUrl, 30_000);
    rememberWechatBrowserPort(profileDir, port, chromePath, chrome.pid ?? null);
    return { cdp, port, launched: true };
  } catch (error) {
    const latePort = await validateAndRememberPort(port, profileDir);
    if (latePort) {
      const wsUrl = await waitForChromeDebugPort(latePort, 15_000);
      const cdp = await CdpConnection.connect(wsUrl, 30_000);
      rememberWechatBrowserPort(profileDir, latePort, chromePath, chrome.pid ?? null);
      return { cdp, port: latePort, launched: true };
    }

    throw new Error([
      '[cdp] Failed to launch shared automation Chrome.',
      buildSharedChromeMessage(url, profileDir, preferredPort ?? port),
      `Cause: ${error instanceof Error ? error.message : String(error)}`,
    ].join('\n'));
  }
}

export async function getPageSession(cdp: CdpConnection, urlPattern: string): Promise<ChromeSession> {
  const targets = await cdp.send<{ targetInfos: Array<{ targetId: string; url: string; type: string }> }>('Target.getTargets');
  const pageTarget = targets.targetInfos.find((t) => t.type === 'page' && t.url.includes(urlPattern));

  if (!pageTarget) throw new Error(`Page not found: ${urlPattern}`);

  const { sessionId } = await cdp.send<{ sessionId: string }>('Target.attachToTarget', { targetId: pageTarget.targetId, flatten: true });

  await cdp.send('Page.enable', {}, { sessionId });
  await cdp.send('Runtime.enable', {}, { sessionId });
  await cdp.send('DOM.enable', {}, { sessionId });

  return { cdp, sessionId, targetId: pageTarget.targetId };
}

export async function waitForNewTab(cdp: CdpConnection, initialIds: Set<string>, urlPattern: string, timeoutMs = 30_000): Promise<string> {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const targets = await cdp.send<{ targetInfos: Array<{ targetId: string; url: string; type: string }> }>('Target.getTargets');
    const newTab = targets.targetInfos.find(t => t.type === 'page' && !initialIds.has(t.targetId) && t.url.includes(urlPattern));
    if (newTab) return newTab.targetId;
    await sleep(500);
  }
  throw new Error(`New tab not found: ${urlPattern}`);
}

export async function clickElement(session: ChromeSession, selector: string): Promise<void> {
  const posResult = await session.cdp.send<{ result: { value: string } }>('Runtime.evaluate', {
    expression: `
      (function() {
        const el = document.querySelector('${selector}');
        if (!el) return 'null';
        el.scrollIntoView({ block: 'center' });
        const rect = el.getBoundingClientRect();
        return JSON.stringify({ x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 });
      })()
    `,
    returnByValue: true,
  }, { sessionId: session.sessionId });

  if (posResult.result.value === 'null') throw new Error(`Element not found: ${selector}`);
  const pos = JSON.parse(posResult.result.value);

  await session.cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: pos.x, y: pos.y, button: 'left', clickCount: 1 }, { sessionId: session.sessionId });
  await sleep(50);
  await session.cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: pos.x, y: pos.y, button: 'left', clickCount: 1 }, { sessionId: session.sessionId });
}

export async function typeText(session: ChromeSession, text: string): Promise<void> {
  const lines = text.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].length > 0) {
      await session.cdp.send('Input.insertText', { text: lines[i] }, { sessionId: session.sessionId });
    }
    if (i < lines.length - 1) {
      await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, { sessionId: session.sessionId });
      await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'Enter', code: 'Enter', windowsVirtualKeyCode: 13 }, { sessionId: session.sessionId });
    }
    await sleep(30);
  }
}

export async function pasteFromClipboard(session: ChromeSession): Promise<void> {
  const modifiers = process.platform === 'darwin' ? 4 : 2;
  await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'v', code: 'KeyV', modifiers, windowsVirtualKeyCode: 86 }, { sessionId: session.sessionId });
  await session.cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'v', code: 'KeyV', modifiers, windowsVirtualKeyCode: 86 }, { sessionId: session.sessionId });
}

export async function evaluate<T = unknown>(session: ChromeSession, expression: string): Promise<T> {
  const result = await session.cdp.send<{ result: { value: T } }>('Runtime.evaluate', {
    expression,
    returnByValue: true,
  }, { sessionId: session.sessionId });
  return result.result.value;
}
