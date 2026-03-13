// lib/gallery.ts
import path from "path";
import fs from "fs/promises";
import type { Dirent } from "fs";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

export type GalleryFileItem = {
  kind: "file";
  name: string;
  src: string;
  createdAt: number;
};

export type GalleryFolderItem = {
  kind: "folder";
  name: string;
  coverSrcs: string[];
  allSrcs: string[];
  createdAt: number;
};

export type GalleryItem = GalleryFileItem | GalleryFolderItem;

function isImage(filename: string) {
  return IMAGE_EXTS.has(path.extname(filename).toLowerCase());
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
  const rootDiskPath = path.join(process.cwd(), "public", "article_photos");
  const entries: Dirent[] = await fs.readdir(rootDiskPath, {
    withFileTypes: true,
  });

  const items: GalleryItem[] = [];

  // Files at root
  for (const e of entries) {
    if (e.isFile() && isImage(e.name)) {
      const filePath = path.join(rootDiskPath, e.name);
      const stat = await fs.stat(filePath);

      items.push({
        kind: "file",
        name: e.name,
        src: `/article_photos/${encodeURIComponent(e.name)}`,
        createdAt: stat.birthtimeMs,
      });
    }
  }

  // Folders (one level)
  for (const e of entries) {
    if (!e.isDirectory()) continue;

    const folderDiskPath = path.join(rootDiskPath, e.name);
    const folderStat = await fs.stat(folderDiskPath);

    const folderEntries = await fs.readdir(folderDiskPath, { withFileTypes: true });

    const images = folderEntries
      .filter((x) => x.isFile() && isImage(x.name))
      .map((x) => x.name);

    if (images.length === 0) continue;

    const allSrcs = images.map(
      (img) => `/article_photos/${encodeURIComponent(e.name)}/${encodeURIComponent(img)}`
    );

    items.push({
      kind: "folder",
      name: e.name,
      coverSrcs: allSrcs.slice(0, 3),
      allSrcs,
      createdAt: folderStat.birthtimeMs,
    });
  }

  // Sort: by date
  items.sort((a, b) => {
    return b.createdAt - a.createdAt;
  });

  return items;
}