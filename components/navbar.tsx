"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" onClick={close}><span className="brand-mark">u.</span><span>urbannest</span></Link>
        <nav className={`nav-links ${open ? "open" : ""}`} aria-label="Main navigation">
          <Link href="/services" onClick={close}>Explore services</Link>
          <a href="/#how-it-works" onClick={close}>How it works</a>
          <a href="/#reviews" onClick={close}>Reviews</a>
          <Link href="/dashboard" onClick={close}>My bookings</Link>
        </nav>
        <div className="nav-actions">
          <Link className="btn btn-light btn-small" href="/login">Log in</Link>
          <Link className="btn btn-primary btn-small" href="/book">Book a service <ArrowRight size={15}/></Link>
          <button className="menu-button" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
        </div>
      </div>
    </header>
  );
}
