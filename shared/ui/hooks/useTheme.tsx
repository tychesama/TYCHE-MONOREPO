import { useEffect, useState } from "react";

const THEME_COOKIE = "theme";
const BG_COOKIE = "background";
const BG_IMAGE_COOKIE = "bgImage";

export type BackgroundType = "bubbles" | "squares" | "stars";

const DEFAULT_THEME = "professional";
const DEFAULT_BACKGROUND: BackgroundType = "bubbles";
const DEFAULT_BG_IMAGE = "bg6.png";

function normalizeBgImage(value: string | null) {
  if (!value) return DEFAULT_BG_IMAGE;
  if (value === "none" || value === "none.png") return "none";

  const legacyJpgMatch = value.match(/^bg(\d+)\.jpg$/);
  if (legacyJpgMatch) return `bg${legacyJpgMatch[1]}.png`;

  if (/^bg\d+\.png$/.test(value)) return value;

  return DEFAULT_BG_IMAGE;
}

function getCookie(name: string) {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2] || null;
}

function setCookie(name: string, value: string) {
  const isLocalhost =
    typeof window !== "undefined" &&
    window.location.hostname.includes("localhost");

  const domainPart = isLocalhost ? "" : "; domain=.joemidpan.com";

  document.cookie = `${name}=${value}; path=/; max-age=31536000${domainPart}`;
}

export function useTheme() {
  const [theme, setThemeState] = useState<string>(DEFAULT_THEME);
  const [background, setBackgroundState] = useState<BackgroundType>(DEFAULT_BACKGROUND);
  const [bgImage, setBgImageState] = useState<string>(DEFAULT_BG_IMAGE);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme-sync" && e.newValue) {
        setThemeState(e.newValue);
      }

      if (e.key === "background-sync" && e.newValue) {
        setBackgroundState(e.newValue as BackgroundType);
      }
      if (e.key === "bgImage-sync" && e.newValue) {
        setBgImageState(normalizeBgImage(e.newValue));
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);


  // Load from cookies on mount
  useEffect(() => {
    const cookieTheme = getCookie(THEME_COOKIE);
    const cookieBg = getCookie(BG_COOKIE);
    const cookieBgImage = getCookie(BG_IMAGE_COOKIE);

    setThemeState(cookieTheme || DEFAULT_THEME);

    if (
      cookieBg === "bubbles" ||
      cookieBg === "squares" ||
      cookieBg === "stars"
    ) {
      setBackgroundState(cookieBg);
    } else {
      setBackgroundState(DEFAULT_BACKGROUND);
    }

    setBgImageState(normalizeBgImage(cookieBgImage));
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

  const setBgImage = (fileName: string) => {
    const normalized = normalizeBgImage(fileName);

    setBgImageState(normalized);
    setCookie(BG_IMAGE_COOKIE, normalized);
    localStorage.setItem("bgImage-sync", normalized);
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--pattern-bg",
      bgImage === "none" ? "none" : `url('/backgrounds/${bgImage}')`
    );
  }, [bgImage]);

  return {
    theme,
    setTheme,
    background,
    setBackground,
    bgImage,
    setBgImage,
  };
}
