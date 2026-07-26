import prisma from '@/lib/prisma';
import Link from 'next/link';

export default async function DashboardPage() {
  const inquiriesCount = await prisma.inquiry.count();
  const portfolioCount = await prisma.portfolioItem.count();
  const pendingInquiries = await prisma.inquiry.count({ where: { status: 'Pending' } });
  const reviewsCount = await prisma.review.count();

  const recentInquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  const stats = [
    { label: 'Total Inquiries', value: inquiriesCount, icon: '✉', accent: 'var(--accent-gold)', href: '/admin/inquiries' },
    { label: 'Pending Action', value: pendingInquiries, icon: '⏳', accent: '#f97316', href: '/admin/inquiries' },
    { label: 'Portfolio Items', value: portfolioCount, icon: '◈', accent: 'var(--accent-gold)', href: '/admin/portfolio' },
    { label: 'Client Reviews', value: reviewsCount, icon: '★', accent: 'var(--accent-gold)', href: '/admin/reviews' },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <p className="admin-page-tag">Welcome back</p>
          <h1 className="admin-page-title">Dashboard</h1>
        </div>
        <Link href="/admin/portfolio" className="admin-primary-btn">
          + Add Portfolio Item
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="admin-stats-grid">
        {stats.map((stat) => (
          <Link href={stat.href} key={stat.label} className="admin-stat-card">
            <div className="admin-stat-icon" style={{ color: stat.accent }}>{stat.icon}</div>
            <p className="admin-stat-value">{stat.value}</p>
            <p className="admin-stat-label">{stat.label}</p>
            <div className="admin-stat-bar" style={{ background: stat.accent }} />
          </Link>
        ))}
      </div>

      {/* Recent Inquiries */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h2 className="admin-card-title">Recent Inquiries</h2>
          <Link href="/admin/inquiries" className="admin-card-link">View all →</Link>
        </div>
        {recentInquiries.length === 0 ? (
          <p className="admin-empty-state">No inquiries received yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Shoot Type</th>
                <th>Event Date</th>
                <th>Received</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentInquiries.map((inq) => (
                <tr key={inq.id}>
                  <td>
                    <p className="admin-table-name">{inq.name}</p>
                    <p className="admin-table-sub">{inq.email}</p>
                  </td>
                  <td><span className="admin-badge">{inq.shootType}</span></td>
                  <td>{inq.date}</td>
                  <td>{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={`admin-status-badge ${inq.status === 'Pending' ? 'status-pending' : inq.status === 'Replied' ? 'status-replied' : 'status-reviewed'}`}>
                      {inq.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
