"use client";

import Image from "next/image";
import { useEffect, useMemo, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "../../../../lib/gallery";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState(false);
  const [activeList, setActiveList] = useState<string[]>([]);
  const [activeName, setActiveName] = useState<string>("");
  const [index, setIndex] = useState(0);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const [cols, setCols] = useState(6);

  useEffect(() => {
    let root = document.getElementById("modal-root");
    if (!root) {
      root = document.createElement("div");
      root.id = "modal-root";
      document.body.appendChild(root);
    }
    setModalRoot(root);
  }, []);

  // ✅ JS-based responsive columns since Tailwind breakpoints aren't reliable
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 480) setCols(2);
      else if (w < 768) setCols(3);
      else if (w < 1024) setCols(4);
      else setCols(6);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
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

  const close = useCallback(() => {
    setOpen(false);
    document.documentElement.style.overflow = "";
  }, []);

  const canNav = activeList.length > 1;

  const prev = useCallback(() => {
    if (!canNav) return;
    setIndex((i) => (i - 1 + activeList.length) % activeList.length);
  }, [canNav, activeList.length]);

  const next = useCallback(() => {
    if (!canNav) return;
    setIndex((i) => (i + 1) % activeList.length);
  }, [canNav, activeList.length]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, close, prev, next]);

  return (
    <>
      <div className="max-h-[900px] overflow-y-auto pr-1 no-scrollbar">
        {/* ✅ JS-driven column count */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            gap: "0.75rem",
          }}
        >
          {items.map((item) => (
            <button
              key={`${item.kind}:${item.name}`}
              onClick={() => openItem(item)}
              className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition text-left"
            >
              <div className="relative w-full aspect-square">
                {item.kind === "file" ? (
                  <Image
                    src={item.src}
                    alt={item.name}
                    fill
                    className="object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105"
                  />
                ) : (
                  <FolderStack coverSrcs={item.coverSrcs} name={item.name} />
                )}
                <div className="absolute inset-x-0 bottom-0 p-2">
                  <div className="rounded-md bg-black/55 px-2 py-1">
                    <div className="text-[11px] leading-tight text-white/90 truncate">
                      {item.name}
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Modal */}
        {modalRoot && open && createPortal(
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4"
            onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}
          >
            {/* ✅ Responsive modal size */}
            <div
              className="relative"
              style={{
                width: "min(90vw, 900px)",
                height: "min(80vh, 720px)",
              }}
            >
              <div className="absolute inset-0 rounded-2xl bg-black/55 border border-white/10 shadow-2xl" />

              <button
                onClick={close}
                className="absolute cursor-pointer top-3 right-3 z-20 rounded-md bg-black/60 px-3 py-2 text-sm text-white/90 hover:bg-black/70"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="absolute inset-4 z-10 rounded-xl overflow-hidden">
                {currentSrc && (
                  <Image src={currentSrc} alt="preview" fill className="object-contain" />
                )}
                <div className="absolute inset-x-0 bottom-3 flex justify-center px-4 pointer-events-none">
                  <div className="max-w-[90%] rounded-full bg-black/65 px-4 py-2">
                    <div className="text-sm font-medium text-white/95 truncate text-center">
                      {canNav ? activeList[index]?.split("/").pop() : activeName}
                    </div>
                  </div>
                </div>
              </div>

              {canNav && (
                <>
                  <button
                    onClick={prev}
                    className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-md bg-black/60 px-3 py-2 text-base text-white/90 hover:bg-black/70"
                    aria-label="Previous"
                  >
                    ←
                  </button>
                  <button
                    onClick={next}
                    className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-md bg-black/60 px-3 py-2 text-base text-white/90 hover:bg-black/70"
                    aria-label="Next"
                  >
                    →
                  </button>
                  <div className="absolute bottom-3 left-3 z-20 rounded-md bg-black/60 px-3 py-2 text-sm text-white/90">
                    {index + 1}/{activeList.length}
                  </div>
                </>
              )}
            </div>
          </div>,
          modalRoot
        )}
      </div>
    </>
  );
}

function FolderStack({ coverSrcs, name }: { coverSrcs: string[]; name: string }) {
  const a = coverSrcs[0];
  const b = coverSrcs[1];
  const c = coverSrcs[2];

  return (
    <div className="absolute cursor-pointer inset-0">
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