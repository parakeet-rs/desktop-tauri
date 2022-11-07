import React, { useMemo } from 'react';
import { FileDetails, FileToProcess } from '../states/processFilesState';
import { getFileSize } from '../utils/fileSize';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { FileEntry } from './FileEntry';

export function FileTable({ files }: { files: FileToProcess[] }) {
  return (
    <Table
      colorScheme="teal"
      size="sm"
      style={{ tableLayout: 'fixed', width: '100%' }}
    >
      <Thead>
        <Tr>
          <Th>文件</Th>
          <Th width="8em" textAlign="right">
            大小
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {files.map((file) => (
          <FileEntry key={file.file.path} file={file} />
        ))}
      </Tbody>
    </Table>
  );
}
