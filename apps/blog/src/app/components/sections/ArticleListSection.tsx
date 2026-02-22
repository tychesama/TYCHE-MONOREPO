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
    <div className="flex flex-col w-full h-[720px] px-4 items-center">
      <div
        className="flex flex-col w-[1000px] h-[665px] items-stretch justify-start py-[25px] gap-2 rounded-xl bg-[var(--card-bg)] shadow-[inset_0_2px_6px_rgba(0,0,0,0.35),inset_0_-1px_2px_rgba(255,255,255,0.08)] border border-black/20 [&::-webkit-scrollbar]:hidden scrollbar-none"
      >
        {currentArticles.map((article) => (
          <div key={article.id} className="w-full flex justify-center">
            <ArticleItem article={article} />
          </div>
        ))}
      </div>

      <div className="flex justify-center pt-3">
        <div
          className="flex items-center gap-auto px-4 py-2 w-[300px] justify-between rounded-full bg-[var(--color-mini-card)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.35)] transition"
        >
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="text-lg px-3 py-1 rounded-full bg-black/10 hover:bg-black/20 active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
          >
            Prev
          </button>

          <span className="text-lg text-[var(--color-text-subtle)] px-2 select-none">
            {currentPage} / {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="text-lg px-3 py-1 rounded-full bg-black/10 hover:bg-black/20 active:scale-[0.96] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default ArticleListSection;
