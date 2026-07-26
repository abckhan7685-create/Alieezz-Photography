import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function InquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function updateStatus(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const status = formData.get('status') as string;
    await prisma.inquiry.update({
      where: { id },
      data: { status }
    });
    revalidatePath('/admin/inquiries');
  }

  return (
    <div>
      <h1 style={{ fontSize: '2.4rem', marginBottom: '2.5rem', fontWeight: 300, fontFamily: 'var(--font-cormorant)' }}>Client Inquiries</h1>
      
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
                <td colSpan={7} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No inquiries received yet.</td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color 0.2s' }} className="admin-tr">
                  <td style={{ padding: '1.2rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  <td style={{ padding: '1.2rem', fontWeight: 500, fontSize: '0.95rem' }}>{inquiry.name}</td>
                  <td style={{ padding: '1.2rem', fontSize: '0.95rem' }}><a href={`mailto:${inquiry.email}`} style={{ color: 'var(--accent-gold)', textDecoration: 'none' }}>{inquiry.email}</a></td>
                  <td style={{ padding: '1.2rem', fontSize: '0.9rem' }}>
                    <span style={{ padding: '4px 8px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '4px', border: '1px solid var(--border-color)' }}>{inquiry.shootType}</span>
                  </td>
                  <td style={{ padding: '1.2rem', fontSize: '0.95rem' }}>{inquiry.date}</td>
                  <td style={{ padding: '1.2rem', maxWidth: '250px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                    <div style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={inquiry.message}>
                      {inquiry.message}
                    </div>
                  </td>
                  <td style={{ padding: '1.2rem' }}>
                    <form action={updateStatus} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input type="hidden" name="id" value={inquiry.id} />
                      <select name="status" defaultValue={inquiry.status} style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid var(--border-color)', backgroundColor: 'rgba(0,0,0,0.5)', color: 'var(--text-primary)', outline: 'none', cursor: 'pointer', fontSize: '0.8rem' }} className="admin-input">
                        <option value="Pending">Pending</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Replied">Replied</option>
                      </select>
                      <button type="submit" style={{ padding: '0.4rem 0.8rem', backgroundColor: 'var(--accent-gold)', color: 'var(--bg-primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase' }} className="admin-btn-primary">Save</button>
                    </form>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
