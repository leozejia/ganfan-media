import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const DEFAULT_SHARED_CHROME_DEBUG_PORT = 56888;

function parsePort(value: string | undefined): number | null {
  if (!value) return null;
  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function getRealUserHome(): string {
  const envUser = process.env.USER?.trim();
  const candidates = [
    process.env.GANFAN_REAL_HOME?.trim(),
    process.platform === 'darwin' && envUser ? path.join('/Users', envUser) : '',
    os.homedir(),
  ];

  for (const candidate of candidates) {
    if (candidate && fs.existsSync(candidate)) return candidate;
  }

  return os.homedir();
}

function resolveRepoRoot(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '..', '..', '..', '..', '..');
}

export function resolveSharedAutomationChromeProfileDir(configuredPath?: string): string {
  const envOverride = process.env.GANFAN_SHARED_CHROME_PROFILE_PATH?.trim();
  if (envOverride) return envOverride;

  const configured = configuredPath?.trim();
  if (configured) return configured;

  return path.join(resolveRepoRoot(), '.runtime', 'opencli', 'browser-profile');
}

export function resolveSharedAutomationChromeDebugPort(preferredPort?: number | null): number {
  const envPort = parsePort(process.env.GANFAN_SHARED_CHROME_DEBUG_PORT);
  if (envPort) return envPort;

  if (typeof preferredPort === 'number' && Number.isInteger(preferredPort) && preferredPort > 0) {
    return preferredPort;
  }

  return DEFAULT_SHARED_CHROME_DEBUG_PORT;
}
