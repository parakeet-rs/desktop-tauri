import { Box, Heading, TabPanel } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { HexInput } from '../components/HexInput';

export const StyledTabPanel = styled(TabPanel)`
  padding-top: 0.2rem;
`;

export const StyledSectionPanel = ({
  title,
  children,
  titleSize = 'md',
}: {
  title: string;
  titleSize?: string;
  children: ReactNode;
}) => {
  return (
    <Box mb="3" p="3" borderWidth="1px" borderRadius="lg">
      <Heading size={titleSize}>{title}</Heading>
      {children}
    </Box>
  );
};
