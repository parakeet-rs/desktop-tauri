import produce from 'immer';
import { AppConfig } from '../states/configState';
import { base64ToHex, hexToBase64 } from './remoteMethods';

export async function convertConfigToRust(
  config: AppConfig
): Promise<AppConfig> {
  return produce(config, async (draft) => {
    draft.qmc2.stage_1_key = await hexToBase64(draft.qmc2.stage_1_key);
    draft.qmc2.stage_2_key = await hexToBase64(draft.qmc2.stage_2_key);
  });
}

export async function convertConfigFromRust(
  config: AppConfig
): Promise<AppConfig> {
  return produce(config, async (draft) => {
    draft.qmc2.stage_1_key = await base64ToHex(draft.qmc2.stage_1_key);
    draft.qmc2.stage_2_key = await base64ToHex(draft.qmc2.stage_2_key);
  });
}
