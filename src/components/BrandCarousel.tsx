import React from 'react';
import { BRANDS } from '../constants';

export default function BrandCarousel() {
  // Double the brands for infinite scroll effect
  const displayBrands = [...BRANDS, ...BRANDS];

  return (
    <div className="w-full overflow-hidden bg-steel/30 py-12 border-y border-white/5">
      <div className="flex animate-scroll whitespace-nowrap">
        {displayBrands.map((brand, idx) => (
          <div
            key={`${brand.name}-${idx}`}
            className="flex items-center justify-center px-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
          >
            <img
              src={brand.logo}
              alt={brand.name}
              className="h-12 w-auto object-contain max-w-[150px]"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
