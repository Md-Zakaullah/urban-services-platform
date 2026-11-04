import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function Footer() {
  return <footer className="site-footer"><div className="container footer-row"><Link href="/" className="brand"><span className="brand-mark">u.</span><span>urbannest</span></Link><span>Thoughtful help for a happier home.</span><div className="footer-links"><Link href="/services">Services</Link><Link href="/dashboard">Bookings</Link><Link href="/admin">Admin demo <ArrowUpRight size={13}/></Link></div><span>© {new Date().getFullYear()} UrbanNest</span></div></footer>;
}
