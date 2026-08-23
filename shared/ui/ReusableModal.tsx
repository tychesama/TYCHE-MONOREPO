"use client";

import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";

type ReusableModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  CloseIcon?: React.ElementType;
  color?: string;
  title?: string;
  scrollable?: boolean;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

const ReusableModal = ({
  isOpen,
  onClose,
  children,
  CloseIcon,
  color,
  title,
  scrollable = true,
}: ReusableModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const onCloseRef = useRef(onClose);
  const titleId = useId();

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCloseRef.current();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );

      if (focusableElements.length === 0) {
        event.preventDefault();
        dialogRef.current.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 p-3 backdrop-blur-[2px] sm:p-6"
      style={{ touchAction: "manipulation" }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={title ? undefined : "Dialog"}
        tabIndex={-1}
        className={`w-[95vw] max-w-[93vw] max-h-[85dvh] scrollbar-hide overscroll-contain rounded-md border border-white/10 border-t-[3px] bg-[var(--color-mini-card)] shadow-[0_18px_50px_rgba(0,0,0,0.45)] focus:outline-none sm:min-w-[600px] sm:w-fit ${scrollable ? "overflow-auto" : "overflow-hidden"}`}
        style={{ borderTopColor: color ?? "var(--color-text-subtle)" }}
      >
        <div
          className="sticky top-0 z-20 flex items-center justify-between border-b border-white/10 bg-[var(--color-card)] px-4 py-3"
        >
          {title ? (
            <h2
              id={titleId}
              className="min-w-0 truncate text-base font-semibold tracking-wide text-[var(--color-text-main)] sm:text-lg"
            >
              {title}
            </h2>
          ) : (
            <span />
          )}
          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="ml-4 grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-sm border border-white/10 text-[var(--color-text-subtle)] transition-colors hover:border-white/20 hover:bg-white/5 hover:text-[var(--color-text-main)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            {CloseIcon ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              "✕"
            )}
          </button>
        </div>

        <div className="p-4 sm:p-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default ReusableModal;
