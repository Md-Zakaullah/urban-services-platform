"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Paintbrush, Sofa, Sparkles, Star, Wind, Wrench, Zap, Leaf } from "lucide-react";
import { services } from "@/data/services";

const categories = ["All services", "Cleaning", "Repairs", "Appliance", "Beauty", "Wellness", "Home projects"];
const icons = { sparkles: Sparkles, sofa: Sofa, wrench: Wrench, zap: Zap, wind: Wind, heart: Heart, leaf: Leaf, paintbrush: Paintbrush };

export default function ServiceCatalog({ compact = false }: { compact?: boolean }) {
  const [category, setCategory] = useState("All services");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => services.filter((service) => {
    const matchesCategory = category === "All services" || service.category === category;
    const matchesQuery = `${service.name} ${service.description} ${service.category}`.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  }), [category, query]);

  return <div>
    {!compact && <div className="form-field" style={{ maxWidth: 380, marginBottom: 20 }}><label htmlFor="service-search">Find a service</label><input id="service-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try cleaning or AC service" /></div>}
    <div className="categories" aria-label="Filter services">
      {categories.map((item) => <button key={item} className={`category-chip ${category === item ? "active" : ""}`} onClick={() => setCategory(item)}>{item}</button>)}
    </div>
    <div className="service-grid">
      {visible.slice(0, compact ? 4 : undefined).map((service) => {
        const Icon = icons[service.icon as keyof typeof icons];
        return <article className="service-card" key={service.id}>
          <div className="service-icon"><Icon size={22} strokeWidth={1.8}/></div>
          <h3>{service.name}</h3><p>{service.description}</p>
          <div className="service-card-foot"><span className="rating"><Star size={14} fill="currentColor"/> {service.rating} <span className="muted">({service.reviews.toLocaleString()})</span></span><span className="price">From ₹{service.price}</span></div>
          <Link className="service-link" href={`/book?service=${service.id}`}>Book this service <ArrowRight size={14}/></Link>
        </article>;
      })}
    </div>
    {visible.length === 0 && <div className="empty-state">No services match that search. Try another category or keyword.</div>}
  </div>;
}
