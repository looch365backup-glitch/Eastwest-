import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Upload, Info } from 'lucide-react';

export default function Quote() {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    contactPerson: '',
    phone: '',
    email: '',
    brand: '',
    partName: '',
    quantity: '1',
    message: ''
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const part = params.get('part');
    if (part) {
      setFormData(prev => ({ ...prev, partName: part }));
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setIsSubmitted(true), 1000);
  };

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl mb-4">Request a Quote</h1>
          <p className="text-white/50 max-w-2xl mx-auto">
            Fill out the form below and our sales team will get back to you with a competitive quote within 24 hours.
          </p>
        </header>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-card p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Company Info */}
                  <div className="space-y-6">
                    <h3 className="text-accent font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                      <Info size={14} />
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-white/40 uppercase mb-2">Company Name</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                          placeholder="Your Company Ltd"
                          value={formData.company}
                          onChange={e => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-white/40 uppercase mb-2">Contact Person</label>
                        <input
                          required
                          type="text"
                          className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                          placeholder="John Doe"
                          value={formData.contactPerson}
                          onChange={e => setFormData({...formData, contactPerson: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase mb-2">Phone Number</label>
                          <input
                            required
                            type="tel"
                            className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                            placeholder="083 123 4567"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
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
                    </div>
                  </div>

                  {/* Part Info */}
                  <div className="space-y-6">
                    <h3 className="text-accent font-bold uppercase tracking-widest text-xs flex items-center gap-2">
                      <Info size={14} />
                      Part Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-white/40 uppercase mb-2">Select Brand</label>
                        <select
                          className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors appearance-none"
                          value={formData.brand}
                          onChange={e => setFormData({...formData, brand: e.target.value})}
                        >
                          <option value="">Choose a brand...</option>
                          <option value="mercedes">Mercedes-Benz</option>
                          <option value="volvo">Volvo Trucks</option>
                          <option value="scania">Scania</option>
                          <option value="man">MAN</option>
                          <option value="daf">DAF</option>
                          <option value="other">Other / Trailer Brand</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-white/40 uppercase mb-2">Part Name / Number</label>
                          <input
                            required
                            type="text"
                            className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                            placeholder="e.g. Brake Pads"
                            value={formData.partName}
                            onChange={e => setFormData({...formData, partName: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-white/40 uppercase mb-2">Qty</label>
                          <input
                            type="number"
                            min="1"
                            className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors"
                            value={formData.quantity}
                            onChange={e => setFormData({...formData, quantity: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-white/40 uppercase mb-2">Upload Photo / Spec (Optional)</label>
                        <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center hover:border-accent transition-colors cursor-pointer">
                          <Upload className="mx-auto text-white/20 mb-2" />
                          <p className="text-xs text-white/40">Drop files here or click to upload</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                  <label className="block text-xs font-bold text-white/40 uppercase mb-2">Additional Message</label>
                  <textarea
                    rows={4}
                    className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Any other details or specific requirements..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  <Send size={20} />
                  Submit Quote Request
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-16 text-center"
            >
              <div className="bg-emerald-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
              <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
                Thank you for choosing EastWest. Our sales team will contact you at <span className="text-white font-bold">{formData.email}</span> within 24 hours.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="btn-secondary px-10"
              >
                Back to Products
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
