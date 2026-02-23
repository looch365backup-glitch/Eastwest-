import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, FileText, Download, Printer, Truck, Calculator, Loader2 } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface QuoteItem {
  product: Product;
  quantity: number;
}

export default function QuoteBuilder() {
  const [items, setItems] = useState<QuoteItem[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [quoteNumber] = useState(() => `EW-${Math.floor(10000 + Math.random() * 90000)}`);
  const [date] = useState(() => new Date().toLocaleDateString('en-ZA'));
  const quoteRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    const product = PRODUCTS.find(p => p.id === selectedProductId);
    if (product) {
      const existing = items.find(i => i.product.id === product.id);
      if (existing) {
        setItems(items.map(i => i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      } else {
        setItems([...items, { product, quantity: 1 }]);
      }
      setSelectedProductId('');
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.product.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;
    setItems(items.map(i => i.product.id === id ? { ...i, quantity: qty } : i));
  };

  const subtotal = useMemo(() => items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0), [items]);
  const vat = subtotal * 0.15;
  const total = subtotal + vat;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = async () => {
    if (!quoteRef.current) return;
    
    setIsDownloading(true);
    try {
      const element = quoteRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        ignoreElements: (el) => el.classList.contains('no-print'),
        onclone: (clonedDoc) => {
          const area = clonedDoc.getElementById('quote-capture-area');
          if (area) {
            area.style.backgroundColor = '#ffffff';
            area.style.color = '#111111';
            // Force all text to use standard colors in the clone
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
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`EastWest-Quote-${quoteNumber}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try printing to PDF instead.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <header className="mb-12 no-print">
          <h1 className="text-4xl md:text-5xl mb-4">Instant Quote Builder</h1>
          <p className="text-white/50 max-w-2xl">
            Select parts from our inventory to generate an official quote instantly. You can print or download the result for your records.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Builder Controls */}
          <div className="lg:col-span-1 space-y-8 no-print">
            <div className="glass-card p-6 space-y-6">
              <h3 className="font-bold flex items-center gap-2 text-accent">
                <Plus size={18} />
                Add Parts
              </h3>
              <div className="space-y-4">
                <select
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="w-full bg-charcoal border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
                >
                  <option value="">Select a part...</option>
                  {PRODUCTS.map(p => (
                    <option key={p.id} value={p.id}>{p.name} - R{p.price.toLocaleString()}</option>
                  ))}
                </select>
                <button
                  onClick={addItem}
                  disabled={!selectedProductId}
                  className="btn-primary w-full disabled:opacity-50"
                >
                  Add to Quote
                </button>
              </div>
            </div>

            <div className="glass-card p-6 space-y-6">
              <h3 className="font-bold flex items-center gap-2 text-accent">
                <Calculator size={18} />
                Summary
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-white/50">
                  <span>Subtotal</span>
                  <span>R {subtotal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>VAT (15%)</span>
                  <span>R {vat.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="pt-3 border-t border-white/10 flex justify-between font-bold text-lg text-accent">
                  <span>Total</span>
                  <span>R {total.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
              <button
                onClick={() => setIsGenerated(true)}
                disabled={items.length === 0}
                className="btn-secondary w-full disabled:opacity-50"
              >
                {isGenerated ? 'Update Generated Quote' : 'Generate Official Quote'}
              </button>
              {isGenerated && (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                  Download PDF Quote
                </button>
              )}
            </div>
          </div>

          {/* Quote Preview / List */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {!isGenerated ? (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 no-print"
                >
                  {items.length > 0 ? (
                    items.map((item) => (
                      <div key={item.product.id} className="glass-card p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group">
                        <div className="flex items-center gap-4 w-full sm:w-auto">
                          <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <img 
                              src={item.product.image} 
                              className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500" 
                              referrerPolicy="no-referrer" 
                            />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-bold text-sm line-clamp-1">{item.product.name}</h4>
                            <p className="text-xs text-white/40">{item.product.brand}</p>
                            <p className="text-xs text-accent font-bold sm:hidden mt-1">R {item.product.price.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between w-full sm:w-auto gap-6 sm:gap-6 border-t border-white/5 pt-4 sm:pt-0 sm:border-none">
                          <div className="flex items-center gap-3 bg-charcoal rounded-lg p-1 border border-white/5">
                            <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-accent transition-colors">
                              {item.quantity === 1 ? <Trash2 size={14} className="text-red-500/50" /> : <Trash2 size={14} />}
                            </button>
                            <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-accent transition-colors"><Plus size={14} /></button>
                          </div>
                          <div className="text-right min-w-[100px]">
                            <p className="text-sm font-bold">R {(item.product.price * item.quantity).toLocaleString()}</p>
                          </div>
                          <button onClick={() => removeItem(item.product.id)} className="text-white/20 hover:text-red-500 transition-colors hidden sm:block">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="glass-card p-20 text-center border-dashed">
                      <FileText size={48} className="mx-auto text-white/10 mb-4" />
                      <p className="text-white/40">Your quote list is empty. Add parts from the sidebar to begin.</p>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="quote"
                  ref={quoteRef}
                  id="quote-capture-area"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ backgroundColor: '#ffffff', color: '#111111' }}
                  className="p-8 md:p-12 rounded-xl shadow-2xl relative print:m-0 print:p-0 print:shadow-none"
                >
                  {/* Quote Header */}
                  <div className="flex justify-between items-start mb-12 border-b border-charcoal/10 pb-8">
                    <div className="flex items-center gap-3">
                      <div className="bg-brand-blue p-3 rounded-xl">
                        <Truck className="text-accent w-8 h-8" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-black tracking-tighter leading-none">EASTWEST</h2>
                        <p className="text-[10px] text-brand-blue font-bold tracking-[0.2em] uppercase">Truck & Trailer Parts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <h1 className="text-4xl font-black text-brand-blue uppercase mb-2">Quote</h1>
                      <p className="text-sm font-bold">#{quoteNumber}</p>
                      <p className="text-sm text-charcoal/50">{date}</p>
                    </div>
                  </div>

                  {/* Addresses */}
                  <div className="grid grid-cols-2 gap-12 mb-12">
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-3">From:</h4>
                      <p className="font-bold">EastWest Truck & Trailer Parts</p>
                      <p className="text-sm text-charcoal/60">121 High Road, Pomona, Bredell</p>
                      <p className="text-sm text-charcoal/60">Kempton Park, Gauteng 1619</p>
                      <p className="text-sm text-charcoal/60">Tel: 011 524 6095</p>
                    </div>
                    <div className="text-right">
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-charcoal/40 mb-3">To:</h4>
                      <p className="font-bold">Valued Customer</p>
                      <p className="text-sm text-charcoal/60 italic">Generated via Online Portal</p>
                    </div>
                  </div>

                  {/* Table */}
                  <div className="overflow-x-auto -mx-8 md:mx-0 mb-12">
                    <table className="w-full min-w-[600px]">
                      <thead>
                        <tr className="border-b-2 border-charcoal/10 text-left text-[10px] font-bold uppercase tracking-widest">
                          <th className="py-4 px-8 md:px-0">Description</th>
                          <th className="py-4 text-center">Qty</th>
                          <th className="py-4 text-right">Unit Price</th>
                          <th className="py-4 text-right px-8 md:px-0">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {items.map((item) => (
                          <tr key={item.product.id} className="border-b border-charcoal/5">
                            <td className="py-4 px-8 md:px-0">
                              <p className="font-bold">{item.product.name}</p>
                              <p className="text-xs text-charcoal/40">{item.product.brand} - {item.product.subCategory}</p>
                            </td>
                            <td className="py-4 text-center">{item.quantity}</td>
                            <td className="py-4 text-right">R {item.product.price.toLocaleString()}</td>
                            <td className="py-4 text-right font-bold px-8 md:px-0">R {(item.product.price * item.quantity).toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Totals */}
                  <div className="flex justify-end mb-12">
                    <div className="w-64 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/40">Subtotal</span>
                        <span className="font-bold">R {subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-charcoal/40">VAT (15%)</span>
                        <span className="font-bold">R {vat.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-lg font-black border-t border-charcoal/10 pt-3 text-brand-blue">
                        <span>Total</span>
                        <span>R {total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-charcoal/10 pt-8 text-center">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-charcoal/30 mb-4">Terms & Conditions</p>
                    <p className="text-[9px] text-charcoal/40 leading-relaxed max-w-md mx-auto">
                      This quote is valid for 7 days from the date of issue. Prices are subject to stock availability. Goods remain the property of EastWest Truck & Trailer Parts until paid in full.
                    </p>
                  </div>

                  {/* Action Buttons (Hidden on Print) */}
                  <div className="absolute top-4 right-4 flex gap-2 no-print">
                    <button 
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="bg-brand-blue text-white p-2 rounded-lg hover:bg-charcoal transition-colors disabled:opacity-50"
                      title="Download PDF"
                    >
                      {isDownloading ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                    </button>
                    <button 
                      onClick={handlePrint}
                      className="bg-charcoal text-white p-2 rounded-lg hover:bg-brand-blue transition-colors"
                      title="Print Quote"
                    >
                      <Printer size={18} />
                    </button>
                    <button 
                      onClick={() => setIsGenerated(false)}
                      className="bg-charcoal text-white p-2 rounded-lg hover:bg-brand-blue transition-colors"
                      title="Edit Items"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body { background: white !important; color: black !important; }
          .no-print { display: none !important; }
          .pt-32 { padding-top: 0 !important; }
          .max-w-5xl { max-width: 100% !important; }
          .glass-card { border: none !important; background: none !important; }
        }
      `}</style>
    </div>
  );
}
