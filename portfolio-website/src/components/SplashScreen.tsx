import React, { useEffect, useState } from 'react';

const SplashScreen: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fadeIn, setFadeIn] = useState(false);
  const [fadeToWhite, setFadeToWhite] = useState(false);
  const [fadeOutAll, setFadeOutAll] = useState(false);

  useEffect(() => {
    const fadeInTimer = setTimeout(() => setFadeIn(true), 100);
    const fadeToWhiteTimer = setTimeout(() => setFadeToWhite(true), 2000);
    const fadeOutAllTimer = setTimeout(() => {
      setFadeOutAll(true);
      setTimeout(onFinish, 1000); 
    }, 3000);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeToWhiteTimer);
      clearTimeout(fadeOutAllTimer);
    };
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-50 flex bg-black items-center justify-center transition-opacity duration-1000 ${fadeOutAll ? 'opacity-0' : 'opacity-100'
        }`}
    >
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-1000 ${fadeIn ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <div
        className={`absolute inset-0 bg-white transition-opacity duration-1000 ${fadeToWhite ? 'opacity-100' : 'opacity-0'
          }`}
      />
      <h1 className="z-10 text-4xl font-bold animate-pulse tracking-widest text-white">
        TYCHE
      </h1>
    </div>
  );
};

export default SplashScreen;
