import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import HighlightsSection from './components/sections/HighlightsSection';
import ArticleListSection from './components/sections/ArticleListSection';
import { getAllArticles } from "../../lib/articles";
import PatternGrid from "./PatternGrid";

const HomePage = () => {
  const articles = getAllArticles();

  const sections = [
    { id: 'hero', title: '', content: <HeroSection />, className: 'col-span-2 row-span-2' },
    { id: 'link', title: 'Links', content: 'Filler content for categories sectioncategories sectioncategories sectioncategories section.', className: 'col-span-2 row-span-1' },
    { id: 'highlights', title: 'Highlights', content: <HighlightsSection />, className: 'col-span-2 row-span-1' },
    { id: 'categories', title: 'Articles', content: <ArticleListSection articles={articles} />, className: 'col-span-4 row-span-4' },
    { id: 'gallery', title: 'Gallery', content: 'Filler content for categories section.', className: 'col-span-4 row-span-3' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      <Header title="joemidpan.com" />

      <PatternGrid>
        {sections.map(({ id, title, content, className }) => (
          <section
            key={id}
            id={id}
            data-pattern-card
            className={`relative overflow-visible rounded-lg bg-transparent shadow p-4 transition transform hover:scale-[1.01] ${className}`}
          >
            <div className="absolute inset-0 z-0 bg-[var(--card-bg)] rounded-lg" />

            <div
              className="absolute inset-0 z-1 opacity-20 bg-no-repeat rounded-lg"
              style={{
                backgroundImage: "var(--pattern-bg)",
                backgroundRepeat: "repeat",
                backgroundSize: "auto", 
                backgroundPosition: "var(--bg-x) var(--bg-y)",
              }}
            />

            <div className="absolute inset-0 z-2 bg-[var(--card-bg)]/20 pointer-events-none rounded-lg" />

            <div className="relative z-3">
              <h2 className="text-lg font-bold text-secondary mb-2">{title}</h2>
              <div className="text-sm text-[var(--color-text-main)]">{content}</div>
            </div>
          </section>
        ))}
      </PatternGrid>

      <Footer />
    </div>
  );
}

export default HomePage;