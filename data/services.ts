import type { Service } from "@/types";

export const services: Service[] = [
  { id: "deep-clean", name: "Home deep cleaning", category: "Cleaning", description: "A top-to-bottom refresh for kitchens, bathrooms, floors and all the little details.", price: 1499, rating: 4.9, reviews: 1240, icon: "sparkles", duration: "3–4 hours" },
  { id: "sofa-clean", name: "Sofa & upholstery", category: "Cleaning", description: "Fabric-safe vacuuming and shampoo treatment for a fresher, cleaner sofa.", price: 799, rating: 4.8, reviews: 832, icon: "sofa", duration: "1–2 hours" },
  { id: "plumbing", name: "Plumbing repair", category: "Repairs", description: "Get help with taps, leaks, drains and everyday plumbing fixes.", price: 249, rating: 4.8, reviews: 967, icon: "wrench", duration: "45–90 min" },
  { id: "electrician", name: "Electrician", category: "Repairs", description: "Safe, reliable help for switches, fans, lights and minor electrical work.", price: 249, rating: 4.9, reviews: 719, icon: "zap", duration: "45–90 min" },
  { id: "ac-service", name: "AC service", category: "Appliance", description: "A complete split AC check-up, filter clean and performance tune-up.", price: 599, rating: 4.8, reviews: 1105, icon: "wind", duration: "60–90 min" },
  { id: "beauty", name: "At-home facial", category: "Beauty", description: "A relaxing, expert-led facial using skin-friendly professional products.", price: 999, rating: 4.9, reviews: 643, icon: "heart", duration: "60 min" },
  { id: "massage", name: "Relaxing massage", category: "Wellness", description: "Bring a little calm home with a professional wellness session.", price: 1299, rating: 4.9, reviews: 508, icon: "leaf", duration: "60 min" },
  { id: "painting", name: "Wall painting consult", category: "Home projects", description: "Get expert advice and a clear estimate for your next room refresh.", price: 199, rating: 4.7, reviews: 284, icon: "paintbrush", duration: "30 min" },
];
