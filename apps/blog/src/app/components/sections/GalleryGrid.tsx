"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import type { GalleryItem } from "../../../../lib/gallery";

function getColumnCount(width: number): number {
  if (width < 480) return 2;
  if (width < 768) return 3;
  if (width < 1024) return 4;
  return 6;
}

function subscribeToResize(onStoreChange: () => void) {
  window.addEventListener("resize", onStoreChange);

  return () => {
    window.removeEventListener("resize", onStoreChange);
  };
}

function getColumnSnapshot(): number {
  return getColumnCount(window.innerWidth);
}

function getServerColumnSnapshot(): number {
  return 6;
}

export default function GalleryGrid({
  items,
}: {
  items: GalleryItem[];
}) {
  const [open, setOpen] = useState(false);
  const [activeList, setActiveList] = useState<string[]>([]);
  const [activeName, setActiveName] = useState("");
  const [index, setIndex] = useState(0);

  const cols = useSyncExternalStore(
    subscribeToResize,
    getColumnSnapshot,
    getServerColumnSnapshot,
  );

  const currentSrc = activeList[index] ?? "";
  const canNav = activeList.length > 1;

  useEffect(() => {
    if (!open) return;

    const previousOverflow =
      document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";

    return () => {
      document.documentElement.style.overflow =
        previousOverflow;
    };
  }, [open]);

  const openItem = (item: GalleryItem) => {
    const sources =
      item.kind === "file"
        ? [item.src]
        : [...item.coverSrcs];

    if (sources.length === 0) return;

    setActiveList(sources);
    setActiveName(item.name);
    setIndex(0);
    setOpen(true);
  };

  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const prev = useCallback(() => {
    if (!canNav) return;

    setIndex(
      (current) =>
        (current - 1 + activeList.length) %
        activeList.length,
    );
  }, [canNav, activeList.length]);

  const next = useCallback(() => {
    if (!canNav) return;

    setIndex(
      (current) =>
        (current + 1) % activeList.length,
    );
  }, [canNav, activeList.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close, prev, next]);

  const portalTarget =
    typeof document === "undefined"
      ? null
      : document.body;

  return (
    <div className="max-h-[900px] overflow-y-auto pr-1 no-scrollbar">
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
            type="button"
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
                <FolderStack
                  coverSrcs={item.coverSrcs}
                  name={item.name}
                />
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

      {portalTarget &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                close();
              }
            }}
          >
            <div
              className="relative"
              style={{
                width: "min(90vw, 900px)",
                height: "min(80vh, 720px)",
              }}
            >
              <div className="absolute inset-0 rounded-2xl border border-white/10 bg-black/55 shadow-2xl" />

              <button
                type="button"
                onClick={close}
                className="absolute right-3 top-3 z-20 cursor-pointer rounded-md bg-black/60 px-3 py-2 text-sm text-white/90 hover:bg-black/70"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="absolute inset-4 z-10 overflow-hidden rounded-xl">
                {currentSrc && (
                  <Image
                    src={currentSrc}
                    alt={activeName || "Gallery preview"}
                    fill
                    className="object-contain"
                  />
                )}

                <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-4">
                  <div className="max-w-[90%] rounded-full bg-black/65 px-4 py-2">
                    <div className="truncate text-center text-sm font-medium text-white/95">
                      {canNav
                        ? activeList[index]
                            ?.split("/")
                            .pop()
                        : activeName}
                    </div>
                  </div>
                </div>
              </div>

              {canNav && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-md bg-black/60 px-3 py-2 text-base text-white/90 hover:bg-black/70"
                    aria-label="Previous"
                  >
                    ←
                  </button>

                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-md bg-black/60 px-3 py-2 text-base text-white/90 hover:bg-black/70"
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
          portalTarget,
        )}
    </div>
  );
}

function FolderStack({
  coverSrcs,
  name,
}: {
  coverSrcs: string[];
  name: string;
}) {
  const first = coverSrcs[0];
  const second = coverSrcs[1];
  const third = coverSrcs[2];

  return (
    <div className="absolute inset-0 cursor-pointer">
      {third && (
        <div className="absolute inset-3 translate-x-2 translate-y-2 overflow-hidden rounded-xl border border-white/10 opacity-80">
          <Image
            src={third}
            alt={`${name}-3`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {second && (
        <div className="absolute inset-3 translate-x-1 translate-y-1 overflow-hidden rounded-xl border border-white/10 opacity-90">
          <Image
            src={second}
            alt={`${name}-2`}
            fill
            className="object-cover"
          />
        </div>
      )}

      {first && (
        <div className="absolute inset-3 overflow-hidden rounded-xl border border-white/10">
          <Image
            src={first}
            alt={`${name}-1`}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}