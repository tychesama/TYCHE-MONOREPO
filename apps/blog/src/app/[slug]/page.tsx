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

  const title = "title" in articleData && articleData.title
    ? String(articleData.title)
    : null;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: "var(--page-bg)", color: "var(--color-text-main)" }}
    >
      <Header title="Tyche01 Blog" />

      <main className="flex-1 z-20">
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          padding: "clamp(1.5rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem)",
        }}>

          <Link href="/" className="back-link">
            <ArrowLeftIcon style={{ width: 13, height: 13 }} />
            Back
          </Link>

          {title && (
            <header style={{ marginBottom: "1rem" }}>
              {/* Title + date on same line */}
              <div style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "1rem",
                flexWrap: "wrap",
              }}>
                <h1 style={{
                  fontSize: "clamp(1.4rem, 3.5vw, 2.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.25,
                  letterSpacing: "-0.02em",
                  color: "var(--color-text-main)",
                  margin: 0,
                }}>
                  {title}
                </h1>

                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                  color: "var(--color-text-subtle)",
                  fontSize: "0.8rem",
                  letterSpacing: "0.04em",
                  flexShrink: 0,
                }}>
                  <CalendarIcon style={{ width: 13, height: 13, opacity: 0.7 }} />
                  <time>{formattedDate}</time>
                </div>
              </div>
            </header>
          )}

          <section style={{
            borderRadius: 16,
            padding: "clamp(1.25rem, 4vw, 2.5rem)",
            background: "var(--card-bg)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: "0 24px 60px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            <article
              className="article"
              dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
            />
          </section>

          <div style={{ marginTop: "2.5rem", display: "flex", justifyContent: "center" }}>
            <Link href="/" className="bottom-link">
              <ArrowLeftIcon style={{ width: 12, height: 12 }} />
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