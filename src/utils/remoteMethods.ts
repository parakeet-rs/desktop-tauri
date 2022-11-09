import { invoke } from '@tauri-apps/api';
import { AppConfig } from '../states/configState';
import {
  convertConfigFromRust,
  convertConfigToRust,
} from './convertConfigFormat';

async function timedInvoke<T>(command: string, ...args: unknown[]): Promise<T> {
  const startTime = Date.now();
  try {
    return await invoke(command, ...(args as any));
  } finally {
    const deltaTime = Date.now() - startTime;
    console.info('native command [%s] took %d ms', command, deltaTime);
  }
}

interface FileDetails {
  path: string;
  name: string;
  size: number;
}

export async function statFile(path: string): Promise<FileDetails> {
  return timedInvoke('stat_file', { path });
}

export async function base64ToHex(text: string): Promise<string> {
  return timedInvoke('b64_to_hex', { text });
}

export async function hexToBase64(text: string): Promise<string> {
  return timedInvoke('hex_to_b64', { text });
}

export async function saveConfig(config: AppConfig): Promise<void> {
  return timedInvoke('save_config', {
    json: JSON.stringify(await convertConfigToRust(config)),
  });
}

export async function fetchConfig(): Promise<AppConfig> {
  const configJson: string = await timedInvoke('fetch_config');
  return convertConfigFromRust(JSON.parse(configJson));
}

export async function reloadConfig(): Promise<AppConfig> {
  const configJson: string = await timedInvoke('reload_config');
  return convertConfigFromRust(JSON.parse(configJson));
}

export async function decryptQmc2(path: string): Promise<void> {
  return timedInvoke('decrypt_qmc2', { path });
}
