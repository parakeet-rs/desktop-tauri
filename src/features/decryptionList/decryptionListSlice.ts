import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { statFile } from '../../utils/remoteMethods';

export interface FileInfo {
  path: string;
  name: string;
  size: number;
  state: 'processed' | 'in-progress' | 'failed' | 'ready';
}

export interface DecryptionListState {
  files: FileInfo[];
}

const initialState: DecryptionListState = {
  files: [],
};

export const decryptionListSlice = createSlice({
  name: 'decryptionList',
  initialState,
  reducers: {
    setFileState: (
      state,
      action: PayloadAction<Pick<FileInfo, 'path' | 'state'>>
    ) => {
      const file = state.files.find((f) => f.path === action.payload.path);
      if (file) {
        file.state = action.payload.state;
      }
    },

    clearFiles(state) {
      state.files = [];
    },

    addFile(state, action: PayloadAction<FileInfo>) {
      if (state.files.every((f) => f.path !== action.payload.path)) {
        state.files.push(action.payload);
      }
    },
  },
});

export const { setFileState, addFile, clearFiles } =
  decryptionListSlice.actions;

export const selectDecryptionListState = (state: RootState) =>
  state.decryptionList;

export const selectUnprocessedFiles = createSelector(
  selectDecryptionListState,
  (state) => state.files.filter((file) => file.state === 'ready')
);

export const addFileToDecryptionList = createAsyncThunk<void, string, {}>(
  'decryptionList/addFileToDecryptionList',
  async (path: string, thunkApi) => {
    const statResult = await statFile(path);
    thunkApi.dispatch(
      addFile({
        name: statResult.name,
        path,
        size: statResult.size,
        state: 'ready',
      })
    );
  }
);

export default decryptionListSlice.reducer;
