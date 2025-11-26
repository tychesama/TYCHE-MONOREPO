import React from 'react';
import '@shared/ui/globals.css';
import MainPage from '../MainPage';
import '@shared/ui/themes.css';
import ThemeSwitcher from '@shared/ui/ThemeSwitcher';
import BackgroundHost from '@shared/ui/BackgroundHost';

export default function Home() {
  return (
    <React.StrictMode>
      <ThemeSwitcher />
      <BackgroundHost />
      <MainPage />
    </React.StrictMode>
  );
}
