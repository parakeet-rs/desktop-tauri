import { atom } from 'recoil';

export const draggingState = atom({
  key: 'dragging',
  default: false,
});
