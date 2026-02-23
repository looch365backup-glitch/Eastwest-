import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-white/10 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-accent p-2 rounded-lg">
              <Truck className="text-charcoal w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tighter leading-none">EASTWEST</span>
              <span className="text-[10px] text-accent font-bold tracking-[0.2em] uppercase">Truck & Trailer Parts</span>
            </div>
          </Link>
          <p className="text-white/50 text-sm leading-relaxed">
            Powering South Africa's trucks and trailers with premium quality spare parts. Reliable service for the long haul.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/p/East-West-Truck-and-Trailer-Parts-100070069072181/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-accent transition-colors"><Facebook size={20} /></a>
            <a href="https://www.instagram.com/eastwesttruckandtrailerparts/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-accent transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-white/50 hover:text-accent transition-colors"><Linkedin size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/products" className="hover:text-accent transition-colors">Products</Link></li>
            <li><Link to="/brands" className="hover:text-accent transition-colors">Brands</Link></li>
            <li><Link to="/quote" className="hover:text-accent transition-colors">Request a Quote</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-white font-bold mb-6">Parts Categories</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li><Link to="/products?cat=truck" className="hover:text-accent transition-colors">Truck Parts</Link></li>
            <li><Link to="/products?cat=trailer" className="hover:text-accent transition-colors">Trailer Parts</Link></li>
            <li><Link to="/products?cat=engine" className="hover:text-accent transition-colors">Engine Components</Link></li>
            <li><Link to="/products?cat=brake" className="hover:text-accent transition-colors">Brake Systems</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold mb-6">Contact Us</h4>
          <ul className="space-y-4 text-sm text-white/50">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-accent shrink-0" />
              <span>121 High Road, Pomona, Bredell, Kempton Park, Gauteng 1619</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-accent shrink-0" />
              <a href="tel:0115246095" className="hover:text-accent transition-colors">011 524 6095</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-accent shrink-0" />
              <a href="mailto:ewtt108@gmail.com" className="hover:text-accent transition-colors">ewtt108@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/30">
        <p>© 2026 EastWest Truck & Trailer Parts. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
