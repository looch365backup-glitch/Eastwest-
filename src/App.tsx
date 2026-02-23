import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { Truck } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ChatBot from './components/ChatBot';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Brands from './pages/Brands';
import Quote from './pages/Quote';
import QuoteBuilder from './pages/QuoteBuilder';
import Contact from './pages/Contact';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    // Simulate initial app load
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isInitialLoading) {
    return (
      <div className="fixed inset-0 bg-charcoal flex flex-col items-center justify-center z-[9999]">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="bg-accent p-4 rounded-2xl shadow-2xl shadow-accent/20 animate-bounce">
            <Truck className="text-charcoal w-12 h-12" />
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-black tracking-tighter text-white">EASTWEST</h2>
            <div className="w-48 h-1 bg-white/10 rounded-full mt-4 overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-full h-full bg-accent"
              />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col selection:bg-accent selection:text-white">
        <Navbar />
        
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
              <Route path="/products" element={<PageWrapper><Products /></PageWrapper>} />
              <Route path="/brands" element={<PageWrapper><Brands /></PageWrapper>} />
              <Route path="/quote" element={<PageWrapper><Quote /></PageWrapper>} />
              <Route path="/quote-builder" element={<PageWrapper><QuoteBuilder /></PageWrapper>} />
              <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
        <WhatsAppButton />
        <ChatBot />
      </div>
    </Router>
  );
}
