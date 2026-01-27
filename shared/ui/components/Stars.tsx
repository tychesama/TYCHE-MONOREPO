"use client";

import React, { useEffect, useRef } from "react";
import "./styles.css";
import "../globals.css";

const Stars: React.FC = () => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const createStar = (initial = false) => {
    if (!hostRef.current) return;

    const star = document.createElement("div");
    star.classList.add("star-float");

    const size = Math.random() * 6 + 2; // star size
    const lifetime = Math.random() * 10 + 10; // seconds to float up
    const rotation = Math.random() * 360;
    const speed = Math.random() * 50 + 50;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * window.innerWidth}px`;
    star.style.bottom = `${-50 - Math.random() * 50}px`; // start off-screen
    star.style.position = "absolute";
    star.style.borderRadius = "50%";
    star.style.backgroundColor = "white";
    star.style.opacity = `${0.6 + Math.random() * 0.4}`;
    star.style.pointerEvents = "none";

    hostRef.current.appendChild(star);

    const maxTravel = speed * lifetime;

    const anim = star.animate(
      [
        { transform: `translateY(0) rotate(0deg)` },
        { transform: `translateY(-${maxTravel}px) rotate(${rotation}deg)` },
      ],
      {
        duration: lifetime * 1000,
        iterations: 1,
        easing: "linear",
        fill: "forwards",
      }
    );

    // Jump forward for initial stars
    if (initial) {
      const dur = anim.effect!.getTiming().duration as number;
      anim.currentTime = Math.random() * dur;
    }

    // Fade out near end
    const fadeDuration = Math.max(1000, lifetime * 1000 * 0.5);
    setTimeout(() => {
      const currentOpacity = parseFloat(getComputedStyle(star).opacity);
      const fade = star.animate(
        [{ opacity: currentOpacity }, { opacity: 0 }],
        { duration: fadeDuration, fill: "forwards" }
      );
      fade.onfinish = () => star.remove();
    }, lifetime * 1000 - fadeDuration);
  };

  useEffect(() => {
    for (let i = 0; i < 50; i++) createStar(true); // initial stars
    const id = setInterval(() => createStar(false), 300); // continuous
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={hostRef}
      className="star-container"
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
  );
};

export default Stars;
