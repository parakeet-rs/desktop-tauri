import React, { useMemo } from 'react';
import { Text, VStack } from '@chakra-ui/react';

import { getFileSize } from '../../utils/fileSize';
import { FileInfo } from './decryptionListSlice';
import { GridItemMain, GridItemState, InlineFileName } from './styles';

const translation = {
  processed: '完成',
  failed: '失败',
  ready: '就绪',
  'in-progress': '处理中…',
};

export function DecryptionEntry({ file }: { file: FileInfo }) {
  const fileSize = useMemo(() => getFileSize(file.size), [file.size]);

  return (
    <>
      <GridItemMain>
        <VStack align="left">
          <InlineFileName title={file.path}>{file.name}</InlineFileName>
          <Text>{fileSize}</Text>
        </VStack>
      </GridItemMain>
      <GridItemState>{translation[file.state]}</GridItemState>
    </>
  );
}
