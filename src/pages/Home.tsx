import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Zap, Truck, Globe, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS, TESTIMONIALS } from '../constants';
import ProductCard from '../components/ProductCard';
import BrandCarousel from '../components/BrandCarousel';

const FEATURES = [
  {
    title: 'Genuine & Aftermarket',
    description: 'High-quality parts for all major commercial brands.',
    icon: ShieldCheck
  },
  {
    title: 'Competitive Pricing',
    description: 'Best rates in Gauteng for premium truck components.',
    icon: Zap
  },
  {
    title: 'Fast Turnaround',
    description: 'Quick processing to keep your fleet on the road.',
    icon: Truck
  },
  {
    title: 'Nationwide Supply',
    description: 'We deliver across South Africa and neighboring regions.',
    icon: Globe
  },
  {
    title: 'Expert Support',
    description: 'Professional advice from industry specialists.',
    icon: Headphones
  }
];

export default function Home() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=2000"
            alt="Truck Workshop"
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-block bg-accent/20 text-accent px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              Premium Truck & Trailer Parts
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.1] mb-6 tracking-tight">
              Powering South Africa's <span className="text-accent">Trucks & Trailers</span> with Quality Parts
            </h1>
            <p className="text-lg md:text-xl text-white/60 mb-10 leading-relaxed max-w-xl">
              Premium spare parts for leading truck and trailer brands. We provide the reliability you need for the long haul.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products" className="btn-primary text-lg px-8">
                View Products
                <ArrowRight size={20} />
              </Link>
              <Link to="/quote" className="btn-secondary text-lg px-8">
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-6 bg-steel/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Why Choose EastWest?</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {FEATURES.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-card p-8 text-center group hover:bg-steel transition-colors"
              >
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-accent w-8 h-8" />
                </div>
                <h3 className="text-lg mb-3">{feature.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl mb-4">Featured Products</h2>
              <p className="text-white/50">Our most popular high-performance components.</p>
            </div>
            <Link to="/products" className="text-accent font-bold flex items-center gap-2 hover:gap-3 transition-all group">
              View All Products <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PRODUCTS.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Carousel */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl mb-4">Trusted by Leading Brands</h2>
          <p className="text-white/50">We supply parts for the world's most reliable commercial vehicles.</p>
        </div>
        <BrandCarousel />
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 bg-steel/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl mb-8 leading-tight">
                What Our Clients Say About Our <span className="text-accent">Reliability</span>
              </h2>
              <p className="text-white/50 text-lg mb-8">
                We take pride in keeping South African logistics moving. Our commitment to quality and service is reflected in our client feedback.
              </p>
              <Link to="/about" className="btn-secondary inline-flex">Learn More About Us</Link>
            </div>
            <div className="space-y-6">
              {TESTIMONIALS.map((t) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 relative"
                >
                  <div className="text-accent text-6xl absolute top-4 right-8 opacity-20 font-serif">"</div>
                  <p className="text-lg italic mb-6 relative z-10">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center font-bold text-accent">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-xs text-white/40 uppercase tracking-widest">{t.company}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-card p-8 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-accent" />
          <h2 className="text-3xl md:text-5xl mb-6 font-black tracking-tighter">Ready to Get Your Fleet Back on the Road?</h2>
          <p className="text-white/60 text-base md:text-lg mb-10 max-w-2xl mx-auto">
            Contact our expert sales team today for a custom quote or stock availability check.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/quote" className="btn-primary text-lg px-10 py-4">Request a Quote</Link>
            <Link to="/contact" className="btn-secondary text-lg px-10 py-4">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
