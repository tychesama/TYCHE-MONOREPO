import Link from "next/link";
import { ArrowLeftIcon, CalendarIcon } from "@heroicons/react/24/solid";
import { getArticleData } from "../../../lib/articles";
import "../styles.css";
import Header from "@shared/ui/Header";
import Footer from "@shared/ui/Footer";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const Article = async ({ params }: PageProps) => {
  const { slug } = await params;
  const articleData = await getArticleData(slug);

  const formattedDate =
    typeof articleData.date === "string"
      ? articleData.date
      : new Date(articleData.date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundColor: "var(--page-bg)",
        color: "var(--color-text-main)",
      }}
    >
      <Header title="Tyche01 Blog" />

      <main className="flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Top row */}
          <div className="flex items-center justify-between gap-4 mb-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium
                         text-[var(--color-text-subtle)]
                         hover:text-[var(--color-text-main)]
                         transition"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </Link>

            <div className="inline-flex items-center gap-2 text-sm text-[var(--color-text-subtle)]">
              <CalendarIcon className="h-4 w-4 opacity-80" />
              <time>
                Time
              </time>
            </div>
          </div>

          {/* Article card */}
          <section
            className="rounded-2xl p-6 sm:p-8"
            style={{
              background: "var(--card-bg)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 18px 45px rgba(0,0,0,0.18)",
            }}
          >
            {/* Optional title if your articleData has it */}
            {"title" in articleData && articleData.title ? (
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 text-[var(--color-primary)]">
                {String(articleData.title)}
              </h1>
            ) : null}

            {/* Divider */}
            <div
              className="my-6"
              style={{ height: 1, background: "rgba(255,255,255,0.08)" }}
            />

            {/* Content */}
            <article
              className="article prose prose-neutral max-w-none"
              style={{
                color: "var(--color-text-main)",
              }}
              dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
            />
          </section>

          {/* Bottom navigation */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm
                         bg-black/10 hover:bg-black/15 transition
                         text-[var(--color-text-main)]"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Article;