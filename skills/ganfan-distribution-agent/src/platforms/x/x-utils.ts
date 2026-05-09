import { spawn, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import net from 'node:net';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { loadXProfile, resolveXBrowserProfileDir, resolveXChromePath } from './channel-profile.js';
import { resolveSharedAutomationChromeDebugPort } from '../shared/chrome-profile.js';

export type PlatformCandidates = {
  darwin?: string[];
  win32?: string[];
  default: string[];
};

export const CHROME_CANDIDATES_BASIC: PlatformCandidates = {
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
  ],
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  ],
  default: [
    '/usr/bin/google-chrome',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ],
};

export const CHROME_CANDIDATES_FULL: PlatformCandidates = {
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Google Chrome Canary.app/Contents/MacOS/Google Chrome Canary',
    '/Applications/Google Chrome Beta.app/Contents/MacOS/Google Chrome Beta',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  ],
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ],
  default: [
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
    '/snap/bin/chromium',
    '/usr/bin/microsoft-edge',
  ],
};

function getCandidatesForPlatform(candidates: PlatformCandidates): string[] {
  if (process.platform === 'darwin' && candidates.darwin?.length) return candidates.darwin;
  if (process.platform === 'win32' && candidates.win32?.length) return candidates.win32;
  return candidates.default;
}

export function findChromeExecutable(candidates: PlatformCandidates): string | undefined {
  const override = resolveXChromePath(loadXProfile()) ?? process.env.X_BROWSER_CHROME_PATH?.trim();
  if (override && fs.existsSync(override)) return override;

  for (const candidate of getCandidatesForPlatform(candidates)) {
    if (fs.existsSync(candidate)) return candidate;
  }
  return undefined;
}

export function getDefaultProfileDir(): string {
  return resolveXBrowserProfileDir(loadXProfile());
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

async function fetchJson<T = unknown>(url: string): Promise<T> {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`);
  return (await res.json()) as T;
}

export async function waitForChromeDebugPort(
  port: number,
  timeoutMs: number,
  options?: { includeLastError?: boolean },
): Promise<string> {
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

  if (options?.includeLastError && lastError) {
    throw new Error(`Chrome debug port not ready: ${lastError instanceof Error ? lastError.message : String(lastError)}`);
  }
  throw new Error('Chrome debug port not ready');
}


function normalizePort(value: unknown): number | null {
  if (typeof value === 'number' && Number.isInteger(value) && value > 0) return value;
  if (typeof value === 'string') {
    const parsed = Number.parseInt(value.trim(), 10);
    if (Number.isInteger(parsed) && parsed > 0) return parsed;
  }
  return null;
}

async function hasChromeDebugEndpoint(port: number): Promise<boolean> {
  try {
    const version = await fetchJson<{ webSocketDebuggerUrl?: string }>(`http://127.0.0.1:${port}/json/version`);
    return !!version.webSocketDebuggerUrl;
  } catch {
    return false;
  }
}

function readSharedBrowserStatePort(profileDir: string): number | null {
  const statePath = path.join(profileDir, '.ganfan-browser.json');
  if (!fs.existsSync(statePath)) return null;

  try {
    const parsed = JSON.parse(fs.readFileSync(statePath, 'utf-8')) as { port?: unknown };
    return normalizePort(parsed.port);
  } catch {
    return null;
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

function uniquePorts(...ports: Array<number | null | undefined>): number[] {
  return ports
    .map((port) => normalizePort(port))
    .filter((port, index, all): port is number => port !== null && all.indexOf(port) === index);
}

export async function findExistingChromeDebugPort(
  profileDir: string,
  preferredPort = resolveSharedAutomationChromeDebugPort(),
): Promise<number | null> {
  const activePort = await readDevToolsActivePort(profileDir);

  for (const port of uniquePorts(preferredPort, readSharedBrowserStatePort(profileDir), activePort)) {
    if (await hasChromeDebugEndpoint(port)) return port;
  }

  return null;
}

function formatManualChromeCommand(url: string, profileDir: string, chromePath?: string, port = resolveSharedAutomationChromeDebugPort()): string {
  const executable = chromePath?.trim() || process.env.X_BROWSER_CHROME_PATH?.trim() || '<chrome-path>';
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

async function resolveLaunchPort(preferredPort: number): Promise<number> {
  if (await hasChromeDebugEndpoint(preferredPort)) return preferredPort;
  if (await canBindPort(preferredPort)) return preferredPort;
  throw new Error(
    `[chrome] Shared automation Chrome port ${preferredPort} is occupied by another process. ` +
      'The GanFan Media shared browser line now uses a fixed port; stop the conflicting process and retry.',
  );
}

function buildSharedChromeMessage(context: string, profileDir: string, url: string, chromePath?: string): string {
  return [
    `${context}: shared automation Chrome profile = ${profileDir}`,
    'This workflow uses one shared automation Chrome line for both X and WeChat.',
    'If you want to start it manually, launch Chrome with the same non-default profile and remote debugging enabled:',
    `Example: ${formatManualChromeCommand(url, profileDir, chromePath)}`,
  ].join('\n');
}

export async function launchChrome(
  context: string,
  profileDir: string,
  url: string,
  chromePath?: string,
  preferredPort = resolveSharedAutomationChromeDebugPort(),
): Promise<number> {
  const executable = chromePath?.trim() || process.env.X_BROWSER_CHROME_PATH?.trim() || findChromeExecutable(CHROME_CANDIDATES_BASIC);
  if (!executable) throw new Error(`${context}: Chrome not found. Set GANFAN_X_CHROME_PATH or X_BROWSER_CHROME_PATH.`);

  fs.mkdirSync(profileDir, { recursive: true });
  const port = await resolveLaunchPort(preferredPort);

  console.log(`[chrome] Launching shared automation Chrome (profile: ${profileDir}, port: ${port})`);
  const chrome = spawn(executable, [
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profileDir}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-blink-features=AutomationControlled',
    '--start-maximized',
    url,
  ], { stdio: 'ignore', detached: true });
  chrome.unref();

  try {
    await waitForChromeDebugPort(port, 60_000, { includeLastError: true });
    return port;
  } catch (error) {
    const latePort = await findExistingChromeDebugPort(profileDir, preferredPort);
    if (latePort) return latePort;

    throw new Error([
      `${context}: failed to launch shared automation Chrome.`,
      buildSharedChromeMessage(context, profileDir, url, executable),
      `Cause: ${error instanceof Error ? error.message : String(error)}`,
    ].join('\n'));
  }
}

export async function ensureChromeDebugPort(
  context: string,
  profileDir: string,
  url: string,
  chromePath?: string,
): Promise<{ port: number; launched: boolean }> {
  const port = await findExistingChromeDebugPort(profileDir, resolveSharedAutomationChromeDebugPort());
  if (port) return { port, launched: false };

  const launchedPort = await launchChrome(context, profileDir, url, chromePath);
  return { port: launchedPort, launched: true };
}

type PendingRequest = {
  resolve: (value: unknown) => void;
  reject: (error: Error) => void;
  timer: ReturnType<typeof setTimeout> | null;
};

export class CdpConnection {
  private ws: WebSocket;
  private nextId = 0;
  private pending = new Map<number, PendingRequest>();
  private eventHandlers = new Map<string, Set<(params: unknown) => void>>();
  private defaultTimeoutMs: number;

  private constructor(ws: WebSocket, options?: { defaultTimeoutMs?: number }) {
    this.ws = ws;
    this.defaultTimeoutMs = options?.defaultTimeoutMs ?? 15_000;

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

  static async connect(url: string, timeoutMs: number, options?: { defaultTimeoutMs?: number }): Promise<CdpConnection> {
    const ws = new WebSocket(url);
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('CDP connection timeout.')), timeoutMs);
      ws.addEventListener('open', () => { clearTimeout(timer); resolve(); });
      ws.addEventListener('error', () => { clearTimeout(timer); reject(new Error('CDP connection failed.')); });
    });
    return new CdpConnection(ws, options);
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

    const timeoutMs = options?.timeoutMs ?? this.defaultTimeoutMs;

    const result = await new Promise<unknown>((resolve, reject) => {
      const timer = timeoutMs > 0
        ? setTimeout(() => { this.pending.delete(id); reject(new Error(`CDP timeout: ${method}`)); }, timeoutMs)
        : null;
      this.pending.set(id, { resolve, reject, timer });
      this.ws.send(JSON.stringify(message));
    });

    return result as T;
  }

  close(): void {
    try { this.ws.close(); } catch {}
  }
}

export function getScriptDir(): string {
  return path.dirname(fileURLToPath(import.meta.url));
}

function runBunScript(scriptPath: string, args: string[]): boolean {
  const result = spawnSync('npx', ['-y', 'bun', scriptPath, ...args], { stdio: 'inherit' });
  return result.status === 0;
}

export function copyImageToClipboard(imagePath: string): boolean {
  const copyScript = path.join(getScriptDir(), 'copy-to-clipboard.ts');
  return runBunScript(copyScript, ['image', imagePath]);
}

export function copyHtmlToClipboard(htmlPath: string): boolean {
  const copyScript = path.join(getScriptDir(), 'copy-to-clipboard.ts');
  return runBunScript(copyScript, ['html', '--file', htmlPath]);
}

export function pasteFromClipboard(targetApp?: string, retries = 3, delayMs = 500): boolean {
  const pasteScript = path.join(getScriptDir(), 'paste-from-clipboard.ts');
  const args = ['--retries', String(retries), '--delay', String(delayMs)];
  if (targetApp) args.push('--app', targetApp);
  return runBunScript(pasteScript, args);
}
