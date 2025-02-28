import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import HHH from './pages/HHH'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HHH/>
  </StrictMode>,
)
