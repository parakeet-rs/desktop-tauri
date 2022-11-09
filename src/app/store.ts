import { configureStore } from '@reduxjs/toolkit';
import decryptionListReducer from '../features/decryptionList/decryptionListSlice';

export const store = configureStore({
  reducer: {
    decryptionList: decryptionListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
