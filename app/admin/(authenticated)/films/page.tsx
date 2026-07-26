import prisma from '@/lib/prisma';
import { addFilm, deleteFilm } from '@/app/actions/films';

export default async function FilmsAdminPage() {
  const films = await prisma.film.findMany({ orderBy: { order: 'asc' } });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <p className="admin-page-tag">Manage Content</p>
          <h1 className="admin-page-title">Our Films</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

        {/* Films List */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">All Films ({films.length})</h2>
          </div>

          {films.length === 0 ? (
            <p className="admin-empty-state">No films yet. Add your first film using the form.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {films.map((film) => (
                <div key={film.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 2rem', borderBottom: '1px solid rgba(197,168,128,0.08)', alignItems: 'center' }}>
                  {/* Thumbnail */}
                  <div style={{
                    width: '140px', height: '80px', borderRadius: '6px', flexShrink: 0,
                    backgroundImage: `url(${film.thumbnail})`, backgroundSize: 'cover', backgroundPosition: 'center',
                    border: '1px solid rgba(197,168,128,0.15)'
                  }} />

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{film.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>{film.subtitle}</p>
                    <a href={film.videoUrl} target="_blank" rel="noopener noreferrer"
                      style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', opacity: 0.7, textDecoration: 'none', letterSpacing: '0.05em' }}>
                      ▶ Preview Video ↗
                    </a>
                  </div>

                  {/* Order badge */}
                  <span className="admin-badge">#{film.order}</span>

                  {/* Delete */}
                  <form action={deleteFilm}>
                    <input type="hidden" name="id" value={film.id} />
                    <button type="submit" className="admin-danger-btn">Delete</button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Film Form */}
        <div className="admin-card" style={{ position: 'sticky', top: '2rem' }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">Add New Film</h2>
          </div>
          <div style={{ padding: '2rem' }}>
            <form action={addFilm} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

              <div className="admin-field">
                <label className="admin-label">Film Title</label>
                <input type="text" name="title" required className="admin-input" placeholder="A Timeless Promise" />
              </div>

              <div className="admin-field">
                <label className="admin-label">Subtitle / Event</label>
                <input type="text" name="subtitle" required className="admin-input" placeholder="The Royal Lahore Wedding" />
              </div>

              <div className="admin-field">
                <label className="admin-label">Upload Thumbnail Image</label>
                <input type="file" name="imageFile" accept="image/*" className="admin-input" />
              </div>
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>
                — OR —
              </div>
              <div className="admin-field">
                <label className="admin-label">Image URL</label>
                <input type="text" name="thumbnail" className="admin-input" placeholder="/portfolio-wedding.jpg" />
              </div>

              <div className="admin-field">
                <label className="admin-label">YouTube Embed URL</label>
                <input type="url" name="videoUrl" required className="admin-input" placeholder="https://www.youtube.com/embed/VIDEO_ID" />
                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                  Use the embed URL: youtube.com/embed/VIDEO_ID?autoplay=1
                </p>
              </div>

              <div className="admin-field">
                <label className="admin-label">Sort Order</label>
                <input type="number" name="order" defaultValue="0" className="admin-input" />
              </div>

              <button type="submit" className="admin-primary-btn" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                Add Film
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
