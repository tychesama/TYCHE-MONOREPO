"use client";

import { useEffect, useState, useRef, useCallback, useMemo } from "react";
import type { ArticleItem as ArticleItemType } from "types";
import Image from "next/image";
import Link from "next/link";

const PinIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M5 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3.528a2 2 0 0 1-.874 1.644L15 11.28V19a1 1 0 0 1-.553.894l-4 2A1 1 0 0 1 9 21v-9.72L6.874 9.172A2 2 0 0 1 6 7.528V4z" />
  </svg>
);

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
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
        height: 345,
        background: "var(--color-mini-card)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 10,
        boxShadow: "0 20px 50px rgba(0,0,0,0.45)",
      }}
    >
      <PinnedRow article={pinnedArticle} />
      <div style={{ height: 1, background: "rgba(255,255,255,0.07)", flexShrink: 0 }} />
      <FavoritesBanner articles={favoriteArticles} />
    </div>
  );
};

/* ══════════════════════════════ Pinned Row ══ */
const PinnedRow: React.FC<{ article: ArticleItemType | null }> = ({ article }) => {
  const inner = (
    <div className="relative flex items-center gap-5 px-5 h-full w-full overflow-hidden group">
      {article?.image && (
        <>
          <Image src={article.image} alt="" fill className="object-cover opacity-[0.09] scale-110 blur-md pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(100deg, var(--color-mini-card) 30%, transparent 100%)" }} />
        </>
      )}
      <div className="absolute top-3 right-3 z-10 flex items-center justify-center w-5 h-5" style={{ color: "var(--color-text-subtle)", opacity: 0.5 }}>
        <PinIcon />
      </div>
      {article?.image && (
        <div className="relative shrink-0 overflow-hidden z-10 shadow-lg" style={{ width: 54, height: 54, borderRadius: 6 }}>
          <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
      )}
      <div className="flex flex-col gap-1 flex-1 min-w-0 z-10 pr-6">
        {article?.tags?.[0] && (
          <span className="text-[9px] font-bold uppercase tracking-[0.18em] w-fit px-1.5 py-0.5" style={{ background: "rgba(255,255,255,0.06)", color: "var(--color-text-subtle)", borderRadius: 3 }}>
            {article.tags[0]}
          </span>
        )}
        <p className="text-base font-semibold truncate transition-colors duration-200 group-hover:text-white" style={{ color: "var(--color-text-main)" }}>
          {article?.title ?? "No pinned article"}
        </p>
        {article?.description && (
          <p className="text-xs truncate" style={{ color: "var(--color-text-subtle)" }}>{article.description}</p>
        )}
      </div>
    </div>
  );

  return article ? (
    <Link href={`/${article.id}`} className="block hover:bg-white/[0.03] transition-colors duration-150" style={{ height: 100, flexShrink: 0 }}>
      {inner}
    </Link>
  ) : (
    <div style={{ height: 100, flexShrink: 0 }}>{inner}</div>
  );
};

/* ══════════════════════════════ Favorites Banner ══ */
const INTERVAL = 5000;
const SLIDE_MS = 340;

const FavoritesBanner: React.FC<{ articles: ArticleItemType[] }> = ({ articles }) => {
  const count = articles.length;
  const [index, setIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [sliding, setSliding] = useState(false);
  const [dir, setDir] = useState<1 | -1>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = useCallback((direction: 1 | -1) => {
    if (count <= 1 || sliding) return;
    const next = (index + direction + count) % count;
    setDir(direction);
    setPrevIndex(index);
    setIndex(next);
    setSliding(true);
    setTimeout(() => {
      setPrevIndex(null);
      setSliding(false);
    }, SLIDE_MS);
  }, [count, sliding, index]);

  useEffect(() => {
    if (count <= 1) return;
    timerRef.current = setInterval(() => go(1), INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [count, go]);

  const navigate = (direction: 1 | -1) => {
    if (timerRef.current) clearInterval(timerRef.current);
    go(direction);
    timerRef.current = setInterval(() => go(1), INTERVAL);
  };

  if (count === 0) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xs" style={{ color: "var(--color-text-subtle)" }}>No favorites yet</p>
      </div>
    );
  }

  const article = articles[index];
  const prevArticle = prevIndex !== null ? articles[prevIndex] : null;

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      {/* Card area */}
      <div className="flex-1 relative overflow-hidden">

        {/* Outgoing card — slides out */}
        {prevArticle && sliding && (
          <BannerCard
            article={prevArticle}
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 1,
              transform: `translateX(${dir === 1 ? "-100%" : "100%"})`,
              transition: `transform ${SLIDE_MS}ms cubic-bezier(.4,0,.2,1)`,
            }}
          />
        )}

        {/* Incoming card — slides in from the side */}
        <BannerCard
          article={article}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            transform: sliding ? "translateX(0)" : "translateX(0)",
            // starts off-screen, animates to 0 when sliding begins
            animation: sliding
              ? `slideIn${dir === 1 ? "Right" : "Left"} ${SLIDE_MS}ms cubic-bezier(.4,0,.2,1) forwards`
              : "none",
          }}
        />

        <style>{`
          @keyframes slideInRight {
            from { transform: translateX(100%); }
            to   { transform: translateX(0); }
          }
          @keyframes slideInLeft {
            from { transform: translateX(-100%); }
            to   { transform: translateX(0); }
          }
        `}</style>
      </div>

      {/* ── Nav bar ── */}
      <div
        className="flex items-center justify-between px-4"
        style={{
          height: 38,
          flexShrink: 0,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(0,0,0,0.15)",
        }}
      >
        {/* Dot indicators */}
        <div className="flex items-center gap-1.5">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => navigate(i > index ? 1 : -1)}
              style={{
                width: i === index ? 16 : 5,
                height: 5,
                borderRadius: 3,
                background: i === index ? (articles[index].color ?? "rgba(255,255,255,0.7)") : "rgba(255,255,255,0.2)",
                transition: "width 300ms ease, background 300ms ease",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-7 h-7 hover:bg-white/10 active:scale-95 transition-all"
            style={{ borderRadius: 5, color: "var(--color-text-subtle)" }}
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => navigate(1)}
            className="flex items-center justify-center w-7 h-7 hover:bg-white/10 active:scale-95 transition-all"
            style={{ borderRadius: 5, color: "var(--color-text-subtle)" }}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════ Banner Card ══ */
const BannerCard: React.FC<{ article: ArticleItemType; style?: React.CSSProperties }> = ({ article, style }) => (
  <Link href={`/${article.id}`} className="group block" style={style}>
    {article.image && (
      <Image src={article.image} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
    )}
    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)" }} />
    {article.color && (
      <div className="absolute top-0 left-0 right-0" style={{ height: 3, background: article.color, opacity: 0.8 }} />
    )}
    <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 flex flex-col gap-1">
      {article.tags?.[0] && (
        <span className="text-[8px] font-bold uppercase tracking-[0.16em] w-fit px-1.5 py-0.5"
          style={{
            background: article.color ? `${article.color}30` : "rgba(255,255,255,0.1)",
            color: article.color ?? "rgba(255,255,255,0.55)",
            borderRadius: 2,
            border: `1px solid ${article.color ? `${article.color}50` : "rgba(255,255,255,0.14)"}`,
          }}
        >
          {article.tags[0]}
        </span>
      )}
      <p className="text-sm font-semibold leading-snug text-white/90 group-hover:text-white transition-colors duration-150 line-clamp-1">
        {article.title}
      </p>
      {article.description && (
        <p className="text-[10px] line-clamp-1" style={{ color: "rgba(255,255,255,0.45)" }}>{article.description}</p>
      )}
    </div>
  </Link>
);

export default HighlightsSection;
