import { Product, Brand, Testimonial } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Mercedes-Benz Actros Brake Pads',
    category: 'Truck Parts',
    subCategory: 'Brake Systems',
    brand: 'Mercedes-Benz',
    price: 1850,
    description: 'Heavy Duty Set for long-haul performance.',
    image: 'https://picsum.photos/seed/brake/400/300',
    stockStatus: 'In Stock'
  },
  {
    id: '2',
    name: 'Volvo FH Air Suspension Bag',
    category: 'Truck Parts',
    subCategory: 'Suspension Parts',
    brand: 'Volvo Trucks',
    price: 3250,
    description: 'OEM Quality air spring for smooth ride.',
    image: 'https://picsum.photos/seed/suspension/400/300',
    stockStatus: 'In Stock'
  },
  {
    id: '3',
    name: 'Scania R-Series Clutch Kit',
    category: 'Truck Parts',
    subCategory: 'Clutch & Transmission',
    brand: 'Scania',
    price: 6800,
    description: 'Complete Assembly for reliable shifting.',
    image: 'https://picsum.photos/seed/clutch/400/300',
    stockStatus: 'Limited'
  },
  {
    id: '4',
    name: 'BPW Trailer Axle Bearing Kit',
    category: 'Trailer Parts',
    subCategory: 'Axles',
    brand: 'BPW Group',
    price: 2400,
    description: 'Premium Steel bearings for trailer axles.',
    image: 'https://picsum.photos/seed/bearing/400/300',
    stockStatus: 'In Stock'
  },
  {
    id: '5',
    name: 'SAF-Holland King Pin Kit',
    category: 'Trailer Parts',
    subCategory: 'King Pins',
    brand: 'SAF-Holland',
    price: 1150,
    description: 'Heavy Load Spec for secure coupling.',
    image: 'https://picsum.photos/seed/kingpin/400/300',
    stockStatus: 'On Order'
  },
  {
    id: '6',
    name: 'Hendrickson Shock Absorber',
    category: 'Trailer Parts',
    subCategory: 'Suspension Parts',
    brand: 'Hendrickson',
    price: 980,
    description: 'Trailer Spec damping for cargo protection.',
    image: 'https://picsum.photos/seed/shock/400/300',
    stockStatus: 'In Stock'
  }
];

export const BRANDS: Brand[] = [
  { name: 'Mercedes-Benz', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Mercedes-Benz_Logo_2010.svg/1024px-Mercedes-Benz_Logo_2010.svg.png' },
  { name: 'Volvo Trucks', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Volvo-Iron-Mark-Black.svg/1200px-Volvo-Iron-Mark-Black.svg.png' },
  { name: 'Scania', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Scania_logo.svg/1200px-Scania_logo.svg.png' },
  { name: 'MAN Truck & Bus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/MAN_Logo.svg/1200px-MAN_Logo.svg.png' },
  { name: 'DAF Trucks', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/DAF_Trucks_logo.svg/1200px-DAF_Trucks_logo.svg.png' },
  { name: 'BPW Group', logo: 'https://www.bpw.de/fileadmin/templates/images/logo_bpw.png' },
  { name: 'SAF-Holland', logo: 'https://safholland.com/images/saf-holland-logo.svg' },
  { name: 'Hendrickson', logo: 'https://www.hendrickson-intl.com/Images/HendricksonLogo.png' }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Johan Venter',
    company: 'Logistics Company, Gauteng',
    text: 'Reliable service and quality parts every time. EastWest keeps our fleet moving.'
  },
  {
    id: '2',
    name: 'Sarah Mokoena',
    company: 'Express Freight SA',
    text: 'The team at EastWest really knows their stuff. Expert advice and competitive pricing.'
  }
];
