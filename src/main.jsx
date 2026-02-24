import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import CssBaseline from '@mui/material/CssBaseline';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import theme from './theme.js';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter } from 'react-router-dom';
import persistStore from 'redux-persist/es/persistStore';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfirmProvider } from 'material-ui-confirm';
import { injectStore } from './utils/authorizeAxios.js';

const persistor = persistStore(store);

// Config react-router-dom with browser-router
// Inject store : Use redux store inside file outside component
injectStore(store);

createRoot(document.getElementById('root')).render(
  <BrowserRouter basename='/'>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConfirmProvider>
          <CssVarsProvider theme={theme}>
            <CssBaseline />
            <App />
            <ToastContainer position='bottom-right' theme='colored'/>
          </CssVarsProvider>
        </ConfirmProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
)
