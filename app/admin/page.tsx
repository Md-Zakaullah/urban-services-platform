import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) return <main><section className="page-hero"><div className="container"><div className="eyebrow">Marketplace workspace</div><h1 className="display">Admin access required.</h1><p>Please sign in with an admin account to view operational data.</p><Link className="btn btn-primary" href="/login">Log in</Link></div></section></main>;
  if (user.role !== "admin") return <main><section className="page-hero"><div className="container"><div className="eyebrow">Access restricted</div><h1 className="display">Admin access required.</h1><p>This account does not have administrator permissions.</p></div></section></main>;

  const [providers, bookings, revenue, recentBookings] = await Promise.all([
    prisma.user.count({ where: { role: "provider" } }),
    prisma.booking.count(),
    prisma.booking.aggregate({ _sum: { amount: true } }),
    prisma.booking.findMany({ take: 10, include: { service: true }, orderBy: { createdAt: "desc" } }),
  ]);

  return <main><section className="page-hero"><div className="container"><div className="eyebrow">Marketplace overview</div><h1 className="display">Admin workspace.</h1><p>Live totals from the booking database.</p></div></section><section className="section" style={{paddingTop:0}}><div className="container"><div className="dashboard-stats"><div className="stat-card"><span>Providers</span><strong>{providers}</strong></div><div className="stat-card"><span>Booking requests</span><strong>{bookings}</strong></div><div className="stat-card"><span>Booking value</span><strong>₹{(revenue._sum.amount ?? 0).toLocaleString("en-IN")}</strong></div></div><div className="admin-panel"><h2>Recent booking requests</h2>{recentBookings.length === 0 ? <div className="empty-state">No bookings yet.</div> : recentBookings.map((booking) => <div className="booking-row" key={booking.id}><div><strong>{booking.service.name}</strong><div className="muted" style={{fontSize:12,marginTop:5}}>#{booking.id} · {booking.contactName} · {booking.date} · {booking.location}</div></div><span className="status-pill">{booking.status}</span></div>)}</div></div></section></main>;
}
