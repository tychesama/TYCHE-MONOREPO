"use client";

import { useState } from "react";
import ArticleItem from "components/ArticleItem";
import type { ArticleItem as ArticleItemType } from "../../../../types";

const ITEMS_PER_PAGE = 5;

interface Props {
  articles: ArticleItemType[];
}

const ArticleListSection: React.FC<Props> = ({ articles }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(articles.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentArticles = articles.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div className="flex flex-col w-full h-[720px] gap-3 px-4">
      <div className="flex flex-col overflow-y-auto gap-2 [&::-webkit-scrollbar]:hidden scrollbar-none">
        {currentArticles.map((article) => (
          <ArticleItem key={article.id} article={article} />
        ))}
      </div>

      <div className="flex justify-center items-center gap-4 pt-2">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-4 py-1 rounded-md bg-[var(--color-mini-card)]
                     disabled:opacity-40"
        >
          Prev
        </button>

        <span className="text-sm text-[var(--color-text-subtle)]">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
          className="px-4 py-1 rounded-md bg-[var(--color-mini-card)]
                     disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ArticleListSection;
