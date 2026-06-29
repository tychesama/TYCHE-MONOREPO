import React from 'react';
import { Link } from 'react-router-dom';
import Header from '@shared/ui/Header';

const CoinPage: React.FC = () => {
  return (
    <div
      className="flex min-h-screen flex-col overflow-hidden"
      style={{ background: 'var(--page-bg)', color: 'var(--color-text-main)' }}
    >
      <Header title="joemidpan.com" />

      <main className="relative z-10 flex flex-1 items-center justify-center px-4 py-10 text-center md:px-8">
        <div className="w-full max-w-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--button-bg)]">
            QR route
          </p>
          <h1 className="mb-6 text-4xl font-bold md:text-5xl">
            Coin
          </h1>
          <p className="mb-8 text-base leading-7 text-[var(--color-text-subtle)] md:text-lg">
            This page is reserved for the coin QR code.
          </p>
          <Link
            to="/"
            className="inline-flex rounded bg-[var(--button-bg)] px-5 py-2 text-white transition hover:bg-[var(--button-hover-bg)] focus:outline-none focus:ring-2 focus:ring-[var(--button-bg)] focus:ring-offset-2 focus:ring-offset-[var(--color-surface)]"
          >
            Go to main page
          </Link>
        </div>
      </main>
    </div>
  );
};

export default CoinPage;
