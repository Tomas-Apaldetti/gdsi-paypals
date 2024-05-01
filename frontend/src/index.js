import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {theme} from './themes/index'
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './store'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StyledEngineProvider>

    </Provider>


  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
