'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header className={`main-header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
            <Image 
              src="/logo.png" 
              alt="Alieezz Photography Logo" 
              width={160} 
              height={160}
              style={{ objectFit: 'contain', maxHeight: '45px', width: 'auto', mixBlendMode: 'lighten' }}
              priority
            />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <h1 className="logo-main">ALIEEZZ</h1>
              <span className="logo-sub">PHOTOGRAPHY & FILMS</span>
            </div>
          </div>
          
          <div className="header-right">
            <nav className="nav-links">
              <Link href="#portfolio" className="nav-link">Portfolio</Link>
              <Link href="#about" className="nav-link">Philosophy</Link>
            </nav>
            
            <Link href="#contact" className="header-book-btn">Book Now</Link>

            <div 
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-nav-links">
          <Link href="#portfolio" className="mobile-link" onClick={closeMenu}>Portfolio</Link>
          <Link href="#about" className="mobile-link" onClick={closeMenu}>Philosophy</Link>
          <Link href="#contact" className="mobile-link" onClick={closeMenu}>Bookings</Link>
        </div>
      </nav>
    </>
  );
}
