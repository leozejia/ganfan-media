import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { resolveSharedAutomationChromeProfileDir } from '../shared/chrome-profile.js';

export interface XProfile {
  defaults: {
    publish_method: string;
  };
  browser: {
    chrome_profile_path: string;
    chrome_path: string;
  };
}

const DEFAULT_PROFILE: XProfile = {
  defaults: {
    publish_method: 'browser',
  },
  browser: {
    chrome_profile_path: '',
    chrome_path: '',
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

function assignValue(profile: XProfile, section: string | null, key: string, rawValue: string): void {
  const parsed = parseScalar(rawValue);
  if (!section) return;

  if (section === 'defaults') {
    if (key === 'publish_method' && typeof parsed === 'string') profile.defaults.publish_method = parsed;
    return;
  }

  if (section === 'browser') {
    if (key === 'chrome_profile_path' && typeof parsed === 'string') profile.browser.chrome_profile_path = parsed;
    if (key === 'chrome_path' && typeof parsed === 'string') profile.browser.chrome_path = parsed;
  }
}

function resolveProfilesDir(): string {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  return path.resolve(__dirname, '../../../../../../channels/profiles');
}

export function resolveXProfilePath(): string {
  const override = process.env.GANFAN_X_PROFILE_PATH?.trim();
  if (override) return override;
  return path.join(resolveProfilesDir(), 'x.yaml');
}

export function loadXProfile(): XProfile {
  const profile: XProfile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
  const profilePath = resolveXProfilePath();
  if (!fs.existsSync(profilePath)) return profile;

  const lines = fs.readFileSync(profilePath, 'utf-8').split(/\r?\n/);
  let section: string | null = null;

  for (const line of lines) {
    const withoutComment = line.replace(/\s+#.*$/, '');
    if (!withoutComment.trim()) continue;
    if (!line.startsWith(' ')) {
      if (withoutComment.trim().endsWith(':')) section = withoutComment.trim().slice(0, -1);
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

export function resolveXBrowserProfileDir(profile: XProfile = loadXProfile()): string {
  return resolveSharedAutomationChromeProfileDir(profile.browser.chrome_profile_path);
}

export function resolveXChromePath(profile: XProfile = loadXProfile()): string | undefined {
  const envOverride = process.env.GANFAN_X_CHROME_PATH?.trim();
  if (envOverride) return envOverride;
  const configured = profile.browser.chrome_path?.trim();
  return configured || undefined;
}
