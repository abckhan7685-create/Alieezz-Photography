import Image from 'next/image';

export function Founder() {
  return (
    <section className="founder-section" id="founder">
      <div className="section-container">
        <div className="founder-grid">

          {/* Left: Image Column */}
          <div className="founder-image-col">
            <div className="founder-dual-images">
              <div className="founder-image-frame founder-image-short">
                <Image
                  src="/Hassan Farooq.jpeg"
                  alt="Hassan Farooq"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                {/* Corner accents */}
                <div className="frame-accent top-left"></div>
                <div className="frame-accent top-right"></div>
                <div className="frame-accent bottom-left"></div>
                <div className="frame-accent bottom-right"></div>
              </div>

              <div className="founder-image-frame founder-image-short staggered-frame">
                <Image
                  src="/Ali Tariq.jpeg"
                  alt="Ali Tariq"
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                {/* Corner accents */}
                <div className="frame-accent top-left"></div>
                <div className="frame-accent top-right"></div>
                <div className="frame-accent bottom-left"></div>
                <div className="frame-accent bottom-right"></div>
              </div>
            </div>

            {/* Stats below image */}
            <div className="founder-stats">
              <div className="founder-stat">
                <span className="stat-number">10+</span>
                <span className="stat-label">Years of Vision</span>
              </div>
              <div className="stat-divider"></div>
              <div className="founder-stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Stories Told</span>
              </div>
              <div className="stat-divider"></div>
              <div className="founder-stat">
                <span className="stat-number">3</span>
                <span className="stat-label">National Awards</span>
              </div>
            </div>

            {/* Camera dock space — the scroll camera lands here */}
            <div className="camera-dock" id="camera-dock"></div>
          </div>

          {/* Right: Text Column */}
          <div className="founder-text-col">
            <span className="section-tag">The Visionaries Behind the Lens</span>
            <h2 className="founder-name">Hassan Farooq & Ali Tariq</h2>
            <span className="founder-title-badge">Founders & Lead Creatives</span>

            <div className="founder-quote-block">
              <span className="founder-quote-mark">❝</span>
              <p className="founder-quote">
                A photograph is not just taken — it is given. Every time we raise our cameras, we are asking the world for permission to preserve a fragment of its soul.
              </p>
            </div>

            <p className="founder-bio">
              United by a shared passion for light, color, and raw human emotion, Hassan and Ali have spent years perfecting their craft. 
              Trained under master photographers and filmmakers, they came together with a singular mission — to elevate 
              South Asian wedding photography and filmmaking to a world-class, cinematic standard.
            </p>
            <p className="founder-bio">
              Today, Alieezz Photography & Films stands as one of the most trusted names in the industry. Both founders personally oversee their projects, ensuring that each story is told with the absolute integrity, artistry, and emotion it deserves.
            </p>

            <div className="founder-signature-row">
              <div className="founder-signature">
                <svg viewBox="0 0 200 70" className="signature-svg" fill="none">
                  <path d="M10 55 Q30 10 55 35 Q70 50 85 25 Q100 5 115 30 Q130 50 150 20 Q165 5 185 35" stroke="rgba(197,168,128,0.7)" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  <path d="M20 60 Q80 58 190 60" stroke="rgba(197,168,128,0.3)" strokeWidth="1" strokeLinecap="round"/>
                </svg>
                <span className="signature-name">Hassan & Ali</span>
              </div>
              <div className="founder-social">
                <a href="#" className="social-icon-btn" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                </a>
                <a href="#" className="social-icon-btn" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="3"/><path d="M7 10v7M7 7v.01M12 10v7M12 13a3 3 0 0 1 6 0v4"/></svg>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
