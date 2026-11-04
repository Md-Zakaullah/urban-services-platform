import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarCheck, Clock3, ShieldCheck, Sparkles, Star } from "lucide-react";
import ServiceCatalog from "@/components/service-catalog";

export default function HomePage() {
  return <main>
    <section className="hero"><div className="container">
      <div className="hero-grid">
        <div><div className="eyebrow"><span className="eyebrow-dot"/> A little more care, every day</div>
          <h1 className="display">Your home,<br/><em>sorted.</em></h1>
          <p className="hero-copy">From the quick fixes to the big refreshes, book trusted local experts and make more room for the things you love.</p>
          <div className="hero-actions"><Link className="btn btn-primary" href="/services">Explore services <ArrowRight size={17}/></Link><Link className="btn btn-light" href="/book">Book in minutes</Link></div>
          <div className="hero-proof"><div className="avatar-stack"><span className="avatar-dot">AK</span><span className="avatar-dot">RM</span><span className="avatar-dot">SJ</span></div><span><strong>4.9/5</strong> average from happy homes</span></div>
        </div>
        <div className="hero-art" aria-label="Illustration of a home service professional">
          <div className="art-orb"/><div className="art-window"/><div className="person-shape"/>
          <div className="floating-note note-top"><strong><BadgeCheck size={15} style={{display:"inline",verticalAlign:"middle",color:"#176c55"}}/> Thoughtfully vetted</strong><small>Experts you can feel good about</small></div>
          <div className="floating-note note-bottom"><strong>Home deep clean</strong><div className="note-stars"><Star size={13} fill="currentColor" style={{display:"inline"}}/> 4.9 <small> · 1.2k reviews</small></div></div>
        </div>
      </div>
      <form className="search-panel" action="/services">
        <div className="search-field"><label htmlFor="service">What do you need?</label><select id="service" name="q" defaultValue=""><option value="">Browse services</option><option>Cleaning</option><option>Repairs</option><option>AC service</option><option>Beauty</option></select></div>
        <div className="search-field"><label htmlFor="city">Your city</label><input id="city" name="city" placeholder="e.g. Bengaluru"/></div>
        <div className="search-field"><label htmlFor="postcode">Area or PIN code</label><input id="postcode" name="area" placeholder="Enter your area"/></div>
        <button className="btn btn-dark" type="submit">Find help <ArrowRight size={16}/></button>
      </form>
    </div></section>

    <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">A good place to start</div><h2 className="section-title display">Popular around you</h2></div><Link className="text-link" href="/services">See all services <ArrowRight size={15} style={{display:"inline",verticalAlign:"middle"}}/></Link></div><ServiceCatalog compact/></div></section>

    <section className="section" id="how-it-works"><div className="container feature-band"><div><div className="eyebrow" style={{color:"#d8f36a"}}>Home help, made human</div><h2 className="section-title display">Good people.<br/>Good work.<br/>Good to go.</h2><p>We make it easy to find the right help, understand the price and feel looked after from booking to done.</p><Link className="btn btn-lime" href="/services">Meet your next pro <ArrowRight size={16}/></Link></div><div className="feature-list"><div className="feature-item"><ShieldCheck/><strong>People-first vetting</strong><span>Profiles are reviewed so you can book with more confidence.</span></div><div className="feature-item"><CalendarCheck/><strong>Slots that fit your day</strong><span>Pick a time that works for your home and routine.</span></div><div className="feature-item"><Clock3/><strong>Clear arrival updates</strong><span>Know what to expect before your appointment begins.</span></div><div className="feature-item"><Sparkles/><strong>Care in the details</strong><span>Helpful service descriptions and upfront starting prices.</span></div></div></div></section>

    <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">Simple from the start</div><h2 className="section-title display">Three steps to a<br/>better home day.</h2></div></div><div className="steps-grid"><article className="step-card"><span className="step-num">01 — Find your service</span><h3>Tell us what needs doing</h3><p>Browse a service and choose the kind of help that suits your home.</p></article><article className="step-card"><span className="step-num">02 — Pick a time</span><h3>Make it work for you</h3><p>Share your location and select a convenient appointment slot.</p></article><article className="step-card"><span className="step-num">03 — Put your feet up</span><h3>We’ll take it from here</h3><p>Get your booking details and see it all in your bookings dashboard.</p></article></div></div></section>

    <section className="section" id="reviews"><div className="container"><div className="section-head"><div><div className="eyebrow">Kind words, good work</div><h2 className="section-title display">A happier home<br/>speaks for itself.</h2></div><span className="section-subtitle"><Star size={15} fill="currentColor" style={{display:"inline",color:"#d39d27"}}/> 4.9 average customer rating</span></div><div className="review-grid"><article className="review-card"><div className="review-stars">★★★★★</div><p>“Booking was straightforward and the cleaner was lovely. My kitchen looks brand new again.”</p><div className="review-person">Ananya R.<span>Bengaluru · Home cleaning</span></div></article><article className="review-card"><div className="review-stars">★★★★★</div><p>“The electrician explained the issue clearly and sorted it without any fuss. Really appreciated that.”</p><div className="review-person">Rohit M.<span>Hyderabad · Repairs</span></div></article><article className="review-card"><div className="review-stars">★★★★★</div><p>“Found a time that worked for me, and the whole experience felt thoughtful from beginning to end.”</p><div className="review-person">Sana K.<span>Pune · At-home beauty</span></div></article></div></div></section>

    <section className="section" style={{paddingTop:0}}><div className="container cta-band"><div><h2 className="display">Your next good home day starts here.</h2><p>Find the right help for the jobs on your list.</p></div><Link className="btn btn-dark" href="/book">Book a service <ArrowRight size={16}/></Link></div></section>
  </main>;
}
