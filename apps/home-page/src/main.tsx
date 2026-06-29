import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@shared/ui/globals.css'
import LandingPage from './LandingPage'
import CoinPage from './CoinPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BackgroundHost from '@shared/ui/BackgroundHost';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <BackgroundHost />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coin" element={<CoinPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
