'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // If we are in the admin section, disable the custom cursor 
    // to allow native inputs to function cleanly.
    if (pathname?.startsWith('/admin')) {
      document.body.style.cursor = 'auto';
      return;
    } else {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;
    let isHovering = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateCursor = () => {
      // Direct positioning for the main dot
      cursorX += (mouseX - cursorX) * 0.5;
      cursorY += (mouseY - cursorY) * 0.5;
      
      // Lerped positioning for the follower ring
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;

      cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
      
      if (isHovering) {
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1.5)`;
        follower.style.backgroundColor = 'rgba(197, 168, 128, 0.1)';
      } else {
        follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) scale(1)`;
        follower.style.backgroundColor = 'transparent';
      }

      rafId = requestAnimationFrame(updateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || 
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') || 
          target.closest('button')) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    rafId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(rafId);
      document.body.style.cursor = 'auto';
    };
  }, [pathname]);

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <div 
        ref={cursorRef} 
        className="custom-cursor" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: 'var(--accent-gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          marginLeft: '-4px',
          marginTop: '-4px'
        }}
      />
      <div 
        ref={followerRef} 
        className="custom-cursor-follower" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          border: '1px solid var(--accent-gold)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'background-color 0.3s',
          marginLeft: '-20px',
          marginTop: '-20px'
        }}
      />
    </>
  );
}
