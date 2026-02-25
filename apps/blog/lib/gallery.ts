// lib/gallery.ts
import path from "path";
import fs from "fs/promises";
import type { Dirent } from "fs";

const IMAGE_EXTS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

export type GalleryFileItem = {
    kind: "file";
    name: string;
    src: string; // public URL (e.g. /gallery_photos/a.jpg)
};

export type GalleryFolderItem = {
    kind: "folder";
    name: string;
    coverSrcs: string[]; // up to 3 for the stack
    allSrcs: string[]; // all images in the folder
};

export type GalleryItem = GalleryFileItem | GalleryFolderItem;

function isImage(filename: string) {
    return IMAGE_EXTS.has(path.extname(filename).toLowerCase());
}

export async function getGalleryItems(): Promise<GalleryItem[]> {
    const rootDiskPath = path.join(process.cwd(), "public", "gallery_photos");
    const entries: Dirent[] = await fs.readdir(rootDiskPath, {
        withFileTypes: true,
    });

    const items: GalleryItem[] = [];

    // Files at root
    for (const e of entries) {
        if (e.isFile() && isImage(e.name)) {
            items.push({
                kind: "file",
                name: e.name,
                src: `/gallery_photos/${encodeURIComponent(e.name)}`,
            });
        }
    }

    // Folders (one level)
    for (const e of entries) {
        if (!e.isDirectory()) continue;

        const folderDiskPath = path.join(rootDiskPath, e.name);
        const folderEntries = await fs.readdir(folderDiskPath, { withFileTypes: true });

        const images = folderEntries
            .filter((x) => x.isFile() && isImage(x.name))
            .map((x) => x.name)
            .sort((a, b) => a.localeCompare(b));

        if (images.length === 0) continue;

        const allSrcs = images.map(
            (img) => `/gallery_photos/${encodeURIComponent(e.name)}/${encodeURIComponent(img)}`
        );

        items.push({
            kind: "folder",
            name: e.name,
            coverSrcs: allSrcs.slice(0, 3),
            allSrcs,
        });
    }

    // Sort: folders first, then files; alphabetical
    items.sort((a, b) => {
        if (a.kind !== b.kind) return a.kind === "folder" ? -1 : 1;
        return a.name.localeCompare(b.name);
    });

    return items;
}