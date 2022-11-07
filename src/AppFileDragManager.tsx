import produce from 'immer';
import { ReactNode, useEffect } from 'react';
import { listen, TauriEvent } from '@tauri-apps/api/event';
import { draggingState } from './states/dragState';
import { useSetRecoilState } from 'recoil';
import { processFileListState } from './states/processFilesState';
import { invoke } from '@tauri-apps/api';
import { statFile } from './utils/remoteMethods';

// TODO: Move this to page load logic.
invoke('fetch_config').then(console.info);

export function AppFileDragManager({ children }: { children: ReactNode }) {
  const setDragging = useSetRecoilState(draggingState);
  const setProcessFileListState = useSetRecoilState(processFileListState);

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

        const files = await Promise.all(
          (event.payload as string[]).map((path) => statFile(path))
        );

        setProcessFileListState((fileList) =>
          produce(fileList, (draft) => {
            for (const file of files) {
              if (!fileList.some((f) => f.file.path === file.path)) {
                draft.push({
                  file,
                  type: 'unknown',
                });
              }
            }
          })
        );
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
