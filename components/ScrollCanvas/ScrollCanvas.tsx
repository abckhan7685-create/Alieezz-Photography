'use client';

import { useScrollCanvas } from '@/hooks/useScrollCanvas';
import { Preloader } from '../Preloader/Preloader';

export function ScrollCanvas() {
  const { progress, phase, canvasRef, loadProgress } = useScrollCanvas(3, 151);

  return (
    <>
      <Preloader loadProgress={loadProgress} />
      
      <section className="scroll-anim-container">
        <div className="canvas-sticky-wrapper">
          <canvas id="scrollCanvas" ref={canvasRef}></canvas>
          <div className="canvas-overlay"></div>
          
          {/* Text Phases */}
          <div className={`scroll-text-layer ${phase === 1 ? 'active' : 'exit'}`}>
            <div className="overlay-content">
              <span className="category-tag">Heritage Weddings</span>
              <h2 className="split-text">Timeless Elegance.<br/>Captured Forever.</h2>
              <p className="text-lead">
                Every frame we capture is a piece of your legacy. 
                Experience cinematic storytelling crafted for the extraordinary.
              </p>
              <div className="scroll-hint">
                <span>Scroll to Explore</span>
                <div className="hint-line"></div>
              </div>
              <div className="hero-since-badge">
                <span className="hero-since-line"></span>
                <span className="hero-since-text">We are saving your memories since 2015</span>
                <span className="hero-since-line"></span>
              </div>
            </div>
          </div>

          <div className={`scroll-text-layer ${phase === 2 ? 'active' : 'exit'}`}>
            <div className="overlay-content">
              <span className="category-tag">Fine Art Portraits</span>
              <h2 className="split-text">The Poetry of<br/>Human Emotion.</h2>
              <p className="text-lead">
                We believe in the quiet moments between poses, 
                where true character is revealed through shadow and light.
              </p>
            </div>
          </div>

          <div className={`scroll-text-layer ${phase === 3 ? 'active' : 'exit'}`}>
            <div className="overlay-content">
              <span className="category-tag">Cinematic Aesthetics</span>
              <h2 className="split-text">Mastering Light<br/>& Shadow.</h2>
              <p className="text-lead">
                Inspired by classical paintings and modern cinema, 
                our style brings a dramatic, high-end feel to your visual narrative.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
