import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import DarkmodeContextProvider from './context/Darkmode';
import { AuthContextProvider } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SnackbarProvider
      maxSnack={1}
      autoHideDuration={1000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <DarkmodeContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </DarkmodeContextProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
