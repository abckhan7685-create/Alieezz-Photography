import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { addCategory, deleteCategory } from '@/app/actions/categories';
import { SubmitButton } from '@/components/Admin/SubmitButton';

export default async function PortfolioAdminPage() {
  const [items, categories] = await Promise.all([
    prisma.portfolioItem.findMany({ orderBy: { order: 'asc' } }),
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
  ]);

  async function deleteItem(formData: FormData) {
    'use server';
    const id = formData.get('id') as string;
    await prisma.portfolioItem.delete({ where: { id } });
    revalidatePath('/admin/portfolio');
    revalidatePath('/');
  }

  async function addItem(formData: FormData) {
    'use server';
    const title = formData.get('title') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    let imageUrl = formData.get('imageUrl') as string;
    const imageFile = formData.get('imageFile') as File | null;
    const order = parseInt(formData.get('order') as string) || 0;

    // Convert Google Drive links into direct thumbnail links
    if (imageUrl) {
      const driveMatch = imageUrl.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (driveMatch && driveMatch[1]) {
        imageUrl = `https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w1920-h1080`;
      }
    }

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const { v2: cloudinary } = await import('cloudinary');
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });

      const uploadResult = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'portfolio' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(buffer);
      });

      imageUrl = uploadResult.secure_url;
    }

    await prisma.portfolioItem.create({
      data: { title, category, description, imageUrl, order }
    });
    revalidatePath('/admin/portfolio');
    revalidatePath('/');
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <p className="admin-page-tag">Manage Content</p>
          <h1 className="admin-page-title">Portfolio</h1>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem', alignItems: 'start' }}>

        {/* Portfolio Items List */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h2 className="admin-card-title">All Items ({items.length})</h2>
          </div>
          {items.length === 0 ? (
            <p className="admin-empty-state">No portfolio items yet. Add your first item using the form.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 2rem', borderBottom: '1px solid rgba(197,168,128,0.08)', alignItems: 'center' }}>
                  <img src={item.imageUrl} alt={item.title} style={{ width: '120px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid rgba(197,168,128,0.15)', flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>{item.title}</h3>
                    <span style={{ fontSize: '0.72rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '2px 8px', border: '1px solid rgba(197,168,128,0.3)', borderRadius: '4px', display: 'inline-block', marginBottom: '0.4rem' }}>{item.category}</span>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{item.description}</p>
                  </div>
                  <form action={deleteItem}>
                    <input type="hidden" name="id" value={item.id} />
                    <SubmitButton 
                      defaultText="Delete" 
                      loadingText="Deleting..." 
                      className="admin-danger-btn" 
                    />
                  </form>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'sticky', top: '2rem' }}>

          {/* Add Portfolio Item */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Add New Item</h2>
            </div>
            <div style={{ padding: '2rem' }}>
              <form action={addItem} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                <div className="admin-field">
                  <label className="admin-label">Title</label>
                  <input type="text" name="title" required className="admin-input" />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Category</label>
                  {categories.length === 0 ? (
                    <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', padding: '0.8rem', border: '1px solid rgba(197,168,128,0.2)', borderRadius: '4px' }}>
                      ⚠ No categories yet. Add one below first.
                    </p>
                  ) : (
                    <select name="category" required className="admin-input" style={{ appearance: 'none' }}>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="admin-field">
                  <label className="admin-label">Description</label>
                  <textarea name="description" required rows={3} className="admin-input" />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Upload Image</label>
                  <input type="file" name="imageFile" accept="image/*" className="admin-input" />
                </div>
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem', fontStyle: 'italic' }}>— OR —</div>
                <div className="admin-field">
                  <label className="admin-label">Image URL</label>
                  <input type="text" name="imageUrl" className="admin-input" placeholder="https://... or Google Drive link" />
                </div>

                <div className="admin-field">
                  <label className="admin-label">Sort Order</label>
                  <input type="number" name="order" defaultValue="0" className="admin-input" />
                </div>

                <SubmitButton 
                  defaultText="Add to Portfolio" 
                  loadingText="Adding..." 
                  className="admin-primary-btn" 
                  style={{ justifyContent: 'center', marginTop: '0.5rem' }} 
                />
              </form>
            </div>
          </div>

          {/* Manage Categories */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h2 className="admin-card-title">Categories ({categories.length})</h2>
            </div>
            <div style={{ padding: '1.5rem 2rem' }}>

              {/* Existing categories */}
              {categories.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  {categories.map(cat => (
                    <div key={cat.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 1rem', background: 'rgba(197,168,128,0.04)', borderRadius: '6px', border: '1px solid rgba(197,168,128,0.1)' }}>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-primary)', letterSpacing: '0.03em' }}>{cat.name}</span>
                      <form action={deleteCategory}>
                        <input type="hidden" name="id" value={cat.id} />
                        <SubmitButton 
                          defaultText="Remove" 
                          loadingText="Removing..." 
                          className="admin-danger-btn" 
                          style={{ padding: '0.3rem 0.75rem', fontSize: '0.72rem' }} 
                        />
                      </form>
                    </div>
                  ))}
                </div>
              )}

              {/* Add category form */}
              <form action={addCategory} style={{ display: 'flex', gap: '0.75rem' }}>
                <input type="text" name="name" required className="admin-input" placeholder="e.g. Weddings" style={{ flex: 1 }} />
                <SubmitButton 
                  defaultText="Add" 
                  loadingText="Adding..." 
                  className="admin-primary-btn" 
                  style={{ flexShrink: 0, padding: '0 1.25rem' }} 
                />
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
