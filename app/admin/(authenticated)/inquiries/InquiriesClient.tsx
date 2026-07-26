'use client';

import { useState } from 'react';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  shootType: string;
  date: string;
  message: string;
  status: string;
  createdAt: Date;
};

type Props = {
  inquiries: Inquiry[];
  updateStatus: (formData: FormData) => Promise<void>;
};

export default function InquiriesClient({ inquiries, updateStatus }: Props) {
  const [selected, setSelected] = useState<Inquiry | null>(null);

  return (
    <>
      <div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '2.5rem', fontWeight: 300, fontFamily: 'var(--font-cormorant)' }}>
          Client Inquiries
        </h1>

        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontFamily: 'var(--font-inter)' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(0,0,0,0.4)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Date</th>
                <th style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Name</th>
                <th style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Email</th>
                <th style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Shoot Type</th>
                <th style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Event Date</th>
                <th style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Message</th>
                <th style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.85rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No inquiries received yet.
                  </td>
                </tr>
              ) : (
                inquiries.map((inquiry) => (
                  <tr
                    key={inquiry.id}
                    style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s', cursor: 'pointer' }}
                    className="admin-tr"
                    onClick={() => setSelected(inquiry)}
                  >
                    <td style={{ padding: '1.2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {new Date(inquiry.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.95rem' }}>{inquiry.name}</td>
                    <td style={{ padding: '1.2rem', fontSize: '0.95rem' }}>
                      <a href={`mailto:${inquiry.email}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }} onClick={e => e.stopPropagation()}>
                        {inquiry.email}
                      </a>
                    </td>
                    <td style={{ padding: '1.2rem', fontSize: '0.9rem' }}>
                      <span style={{ padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
                        {inquiry.shootType}
                      </span>
                    </td>
                    <td style={{ padding: '1.2rem', fontSize: '0.95rem' }}>{inquiry.date}</td>
                    <td style={{ padding: '1.2rem', maxWidth: '250px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {inquiry.message}
                      </div>
                    </td>
                    <td style={{ padding: '1.2rem' }} onClick={e => e.stopPropagation()}>
                      <form action={updateStatus} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input type="hidden" name="id" value={inquiry.id} />
                        <select
                          name="status"
                          defaultValue={inquiry.status}
                          style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
                          className="admin-input"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Replied">Replied</option>
                        </select>
                        <button
                          type="submit"
                          style={{ padding: '0.4rem 0.8rem', backgroundColor: 'var(--accent-gold)', color: 'var(--bg-primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }}
                          className="admin-btn-primary"
                        >
                          Save
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: 'fixed', inset: 0, zIndex: 1000,
            backgroundColor: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: '#0f0f0f',
              border: '1px solid rgba(197,168,128,0.25)',
              borderRadius: '12px',
              width: '100%',
              maxWidth: '600px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
              animation: 'slideUp 0.25s ease',
            }}
          >
            {/* Modal Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.5rem 2rem',
              borderBottom: '1px solid rgba(197,168,128,0.12)',
              background: 'linear-gradient(135deg, rgba(197,168,128,0.08), transparent)',
            }}>
              <div>
                <p style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '0.3rem' }}>
                  Client Inquiry
                </p>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 400, fontFamily: 'var(--font-cormorant)', color: 'var(--text-primary)', margin: 0 }}>
                  {selected.name}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--text-secondary)', borderRadius: '50%',
                  width: '36px', height: '36px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.1rem', transition: 'all 0.2s',
                }}
              >
                ✕
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '2rem' }}>
              {/* Info Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.75rem' }}>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>Email</p>
                  <a href={`mailto:${selected.email}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem', wordBreak: 'break-all' }}>
                    {selected.email}
                  </a>
                </div>
                {selected.phone && (
                  <div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>Phone</p>
                    <a href={`tel:${selected.phone}`} style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
                      {selected.phone}
                    </a>
                  </div>
                )}
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>Shoot Type</p>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', padding: '3px 10px', background: 'rgba(197,168,128,0.08)', border: '1px solid rgba(197,168,128,0.2)', borderRadius: '4px', display: 'inline-block' }}>
                    {selected.shootType}
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>Event Date</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>{selected.date}</p>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>Received</p>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
                    {new Date(selected.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.4rem' }}>Status</p>
                  <span style={{
                    fontSize: '0.78rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em',
                    padding: '3px 10px', borderRadius: '4px', display: 'inline-block',
                    backgroundColor: selected.status === 'Replied' ? 'rgba(74,222,128,0.12)' : selected.status === 'Reviewed' ? 'rgba(197,168,128,0.12)' : 'rgba(255,255,255,0.06)',
                    color: selected.status === 'Replied' ? '#4ade80' : selected.status === 'Reviewed' ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    border: `1px solid ${selected.status === 'Replied' ? 'rgba(74,222,128,0.25)' : selected.status === 'Reviewed' ? 'rgba(197,168,128,0.25)' : 'rgba(255,255,255,0.1)'}`,
                  }}>
                    {selected.status}
                  </span>
                </div>
              </div>

              {/* Message */}
              <div>
                <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: '0.75rem' }}>Message</p>
                <div style={{
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(197,168,128,0.1)',
                  borderRadius: '8px',
                  padding: '1.25rem 1.5rem',
                  fontSize: '0.92rem', lineHeight: 1.75, color: 'var(--text-primary)',
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                  maxHeight: '200px', overflowY: 'auto',
                }}>
                  {selected.message}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '1.25rem 2rem',
              borderTop: '1px solid rgba(197,168,128,0.1)',
              display: 'flex', gap: '0.75rem', justifyContent: 'flex-end',
            }}>
              <a
                href={`mailto:${selected.email}?subject=Re: Your ${selected.shootType} Inquiry`}
                style={{
                  padding: '0.6rem 1.4rem',
                  backgroundColor: 'var(--accent-gold)',
                  color: 'var(--bg-primary)',
                  textDecoration: 'none',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  transition: 'opacity 0.2s',
                }}
              >
                Reply via Email
              </a>
              <button
                onClick={() => setSelected(null)}
                style={{
                  padding: '0.6rem 1.4rem',
                  backgroundColor: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </>
  );
}
