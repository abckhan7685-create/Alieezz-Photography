import Link from 'next/link';
import Image from 'next/image';

type FooterProps = {
  location: string;
  locationUrl?: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
};

export function Footer({ location, locationUrl, instagramUrl, facebookUrl, youtubeUrl }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
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
              <h2 className="logo-main">ALIEEZZ</h2>
              <span className="logo-sub">PHOTOGRAPHY &amp; FILMS</span>
            </div>
          </div>
          <nav className="footer-nav">
            <Link href="#portfolio" className="footer-link">Portfolio</Link>
            <Link href="#about" className="footer-link">Philosophy</Link>
            <Link href="#contact" className="footer-link">Bookings</Link>
            {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>}
            {facebookUrl && <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>}
            {youtubeUrl && <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="footer-link">YouTube</a>}
          </nav>
        </div>

        {location && (
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
            📍 {locationUrl ? (
              <a href={locationUrl} target="_blank" rel="noopener noreferrer" className="footer-location-link" style={{ color: 'inherit', textDecoration: 'none', transition: 'color 0.2s' }}>
                {location}
              </a>
            ) : location}
          </p>
        )}

        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Alieezz Photography. All Rights Reserved.</p>
          <p className="developer-tag">Created by Mahad Hassan</p>
        </div>
      </div>
    </footer>
  );
}
