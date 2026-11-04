"use client";
import { useState } from "react";
import Link from "next/link";
export default function SignupForm() {
  const [message, setMessage] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setMessage("This is a UI demo: account creation is not connected yet. No personal information was sent or saved."); }
  return <div className="auth-wrap"><div className="auth-card"><div className="eyebrow">Make home feel easier</div><h1 className="display">Join UrbanNest.</h1><p>Create an account to keep your bookings together.</p><form className="auth-form" onSubmit={submit}><div className="form-field"><label htmlFor="name">Full name</label><input id="name" required autoComplete="name" placeholder="Your name"/></div><div className="form-field"><label htmlFor="email">Email address</label><input id="email" type="email" required autoComplete="email" placeholder="you@example.com"/></div><div className="form-field"><label htmlFor="password">Create password</label><input id="password" type="password" minLength={8} required autoComplete="new-password" placeholder="At least 8 characters"/></div><button className="btn btn-primary" type="submit">Create account</button></form>{message && <div className="notice" role="status">{message}</div>}<p style={{marginTop:20,marginBottom:0}}>Already have an account? <Link href="/login" style={{color:"#176c55",fontWeight:700}}>Log in</Link></p></div></div>;
}
