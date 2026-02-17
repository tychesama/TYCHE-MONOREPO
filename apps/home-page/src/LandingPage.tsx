import React from 'react';
import Header from '@shared/ui/Header';
import Footer from '@shared/ui/Footer';

const LandingPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      <Header title="joemidpan.com" />

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center text-center px-6 z-10">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--color-text-main)" }}>
            Welcome to Tyche01.fun
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-text-subtle)" }}>
            I'm Joem, an aspiring backend developer. Explore my blog, portfolio, or projects.    
            <br/>
            DISCLAIMER: This website is in work in progress!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={import.meta.env.DEV ? "http://localhost:3000" : "https://portfolio.tyche01.fun"}
              className="px-5 py-2 rounded transition bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)]"
            >
              View Portfolio
            </a>
            <a
              href={import.meta.env.DEV ? "http://localhost:3001" : "https://blog.tyche01.fun"}
              className="px-5 py-2 rounded transition bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)]"
            >
              Visit Blog
            </a>
            <a
              href="https://tyche01.fun/projects"
              className="px-5 py-2 rounded transition bg-[var(--button-bg)] hover:bg-[var(--button-hover-bg)]"
            >
              Other Projects
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;
