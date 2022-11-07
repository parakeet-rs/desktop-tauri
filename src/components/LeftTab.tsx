import { TabList, Tabs } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const LeftTabs = styled(Tabs)`
  display: grid;
  grid-template-columns: 8em auto;

  > * {
    height: calc(100vh - 8rem);
    overflow-y: auto;
  }
`;

export const LeftTabList = styled(TabList)`
  border-inline-start: 0;
  border-inline-end-width: 2px;

  &::-webkit-scrollbar {
    width: 0;
  }
  &::-webkit-scrollbar-thumb {
    -webkit-appearance: none;
  }

  > button {
    padding: 0.25em 0.5em;
    align-items: flex-end;
    flex-direction: column;

    margin-left: 0;
  }
`;
