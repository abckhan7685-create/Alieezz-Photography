import Image from 'next/image';

export function About() {
  return (
    <section className="about-section" id="about">
      <div className="section-container">
        <div className="about-grid">
          <div className="about-text-content">
            <span className="section-tag">Philosophy</span>
            <h2 className="about-title">Preserving the Poetry of Life</h2>
            <p className="about-description">
              At Alieezz Photography, we believe a photograph isn't just captured; it is composed. 
              We work with shadows, golden rays, and authentic raw emotions to document your story.
              From grand heritage weddings to quiet fine-art portraits, we treat every single click as a piece of legacy.
            </p>
            
            <div className="philosophy-points">
              <div className="point-item">
                <div className="point-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <div className="point-text">
                  <h4>Timeless Approach</h4>
                  <p>Trends fade, but classical composition remains forever elegant.</p>
                </div>
              </div>
              
              <div className="point-item">
                <div className="point-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                  </svg>
                </div>
                <div className="point-text">
                  <h4>Narrative Driven</h4>
                  <p>Every frame is carefully chosen to contribute to your unique story.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="about-camera-wrapper">
            <div id="about-camera-dock" className="about-camera-dock"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

