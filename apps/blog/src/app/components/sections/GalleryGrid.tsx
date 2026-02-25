"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "../../../../lib/gallery";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false);
  const [activeList, setActiveList] = useState<string[]>([]);
  const [activeName, setActiveName] = useState<string>("");
  const [index, setIndex] = useState(0);

  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById("modal-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }
    setModalRoot(root);
  }, []);

  const currentSrc = useMemo(() => activeList[index] ?? "", [activeList, index]);

  const openItem = (item: GalleryItem) => {
    const list = item.kind === "folder" ? item.allSrcs : [item.src];
    setActiveList(list);
    setActiveName(item.name);
    setIndex(0);
    setOpen(true);
    document.documentElement.style.overflow = "hidden";
  };

  const close = () => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  };

  return (
    <>
      {/* grid (image-only) */}
      <div className="grid grid-cols-5 gap-3">
        {items.map((item) => (
          <button
            key={`${item.kind}:${item.name}`}
            onClick={() => openItem(item)}
            className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition"
          >
            <div className="relative w-full aspect-square">
              {item.kind === "file" ? (
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-200 group-hover:scale-105"
                />
              ) : (
                <FolderStack coverSrcs={item.coverSrcs} name={item.name} />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* portal fullscreen preview */}
      {modalRoot &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]"
            onClick={close}
          >
            <div className="relative w-[90vw] h-[85vh]">
              {currentSrc && (
                <Image
                  src={currentSrc}
                  alt="preview"
                  fill
                  className="object-contain rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>,
          modalRoot
        )}
    </>
  );
}

function FolderStack({ coverSrcs, name }: { coverSrcs: string[]; name: string }) {
  const a = coverSrcs[0];
  const b = coverSrcs[1];
  const c = coverSrcs[2];

  return (
    <div className="absolute inset-0">
      {c && (
        <div className="absolute inset-3 translate-x-2 translate-y-2 rounded-xl overflow-hidden opacity-80 border border-white/10">
          <Image src={c} alt={`${name}-3`} fill className="object-cover" />
        </div>
      )}
      {b && (
        <div className="absolute inset-3 translate-x-1 translate-y-1 rounded-xl overflow-hidden opacity-90 border border-white/10">
          <Image src={b} alt={`${name}-2`} fill className="object-cover" />
        </div>
      )}
      {a && (
        <div className="absolute inset-3 rounded-xl overflow-hidden border border-white/10">
          <Image src={a} alt={`${name}-1`} fill className="object-cover" />
        </div>
      )}
    </div>
  );
}