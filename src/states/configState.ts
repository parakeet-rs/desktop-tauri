import { atom } from 'recoil';

export interface QMC2Config {
  seed: number;
  stage_1_key: string;
  stage_2_key: string;
}

export interface AppConfig {
  qmc2: QMC2Config;
}

export const appConfigState = atom({
  key: 'appConfig',
  default: <AppConfig>{
    qmc2: {
      seed: 0,
      stage_1_key: '',
      stage_2_key: '',
    },
  },
});
