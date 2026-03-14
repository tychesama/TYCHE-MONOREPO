"use client";

import { useEffect, useState, useRef } from "react";
import type { ArticleItem as ArticleItemType } from "types";
import Image from "next/image";
import Link from "next/link";

const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3.528a2 2 0 0 1-.874 1.644L15 11.28V19a1 1 0 0 1-.553.894l-4 2A1 1 0 0 1 9 21v-9.72L6.874 9.172A2 2 0 0 1 6 7.528V4z" />
  </svg>
);

interface Props {
  allArticles: ArticleItemType[];
}

const HighlightsSection: React.FC<Props> = ({ allArticles }) => {
  const pinnedArticle = allArticles.find((a) => a.pinned) ?? null;
  const favoriteArticles = allArticles.filter((a) => a.favorite);

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: 580,
        height: 320,
        background: "var(--color-mini-card)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      }}
    >
      {/* ── Pinned ── */}
      <PinnedRow article={pinnedArticle} />

      {/* ── Divider ── */}
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />

      {/* ── Favorites Banner Carousel ── */}
      <FavoritesBanner articles={favoriteArticles} />
    </div>
  );
};

/* ══════════════════════════════ Pinned Row ══ */
const PinnedRow: React.FC<{ article: ArticleItemType | null }> = ({ article }) => {
  const inner = (
    <div className="relative flex items-center gap-5 px-5 h-full w-full overflow-hidden group">
      {/* blurred bg */}
      {article?.image && (
        <>
          <Image
            src={article.image}
            alt=""
            fill
            className="object-cover opacity-[0.09] scale-110 blur-md pointer-events-none"
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(100deg, var(--color-mini-card) 30%, transparent 100%)",
            }}
          />
        </>
      )}

      {/* Pin icon top-right */}
      <div
        className="absolute top-3 right-3 z-10 flex items-center justify-center w-5 h-5"
        style={{ color: "var(--color-text-subtle)", opacity: 0.5 }}
      >
        <PinIcon />
      </div>

      {/* Thumbnail */}
      {article?.image && (
        <div
          className="relative shrink-0 overflow-hidden z-10 shadow-lg"
          style={{ width: 54, height: 54, borderRadius: 6 }}
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}

      {/* Text */}
      <div className="flex flex-col gap-1 flex-1 min-w-0 z-10 pr-6">
        {article?.tags?.[0] && (
          <span
            className="text-[9px] font-bold uppercase tracking-[0.18em] w-fit px-1.5 py-0.5"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "var(--color-text-subtle)",
              borderRadius: 3,
            }}
          >
            {article.tags[0]}
          </span>
        )}
        <p
          className="text-base font-semibold truncate transition-colors duration-200 group-hover:text-white"
          style={{ color: "var(--color-text-main)" }}
        >
          {article?.title ?? "No pinned article"}
        </p>
        {article?.description && (
          <p className="text-xs truncate" style={{ color: "var(--color-text-subtle)" }}>
            {article.description}
          </p>
        )}
      </div>
    </div>
  );

  return article ? (
    <Link
      href={`/${article.id}`}
      className="block hover:bg-white/[0.03] transition-colors duration-150"
      style={{ height: 100, flexShrink: 0 }}
    >
      {inner}
    </Link>
  ) : (
    <div style={{ height: 100, flexShrink: 0 }}>{inner}</div>
  );
};

/* ══════════════════════════════ Favorites Banner Carousel ══ */
const CARD_W = 158;
const CARD_H = 210;
const GAP = 8;
const VISIBLE = 3;
const INTERVAL = 5000;

const FavoritesBanner: React.FC<{ articles: ArticleItemType[] }> = ({ articles }) => {
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slideDir, setSlideDir] = useState<"in" | "out">("in");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const count = articles.length;

  const advance = () => {
    if (count <= VISIBLE) return;
    setSlideDir("out");
    setAnimating(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % count);
      setSlideDir("in");
      setTimeout(() => setAnimating(false), 350);
    }, 300);
  };

  useEffect(() => {
    if (count <= VISIBLE) return;
    timerRef.current = setInterval(advance, INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [count]);

  if (count === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xs" style={{ color: "var(--color-text-subtle)" }}>
          No favorites yet
        </p>
      </div>
    );
  }

  // Build visible slice (wrapping)
  const visible = Array.from({ length: Math.min(VISIBLE, count) }, (_, i) =>
    articles[(index + i) % count]
  );

  return (
    <div
      className="flex-1 flex items-center justify-center overflow-hidden"
      style={{ padding: "14px 16px" }}
    >
      <div
        className="flex items-stretch"
        style={{ gap: GAP }}
      >
        {visible.map((article, i) => (
          <BannerCard
            key={`${article.id}-${index}-${i}`}
            article={article}
            animating={animating}
            slideDir={slideDir}
            delay={i * 40}
          />
        ))}
      </div>
    </div>
  );
};

/* ══════════════════════════════ Banner Card ══ */
const BannerCard: React.FC<{
  article: ArticleItemType;
  animating: boolean;
  slideDir: "in" | "out";
  delay: number;
}> = ({ article, animating, slideDir, delay }) => {
  return (
    <Link
      href={`/${article.id}`}
      className="relative flex-shrink-0 overflow-hidden group"
      style={{
        width: CARD_W,
        height: CARD_H,
        borderRadius: 6,
        border: "1px solid rgba(255,255,255,0.09)",
        transition: `opacity 280ms ease ${delay}ms, transform 280ms ease ${delay}ms`,
        opacity: animating ? 0 : 1,
        transform: animating
          ? slideDir === "out"
            ? "translateX(-18px)"
            : "translateX(18px)"
          : "translateX(0)",
      }}
    >
      {/* Full cover image */}
      {article.image ? (
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div style={{ background: "var(--color-alt-card)", width: "100%", height: "100%" }} />
      )}

      {/* Dark gradient overlay from bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 45%, transparent 100%)",
        }}
      />

      {/* Color accent — top edge strip */}
      {article.color && (
        <div
          className="absolute top-0 left-0 right-0"
          style={{ height: 3, background: article.color, opacity: 0.75 }}
        />
      )}

      {/* Text — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-col gap-1 z-10">
        {article.tags?.[0] && (
          <span
            className="text-[8px] font-bold uppercase tracking-[0.15em] w-fit px-1.5 py-0.5"
            style={{
              background: article.color ? `${article.color}33` : "rgba(255,255,255,0.1)",
              color: article.color ?? "rgba(255,255,255,0.6)",
              borderRadius: 2,
              border: `1px solid ${article.color ? `${article.color}55` : "rgba(255,255,255,0.15)"}`,
            }}
          >
            {article.tags[0]}
          </span>
        )}
        <p
          className="text-xs font-semibold leading-snug line-clamp-2 transition-colors duration-150 group-hover:text-white"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {article.title}
        </p>
        {article.date && (
          <p className="text-[9px]" style={{ color: "rgba(255,255,255,0.4)" }}>
            {new Date(article.date).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}
      </div>
    </Link>
  );
};

export default HighlightsSection;