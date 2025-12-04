import { getCategorizedArticles } from "../../lib/articles";
import ArticleItemList from "components/ArticleListItem";
import Header from './components/Header';
import Footer from './components/Footer';

const HomePage = () => {
  const articles = getCategorizedArticles()

  return (
    <div className="page-surface [background:var(--page-bg)] text-[var(--color-text-main)] min-h-screen transition-colors">
      <Header title="Tyche01 Blog" />
      <section className="mx-auto w-11/12 md:w-1/2 mt-20 flex flex-col gap-16 mb-20">

        <section className="md-grid md:grid-cols-2 flex flex-col gap-10">
          {articles !== null && Object.keys(articles).map(article => (
            <ArticleItemList
              category={article}
              articles={articles[article]}
              key={article}
            />
          ))}
        </section>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;