import { LucideIcon } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  category: 'Truck Parts' | 'Trailer Parts';
  subCategory: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  stockStatus: 'In Stock' | 'Limited' | 'On Order';
}

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  text: string;
}

export interface Brand {
  name: string;
  logo: string;
}
