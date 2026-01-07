import Header from './components/Header';
import Footer from './components/Footer';
import HeroSection from './components/sections/HeroSection';
import HighlightsSection from './components/sections/HighlightsSection';
import ArticleListSection from './components/sections/ArticleListSection';

const HomePage = () => {

  const sections = [
    { id: 'hero', title: '', content: <HeroSection />, className: 'col-span-2 row-span-2' },
    { id: 'link', title: 'Links', content: 'Filler content for categories sectioncategories sectioncategories sectioncategories section.', className: 'col-span-2 row-span-1' },
    { id: 'highlights', title: 'Highlights', content: <HighlightsSection />, className: 'col-span-2 row-span-1' },
    { id: 'categories', title: 'Articles', content: <ArticleListSection />, className: 'col-span-4 row-span-4'},
    { id: 'gallery', title: 'Gallery', content: 'Filler content for categories section.', className: 'col-span-4 row-span-3' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      <Header title="Tyche01.fun" />

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 auto-rows-[180px] gap-6">
        {sections.map(({ id, title, content, className }) => (
          <section
            key={id}
            id={id}
            className={`card [background:var(--card-bg)] rounded shadow p-4 transition transform hover:scale-[1.01] z-10 hover:z-10 ${className}`}
          >
            <h2 className="text-lg font-bold text-secondary mb-2">{title}</h2>
            <div className="text-sm text-[var(--color-text-main)]">{content}</div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;