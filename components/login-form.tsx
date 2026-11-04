"use client";
import { useState } from "react";
import Link from "next/link";
export default function LoginForm() {
  const [message, setMessage] = useState("");
  function submit(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); setMessage("This is a UI demo: authentication is not connected yet. Your account details were not sent or stored."); }
  return <div className="auth-wrap"><div className="auth-card"><div className="eyebrow">Welcome back</div><h1 className="display">Good to see you.</h1><p>Log in to keep your home plans in one place.</p><form className="auth-form" onSubmit={submit}><div className="form-field"><label htmlFor="email">Email address</label><input id="email" type="email" required placeholder="you@example.com" autoComplete="email"/></div><div className="form-field"><label htmlFor="password">Password</label><input id="password" type="password" required minLength={8} placeholder="At least 8 characters" autoComplete="current-password"/></div><button className="btn btn-primary" type="submit">Log in</button></form>{message && <div className="notice" role="status">{message}</div>}<p style={{marginTop:20,marginBottom:0}}>New to UrbanNest? <Link href="/signup" style={{color:"#176c55",fontWeight:700}}>Create an account</Link></p></div></div>;
}
