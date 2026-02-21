import React from 'react';
import { motion } from 'motion/react';
import { ShoppingCart, CheckCircle2, AlertCircle, Clock } from 'lucide-react';
import { Product } from '../types';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const statusIcon = {
    'In Stock': <CheckCircle2 size={14} className="text-emerald-500" />,
    'Limited': <Clock size={14} className="text-amber-500" />,
    'On Order': <AlertCircle size={14} className="text-accent" />
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-card overflow-hidden group flex flex-col h-full"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-white/70">
          {product.brand}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-charcoal/80 backdrop-blur-md px-2 py-1 rounded text-[10px] font-bold">
          {statusIcon[product.stockStatus]}
          <span className={
            product.stockStatus === 'In Stock' ? 'text-emerald-500' :
            product.stockStatus === 'Limited' ? 'text-amber-500' : 'text-accent'
          }>
            {product.stockStatus}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-[10px] text-accent font-bold uppercase tracking-widest">{product.subCategory}</span>
          <h3 className="text-lg font-bold leading-tight mt-1 group-hover:text-accent transition-colors">{product.name}</h3>
        </div>
        <p className="text-sm text-white/50 mb-4 line-clamp-2">{product.description}</p>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-white/30 uppercase font-bold">Price (ZAR)</span>
            <span className="text-xl font-bold">R {product.price.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}</span>
          </div>
          <Link 
            to={`/quote?part=${encodeURIComponent(product.name)}`}
            className="bg-accent/10 hover:bg-accent text-accent hover:text-charcoal p-2.5 rounded-lg transition-all"
          >
            <ShoppingCart size={20} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
