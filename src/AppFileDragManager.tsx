import { ReactNode, useEffect } from 'react';
import { listen, TauriEvent } from '@tauri-apps/api/event';
import { draggingState } from './states/dragState';
import { useSetRecoilState } from 'recoil';
import { invoke } from '@tauri-apps/api';
import { useDispatch } from 'react-redux';
import { addFileToDecryptionList } from './features/decryptionList/decryptionListSlice';
import { type AppDispatch } from './app/store';

// TODO: Move this to page load logic.
invoke('fetch_config').then(console.info);

export function AppFileDragManager({ children }: { children: ReactNode }) {
  const setDragging = useSetRecoilState(draggingState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fileDropHoverPromise = listen(
      TauriEvent.WINDOW_FILE_DROP_HOVER,
      () => {
        setDragging(true);
      }
    );

    const fileDropCancelPromise = listen(
      TauriEvent.WINDOW_FILE_DROP_CANCELLED,
      () => {
        setDragging(false);
      }
    );

    const fileDropPromise = listen(
      TauriEvent.WINDOW_FILE_DROP,
      async (event) => {
        setDragging(false);

        for (const path of event.payload as string[]) {
          await dispatch(addFileToDecryptionList(path));
        }
      }
    );

    return () => {
      fileDropHoverPromise.then((cleanup) => cleanup()).catch(console.error);
      fileDropCancelPromise.then((cleanup) => cleanup()).catch(console.error);
      fileDropPromise.then((cleanup) => cleanup()).catch(console.error);
    };
  }, []);

  return <>{children}</>;
}
