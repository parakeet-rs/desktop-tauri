import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  useSystemColorMode: true,
};

const defaultTheme = extendTheme({ config });
export default defaultTheme;
