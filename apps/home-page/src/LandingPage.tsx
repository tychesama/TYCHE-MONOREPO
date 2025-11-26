import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      {/* Header */}
      <header
        className="w-full px-6 py-4 flex justify-between items-center shadow"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <h1 className="text-xl font-bold" style={{ color: "var(--color-text-main)" }}>
          Tyche
        </h1>
        <nav className="space-x-4 text-sm">
          <a href="#about" style={{ color: "var(--color-text-subtle)" }} className="hover:text-white">
            About
          </a>
          <a href="#projects" style={{ color: "var(--color-text-subtle)" }} className="hover:text-white">
            Projects
          </a>
          <a href="#contact" style={{ color: "var(--color-text-subtle)" }} className="hover:text-white">
            Contact
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center text-center px-6">
        <div className="max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "var(--color-text-main)" }}>
            Welcome to Tyche01.fun
          </h2>
          <p className="text-lg mb-8" style={{ color: "var(--color-text-subtle)" }}>
            I'm Joem — an aspiring backend developer. Explore my blog, portfolio, or projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={import.meta.env.DEV ? "http://localhost:3000" : "https://portfolio.tyche01.fun"}
              className="px-5 py-2 rounded transition"
              style={{
                backgroundColor: "var(--color-surface)",
                color: "var(--color-text-main)",
              }}
            >
              View Portfolio
            </a>
            <a
              href={import.meta.env.DEV ? "http://localhost:3001" : "https://blog.tyche01.fun"}
              className="px-5 py-2 rounded transition"
              style={{
                backgroundColor: "var(--color-card)",
                color: "var(--color-text-main)",
              }}
            >
              Visit Blog
            </a>
            <a
              href="https://tyche01.fun/projects"
              className="px-5 py-2 rounded transition"
              style={{
                backgroundColor: "var(--color-alt-card)",
                color: "var(--color-text-main)",
              }}
            >
              Other Projects
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 text-sm"
        style={{ backgroundColor: "var(--card-bg)", color: "var(--color-text-subtle)" }}
      >
        © {new Date().getFullYear()} Tyche01.fun — All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
