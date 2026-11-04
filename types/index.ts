export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  icon: string;
  duration: string;
};

export type Booking = {
  id: string;
  service: string;
  location: string;
  date: string;
  time: string;
  notes: string;
  status: string;
  price: number;
};
