import fs from "fs"
import matter from "gray-matter"
import path from "path"
import moment from "moment"
import { remark } from "remark"
import html from "remark-html"

import { ArticleItem } from "../types/index"

const articlesDirectory = path.join(process.cwd(), "articles")

export const getAllArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDirectory)

    const allArticles = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "")

        const fullPath = path.join(articlesDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf-8")

        const matterResult = matter(fileContents)

        return {
            id,
            title: matterResult.data.title,
            date: (function() {
                const m = moment(matterResult.data.date, "DD-MM-YYYY", true)
                return m.isValid() ? m.toDate() : new Date(matterResult.data.date)
            })(),
            color: matterResult.data.color,
            pinned: matterResult.data.pinned,
            favorite: matterResult.data.favorite,
            tags: matterResult.data.tags,
            image: matterResult.data.image,
            description: matterResult.data.description,
        }
    })

    return allArticles.sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
    })


}

export const getArticleData = async (id: string) => {
    const fullPath = path.join(articlesDirectory, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf-8")

    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        title: matterResult.data.title,
        category: matterResult.data.category,
        date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM Do YYYY"),
    }
}