import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';  // El componente raíz de la aplicación
import './index.css';  // Los estilos globales de la aplicación

const rootElement = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);