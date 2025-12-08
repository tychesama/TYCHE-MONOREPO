import React from 'react';
import { getCategorizedArticles } from "../../lib/articles";
import ArticleItemList from "components/ArticleListItem";
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = () => {
  const articles = getCategorizedArticles();
  
  const sections = [
    { 
      id: 'featured', 
      title: 'Featured Articles', 
      content: 'Filler content for categories section.',
      className: 'col-span-4 row-span-2' 
    },
    { id: 'recent', title: 'Recent Posts', content: 'Filler content for categories section.', className: 'col-span-1 row-span-1' },
    { id: 'title', title: 'Recent Posts', content: 'Filler content for categories section.', className: 'col-span-3 row-span-1' },
    { id: 'categories', title: 'Categories', content: articles !== null && Object.keys(articles).map(article => (
        <ArticleItemList
          category={article}
          articles={articles[article]}
          key={article}
        />
      )), className: 'col-span-4 row-span-4' },
      { id: 'freedomwall', title: 'Freedom Wall', content: 'Filler content for categories section.', className: 'col-span-4 row-span-3' },
  ];

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      <Header title="Tyche01 Blog" />

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-4 auto-rows-[180px] gap-6">
        {sections.map(({ id, title, content, className }) => (
          <section
            key={id}
            id={id}
            className={`card [background:var(--card-bg)] rounded shadow p-4 transition transform hover:scale-[1.01] z-10 hover:z-10 ${className}`}
          >
            <h2 className="text-lg font-bold text-secondary mb-2">{title}</h2>
            <div className="text-sm text-[var(--color-text-subtle)]">{content}</div>
          </section>
        ))}
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;