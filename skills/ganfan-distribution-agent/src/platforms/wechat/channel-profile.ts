import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { resolveSharedAutomationChromeDebugPort, resolveSharedAutomationChromeProfileDir } from '../shared/chrome-profile.ts';


export interface WechatProfile {
  defaults: {
    author: string;
    publish_method: string;
    theme: string;
    color: string;
  };
  comments: {
    open: boolean;
    fans_only: boolean;
  };
  browser: {
    chrome_profile_path: string;
    chrome_debug_port: number | null;
  };
}

const DEFAULT_PROFILE: WechatProfile = {
  defaults: {
    author: '',
    publish_method: 'browser',
    theme: 'magazine',
    color: '#FF8C38',
  },
  comments: {
    open: true,
    fans_only: false,
  },
  browser: {
    chrome_profile_path: '',
    chrome_debug_port: null,
  },
};

function parseScalar(raw: string): string | boolean {
  const value = raw.trim();
  if (value === 'true') return true;
  if (value === 'false') return false;
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function parseBoolean(value: string | boolean, fallback: boolean): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized in { 'true': 1, 'yes': 1, 'on': 1, '1': 1 }) return true;
    if (normalized in { 'false': 1, 'no': 1, 'off': 1, '0': 1, '': 1 }) return false;
  }
  return fallback;
}

function parsePort(value: string | boolean, fallback: number | null): number | null {
  if (typeof value !== 'string') return fallback;
  const parsed = Number.parseInt(value.trim(), 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function assignValue(profile: WechatProfile, section: string | null, key: string, rawValue: string): void {
  const parsed = parseScalar(rawValue);
  if (!section) return;

  if (section === 'defaults') {
    if (key === 'author' && typeof parsed === 'string') profile.defaults.author = parsed;
    if (key === 'publish_method' && typeof parsed === 'string') profile.defaults.publish_method = parsed;
    if (key === 'theme' && typeof parsed === 'string') profile.defaults.theme = parsed;
    if (key === 'color' && typeof parsed === 'string') profile.defaults.color = parsed;
    return;
  }

  if (section === 'comments') {
    if (key === 'open') profile.comments.open = parseBoolean(parsed, profile.comments.open);
    if (key === 'fans_only') profile.comments.fans_only = parseBoolean(parsed, profile.comments.fans_only);
    return;
  }

  if (section === 'browser') {
    if (key === 'chrome_profile_path' && typeof parsed === 'string') {
      profile.browser.chrome_profile_path = parsed;
    }
    if (key === 'chrome_debug_port') {
      profile.browser.chrome_debug_port = parsePort(parsed, profile.browser.chrome_debug_port);
    }
  }
}

function resolveProfilesDir(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '../../../../../../channels/profiles');
}

export function resolveWechatProfilePath(): string {
  const override = process.env.GANFAN_WECHAT_PROFILE_PATH?.trim();
  if (override) return override;
  return path.join(resolveProfilesDir(), 'wechat.yaml');
}

export function resolveWechatEnvPath(): string {
  const override = process.env.GANFAN_WECHAT_ENV_PATH?.trim();
  if (override) return override;
  return path.join(resolveProfilesDir(), 'wechat.local.env');
}

function loadEnvFile(envPath: string): Record<string, string> {
  const env: Record<string, string> = {};
  if (!fs.existsSync(envPath)) return env;

  const content = fs.readFileSync(envPath, 'utf-8');
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx <= 0) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

export function loadWechatCredentialEnv(): Record<string, string> {
  return loadEnvFile(resolveWechatEnvPath());
}

export function loadWechatProfile(): WechatProfile {
  const profile: WechatProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
  const profilePath = resolveWechatProfilePath();
  if (!fs.existsSync(profilePath)) return profile;

  const lines = fs.readFileSync(profilePath, 'utf-8').split(/\r?\n/);
  let section: string | null = null;

  for (const line of lines) {
    const withoutComment = line.replace(/\s+#.*$/, '');
    if (!withoutComment.trim()) continue;
    if (!line.startsWith(' ')) {
      if (withoutComment.trim().endsWith(':')) {
        section = withoutComment.trim().slice(0, -1);
      }
      continue;
    }

    const trimmed = withoutComment.trim();
    const colonIndex = trimmed.indexOf(':');
    if (colonIndex <= 0) continue;
    const key = trimmed.slice(0, colonIndex).trim();
    const rawValue = trimmed.slice(colonIndex + 1).trim();
    assignValue(profile, section, key, rawValue);
  }

  return profile;
}

export function getWechatCommentFlags(profile: WechatProfile = loadWechatProfile()): { needOpenComment: 0 | 1; onlyFansCanComment: 0 | 1 } {
  return {
    needOpenComment: profile.comments.open ? 1 : 0,
    onlyFansCanComment: profile.comments.fans_only ? 1 : 0,
  };
}

export function resolveWechatBrowserProfileDir(profile: WechatProfile = loadWechatProfile()): string {
  return resolveSharedAutomationChromeProfileDir(profile.browser.chrome_profile_path);
}

export function resolveWechatBrowserDebugPort(profile: WechatProfile = loadWechatProfile()): number {
  const override = process.env.GANFAN_WECHAT_CHROME_DEBUG_PORT?.trim();
  if (override) {
    const parsed = Number.parseInt(override, 10);
    if (Number.isInteger(parsed) && parsed > 0) return parsed;
  }

  return resolveSharedAutomationChromeDebugPort(profile.browser.chrome_debug_port);
}
