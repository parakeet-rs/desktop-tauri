import { Code, Td, Tr, VStack } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { FileToProcess } from '../states/processFilesState';
import { getFileSize } from '../utils/fileSize';
import { InlineFileName } from './InlineFileName';

export function FileEntry({ file }: { file: FileToProcess }) {
  const fileSize = useMemo(() => getFileSize(file.file.size), [file.file.size]);

  return (
    <Tr>
      <Td>
        <VStack align="left">
          <InlineFileName title={file.file.path}>
            {file.file.name}
          </InlineFileName>
          {/* 放入操作按钮到此处 */}
        </VStack>
      </Td>
      <Td style={{ whiteSpace: 'nowrap' }} textAlign="right">
        {fileSize}
      </Td>
    </Tr>
  );
}
