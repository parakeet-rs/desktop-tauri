import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  useSystemColorMode: true,
};

const defaultTheme = extendTheme({
  config,
  fonts: {
    heading: 'var(--parakeet-font-text)',
    body: `var(--parakeet-font-text)`,
    mono: `var(--parakeet-font-mono)`,
  },
});
export default defaultTheme;
