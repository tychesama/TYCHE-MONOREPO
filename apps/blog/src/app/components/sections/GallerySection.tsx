// components/sections/GallerySection.tsx
import { getGalleryItems } from "../../../../lib/gallery";
import GalleryGrid from "./GalleryGrid";

const GallerySection = async () => {
  const items = await getGalleryItems();
  if (!items.length) {
    return (
      <div className="text-sm text-[var(--color-text-subtle)]">
        No photos yet. Add images to <code className="px-1 py-0.5 rounded bg-black/20">public/gallery_photos</code>.
      </div>
    );
  }

  return <GalleryGrid items={items} />;
};

export default GallerySection;