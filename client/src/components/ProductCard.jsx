import React, { useState } from 'react';

const ProductCard = ({ product }) => {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="bg-[#FFFDF5] rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-1.5 flex flex-col group border border-[#EBDDBF]/40">
      
      {/* Product Image Container */}
      <div className="relative w-full aspect-square mb-4 rounded-xl flex items-center justify-center p-2 bg-white/40">
        
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain transition-all duration-500 ease-out group-hover:scale-[1.08] group-hover:-translate-y-1.5 drop-shadow-sm group-hover:drop-shadow-md"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-semibold text-[#2B1723] text-sm sm:text-base line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm mt-1">
            {product.description}
          </p>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="font-bold text-[#2B1723] text-lg">
            ₹{product.price}
          </span>
          <button
            onClick={handleAdd}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              added 
                ? 'bg-[#6E8B45] text-white shadow-md'
                : 'bg-[#5A123E] text-white hover:bg-[#42102F] shadow-sm'
            }`}
          >
            {added ? 'ADDED ✓' : '+ ADD'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
