'use client';

import { useState, useEffect, useRef } from 'react';

type Film = {
  id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  videoUrl: string;
  order: number;
};

type CinematicReelProps = {
  films: Film[];
};

export function CinematicReel({ films }: CinematicReelProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeVideo]);

  // Auto-cycle featured film
  useEffect(() => {
    if (films.length <= 1 || isHovered) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % films.length);
    }, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [films.length, isHovered]);

  if (films.length === 0) {
    return (
      <section className="films-section">
        <div className="films-empty">
          <p>No films added yet.</p>
        </div>
      </section>
    );
  }

  const featured = films[activeIndex];

  return (
    <>
      <section
        className="films-section"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Section Header */}
        <div className="films-header">
          <div className="films-header-left">
            <span className="films-eyebrow">— Visual Stories</span>
            <h2 className="films-heading">Our Films</h2>
          </div>
          <p className="films-heading-sub">Immersive cinematic storytelling.</p>
        </div>

        {/* Main Layout */}
        <div className="films-layout">

          {/* Left — Featured Preview */}
          <div
            className="films-featured"
            onClick={() => setActiveVideo(featured.videoUrl)}
          >
            {/* Thumbnail */}
            <div
              className="films-featured-thumb"
              style={{ backgroundImage: `url(${featured.thumbnail})` }}
            >
              <div className="films-featured-gradient" />

              {/* Play Button */}
              <div className="films-play-ring">
                <div className="films-play-icon">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="6 3 20 12 6 21 6 3" />
                  </svg>
                </div>
              </div>

              {/* Bottom label */}
              <div className="films-featured-label">
                <span className="films-featured-num">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(films.length).padStart(2, '0')}
                </span>
                <div className="films-featured-info">
                  <h3 className="films-featured-title">{featured.title}</h3>
                  <p className="films-featured-sub">{featured.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="films-progress-bar">
              {films.map((_, i) => (
                <div
                  key={i}
                  className={`films-progress-tick ${i === activeIndex ? 'active' : ''}`}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i); }}
                />
              ))}
            </div>
          </div>

          {/* Right — Numbered Film List */}
          <div className="films-list">
            {films.map((film, i) => (
              <div
                key={film.id}
                className={`films-list-item ${i === activeIndex ? 'films-list-item--active' : ''}`}
                onClick={() => {
                  setActiveIndex(i);
                  setActiveVideo(film.videoUrl);
                }}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <span className="films-list-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="films-list-thumb" style={{ backgroundImage: `url(${film.thumbnail})` }} />
                <div className="films-list-meta">
                  <h4 className="films-list-title">{film.title}</h4>
                  <p className="films-list-sub">{film.subtitle}</p>
                </div>
                <div className="films-list-arrow">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Screen Video Modal */}
      <div className={`video-modal-overlay ${activeVideo ? 'open' : ''}`}>
        <div className="modal-backdrop" onClick={() => setActiveVideo(null)} />
        <button className="video-close-btn" onClick={() => setActiveVideo(null)}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="video-player-wrapper">
          {activeVideo && (
            <iframe
              src={activeVideo}
              title="Cinematic Reel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-iframe"
            />
          )}
        </div>
      </div>
    </>
  );
}
