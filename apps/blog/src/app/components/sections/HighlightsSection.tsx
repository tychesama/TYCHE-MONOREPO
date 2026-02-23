import { getAllArticles } from "lib/articles";
import type { ArticleItem as ArticleItemType } from "types";
import Image from "next/image";
import Link from "next/link";

const HighlightsSection: React.FC = () => {
  const articles = getAllArticles();
  const allArticles: ArticleItemType[] = Object.values(articles).flat();

  const latestArticle = allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  if (!latestArticle) return null;

  return (
    <div className="flex items-stretch w-full">
      <div className="w-[75px] overflow-hidden rounded-l-2xl bg-[var(--color-mini-card)] border border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col">
        <button className="flex-1 flex items-center justify-center text-sm font-semibold text-[var(--color-text-main)] hover:bg-black/15 active:scale-[0.98] transition">Pinned</button>
        <div className="h-px bg-white/10" />
        <button className="flex-1 flex items-center justify-center text-sm font-semibold text-[var(--color-text-main)] hover:bg-black/15 active:scale-[0.98] transition">Latest</button>
        <div className="h-px bg-white/10" />
        <button className="flex-1 flex items-center justify-center text-sm font-semibold text-[var(--color-text-main)] hover:bg-black/15 active:scale-[0.98] transition">Random</button>
      </div>

      <Link
        href={`/${latestArticle.id}`}
        className="w-[500px] h-[120px] px-5 py-4 rounded-r-2xl flex items-center gap-4 bg-gradient-to-b from-[var(--color-mini-card)] to-[color-mix(in_srgb,var(--color-mini-card)_60%,black)] border-y border-r border-white/10 shadow-[0_12px_35px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.06)] hover:shadow-[0_18px_45px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)] hover:scale-[1.01] transition-all duration-200 ease-out group"
      >
        <div className="relative w-[78px] h-[78px] flex-shrink-0 overflow-hidden rounded-xl">
          <Image
            src={latestArticle.image || "/images/default.png"}
            alt={latestArticle.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
          <p className="text-xl font-semibold text-[var(--color-text-main)] truncate group-hover:text-white transition-colors duration-200">
            {latestArticle.title}
          </p>
          <p className="text-sm text-[var(--color-text-subtle)] truncate">
            {latestArticle.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default HighlightsSection;