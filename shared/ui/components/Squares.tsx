"use client";

import React, { useEffect, useRef } from "react";
import "./styles.css";
import "../globals.css";

type SquaresProps = {
  color?: string;
};

const INITIAL_SQUARE_COUNT = 40;

const Squares: React.FC<SquaresProps> = ({ color }) => {
  const hostRef = useRef<HTMLDivElement | null>(null);

  const createSquare = (initial = false) => {
    if (!hostRef.current) return;

    const hostWidth = hostRef.current.getBoundingClientRect().width;
    if (hostWidth <= 0) return;

    const square = document.createElement("div");
    square.classList.add("square-shape");

    const size = Math.random() * 40 + 10;
    const lifetime = Math.random() * 6 + 8;
    const speed = Math.random() * 80 + 40;
    const rotation = (Math.random() > 0.5 ? 1 : -1) * (Math.random() * 720);

    square.style.width = `${size}px`;
    square.style.height = `${size}px`;
    square.style.left = `${Math.random() * hostWidth}px`;
    square.style.bottom = `${-100 - Math.random() * 50}px`;

    square.style.position = "absolute";
    square.style.pointerEvents = "none";

    hostRef.current.appendChild(square);

    const pageHeight = document.body.scrollHeight;
    const maxTravel = Math.min(pageHeight, speed * lifetime);

    const anim = square.animate(
      [
        { transform: "translateY(0) rotate(0deg)" },
        { transform: `translateY(-${maxTravel}px) rotate(${rotation}deg)` },
      ],
      {
        duration: lifetime * 1000,
        easing: "linear",
        fill: "forwards",
      }
    );

    let remainingTime = lifetime * 1000;

    if (initial) {
      const dur = anim.effect!.getTiming().duration as number;
      const progress = Math.random();
      anim.currentTime = dur * progress;
      remainingTime = dur - anim.currentTime;
    }

    const fadeDuration = Math.max(1000, remainingTime * 0.7);

    setTimeout(() => {
      const fade = square.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        {
          duration: fadeDuration,
          fill: "forwards",
        }
      );
      fade.onfinish = () => square.remove();
    }, remainingTime - fadeDuration);
  };

  useEffect(() => {
    for (let i = 0; i < INITIAL_SQUARE_COUNT; i++) createSquare(true);
    const id = setInterval(() => createSquare(false), 250);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={hostRef}
      className="square-host"
      style={{ position: "relative", width: "100%", height: "100%" }}
    />
  );
};

export default Squares;
