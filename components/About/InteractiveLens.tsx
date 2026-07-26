'use client';

import { useEffect, useRef, useState } from 'react';

export function InteractiveLens() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // State for the 3D rotation and translations
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [pupilPosition, setPupilPosition] = useState({ x: 0, y: 0 });
  const [reflectionPos, setReflectionPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Mouse position relative to the center of the lens
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;

      // Max degrees for the outer ring tilt
      const maxRotation = 25; 
      
      // Calculate rotation based on screen size (normalizing)
      const rotateY = (mouseX / window.innerWidth) * maxRotation * 2;
      const rotateX = -(mouseY / window.innerHeight) * maxRotation * 2;

      // Inner pupil moves slightly towards the cursor
      // Cap the pupil movement so it stays inside the lens
      const maxPupilMove = 15;
      const distance = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
      const angle = Math.atan2(mouseY, mouseX);
      
      const limitedDist = Math.min(distance * 0.05, maxPupilMove);
      const pupilX = Math.cos(angle) * limitedDist;
      const pupilY = Math.sin(angle) * limitedDist;

      // Reflection moves opposite to the cursor to simulate curved glass
      const reflectX = -pupilX * 1.5;
      const reflectY = -pupilY * 1.5;

      setRotation({ x: rotateX, y: rotateY });
      setPupilPosition({ x: pupilX, y: pupilY });
      setReflectionPos({ x: reflectX, y: reflectY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="interactive-camera-wrapper" 
      ref={containerRef}
      style={{
        perspective: '1200px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
    >
      <div 
        className="camera-body-wrapper"
        style={{
          transform: `rotateX(${rotation.x * 0.4}deg) rotateY(${rotation.y * 0.4}deg)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Top Plate */}
        <div className="camera-top-plate">
          <div className="camera-dial left-dial"></div>
          <div className="camera-viewfinder">
            <div className="hot-shoe"></div>
            <div className="nikon-logo">Nikon</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            <div className="camera-dial right-dial"></div>
            <div className="camera-shutter-btn"></div>
          </div>
        </div>

        {/* Leather Body Texture */}
        <div className="camera-leather">
          <div className="nikon-grip"></div>
          <div className="nikon-red-stripe"></div>
          <div className="lens-release-button"></div>
        </div>

        {/* The Lens */}
        <div className="lens-outer-body">
          {/* Outer Metallic Ring */}
          <div className="lens-ring outer-ring">
            {/* Inner Threading */}
            <div className="lens-ring threading-ring">
              {/* The Deep Glass Element */}
              <div className="lens-glass">
                {/* Shutter / Aperture Blades */}
                <div 
                  className="lens-aperture"
                  style={{
                    transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  <div className="aperture-hole"></div>
                  {/* SVG Aperture Blades */}
                  <svg viewBox="0 0 100 100" className="aperture-blades">
                    <polygon points="50,10 90,30 50,50" fill="rgba(10,10,12,0.9)" />
                    <polygon points="90,30 90,70 50,50" fill="rgba(15,15,18,0.9)" />
                    <polygon points="90,70 50,90 50,50" fill="rgba(12,12,14,0.9)" />
                    <polygon points="50,90 10,70 50,50" fill="rgba(8,8,10,0.9)" />
                    <polygon points="10,70 10,30 50,50" fill="rgba(18,18,20,0.9)" />
                    <polygon points="10,30 50,10 50,50" fill="rgba(20,20,22,0.9)" />
                  </svg>
                </div>

                {/* Realistic Glass Reflection Layers */}
                <div 
                  className="lens-reflection primary-reflection"
                  style={{
                    transform: `translate(${reflectionPos.x}px, ${reflectionPos.y}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                ></div>
                <div 
                  className="lens-reflection secondary-reflection"
                  style={{
                    transform: `translate(${reflectionPos.x * 0.5}px, ${reflectionPos.y * 0.5}px)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                ></div>
                
                {/* Center highlight dot to look like thick glass */}
                <div className="glass-highlight"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
