import styled from '@emotion/styled';

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
