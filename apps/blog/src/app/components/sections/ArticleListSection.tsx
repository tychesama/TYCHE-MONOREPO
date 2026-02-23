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
    <div className="w-full h-[720px] px-4 flex items-center justify-center">
      <div className="w-full max-w-[1100px] h-full flex flex-col gap-3">
        <div className="flex-1 max-h-[650px] rounded-2xl bg-[var(--card-bg)] border border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] overflow-hidden">
          <div className="h-full px-4 py-4 space-y-2">
            {currentArticles.map((article) => (
              <div key={article.id} className="w-full flex justify-center">
                <ArticleItem article={article} />
              </div>
            ))}
          </div>
        </div>

        <div className="h-[56px] flex items-center justify-center">
          <div className="w-[360px] flex items-center justify-between px-3 py-2 rounded-full bg-[var(--color-mini-card)] border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)]">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="disabled:cursor-not-allowed cursor-pointer px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text-main)] bg-black/10 hover:bg-black/20 active:scale-[0.97] transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black/10"
            >
              ← Prev
            </button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--color-text-subtle)] select-none">Page</span>
              <span className="text-sm font-semibold text-[var(--color-text-main)] px-3 py-1 rounded-full bg-black/10 border border-white/5 select-none">
                {currentPage} / {totalPages}
              </span>
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="disabled:cursor-not-allowed cursor-pointer px-4 py-2 rounded-full text-sm font-medium text-[var(--color-text-main)] bg-black/10 hover:bg-black/20 active:scale-[0.97] transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-black/10"
            >
              Next →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ArticleListSection;
