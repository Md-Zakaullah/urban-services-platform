"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const form = new FormData(event.currentTarget);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const result = await response.json();
      if (!response.ok) { setMessage(result.error || "Login failed"); return; }
      router.push("/dashboard");
      router.refresh();
    } catch { setMessage("Network error. Please try again."); }
    finally { setLoading(false); }
  }

  return <div className="auth-wrap"><div className="auth-card"><div className="eyebrow">Welcome back</div><h1 className="display">Good to see you.</h1><p>Log in to keep your home plans in one place.</p><form className="auth-form" onSubmit={submit}><div className="form-field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com"/></div><div className="form-field"><label htmlFor="password">Password</label><input id="password" name="password" type="password" required minLength={8} autoComplete="current-password" placeholder="At least 8 characters"/></div><button className="btn btn-primary" type="submit" disabled={loading}>{loading ? "Logging in..." : "Log in"}</button></form>{message && <div className="notice" role="status">{message}</div>}<p style={{marginTop:20,marginBottom:0}}>New to UrbanNest? <Link href="/signup" style={{color:"#176c55",fontWeight:700}}>Create an account</Link></p></div></div>;
}
