"use client";

import React, { useEffect, useRef } from "react";
import "./styles.css";
import "../globals.css";

const STAR_COUNT = 180;
const SHOOTING_STAR_INTERVAL = 4000;

const Stars: React.FC = () => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const spawnStaticStars = () => {
    if (!hostRef.current) return;

    for (let i = 0; i < STAR_COUNT; i++) {
      const star = document.createElement("div");

      const size = Math.random() < 0.15
        ? Math.random() * 2 + 2      // ~15% are larger (2–4px)
        : Math.random() * 1.5 + 0.5; // rest are small (0.5–2px)

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const twinkleDuration = 2 + Math.random() * 4;
      const twinkleDelay = Math.random() * 6;
      const baseOpacity = 0.4 + Math.random() * 0.6;

      star.style.cssText = `
        position: absolute;
        left: ${x}%;
        top: ${y}%;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: white;
        opacity: ${baseOpacity};
        pointer-events: none;
        animation: starTwinkle ${twinkleDuration}s ${twinkleDelay}s ease-in-out infinite alternate;
      `;

      hostRef.current.appendChild(star);
    }
  };

  const spawnShootingStar = () => {
    if (!hostRef.current) return;

    const streak = document.createElement("div");

    const startX = Math.random() * 80;
    const startY = Math.random() * 50;
    const angle = 25 + Math.random() * 20; // degrees, gentle diagonal
    const length = 80 + Math.random() * 120;
    const duration = 600 + Math.random() * 500;

    streak.style.cssText = `
      position: absolute;
      left: ${startX}%;
      top: ${startY}%;
      width: ${length}px;
      height: 1px;
      background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 100%);
      border-radius: 1px;
      pointer-events: none;
      transform: rotate(${angle}deg);
      transform-origin: left center;
      opacity: 0;
    `;

    hostRef.current.appendChild(streak);

    streak.animate(
      [
        { opacity: 0,   transform: `rotate(${angle}deg) translateX(0)` },
        { opacity: 0.9, transform: `rotate(${angle}deg) translateX(${length * 0.3}px)` },
        { opacity: 0,   transform: `rotate(${angle}deg) translateX(${length}px)` },
      ],
      { duration, easing: "ease-in", fill: "forwards" }
    ).onfinish = () => streak.remove();
  };

  useEffect(() => {
    spawnStaticStars();

    // Stagger the first shooting star so it doesn't fire immediately
    const firstTimeout = setTimeout(() => {
      spawnShootingStar();
    }, 1500 + Math.random() * 2000);

    const shootingId = setInterval(() => {
      spawnShootingStar();
    }, SHOOTING_STAR_INTERVAL + Math.random() * 2000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(shootingId);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      className="star-container"
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", overflow: "hidden" }}
    />
  );
};

export default Stars;