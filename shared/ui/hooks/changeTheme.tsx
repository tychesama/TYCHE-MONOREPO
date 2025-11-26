"use client";

import { useEffect, useState } from "react";

type Theme = "professional" | "alternate" | "interactive" | "special1" | "special2" | "special3";

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("professional");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme, mounted]);

  return { theme, setTheme };
};
