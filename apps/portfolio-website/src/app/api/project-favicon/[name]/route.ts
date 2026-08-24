import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const SAFE_FILENAME = /^[A-Za-z0-9._-]+\.(?:svg|png|jpe?g|webp|ico)$/i;
const CONTENT_TYPES: Record<string, string> = {
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ name: string }> },
) {
  const { name } = await context.params;

  if (!SAFE_FILENAME.test(name) || path.basename(name) !== name) {
    return NextResponse.json({ error: "Invalid favicon name" }, { status: 400 });
  }

  try {
    const faviconDirectory = path.resolve(process.cwd(), "../../shared/ui/favicons");
    const favicon = await readFile(path.join(faviconDirectory, name));
    const contentType = CONTENT_TYPES[path.extname(name).toLowerCase()] ?? "application/octet-stream";

    return new NextResponse(favicon, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Favicon not found" }, { status: 404 });
  }
}
