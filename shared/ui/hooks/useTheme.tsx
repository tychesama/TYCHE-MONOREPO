import { useEffect, useState } from "react";

const COOKIE_NAME = "theme";
const COOKIE_DOMAIN =
  window.location.hostname.includes("localhost")
    ? "" // dev: no shared cookie
    : ".tyche01.fun"; // prod: sync across subdomains

function getCookie(name: string) {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match?.[2] || null;
}

function setCookie(name: string, value: string) {
  const domain = COOKIE_DOMAIN ? `; domain=${COOKIE_DOMAIN}` : "";
  document.cookie = `${name}=${value}; path=/; max-age=31536000${domain}`;
}

export function useTheme() {
  const [theme, setThemeState] = useState<string>(() => {
    return getCookie(COOKIE_NAME) || "professional";
  });

  const setTheme = (newTheme: string) => {
    setThemeState(newTheme);
    setCookie(COOKIE_NAME, newTheme);

    // Sync across tabs / windows of same app
    localStorage.setItem("theme-sync", newTheme);
  };

  // Listen to storage event so changing theme in one app updates the other instantly
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === "theme-sync" && e.newValue && e.newValue !== theme) {
        setThemeState(e.newValue);
      }
    };

    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [theme]);

  // Apply theme to <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return { theme, setTheme };
}
