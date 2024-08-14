import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { SidebarProvider } from './context/SidebarContext.jsx'
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </React.StrictMode>,
);
