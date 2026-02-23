import type { ArticleItem } from "../types";
import Image from "next/image";
import Link from "next/link";

interface ArticleItemProps {
  article: ArticleItem;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <Link
      href={`/${article.id}`}
      className="w-full max-w h-[117px] px-5 py-4 rounded-xl flex items-center gap-4 bg-gradient-to-b from-[var(--color-mini-card)] to-[color-mix(in_srgb,var(--color-mini-card)_60%,black)] border border-white/5 shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-200 ease-out group"
    >
      <div className="relative w-[72px] h-[72px] flex-shrink-0 overflow-hidden rounded-lg">
        <Image src={article.image || "/images/default.png"} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
      </div>

      <div className="flex flex-col justify-center gap-1 flex-1 min-w-0">
        <p className="text-xl font-semibold text-[var(--color-text-main)] truncate group-hover:text-white transition-colors duration-200">
          {article.title}
        </p>
        <p className="text-sm text-[var(--color-text-subtle)] truncate">
          {article.description}
        </p>
      </div>
    </Link>
  );
};
export default ArticleItem;
