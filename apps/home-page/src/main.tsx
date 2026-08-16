import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@shared/ui/globals.css'
import LandingPage from './LandingPage'
import CoinPage from './CoinPage'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/coin" element={<CoinPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
