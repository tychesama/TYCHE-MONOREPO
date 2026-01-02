import Link from "next/link";
import type { ArticleItem } from "../types";
import Image from "next/image";

interface ArticleItemProps {
  article: ArticleItem;
}

const ArticleItem = ({ article }: ArticleItemProps) => {
  return (
    <Link
      href={`/${article.id}`}
      className={`max-w-[935px] min-h-[115px] bg-gradient-to-b 
              from-[var(--color-mini-card)] 
              to-[color-mix(in_srgb,var(--color-mini-card)_65%,black)]
              p-5 rounded-md flex items-start gap-4 shadow-md
              text-[var(--color-text-subtle)] 
              transition duration-150 transform 
              hover:scale-[1.01] hover:shadow-lg no-scrollbar`}
    >
      <Image
        src={article.image || "/images/default.png"}
        alt={article.title}
        width={75}
        height={75}
        className="max-w-[75px] max-h-[75px] rounded-md object-cover"
      />
      <div className="flex flex-col justify-center gap-1 min-w-[90%]">
        <p className="text-2xl transition-colors duration-150 text-[var(--color-text-main)] font-bold">
          {article.title}
        </p>
        <p className="text-lg text-[var(--color-text-subtle)]">
          {article.description}
        </p>
      </div>
    </Link>
  );
};

export default ArticleItem;
