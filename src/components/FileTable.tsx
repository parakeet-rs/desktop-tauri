import React from 'react';
import { FileToProcess } from '../states/processFilesState';
import { GridItem, Grid, Heading } from '@chakra-ui/react';
import { FileEntry } from './FileEntry';

export function FileTable({ files }: { files: FileToProcess[] }) {
  return (
    <>
      <Grid
        templateColumns="auto 8em"
        position="sticky"
        top="0"
        bg="teal.50"
        p={2}
      >
        <GridItem>
          <Heading size="sm">文件</Heading>
        </GridItem>
        <GridItem textAlign="right">
          <Heading size="sm">大小</Heading>
        </GridItem>
      </Grid>

      <Grid templateColumns="auto 8em">
        {files.map((file) => (
          <FileEntry key={file.file.path} file={file} />
        ))}
      </Grid>
    </>
  );
}
