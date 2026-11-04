import { Suspense } from "react";
import BookingForm from "@/components/booking-form";
export default function BookPage() {
  return <main><section className="page-hero"><div className="container"><div className="eyebrow">A few details, then done</div><h1 className="display">Book a trusted pro.</h1><p>Tell us what you need and when. Log in or create an account to submit a booking.</p></div></section><div className="container"><Suspense fallback={<div className="form-card">Loading booking form…</div>}><BookingForm/></Suspense></div></main>;
}
