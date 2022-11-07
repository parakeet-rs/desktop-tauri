import { atom, selector } from 'recoil';

export interface FileDetails {
  path: string;
  name: string;
  size: number;
}

export interface FileToProcess {
  file: FileDetails;
  type: string;
  processed: boolean;
}

export const processFileListState = atom({
  key: 'files',
  default: [] as FileToProcess[],
});

export const unprocessedFilesState = selector({
  key: 'UnprocessedFiles',
  get: ({ get }) => get(processFileListState).filter((f) => !f.processed),
});
