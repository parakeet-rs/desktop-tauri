import { GridItem } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const GridItemMain = styled(GridItem)`
  border-top: 1px solid var(--chakra-colors-green-300);
  padding: 0.25em 0.5em 0.25em 1em;
  min-width: 0;
  overflow-x: hidden;
`;

export const GridItemState = styled(GridItem)`
  border-top: 1px solid var(--chakra-colors-green-300);
  padding: 0.25em 1em 0.25em 0.5em;
  text-align: right;
`;

export const InlineFileName = styled.code`
  max-width: 100%;
  text-overflow: ellipsis;
  word-break: normal;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  font-size: smaller;
  font-family: var(--parakeet-font-mono);
`;
