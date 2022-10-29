import React, { createContext, useMemo, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route  } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { StyledEngineProvider, CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from "./context/AuthProvider"
import { theme } from "./themes"

const appTheme = createTheme({
  typography: {
    appname: {
      fontFamily: '"Pacifico", cursive',
      fontSize: 26
    }
  }
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </AuthProvider>
        </Router>
      </CssVarsProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
