import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppFileDragManager } from './AppFileDragManager';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from '@chakra-ui/react';
import defaultTheme from './theme';
import { Provider } from 'react-redux';
import { store } from './app/store';

import App from './App';
import './style.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <ChakraProvider theme={defaultTheme}>
          <AppFileDragManager>
            <App />
          </AppFileDragManager>
        </ChakraProvider>
      </Provider>
    </RecoilRoot>
  </React.StrictMode>
);
