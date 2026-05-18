import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './fonts.css'
import { BrowserRouter } from 'react-router-dom';
import ToasterWrapper from './Components/ToasterWrapper';


ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <React.StrictMode>
            <ToasterWrapper>
                <App />
            </ToasterWrapper>
        </React.StrictMode>
    </BrowserRouter>
);
