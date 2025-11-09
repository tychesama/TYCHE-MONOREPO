import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://zenquotes.io/api/today");
    const data = await res.json();
    return NextResponse.json({ quote: data[0]?.q || "Have a nice day!" });
  } catch {
    return NextResponse.json({ quote: "Have a nice day!" });
  }
}
