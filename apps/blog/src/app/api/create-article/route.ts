import { NextResponse } from "next/server";
import fs from "fs";
import { promises as fsp } from "fs";
import path from "path";
import moment from "moment";

export async function POST(req: Request) {
  try {
    const { slug, title, category, content } = await req.json();

    if (!slug || !title || !category || !content) {
      return NextResponse.json(
        { error: "Missing slug, title, category, or content" },
        { status: 400 }
      );
    }

    const articlesDir = path.join(process.cwd(), "articles");
    if (!fs.existsSync(articlesDir)) fs.mkdirSync(articlesDir);

    // Format date as DD-MM-YYYY to match existing articles
    const date = moment().format("DD-MM-YYYY");
    const md = `---\ntitle: "${title}"\ncategory: "${category}"\ndate: "${date}"\n---\n\n${content}\n`;

    const filePath = path.join(articlesDir, `${slug}.md`);
    await fsp.writeFile(filePath, md, "utf8");

    return NextResponse.json({ ok: true, path: `/articles/${slug}.md` });
  } catch (err) {
    console.error("Create article error:", err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}