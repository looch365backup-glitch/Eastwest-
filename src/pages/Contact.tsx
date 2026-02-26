import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle, Loader2 } from 'lucide-react';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('https://formspree.io/f/xjgelevq', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        if (data.errors) {
          setSubmitError(data.errors.map((error: any) => error.message).join(', '));
        } else {
          setSubmitError('Oops! There was a problem submitting your form');
        }
      }
    } catch (error) {
      setSubmitError('Oops! There was a problem submitting your form');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl mb-4 font-black tracking-tighter">Contact Us</h1>
          <p className="text-white/50 max-w-2xl mx-auto md:mx-0 text-lg">
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
          <div className="space-y-8">
            <div className="glass-card overflow-hidden h-[400px] relative">
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

            {/* Contact Form */}
            <div className="glass-card p-8">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <MessageSquare className="text-accent" />
                      Send us a Message
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase mb-2">Your Name</label>
                          <input
                            required
                            type="text"
                            className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase mb-2">Email Address</label>
                          <input
                            required
                            type="email"
                            className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-white/40 uppercase mb-2">Subject</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                          placeholder="How can we help?"
                          value={formData.subject}
                          onChange={e => setFormData({...formData, subject: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-white/40 uppercase mb-2">Message</label>
                        <textarea
                          required
                          rows={4}
                          className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors resize-none"
                          placeholder="Your message here..."
                          value={formData.message}
                          onChange={e => setFormData({...formData, message: e.target.value})}
                        />
                      </div>

                      {submitError && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm">
                          {submitError}
                        </div>
                      )}

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="btn-primary w-full py-4 disabled:opacity-50"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="bg-emerald-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle size={32} className="text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-white/50 mb-8">We'll get back to you as soon as possible.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-accent font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
