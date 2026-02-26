import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Upload, Info, Download, Loader2, Truck } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function Quote() {
  const location = useLocation();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);
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

  const handleDownload = async () => {
    if (!summaryRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(summaryRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const area = clonedDoc.getElementById('summary-capture-area');
          if (area) {
            area.style.backgroundColor = '#ffffff';
            area.style.color = '#111111';
            area.querySelectorAll('*').forEach((node) => {
              const element = node as HTMLElement;
              if (element.style.color.includes('oklab')) {
                element.style.color = '#111111';
              }
            });
          }
        }
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`EastWest-Quote-Request-${Date.now()}.pdf`);
    } catch (error) {
      console.error('PDF Error:', error);
      alert('Failed to generate PDF summary.');
    } finally {
      setIsDownloading(false);
    }
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

                {submitError && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm mb-6">
                    {submitError}
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="btn-primary w-full py-4 text-lg disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Send size={20} />
                  )}
                  {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-8 md:p-16 text-center"
            >
              <div className="bg-emerald-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                <CheckCircle size={48} className="text-emerald-500" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Request Received!</h2>
              <p className="text-white/50 text-lg mb-10 max-w-md mx-auto">
                Thank you for choosing EastWest. Our sales team will contact you at <span className="text-white font-bold">{formData.email}</span> within 24 hours.
              </p>

              {/* Hidden Summary for PDF */}
              <div className="hidden">
                <div 
                  ref={summaryRef} 
                  id="summary-capture-area"
                  style={{ backgroundColor: '#ffffff', color: '#111111' }}
                  className="p-12 w-[800px]"
                >
                  <div className="flex justify-between items-start mb-12 border-b border-charcoal/10 pb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#1B365D] p-3 rounded-xl">
                        <Truck className="text-[#F9D71C] w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tighter leading-none">EASTWEST</h2>
                        <p className="text-[10px] text-[#1B365D] font-bold tracking-[0.2em] uppercase">Truck & Trailer Parts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h1 className="text-3xl font-black text-[#1B365D] uppercase mb-2">Quote Request</h1>
                      <p className="text-sm text-charcoal/50">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-2">Customer Details</h4>
                        <p className="font-bold">{formData.contactPerson}</p>
                        <p className="text-sm">{formData.company}</p>
                        <p className="text-sm">{formData.email}</p>
                        <p className="text-sm">{formData.phone}</p>
                      </div>
                      <div className="text-right">
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-2">Part Requested</h4>
                        <p className="font-bold">{formData.partName}</p>
                        <p className="text-sm">Brand: {formData.brand || 'Not specified'}</p>
                        <p className="text-sm">Quantity: {formData.quantity}</p>
                      </div>
                    </div>
                    
                    <div className="pt-8 border-t border-charcoal/10">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-2">Additional Notes</h4>
                      <p className="text-sm leading-relaxed">{formData.message || 'No additional notes provided.'}</p>
                    </div>
                  </div>
                  
                  <div className="mt-20 pt-8 border-t border-charcoal/10 text-center">
                    <p className="text-[10px] text-charcoal/40">EastWest Truck & Trailer Parts • 121 High Road, Pomona, Kempton Park • 011 524 6095</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="btn-primary px-10 flex items-center gap-2"
                >
                  {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                  Download Summary
                </button>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn-secondary px-10"
                >
                  Back to Form
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
