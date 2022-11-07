import { Code, GridItem, Td, Text, Tr, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import React, { useMemo } from 'react';
import { FileToProcess } from '../states/processFilesState';
import { getFileSize } from '../utils/fileSize';
import { InlineFileName } from './InlineFileName';

const GridItemName = styled(GridItem)`
  padding: 0.25em 0.5em;
  border-top: 1px solid var(--chakra-colors-green-300);
  min-width: 0;
  overflow-x: hidden;
`;

const GridItemSize = styled(GridItem)`
  padding: 0.25em 0.5em 0.25em 0;
  border-top: 1px solid var(--chakra-colors-green-300);
  text-align: right;
`;

export function FileEntry({ file }: { file: FileToProcess }) {
  const fileSize = useMemo(() => getFileSize(file.file.size), [file.file.size]);

  return (
    <>
      <GridItemName>
        <VStack align="left">
          <InlineFileName title={file.file.path}>
            {file.file.name}
          </InlineFileName>
          {/* 放入操作按钮到此处 */}
        </VStack>
      </GridItemName>
      <GridItemSize>
        <Text>{fileSize}</Text>
      </GridItemSize>
    </>
  );
}
