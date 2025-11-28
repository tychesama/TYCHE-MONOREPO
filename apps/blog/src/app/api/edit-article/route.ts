import { NextResponse } from "next/server";
import { promises as fsp } from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const { slug, content } = await req.json();

    if (!slug || content === undefined) {
      return NextResponse.json(
        { error: "Missing slug or content" },
        { status: 400 }
      );
    }

    const articlesDir = path.join(process.cwd(), "articles");
    const filePath = path.join(articlesDir, `${slug}.md`);

    const originalContent = await fsp.readFile(filePath, "utf8");
    
    const frontMatterMatch = originalContent.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    
    if (!frontMatterMatch) {
      console.error("Could not parse front-matter from:", originalContent.slice(0, 100));
      return NextResponse.json(
        { error: "Could not parse front-matter" },
        { status: 400 }
      );
    }

    const frontMatter = frontMatterMatch[0];
    const newFileContent = frontMatter + content.trim() + "\n";
    
    await fsp.writeFile(filePath, newFileContent, "utf8");

    return NextResponse.json({ ok: true, message: "Article saved" });
  } catch (err) {
    console.error("Save error:", err);
    return NextResponse.json(
      { error: String(err) },
      { status: 500 }
    );
  }
}