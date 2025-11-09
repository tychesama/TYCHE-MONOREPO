import React from 'react';
import './globals.css';
import '../components/themes.css';
import MainPage from '../MainPage';
import ThemeSwitcher from '../components/ThemeSwitcher';
import BackgroundHost from '../components/BackgroundHost';

export default function Home() {
  return (
    <React.StrictMode>
      <ThemeSwitcher />
      <BackgroundHost />
      <MainPage />
    </React.StrictMode>
  );
}
