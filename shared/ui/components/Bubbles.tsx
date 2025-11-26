"use client";
import React, { useEffect, useRef } from "react";

type BubblesProps = {
  /** Optional: override bubble color (e.g. "rgba(255,255,255,0.3)" or "#fff") */
  color?: string;
};

const Bubbles: React.FC<BubblesProps> = ({ color }) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const resolveColor = () => {
    if (color) return color;
    // default to CSS variable --bubbles-color
    const root = document.documentElement;
    const computed = getComputedStyle(root).getPropertyValue("--bubbles-color").trim();
    return computed || "rgba(255,255,255,0.25)";
  };

  const createBubble = () => {
    if (!hostRef.current) return;

    const bubble = document.createElement("div");

    const size = Math.random() * 50 + 10;         // 10–60px
    const lifetime = Math.random() * 6 + 8;       // 8–14s
    const speed = Math.random() * 80 + 40;        // travel factor
    const rotation = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 360);
    const clr = resolveColor();

    // base style
    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.position = "absolute";
    bubble.style.left = `${Math.random() * window.innerWidth}px`;
    bubble.style.bottom = "-20px";
    bubble.style.borderRadius = "50%";
    bubble.style.background = clr;
    bubble.style.pointerEvents = "none";
    bubble.style.opacity = "0";
    bubble.style.animation = "blobMorph 3s infinite ease-in-out alternate";

    // subtle highlight ring using --bubbles-accent if available
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue("--bubbles-accent")
      .trim();
    if (accent) {
      bubble.style.boxShadow = `0 0 ${Math.max(8, size * 0.4)}px ${accent}`;
    }

    hostRef.current.appendChild(bubble);

    const pageHeight = document.body.scrollHeight;
    const maxTravel = Math.min(pageHeight, speed * lifetime);

    bubble.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 0.3 },
        { transform: `translateY(-${maxTravel}px) rotate(${rotation}deg)`, opacity: 0.3 },
      ],
      {
        duration: lifetime * 1000,
        iterations: 1,
        easing: "linear",
        fill: "forwards",
      }
    );

    setTimeout(() => {
      const fade = bubble.animate([{ opacity: 0.3 }, { opacity: 0 }], {
        duration: lifetime * 200,
        fill: "forwards",
      });
      fade.onfinish = () => bubble.remove();
    }, lifetime * 800);
  };

  useEffect(() => {
    // prime a few
    for (let i = 0; i < 10; i++) createBubble();
    const id = setInterval(createBubble, 500);
    return () => clearInterval(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Host must fill its parent (.bg-layer is fixed full-screen)
  return (
    <div
      id="background-container"
      ref={hostRef}
      className="bubble"
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
  );
};

export default Bubbles;
