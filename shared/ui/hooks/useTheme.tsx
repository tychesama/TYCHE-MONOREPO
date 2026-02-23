import { useEffect, useState } from "react";

const THEME_COOKIE = "theme";
const BG_COOKIE = "background";
const BG_IMAGE_COOKIE = "bgImage";

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
  const [background, setBackgroundState] = useState<BackgroundType>("bubbles");
  const [bgImage, setBgImageState] = useState<string>("bg1.jpg");

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === "theme-sync" && e.newValue) {
        setThemeState(e.newValue);
      }

      if (e.key === "background-sync" && e.newValue) {
        setBackgroundState(e.newValue as BackgroundType);
      }
      if (e.key === "bgImage-sync" && e.newValue) {
        setBgImageState(e.newValue); 
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

    setThemeState(cookieTheme || "professional");

    if (
      cookieBg === "bubbles" ||
      cookieBg === "squares" ||
      cookieBg === "stars"
    ) {
      setBackgroundState(cookieBg);
    }

    if (cookieBgImage) {
      setBgImageState(cookieBgImage);
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

  const setBgImage = (fileName: string) => {
    setBgImageState(fileName);
    setCookie(BG_IMAGE_COOKIE, fileName);
    localStorage.setItem("bgImage-sync", fileName);
  };

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--pattern-bg",
      `url('/backgrounds/${bgImage}')`
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
