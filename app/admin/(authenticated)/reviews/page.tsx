import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export default async function ReviewsAdminPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: 'desc' }
  });

  async function deleteReview(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.review.delete({ where: { id } });
    revalidatePath('/admin/reviews');
    revalidatePath('/');
  }

  async function toggleVisibility(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    const currentVisibility = formData.get('isVisible') === 'true';
    await prisma.review.update({
      where: { id },
      data: { isVisible: !currentVisibility }
    });
    revalidatePath('/admin/reviews');
    revalidatePath('/');
  }

  async function addReview(formData: FormData) {
    'use server';
    await prisma.review.create({
      data: {
        clientName: formData.get('clientName') as string,
        content: formData.get('content') as string,
        rating: parseInt(formData.get('rating') as string) || 5,
      }
    });
    revalidatePath('/admin/reviews');
    revalidatePath('/');
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'var(--font-inter)' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 300, marginBottom: '0.5rem', fontFamily: 'var(--font-cormorant)' }}>Client Reviews</h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '3rem' }}>Manage testimonials displayed on the website.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>

        {/* Reviews List */}
        <div>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>All Reviews ({reviews.length})</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {reviews.length === 0 ? (
              <p style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>No reviews yet. Add one using the form.</p>
            ) : (
              reviews.map((review) => (
                <div key={review.id} style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '1.5rem', transition: 'border-color 0.3s' }} className="admin-tr">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{review.clientName}</h3>
                      <div style={{ color: 'var(--accent-gold)', fontSize: '1rem', letterSpacing: '2px' }}>
                        {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                      </div>
                    </div>
                    <span style={{ fontSize: '0.75rem', color: review.isVisible ? '#4ade80' : 'var(--text-muted)', backgroundColor: review.isVisible ? 'rgba(74, 222, 128, 0.1)' : 'rgba(255,255,255,0.05)', padding: '0.3rem 0.8rem', borderRadius: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {review.isVisible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.2rem', fontStyle: 'italic' }}>"{review.content}"</p>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                    <form action={toggleVisibility}>
                      <input type="hidden" name="id" value={review.id} />
                      <input type="hidden" name="isVisible" value={String(review.isVisible)} />
                      <button type="submit" style={{ padding: '0.4rem 0.8rem', backgroundColor: 'rgba(var(--accent-gold-rgb), 0.1)', color: 'var(--accent-gold)', border: '1px solid rgba(var(--accent-gold-rgb), 0.2)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.3s' }} className="admin-btn-primary">
                        {review.isVisible ? 'Hide' : 'Show'}
                      </button>
                    </form>
                    <form action={deleteReview}>
                      <input type="hidden" name="id" value={review.id} />
                      <button type="submit" style={{ padding: '0.4rem 0.8rem', backgroundColor: 'rgba(255, 107, 107, 0.1)', color: '#ff6b6b', border: '1px solid rgba(255, 107, 107, 0.2)', borderRadius: '4px', cursor: 'pointer', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', transition: 'all 0.3s' }} className="admin-btn-delete">Delete</button>
                    </form>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Review Form */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '2rem', height: 'fit-content', position: 'sticky', top: '2rem' }}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', fontFamily: 'var(--font-cormorant)', fontWeight: 300 }}>Add New Review</h2>
          <form action={addReview} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', fontFamily: 'var(--font-inter)' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Client Name</label>
              <input type="text" name="clientName" required style={{ width: '100%', padding: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s' }} className="admin-input" />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Review</label>
              <textarea name="content" required rows={4} style={{ width: '100%', padding: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', outline: 'none', transition: 'border-color 0.3s', resize: 'vertical' }} className="admin-input"></textarea>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Rating (1-5)</label>
              <select name="rating" defaultValue="5" style={{ width: '100%', padding: '0.8rem', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid var(--border-color)', borderRadius: '4px', color: 'var(--text-primary)', outline: 'none', appearance: 'none', transition: 'border-color 0.3s' }} className="admin-input">
                <option value="5">★★★★★ (5)</option>
                <option value="4">★★★★☆ (4)</option>
                <option value="3">★★★☆☆ (3)</option>
                <option value="2">★★☆☆☆ (2)</option>
                <option value="1">★☆☆☆☆ (1)</option>
              </select>
            </div>
            <button type="submit" style={{ padding: '1rem', backgroundColor: 'var(--accent-gold)', color: 'var(--bg-primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '1rem', transition: 'opacity 0.3s' }} className="admin-btn-primary">Add Review</button>
          </form>
        </div>

      </div>
    </div>
  );
}
