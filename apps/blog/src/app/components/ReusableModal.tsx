"use client";

import React from "react";
import { createPortal } from "react-dom";

type ReusableModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  CloseIcon?: React.ElementType;
  color?: string;
  title?: string;
};

const ReusableModal = ({
  isOpen,
  onClose,
  children,
  CloseIcon,
  color,
  title,
}: ReusableModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40"
      style={{ touchAction: "manipulation" }}
      onClick={onClose}
    >
      <div
        className="bg-[var(--color-mini-card)] rounded-lg shadow-md w-[95vw] md:w-[600px] md:max-w-[600px] max-h-[85dvh] overflow-auto overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="flex items-center justify-between px-4 py-3 rounded-t-lg"
          style={{ backgroundColor: color ?? "var(--color-card)" }}
        >
          <p className="ml-[5px] text-xl font-bold text-[var(--color-text-main)]">
            {title}
          </p>
          <button onClick={onClose} className="p-2 cursor-pointer">
            {CloseIcon ? (
              <CloseIcon className="w-6 h-6 text-[var(--color-text-main)]" />
            ) : (
              "✕"
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default ReusableModal;