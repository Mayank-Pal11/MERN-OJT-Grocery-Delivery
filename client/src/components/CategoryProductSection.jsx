import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const CategoryProductSection = ({ title, category, products, limit = 5 }) => {
  if (!products || products.length === 0) return null;

  const displayProducts = products.slice(0, limit);

  return (
    <section className="mb-10 sm:mb-14">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#2B1723] tracking-tight">
          {title}
        </h2>
        <Link 
          to={`/products?category=${encodeURIComponent(category)}`}
          className="text-[#5A123E] font-bold text-sm sm:text-base hover:text-[#42102F] transition-colors flex items-center gap-1 group"
        >
          View All <span className="group-hover:translate-x-1 transition-transform">→</span>
        </Link>
      </div>
      
      {/* 
        Responsive layout for products: 
        On mobile/tablet: we use a horizontally scrollable flex row to avoid cramped cards.
        On desktop (lg): we use a CSS grid that naturally fits 5 columns if there are up to 5 items.
      */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible">
        {displayProducts.map((product) => (
          <div key={product._id || product.id} className="w-[160px] sm:w-[180px] flex-shrink-0 lg:w-auto lg:flex-shrink-1">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryProductSection;
