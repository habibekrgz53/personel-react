import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import PersonelProvider from "./component/PersonelContext.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <PersonelProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</PersonelProvider>
  </StrictMode>,
)
