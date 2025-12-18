import { NextResponse } from "next/server";
import { getAllArticles } from "lib/articles";

export async function GET() {
  try {
    const articles = getAllArticles();
    const latest = Array.isArray(articles) && articles.length ? articles[0] : null;

    const response = NextResponse.json(latest || null, {
      status: latest ? 200 : 204,
    });

    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (err) {
    const response = NextResponse.json({ error: "Could not read articles" }, { status: 500 });
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET,OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");
    return response;
  }
}
