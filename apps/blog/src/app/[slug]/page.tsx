import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { getArticleData } from "../../../lib/articles"
import '../styles.css';
import Header from '@shared/ui/Header';
import Footer from '@shared/ui/Footer';

interface PageProps {
    params: Promise<{ slug: string }>
}

const Article = async ({ params }: PageProps) => {
    const { slug } = await params
    const articleData = await getArticleData(slug)

    return (
        <div
            className="min-h-screen flex flex-col"
            style={{ backgroundColor: "var(--page-bg)", color: "var(--color-text-main)" }}
        >
            <Header title="Tyche01 Blog" />

            <main className="max-w-7xl mx-auto px-4 py-8 gap-6 z-10">
                <section className="[background:var(--card-bg)] rounded p-4 z-10 ${className}">
                    <div className="flex justify-between">
                        <Link href="/" className="flex items-center text-[var(--color-text-subtle)] 
                  hover:text-[var(--color-text-main)] transition duration-150 mb-6">
                            <ArrowLeftIcon className="h-5 w-5 mr-2" />
                            Back to Home
                        </Link>
                        <p>{articleData.date.toString()}</p>
                    </div>
                    <article
                        className="article"
                        dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
                </section>
            </main>
            <Footer/>
        </div>
    )
}

export default Article