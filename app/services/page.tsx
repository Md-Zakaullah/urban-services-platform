import ServiceCatalog from "@/components/service-catalog";
export default function ServicesPage() {
  return <main><section className="page-hero"><div className="container"><div className="eyebrow">Browse the good stuff</div><h1 className="display">A little help goes<br/>a long way.</h1><p>Explore services for the everyday fixes, deeper cleans and feel-good moments at home. Search or filter to find what you need.</p></div></section><section className="section" style={{paddingTop:10}}><div className="container"><ServiceCatalog/></div></section></main>;
}
