import type { ArticleItem } from "../types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ArticleItemProps {
  article: ArticleItem;
}

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3.528a2 2 0 0 1-.874 1.644L15 11.28V19a1 1 0 0 1-.553.894l-4 2A1 1 0 0 1 9 21v-9.72L6.874 9.172A2 2 0 0 1 6 7.528V4z" />
  </svg>
);

const ArticleItem = ({ article }: ArticleItemProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <Link
      href={`/${article.id}`}
      className="group relative w-full h-[95px] px-4 rounded-xl flex items-center gap-4 bg-gradient-to-b from-[var(--color-mini-card)] to-[color-mix(in_srgb,var(--color-mini-card)_60%,black)] border border-white/5 hover:border-[var(--accent)] transition-colors duration-200"
      style={{ ["--accent" as any]: article.color || "#ffffff" } as React.CSSProperties}
    >
      {/* Color accent line */}
      {article.color && (
        <div
          className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full opacity-60"
          style={{ background: article.color, borderRadius: 4 }}
        />
      )}

      {/* Badges — absolute top-right */}
      <div className="absolute top-2.5 right-3 flex items-center gap-1 z-10">
        {article.pinned && (
          <span
            className="flex items-center justify-center w-5 h-5 rounded"
            style={{ background: "rgba(255,255,255,0.07)", color: "var(--color-text-subtle)" }}
            title="Pinned"
          >
            <PinIcon />
          </span>
        )}
        {article.favorite && (
          <span
            className="flex items-center justify-center w-5 h-5 rounded"
            style={{ background: "rgba(255,200,50,0.1)", color: "#f5c842" }}
            title="Favorite"
          >
            <StarIcon />
          </span>
        )}
      </div>

      {/* Thumbnail */}
      <div className="relative w-[62px] h-[62px] flex-shrink-0 overflow-hidden rounded-lg">
        <Image
          src={article.image || "/images/default.png"}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Text */}
      <div className="flex flex-col justify-center gap-1 flex-1 min-w-0 pr-10">
        <p className="text-sm font-semibold text-[var(--color-text-main)] truncate group-hover:text-white transition-colors duration-200">
          {article.title}
        </p>
        <p className="text-xs text-[var(--color-text-subtle)] truncate">
          {article.description}
        </p>
        {isDesktop && article.tags && article.tags.length > 0 && (
          <div className="flex items-center gap-1 flex-wrap">
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--color-text-subtle)",
                  borderRadius: 3,
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Date — absolute bottom-right */}
      <div className="absolute bottom-2.5 right-3">
        <span className="text-[10px] text-[var(--color-text-subtle)] whitespace-nowrap">
          {new Date(article.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>
    </Link>
  );
};

export default ArticleItem;