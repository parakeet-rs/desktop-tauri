import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppFileDragManager } from './AppFileDragManager';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import defaultTheme from './theme';

import App from './App';
import './style.css';

if (process.env.NODE_ENV === 'production') {
  document.addEventListener('contextmenu', (event) => event.preventDefault());
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={defaultTheme}>
        <AppFileDragManager>
          <App />
        </AppFileDragManager>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
);
