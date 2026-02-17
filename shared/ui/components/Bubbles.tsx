"use client";
import React, { useEffect, useRef } from "react";
import "./styles.css";
import "../globals.css";

type BubblesProps = {
  color?: string;
};

const Bubbles: React.FC<BubblesProps> = ({ color }) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const createBubble = (initial = false) => {
    if (!hostRef.current) return;

    const bubble = document.createElement("div");
    bubble.classList.add("bubble-circle");

    const size = Math.random() * 50 + 10;
    const lifetime = Math.random() * 6 + 8;
    const speed = Math.random() * 80 + 40;
    const rotation = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 360);

    bubble.style.width = `${size}px`;
    bubble.style.height = `${size}px`;
    bubble.style.position = "absolute";
    bubble.style.left = `${Math.random() * window.innerWidth}px`;

    const INITIAL_OFFSET = 100; 
    bubble.style.bottom = `${-INITIAL_OFFSET - Math.random() * 50}px`;

    bubble.style.borderRadius = "50%";
    bubble.style.pointerEvents = "none";
    bubble.style.animation = "blobMorph 3s infinite ease-in-out alternate";

    hostRef.current.appendChild(bubble);

    const pageHeight = document.body.scrollHeight;
    const maxTravel = Math.min(pageHeight, speed * lifetime);

    const anim = bubble.animate(
      [
        { transform: "translateY(0) rotate(0deg)" },
        { transform: `translateY(-${maxTravel}px) rotate(${rotation}deg)` },
      ],
      {
        duration: lifetime * 1000,
        iterations: 1,
        easing: "linear",
        fill: "forwards",
      }
    );

    // Default full duration
    let remainingTime = lifetime * 1000;

    // Jump animation forward for initial bubbles
    if (initial) {
      const raw = anim.effect!.getTiming().duration;
      const dur =
        typeof raw === "number"
          ? raw
          : raw instanceof CSSNumericValue
            ? raw.to("ms").value
            : parseFloat(raw || "0");

      const progress = Math.random();
      anim.currentTime = dur * progress;

      remainingTime = dur - anim.currentTime;
    }

    // --- Fade timing fix ---
    // Fade should scale with remaining time,
    // BUT should never be shorter than 1s
    const MIN_FADE = 1000; // 1 second
    const fadeDuration = Math.max(MIN_FADE, remainingTime * 0.7);

    // Start fade after bubble finishes rising
    setTimeout(() => {
      const computedOpacity = parseFloat(getComputedStyle(bubble).opacity);
      const fade = bubble.animate(
        [{ opacity: computedOpacity }, { opacity: 0 }],
        {
          duration: fadeDuration,
          fill: "forwards",
        }
      );
      fade.onfinish = () => bubble.remove();
    }, remainingTime - fadeDuration);

  };

  useEffect(() => {
    // generate pre-existing floating bubbles
    for (let i = 0; i < 20; i++) createBubble(true);

    // continue normal bubbles
    const id = setInterval(() => createBubble(false), 250);
    return () => clearInterval(id);
  }, []);

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
