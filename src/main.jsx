import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import './index.css'
import { UserProvider } from './contexts/UserContext.jsx';
import Modal from './components/Modal.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <ModalProvider>
        <App />
        <Modal />
      </ModalProvider>
    </UserProvider>
  </BrowserRouter>
)