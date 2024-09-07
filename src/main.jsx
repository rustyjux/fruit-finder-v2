import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './components/App'
// import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './components/SignIn/AuthContext.jsx';
import { TreeProvider } from './components/App/TreeContext';

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <TreeProvider>
          <App />
        </TreeProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
)
