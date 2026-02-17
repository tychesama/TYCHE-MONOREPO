import { getAllArticles } from "lib/articles";
import type { ArticleItem as ArticleItemType } from "types";
import Image from "next/image";
import Link from "next/link";

const HighlightsSection: React.FC = () => {
  const articles = getAllArticles();
  const allArticles: ArticleItemType[] = Object.values(articles).flat();

  // Get latest article by date
  const latestArticle = allArticles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  if (!latestArticle) return null;

  return (
    <div className="flex items-stretch">

      <div
        className="
          flex flex-col
          w-[50px]
          overflow-hidden
          rounded-l-md
          bg-gradient-to-b
          from-[var(--color-mini-card)]
          to-[color-mix(in_srgb,var(--color-mini-card)_65%,black)]
          shadow-md
          text-[var(--color-text-subtle)]
        "
      >
        <div className="flex-1 flex items-center justify-center cursor-pointer hover:bg-black/10 transition">
          1
        </div>

        <div className="flex-1 flex items-center justify-center cursor-pointer hover:bg-black/10 transition">
          2
        </div>

        <div className="flex-1 flex items-center justify-center cursor-pointer hover:bg-black/10 transition">
          3
        </div>
      </div>

      <div className="w-[530px]">
        <Link
          href={`/${latestArticle.id}`}
          className={`max-w-[935px] min-h-[115px] bg-gradient-to-b 
              from-[var(--color-mini-card)] 
              to-[color-mix(in_srgb,var(--color-mini-card)_65%,black)]
              p-5 rounded-r-md flex items-start gap-4 shadow-md
              text-[var(--color-text-subtle)] no-scrollbar`}
        >
          <Image
            src={latestArticle.image || "/images/default.png"}
            alt={latestArticle.title}
            width={75}
            height={75}
            className="max-w-[75px] max-h-[75px] rounded-md object-cover"
          />
          <div className="flex flex-col justify-center gap-1 min-w-[90%]">
            <p className="text-2xl transition-colors duration-150 text-[var(--color-text-main)] font-bold">
              {latestArticle.title}
            </p>
            <p className="text-lg text-[var(--color-text-subtle)]">
              {latestArticle.description}
            </p>
          </div>
        </Link>
      </div>


    </div>
  );
};

export default HighlightsSection;
