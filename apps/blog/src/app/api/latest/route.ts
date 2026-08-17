import { NextResponse } from "next/server";
import { getAllArticles } from "lib/articles";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  });
}

export async function GET() {
  try {
    const articles = getAllArticles();
    const latest = articles[0] ?? null;

    return NextResponse.json(latest, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    console.error("Failed to load latest article:", error);
    return NextResponse.json(
      { error: "Could not read articles" },
      { status: 500, headers: corsHeaders },
    );
  }
}
