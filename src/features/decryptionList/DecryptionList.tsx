import React from 'react';
import { Grid, Heading } from '@chakra-ui/react';
import { DecryptionEntry } from './DecryptionEntry';
import { selectDecryptionListState } from './decryptionListSlice';
import { GridItemMain, GridItemState } from './styles';
import { useSelector } from 'react-redux';

export function DecryptionList() {
  const decryptionList = useSelector(selectDecryptionListState);
  return (
    <>
      <Grid templateColumns="auto 8em" position="sticky" bg="teal.50">
        <GridItemMain data-header="true">
          <Heading size="sm">文件</Heading>
        </GridItemMain>
        <GridItemState data-header="true">
          <Heading size="sm">状态</Heading>
        </GridItemState>
      </Grid>

      <Grid templateColumns="auto 8em">
        {decryptionList.files.map((file) => (
          <DecryptionEntry key={file.path} file={file} />
        ))}
      </Grid>
    </>
  );
}
