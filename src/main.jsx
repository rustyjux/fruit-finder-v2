import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './components/AuthContext';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CookiesProvider defaultSetOptions={{ path: '/ '}}>
        <App />
      </CookiesProvider>
    </AuthProvider>
  </React.StrictMode>,
)
