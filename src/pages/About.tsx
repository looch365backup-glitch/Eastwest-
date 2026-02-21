import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Award, History } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Story Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-accent font-bold uppercase tracking-widest text-sm mb-4 block">Our Story</span>
            <h1 className="text-4xl md:text-6xl mb-8 leading-tight">Reliable Partners for the <span className="text-accent">Long Haul</span></h1>
            <p className="text-white/60 text-lg mb-6 leading-relaxed">
              Based in the heart of Gauteng's logistics hub, EastWest Truck & Trailer Parts has grown from a local supplier to a trusted nationwide partner for commercial vehicle operators.
            </p>
            <p className="text-white/60 text-lg mb-10 leading-relaxed">
              We understand that every hour your truck is off the road is an hour of lost revenue. That's why we've dedicated ourselves to sourcing only the highest quality genuine and aftermarket parts, ensuring your fleet stays moving efficiently and safely.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold text-accent mb-1">10+</h4>
                <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Years Experience</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-accent mb-1">5000+</h4>
                <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Parts in Stock</p>
              </div>
            </div>
          </motion.div>
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
            <img
              src="https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?auto=format&fit=crop&q=80&w=1000"
              alt="Logistics Hub"
              className="rounded-2xl shadow-2xl relative z-10 border border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </section>

        {/* Values */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Quality First', icon: Shield, desc: 'We never compromise on the integrity of our components.' },
              { title: 'Client Focused', icon: Users, desc: 'Your fleet success is our primary motivation.' },
              { title: 'Expertise', icon: Award, desc: 'Deep technical knowledge across all major truck brands.' },
              { title: 'Reliability', icon: History, desc: 'Consistent service you can count on, day in and day out.' }
            ].map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 text-center"
              >
                <div className="bg-accent/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <v.icon className="text-accent" size={32} />
                </div>
                <h3 className="text-xl mb-3">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team CTA */}
        <section className="glass-card p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-4xl mb-6">Need Technical Advice?</h2>
            <p className="text-white/50 text-lg">
              Our experienced team is ready to help you identify the exact part you need for your specific vehicle model.
            </p>
          </div>
          <Link to="/contact" className="btn-primary px-10 text-lg shrink-0">Talk to an Expert</Link>
        </section>
      </div>
    </div>
  );
}
