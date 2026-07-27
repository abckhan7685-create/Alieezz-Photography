'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCarousel } from '@/hooks/useCarousel';

type PortfolioItem = {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
};

export function Carousel({ items, categories }: { items: PortfolioItem[], categories: string[] }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);

  const displayCategories = ['All', ...categories];
  
  const filteredItems = items.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  const { activeIndex, goToSlide, nextSlide, prevSlide } = useCarousel(filteredItems.length);

  // Reset to first slide when category changes
  useEffect(() => {
    goToSlide(0);
  }, [activeCategory, goToSlide]);

  // Auto-scroll functionality
  useEffect(() => {
    if (filteredItems.length <= 1) return;
    
    // Pause auto-scroll when an image is open in the lightbox
    if (selectedImage) return;

    const intervalId = setInterval(() => {
      nextSlide();
    }, 4000); // Scroll every 4 seconds
    
    return () => clearInterval(intervalId);
  }, [nextSlide, filteredItems.length, selectedImage]);

  return (
    <>
      <section className="portfolio-section" id="portfolio">
        <div className="section-container">
          <div className="section-header">
            <span className="section-tag">Featured Work</span>
            <h2 className="section-title">The Portfolio</h2>
            <div className="header-divider"></div>
          </div>

          <div className="filter-controls">
            {displayCategories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="carousel-viewport">
            <div className="carousel-track">
              {filteredItems.map((item, i) => {
                let pos = i - activeIndex;
                const len = filteredItems.length;
                const half = Math.floor(len / 2);
                if (pos > half) pos -= len;
                else if (pos < -half) pos += len;

                const isVisible = Math.abs(pos) <= 2;
                
                return (
                  <div
                    key={i}
                    className="carousel-card"
                    data-pos={isVisible ? pos : undefined}
                    style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
                    onClick={() => {
                      if (i !== activeIndex) {
                        goToSlide(i);
                      } else {
                        setSelectedImage(item);
                      }
                    }}
                  >
                    <div className="carousel-img-wrap">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 768px) 260px, 360px"
                        priority={i === 0}
                      />
                    </div>
                    <div className="carousel-card-info">
                      <span className="carousel-cat">{item.category}</span>
                      <h3 className="carousel-title">{item.title}</h3>
                      <p className="carousel-desc">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="carousel-nav">
              <button className="carousel-arrow" onClick={prevSlide} aria-label="Previous" disabled={filteredItems.length <= 1}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <div className="carousel-dots">
                {filteredItems.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
                    onClick={() => goToSlide(i)}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
              <button className="carousel-arrow" onClick={nextSlide} aria-label="Next" disabled={filteredItems.length <= 1}>
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="portfolio-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <div className="lightbox-content" onClick={e => e.stopPropagation()}>
            <button 
              className="lightbox-close" 
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ✕
            </button>
            <div className="lightbox-img-wrapper">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.title}
                fill
                style={{ objectFit: 'contain' }}
                sizes="100vw"
                quality={100}
                priority
              />
            </div>
            <div className="lightbox-caption">
              <h3>{selectedImage.title}</h3>
              <p>{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
