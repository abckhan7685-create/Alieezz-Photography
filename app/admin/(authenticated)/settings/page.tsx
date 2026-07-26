import { getSiteSettings, updateSiteSettings } from '@/app/actions/settings';

export default async function SettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 className="admin-title">Site Settings</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.4rem' }}>
            Update your contact details and social links. Changes appear on the live site instantly.
          </p>
        </div>
      </div>

      <div style={{ background: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
        <form action={updateSiteSettings} style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem' }}>
          <input type="hidden" name="id" value={settings.id} />

          {/* Contact Info */}
          <div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '1.2rem' }}>Contact Info</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Phone Number (WhatsApp)</label>
                <input type="text" name="phoneNumber" defaultValue={settings.phoneNumber} className="admin-input" required placeholder="+923347215663" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email Address</label>
                <input type="email" name="email" defaultValue={settings.email} className="admin-input" required placeholder="info@alieezz.com" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Location</label>
                <input type="text" name="location" defaultValue={settings.location} className="admin-input" required placeholder="Dera Ismail Khan" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Location Map URL</label>
                <input type="url" name="locationUrl" defaultValue={settings.locationUrl} className="admin-input" placeholder="https://maps.app.goo.gl/..." />
              </div>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'var(--border-color)' }}></div>

          {/* Social Links */}
          <div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-gold)', marginBottom: '1.2rem' }}>Social Media Links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Instagram URL</label>
                <input type="url" name="instagramUrl" defaultValue={settings.instagramUrl} className="admin-input" placeholder="https://instagram.com/yourhandle" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Facebook URL</label>
                <input type="url" name="facebookUrl" defaultValue={settings.facebookUrl} className="admin-input" placeholder="https://facebook.com/yourpage" />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>YouTube URL</label>
                <input type="url" name="youtubeUrl" defaultValue={settings.youtubeUrl} className="admin-input" placeholder="https://youtube.com/@yourchannel" />
              </div>
            </div>
          </div>

          <button type="submit" className="admin-btn-primary" style={{ marginTop: '0.5rem', alignSelf: 'flex-start', padding: '0.9rem 2.5rem' }}>
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );
}
