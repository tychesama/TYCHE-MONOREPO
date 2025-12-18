import { getAllArticles } from "../../../../lib/articles";
import ArticleItem from "components/ArticleItem";
import type { ArticleItem as ArticleItemType } from "../../../../types";

const articles = getAllArticles();

const ArticleListSection: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-[720px] overflow-y-auto gap-2 px-4">
      {articles.map((article: ArticleItemType) => (
        <div key={article.id} className="flex flex-col gap-2.5 font-poppins text-lg">
            <ArticleItem key={article.id} article={article} />
        </div>
      ))}

    </div>
  );
};

export default ArticleListSection;
