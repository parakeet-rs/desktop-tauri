import { atom } from 'recoil';

export interface FileDetails {
  path: string;
  name: string;
  size: number;
}

export interface FileToProcess {
  file: FileDetails;
  type: string;
}

export const processFileListState = atom({
  key: 'files',
  default: [] as FileToProcess[],
});
