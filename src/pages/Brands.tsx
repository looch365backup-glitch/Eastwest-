import React from 'react';
import { motion } from 'motion/react';
import { BRANDS } from '../constants';
import { ExternalLink } from 'lucide-react';

export default function Brands() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl mb-6">Brands We Support</h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            We supply high-quality spare parts for all major commercial vehicle manufacturers, ensuring global standards for the South African market.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BRANDS.map((brand, i) => (
            <motion.div
              key={brand.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass-card p-10 flex flex-col items-center justify-center group hover:border-accent/50 transition-all"
            >
              <div className="h-24 flex items-center justify-center mb-8">
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-xl font-bold mb-4">{brand.name}</h3>
              <div className="w-10 h-1 bg-accent/20 group-hover:w-full group-hover:bg-accent transition-all duration-500 rounded-full" />
            </motion.div>
          ))}
        </div>

        <section className="mt-32 glass-card p-12 text-center">
          <h2 className="text-3xl mb-6">Don't see your brand?</h2>
          <p className="text-white/50 mb-10 max-w-xl mx-auto">
            We source parts for a wide variety of specialized trailer brands and niche truck models. Contact us to check availability for your specific vehicle.
          </p>
          <a href="tel:0115246095" className="btn-secondary inline-flex">
            Inquire About Other Brands
            <ExternalLink size={18} />
          </a>
        </section>
      </div>
    </div>
  );
}
