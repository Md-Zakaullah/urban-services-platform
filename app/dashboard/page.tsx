"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, ClipboardCheck } from "lucide-react";

export default function BookingForm() {
  const params = useSearchParams();
  const [services, setServices] = useState<Array<{ id: number; name: string; price: number }>>([]);
  const [serviceId, setServiceId] = useState<string>("1");
  const [done, setDone] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadServices() {
      const response = await fetch("/api/services");
      const data = await response.json();
      setServices(data);
      const initial = params.get("service");
      if (initial) {
        const match = data.find((service: { id: number; name: string }) => service.name.toLowerCase().replace(/\s+/g, "-") === initial || String(service.id) === initial);
        if (match) setServiceId(String(match.id));
      }
    }
    void loadServices();
  }, [params]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      serviceId: Number(form.get("serviceId") || serviceId),
      location: String(form.get("location") || ""),
      date: String(form.get("date") || ""),
      time: String(form.get("time") || ""),
      notes: String(form.get("notes") || ""),
    };

    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    if (!response.ok) {
      setMessage(result.error || "Booking failed");
      return;
    }

    setBookingId(String(result.id));
    setDone(true);
  }

  if (done) {
    return (
      <div className="form-card success-screen">
        <div className="success-icon"><Check /></div>
        <div className="eyebrow">Request received</div>
        <h1 className="display" style={{ fontSize: 38 }}>You’re on your way.</h1>
        <p className="muted">Your booking <strong>{bookingId}</strong> has been stored in the database.</p>
        <div style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 22 }}>
          <Link className="btn btn-primary" href="/dashboard">View my bookings</Link>
          <Link className="btn btn-light" href="/services">Explore more</Link>
        </div>
      </div>
    );
  }

  return (
    <form className="form-card" onSubmit={submit}>
      <div className="eyebrow"><ClipboardCheck size={15} /> Booking details</div>
      <h2 className="display" style={{ fontSize: 36, margin: "10px 0 6px" }}>Let’s get it sorted.</h2>
      <p className="muted" style={{ marginTop: 0 }}>Choose a service and a time that works for you.</p>

      <div className="form-grid" style={{ marginTop: 24 }}>
        <div className="form-field full">
          <label htmlFor="service">Choose a service</label>
          <select id="service" value={serviceId} name="serviceId" onChange={(event) => setServiceId(event.target.value)}>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name} · from ₹{service.price}
              </option>
            ))}
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" required placeholder="e.g. Aisha Khan" autoComplete="name" />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Mobile number</label>
          <input id="phone" name="phone" required type="tel" placeholder="Your contact number" autoComplete="tel" />
        </div>

        <div className="form-field full">
          <label htmlFor="location">Service address / area</label>
          <input id="location" name="location" required placeholder="Flat, street, locality, city" autoComplete="street-address" />
        </div>

        <div className="form-field">
          <label htmlFor="date">Preferred date</label>
          <input id="date" name="date" type="date" required min={new Date().toISOString().split("T")[0]} />
        </div>

        <div className="form-field">
          <label htmlFor="time">Preferred time</label>
          <select id="time" name="time" required defaultValue="">
            <option value="" disabled>Select a time slot</option>
            <option>9:00 AM – 12:00 PM</option>
            <option>12:00 PM – 3:00 PM</option>
            <option>3:00 PM – 6:00 PM</option>
            <option>6:00 PM – 8:00 PM</option>
          </select>
        </div>

        <div className="form-field full">
          <label htmlFor="notes">Anything we should know? (optional)</label>
          <textarea id="notes" name="notes" rows={3} placeholder="Share helpful details about the job" />
        </div>

        <div className="form-field full">
          <button className="btn btn-primary" type="submit">Request a booking</button>
          {message && <div className="notice">{message}</div>}
          <small className="muted">Demo booking uses a real database-backed API and stores the request in SQLite.</small>
        </div>
      </div>
    </form>
  );
}
