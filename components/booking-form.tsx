"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, ClipboardCheck } from "lucide-react";
import { services as localServices } from "@/data/services";

type ServiceOption = { id: string; name: string; price: number };

export default function BookingForm() {
  const params = useSearchParams();
  const [services, setServices] = useState<ServiceOption[]>(localServices.map(({ id, name, price }) => ({ id, name, price })));
  const [serviceId, setServiceId] = useState(params.get("service") || localServices[0].id);
  const [done, setDone] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) return;
        const data: ServiceOption[] = await response.json();
        setServices(data);
        const requested = params.get("service");
        if (requested && data.some((service) => service.id === requested)) setServiceId(requested);
      } catch { /* The local catalog remains available if the API is temporarily down. */ }
    }
    void loadServices();
  }, [params]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: String(form.get("serviceId")),
          contactName: form.get("name"),
          contactPhone: form.get("phone"),
          location: form.get("location"),
          date: form.get("date"),
          time: form.get("time"),
          notes: form.get("notes"),
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        setMessage(response.status === 401 ? "Please log in or create an account before booking." : (result.error || "Booking failed."));
        return;
      }
      setBookingId(String(result.id));
      setDone(true);
    } catch { setMessage("Network error. Please try again."); }
    finally { setLoading(false); }
  }

  if (done) return <div className="form-card success-screen"><div className="success-icon"><Check/></div><div className="eyebrow">Request received</div><h1 className="display" style={{fontSize:38}}>You’re on your way.</h1><p className="muted">Your booking <strong>#{bookingId}</strong> has been saved. Sign in to view it in your dashboard.</p><div style={{display:"flex",justifyContent:"center",gap:10,flexWrap:"wrap",marginTop:22}}><Link className="btn btn-primary" href="/dashboard">View my bookings</Link><Link className="btn btn-light" href="/services">Explore more</Link></div></div>;

  return <form className="form-card" onSubmit={submit}><div className="eyebrow"><ClipboardCheck size={15}/> Booking details</div><h2 className="display" style={{fontSize:36,margin:"10px 0 6px"}}>Let’s get it sorted.</h2><p className="muted" style={{marginTop:0}}>Choose a service and a time that works for you. Log in is required to save your booking.</p><div className="form-grid" style={{marginTop:24}}>
    <div className="form-field full"><label htmlFor="service">Choose a service</label><select id="service" value={serviceId} name="serviceId" onChange={(event) => setServiceId(event.target.value)}>{services.map((service) => <option key={service.id} value={service.id}>{service.name} · from ₹{service.price}</option>)}</select></div>
    <div className="form-field"><label htmlFor="name">Your name</label><input id="name" name="name" required minLength={2} placeholder="e.g. Aisha Khan" autoComplete="name"/></div>
    <div className="form-field"><label htmlFor="phone">Mobile number</label><input id="phone" name="phone" required type="tel" minLength={8} maxLength={24} placeholder="Your contact number" autoComplete="tel"/></div>
    <div className="form-field full"><label htmlFor="location">Service address / area</label><input id="location" name="location" required minLength={5} maxLength={500} placeholder="Flat, street, locality, city" autoComplete="street-address"/></div>
    <div className="form-field"><label htmlFor="date">Preferred date</label><input id="date" name="date" type="date" required min={new Date().toISOString().split("T")[0]}/></div>
    <div className="form-field"><label htmlFor="time">Preferred time</label><select id="time" name="time" required defaultValue=""><option value="" disabled>Select a time slot</option><option>9:00 AM – 12:00 PM</option><option>12:00 PM – 3:00 PM</option><option>3:00 PM – 6:00 PM</option><option>6:00 PM – 8:00 PM</option></select></div>
    <div className="form-field full"><label htmlFor="notes">Anything we should know? (optional)</label><textarea id="notes" name="notes" rows={3} maxLength={1000} placeholder="Share helpful details about the job"/></div>
    <div className="form-field full"><button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Saving request..." : "Request a booking"}</button>{message && <div className="notice" role="alert">{message} {message.startsWith("Please log in") && <><Link href="/login" style={{fontWeight:700,textDecoration:"underline"}}>Log in</Link> or <Link href="/signup" style={{fontWeight:700,textDecoration:"underline"}}>sign up</Link>.</>}</div>}<small className="muted">Booking requests are stored in the configured PostgreSQL database.</small></div>
  </div></form>;
}
