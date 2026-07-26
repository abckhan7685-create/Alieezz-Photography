'use client';

import { useState, useEffect, useCallback } from 'react';

type Review = {
  id: string;
  clientName: string;
  content: string;
  rating: number;
};

export function Reviews({ reviews }: { reviews: Review[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextReview = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const prevReview = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  // Auto-scroll every 6 seconds
  useEffect(() => {
    if (reviews.length <= 1) return;
    const interval = setInterval(nextReview, 6000);
    return () => clearInterval(interval);
  }, [nextReview, reviews.length]);

  if (reviews.length === 0) return null;

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">Client Stories</h2>
          <div className="header-divider"></div>
        </div>

        <div className="reviews-modern-wrapper">
          <div className="reviews-bg-quote">"</div>
          
          <div className="reviews-content-area">
            {reviews.map((review, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={review.id} 
                  className={`review-modern-slide ${isActive ? 'active' : ''}`}
                >
                  <div className="review-modern-stars">
                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                  </div>
                  <h3 className="review-modern-text">
                    "{review.content}"
                  </h3>
                  <div className="review-modern-author">
                    <span className="author-line"></span>
                    <h4 className="author-name">{review.clientName}</h4>
                    <span className="author-label">Verified Client</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation Controls */}
          {reviews.length > 1 && (
            <div className="reviews-modern-controls">
              <button className="modern-nav-btn" onClick={prevReview} aria-label="Previous">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              
              <div className="modern-progress-container">
                {reviews.map((_, i) => (
                  <div 
                    key={i} 
                    className="modern-progress-segment"
                    onClick={() => setActiveIndex(i)}
                  >
                    <div 
                      className="modern-progress-fill" 
                      style={{ 
                        width: i === activeIndex ? '100%' : (i < activeIndex ? '100%' : '0%'),
                        transition: i === activeIndex ? 'width 6s linear' : 'none'
                      }}
                    ></div>
                  </div>
                ))}
              </div>

              <button className="modern-nav-btn" onClick={nextReview} aria-label="Next">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="1.5" fill="none">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
