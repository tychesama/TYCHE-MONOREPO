import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@shared/ui/globals.css'
import LandingPage from './LandingPage'
import { BrowserRouter } from 'react-router-dom'
import BackgroundHost from '@shared/ui/BackgroundHost';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BackgroundHost />
      <LandingPage />
    </BrowserRouter>
  </StrictMode>,
)
