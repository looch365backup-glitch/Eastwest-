import React from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16">
          <h1 className="text-4xl md:text-5xl mb-4">Contact Us</h1>
          <p className="text-white/50 max-w-2xl">
            Have questions about a specific part or need technical advice? Reach out to our expert team in Kempton Park.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card p-8"
              >
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Phone className="text-accent" />
                </div>
                <h3 className="font-bold mb-2">Call Us</h3>
                <p className="text-sm text-white/50 mb-4">Direct line to our sales desk.</p>
                <div className="space-y-1">
                  <a href="tel:0115246095" className="block font-bold hover:text-accent transition-colors">011 524 6095</a>
                  <a href="tel:0835636779" className="block font-bold hover:text-accent transition-colors">083 563 6779</a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card p-8"
              >
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  <Mail className="text-accent" />
                </div>
                <h3 className="font-bold mb-2">Email Us</h3>
                <p className="text-sm text-white/50 mb-4">For detailed inquiries & quotes.</p>
                <a href="mailto:ewtt108@gmail.com" className="block font-bold hover:text-accent transition-colors">ewtt108@gmail.com</a>
              </motion.div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Visit Our Warehouse</h3>
                  <p className="text-white/50 leading-relaxed mb-4">
                    121 High Road, Pomona, Bredell,<br />
                    Kempton Park, Gauteng 1619,<br />
                    South Africa
                  </p>
                  <a 
                    href="https://www.google.com/maps/search/121+High+Road,+Pomona,+Bredell,+Kempton+Park" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-accent font-bold hover:underline inline-flex items-center gap-2"
                  >
                    Get Directions <MessageSquare size={14} />
                  </a>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <div className="flex items-start gap-6">
                <div className="bg-accent/10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="text-accent" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm">
                    <span className="text-white/50">Monday - Friday</span>
                    <span className="font-bold">08:00 - 17:00</span>
                    <span className="text-white/50">Saturday</span>
                    <span className="font-bold">08:00 - 13:00</span>
                    <span className="text-white/50">Sunday</span>
                    <span className="text-accent font-bold">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="glass-card overflow-hidden h-full min-h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.585157140417!2d28.275143!3d-26.079234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e951475c8799999%3A0x0!2zMjbCsDA0JzQ1LjIiUyAyOMKwMTYnMzAuNSJF!5e0!3m2!1sen!2sza!4v1700000000000!5m2!1sen!2sza"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EastWest Location"
            />
            <div className="absolute top-6 left-6 bg-charcoal/90 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-2xl max-w-xs">
              <h4 className="font-bold text-accent mb-1">EastWest Truck & Trailer</h4>
              <p className="text-xs text-white/50">121 High Road, Pomona, Kempton Park</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
