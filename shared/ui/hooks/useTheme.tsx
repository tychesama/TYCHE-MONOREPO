import { useEffect, useState } from "react";

const THEME_COOKIE = "theme";
const BG_COOKIE = "background";

export type BackgroundType = "bubbles" | "squares" | "stars";

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2] || null;
}

function setCookie(name: string, value: string) {
  const domain =
    typeof window !== "undefined" &&
    !window.location.hostname.includes("localhost")
      ? ".tyche01.fun"
      : "";
  document.cookie = `${name}=${value}; path=/; max-age=31536000${domain}`;
}

export function useTheme() {
  const [theme, setThemeState] = useState<string>("professional");
  const [background, setBackgroundState] =
    useState<BackgroundType>("bubbles");

  useEffect(() => {
  const onStorage = (e: StorageEvent) => {
    if (e.key === "theme-sync" && e.newValue) {
      setThemeState(e.newValue);
    }

    if (e.key === "background-sync" && e.newValue) {
      setBackgroundState(e.newValue as BackgroundType);
    }
  };

  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}, []);


  // Load from cookies on mount
  useEffect(() => {
    const cookieTheme = getCookie(THEME_COOKIE);
    const cookieBg = getCookie(BG_COOKIE);

    setThemeState(cookieTheme || "professional");

    if (
      cookieBg === "bubbles" ||
      cookieBg === "squares" ||
      cookieBg === "stars"
    ) {
      setBackgroundState(cookieBg);
    }
  }, []);

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    setCookie(THEME_COOKIE, newTheme);
    localStorage.setItem("theme-sync", newTheme);
  };

  const setBackground = (bg: BackgroundType) => {
    setBackgroundState(bg);
    setCookie(BG_COOKIE, bg);
    localStorage.setItem("background-sync", bg);
  };

  // Apply theme to <html>
  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return {
    theme,
    setTheme,
    background,
    setBackground,
  };
}
