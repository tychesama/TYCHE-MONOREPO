import Link from "next/link"
import { ArrowLeftIcon } from "@heroicons/react/24/solid"
import { getArticleData } from "../../../lib/articles"

interface PageProps {
    params: Promise<{ slug: string }>
}

const Article = async ({ params }: PageProps) => {
    const { slug } = await params
    const articleData = await getArticleData(slug)

    return (
        <section className="mx-auto w-10/12 md:2-1/2 mt-20 flex flex-col gap-5">
            <div className="flex justify-between font-poppins">
                <Link href="/" className="flex items-center text-neutral-900 hover:text-amber-700 transition duration-150 mb-6">
                    <ArrowLeftIcon className="h-5 w-5 mr-2" />
                    Back to Home
                </Link>
                <p>{articleData.date.toString()}</p>
            </div>
            <article 
            className="article"
            dangerouslySetInnerHTML={{ __html: articleData.contentHtml }} />
        </section>
    )
}

export default Article