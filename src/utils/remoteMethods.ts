import { invoke } from '@tauri-apps/api';
import { AppConfig } from '../states/configState';
import { FileDetails } from '../states/processFilesState';
import {
  convertConfigFromRust,
  convertConfigToRust,
} from './convertConfigFormat';

export async function statFile(path: string): Promise<FileDetails> {
  return invoke('stat_file', { path });
}

export async function base64ToHex(text: string): Promise<string> {
  return invoke('b64_to_hex', { text });
}

export async function hexToBase64(text: string): Promise<string> {
  return invoke('hex_to_b64', { text });
}

export async function saveConfig(config: AppConfig): Promise<void> {
  return invoke('save_config', {
    json: JSON.stringify(await convertConfigToRust(config)),
  });
}

export async function fetchConfig(): Promise<AppConfig> {
  const configJson: string = await invoke('fetch_config');
  return convertConfigFromRust(JSON.parse(configJson));
}

export async function reloadConfig(): Promise<AppConfig> {
  const configJson: string = await invoke('reload_config');
  return convertConfigFromRust(JSON.parse(configJson));
}
