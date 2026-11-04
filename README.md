"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, ClipboardList } from "lucide-react";

type BookingRow = {
  id: number;
  service: string;
  location: string;
  date: string;
  time: string;
  status: string;
  price: number;
};

export default function DashboardPage() {
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/bookings");
        if (!response.ok) {
          setBookings([]);
          setLoading(false);
          return;
        }
        const data = await response.json();
        setBookings(data);
      } catch (error) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <div className="eyebrow">Your home, all in one place</div>
          <h1 className="display">My bookings.</h1>
          <p>Review real booking requests saved in your SQLite database.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="dashboard-stats">
            <div className="stat-card">
              <span>Total requests</span>
              <strong>{bookings.length}</strong>
            </div>
            <div className="stat-card">
              <span>Upcoming</span>
              <strong>{bookings.filter((b) => b.status === "requested").length}</strong>
            </div>
            <div className="stat-card">
              <span>Booking mode</span>
              <strong style={{ fontSize: 21 }}>Live DB</strong>
            </div>
          </div>

          <div className="admin-panel">
            <h2>Recent requests</h2>

            {loading ? (
              <div className="empty-state">Loading your bookings…</div>
            ) : bookings.length === 0 ? (
              <div className="empty-state">
                <ClipboardList size={28} />
                <strong>No bookings yet</strong>
                <p>Choose a service and make your first request.</p>
                <Link className="btn btn-primary" href="/services">Explore services</Link>
              </div>
            ) : (
              bookings.map((booking) => (
                <article className="booking-row" key={booking.id}>
                  <div>
                    <strong>{booking.service}</strong>
                    <div className="muted" style={{ fontSize: 13, marginTop: 5 }}>
                      <CalendarDays size={13} style={{ display: "inline", verticalAlign: "middle" }} /> {booking.date} · {booking.time}
                    </div>
                    <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{booking.location} · Ref {booking.id}</div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span className="price">From ₹{booking.price}</span>
                    <span className="status-pill">{booking.status}</span>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
