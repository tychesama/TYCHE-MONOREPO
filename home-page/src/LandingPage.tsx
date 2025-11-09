import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-neutral text-text-main flex flex-col">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center bg-card shadow">
        <h1 className="text-xl font-bold text-primary">Tyche</h1>
        <nav className="space-x-4 text-sm text-alternate">
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#projects" className="hover:text-primary">Projects</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary">Welcome to Tyche01.fun</h2>
          <p className="text-lg text-text-subtle mb-8">
            I'm Joem — an aspiring backend developer. Explore my blog, portfolio, or projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={import.meta.env.DEV ? "http://localhost:3000" : "https://portfolio.tyche01.fun"}
              className="bg-primary text-white px-5 py-2 rounded hover:bg-blue-600 transition"
            >
              View Portfolio
            </a>
            <a href="https://blog.tyche01.fun" className="bg-secondary text-white px-5 py-2 rounded hover:bg-purple-600 transition">
              Visit Blog
            </a>
            <a href="https://tyche01.fun/projects" className="bg-tertiary text-white px-5 py-2 rounded hover:bg-emerald-600 transition">
              Other Projects
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-text-subtle bg-card">
        © {new Date().getFullYear()} Tyche01.fun — All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
