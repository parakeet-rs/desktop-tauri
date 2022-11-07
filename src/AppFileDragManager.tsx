import produce from 'immer';
import { ReactNode } from 'react';
import { listen, TauriEvent } from '@tauri-apps/api/event';
import { draggingState } from './states/dragState';
import { useSetRecoilState } from 'recoil';
import { FileDetails, processFileListState } from './states/processFilesState';
import { invoke } from '@tauri-apps/api';

export function AppFileDragManager({ children }: { children: ReactNode }) {
  const setDragging = useSetRecoilState(draggingState);
  const setProcessFileListState = useSetRecoilState(processFileListState);

  listen(TauriEvent.WINDOW_FILE_DROP_HOVER, () => {
    setDragging(true);
  });

  listen(TauriEvent.WINDOW_FILE_DROP, async (event) => {
    setDragging(false);

    const files = await Promise.all(
      (event.payload as string[]).map(
        (path) => invoke('stat_file', { path }) as Promise<FileDetails>
      )
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
  });

  listen(TauriEvent.WINDOW_FILE_DROP_CANCELLED, () => {
    setDragging(false);
  });

  return <>{children}</>;
}
