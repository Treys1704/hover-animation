import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App title = "Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport" price = {399}/>
  </StrictMode>,
)
