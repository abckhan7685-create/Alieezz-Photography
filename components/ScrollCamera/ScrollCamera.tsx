'use client';

import { useEffect, useState, useRef } from 'react';

export function ScrollCamera() {
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const update = () => {
      const aboutEl = document.getElementById('about');
      const founderEl = document.getElementById('founder');

      if (!aboutEl || !founderEl) return;

      const viewH = window.innerHeight;
      const viewW = window.innerWidth;

      // The animation zone
      const scrollTop = window.scrollY;
      const animStart = aboutEl.offsetTop - viewH * 0.2;
      const animEnd = founderEl.offsetTop + viewH * 0.3;
      const animLength = animEnd - animStart;

      // Raw progress 0 → 1
      let progress = (scrollTop - animStart) / animLength;
      progress = Math.max(0, Math.min(1, progress));

      // Get target dock elements
      const aboutDock = document.getElementById('about-camera-dock');
      const cameraDock = document.getElementById('camera-dock');
      
      if (!aboutDock || !cameraDock) return;

      const startRect = aboutDock.getBoundingClientRect();
      const endRect = cameraDock.getBoundingClientRect();

      // Calculate dynamic dimensions based on docks
      const startW = startRect.width;
      const startH = startRect.height;
      const endW = endRect.width;
      const endH = endRect.height;

      // Start position (docked in About section)
      const startX = startRect.left;
      const startY = startRect.top;

      // End position (docked in Founder section)
      const endX = endRect.left + (endW / 2) - (startW / 2);
      const endY = endRect.top + (endH / 2) - (startH / 2);

      // Use an eased progress for smoother motion
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      // Calculate current position and size
      const currentX = startX + (endX - startX) * eased;
      const currentY = startY + (endY - startY) * eased;
      const currentW = startW + (endW - startW) * eased;
      const currentH = startH + (endH - startH) * eased;

      // Subtle rotation during travel, ends straight
      const maxRotate = -15;
      const currentRotate = Math.sin(progress * Math.PI) * maxRotate;

      // Only show the camera if it is actually within the viewport bounds
      const isWithinViewport = currentY > -600 && currentY < viewH;
      setIsVisible(isWithinViewport);
      
      setStyle({
        transform: `translate(${currentX}px, ${currentY}px) rotate(${currentRotate}deg)`,
        opacity: isWithinViewport ? 1 : 0,
        width: `${currentW}px`,
        height: `${currentH}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      });
    };

    const handleScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    // Run once on mount
    update();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      className={`scroll-camera ${isVisible ? 'visible' : ''}`}
      style={style}
    >
      <img
        src="/camera.png"
        alt="Nikon Z fc Camera"
        draggable={false}
      />
      {/* Subtle shadow beneath the camera */}
      <div className="camera-shadow"></div>
    </div>
  );
}
