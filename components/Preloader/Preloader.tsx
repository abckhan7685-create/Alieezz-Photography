'use client';

import { useEffect, useState } from 'react';

interface PreloaderProps {
  loadProgress: number;
}

export function Preloader({ loadProgress }: PreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const isLoaded = loadProgress >= 100;

  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setIsVisible(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${isLoaded ? 'fade-out' : ''}`}>
      <div className="preloader-content">
        <h1 className="preloader-title">ALIEEZZ</h1>
        <div className="preloader-subtitle">EST. 2018</div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${loadProgress}%` }} />
        </div>
        <div className="progress-text">{loadProgress}%</div>
        <div className="preloader-loading-msg">
          Loading Cinematic Experience...
        </div>
      </div>
    </div>
  );
}
