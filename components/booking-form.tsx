"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignupForm() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const payload = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      password: String(form.get("password") || ""),
    };

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.error || "Signup failed");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <div className="eyebrow">Make home feel easier</div>
        <h1 className="display">Join UrbanNest.</h1>
        <p>Create an account to keep your bookings together.</p>

        <form className="auth-form" onSubmit={submit}>
          <div className="form-field">
            <label htmlFor="name">Full name</label>
            <input id="name" name="name" required autoComplete="name" placeholder="Your name" />
          </div>

          <div className="form-field">
            <label htmlFor="email">Email address</label>
            <input id="email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" />
          </div>

          <div className="form-field">
            <label htmlFor="password">Create password</label>
            <input id="password" name="password" type="password" minLength={8} required autoComplete="new-password" placeholder="At least 8 characters" />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {message && <div className="notice" role="status">{message}</div>}

        <p style={{ marginTop: 20, marginBottom: 0 }}>
          Already have an account? <Link href="/login" style={{ color: "#176c55", fontWeight: 700 }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}
