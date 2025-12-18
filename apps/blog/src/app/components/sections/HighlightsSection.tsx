import { getAllArticles } from "lib/articles";
import type { ArticleItem as ArticleItemType } from "types";
import ArticleItem from "components/ArticleItem";

const HighlightsSection: React.FC = () => {
  const articles = getAllArticles();
  const allArticles: ArticleItemType[] = Object.values(articles).flat();

  // Get latest article by date
  const latestArticle = allArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  if (!latestArticle) return null;

  return (
    <div className="flex items-start gap-8">

      {/* Buttons / Highlights Categories */}
      <div className="flex flex-col">
        <button className="text-[var(--color-text-main)] text-xl mb-2">
          Latest Article
        </button>
        <button className="text-[var(--color-text-main)] text-xl mb-2">
          Pinned Article
        </button>
        <button className="text-[var(--color-text-main)] text-xl mb-2">
          Latest Post
        </button>
      </div>

      {/* Latest Article using global ArticleItem */}
      <div className="w-full -m-4">
        <ArticleItem article={latestArticle} />
      </div>

    </div>
  );
};

export default HighlightsSection;
