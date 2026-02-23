import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, SlidersHorizontal, Truck, X } from 'lucide-react';
import { PRODUCTS } from '../constants';
import ProductCard from '../components/ProductCard';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const CATEGORIES = [
  'All Parts',
  'Truck Parts',
  'Trailer Parts',
  'Engine Components',
  'Brake Systems',
  'Suspension Parts',
  'Clutch & Transmission',
  'Axles',
  'King Pins'
];

const BRANDS_LIST = [
  'All Brands',
  'Mercedes-Benz',
  'Volvo Trucks',
  'Scania',
  'MAN Truck & Bus',
  'DAF Trucks',
  'BPW Group',
  'SAF-Holland',
  'Hendrickson'
];

export default function Products() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All Parts');
  const [activeBrand, setActiveBrand] = useState('All Brands');
  const [priceRange, setPriceRange] = useState(10000);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                           p.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All Parts' || 
                             p.category === activeCategory || 
                             p.subCategory === activeCategory;
      const matchesBrand = activeBrand === 'All Brands' || p.brand === activeBrand;
      const matchesPrice = p.price <= priceRange;
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
  }, [search, activeCategory, activeBrand, priceRange]);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl mb-4">Our Product Catalogue</h1>
          <p className="text-white/50 max-w-2xl">
            Browse our extensive range of premium truck and trailer spare parts. Filter by category, brand, or price to find exactly what you need.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex gap-4">
            <button 
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="flex-grow flex items-center justify-center gap-2 bg-steel border border-white/10 rounded-xl py-4 font-bold text-accent"
            >
              <Filter size={20} />
              {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {/* Sidebar Filters */}
          <aside className={cn(
            "space-y-10 lg:block",
            showMobileFilters ? "block" : "hidden"
          )}>
            {/* Search */}
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Search size={18} className="text-accent" />
                Search Parts
              </h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Part name, number or brand..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-steel border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Filter size={18} className="text-accent" />
                Categories
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-lg text-sm transition-all relative group ${
                      activeCategory === cat 
                        ? 'bg-accent text-white font-bold shadow-lg shadow-accent/20' 
                        : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <motion.div layoutId="activeCat" className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-full" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <Truck size={18} className="text-accent" />
                Filter by Brand
              </h3>
              <select
                value={activeBrand}
                onChange={(e) => setActiveBrand(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm focus:outline-none focus:border-accent transition-colors appearance-none"
              >
                {BRANDS_LIST.map(brand => (
                  <option key={brand} value={brand} className="bg-charcoal">{brand}</option>
                ))}
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-4">
              <h3 className="font-bold flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-accent" />
                Price Range (ZAR)
              </h3>
              <div className="px-2">
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="500"
                  value={priceRange}
                  onChange={(e) => setPriceRange(parseInt(e.target.value))}
                  className="w-full accent-accent"
                />
                <div className="flex justify-between text-xs text-white/40 mt-2 font-bold">
                  <span>R 0</span>
                  <span>R {priceRange.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <p className="text-sm text-white/50">
                Showing <span className="text-white font-bold">{filteredProducts.length}</span> products
              </p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/30">Sort by:</span>
                <select className="bg-transparent border-none focus:ring-0 font-bold text-accent cursor-pointer">
                  <option className="bg-charcoal">Newest First</option>
                  <option className="bg-charcoal">Price: Low to High</option>
                  <option className="bg-charcoal">Price: High to Low</option>
                </select>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="glass-card p-20 text-center">
                <div className="bg-steel w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search size={32} className="text-white/20" />
                </div>
                <h3 className="text-xl mb-2">No products found</h3>
                <p className="text-white/50">Try adjusting your filters or search terms.</p>
                <button 
                  onClick={() => {setSearch(''); setActiveCategory('All Parts'); setActiveBrand('All Brands'); setPriceRange(10000);}}
                  className="mt-6 text-accent font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
