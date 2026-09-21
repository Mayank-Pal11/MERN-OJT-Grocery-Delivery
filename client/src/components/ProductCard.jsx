import React, { useState } from 'react';
import { addToCart } from '../api/cartApi';

const ProductCard = ({ product }) => {
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdd = async () => {
    setLoading(true);
    setError(null);
    try {
      // Use product._id because MongoDB uses _id
      await addToCart(product._id, 1);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add item');
    } finally {
      setLoading(false);
    }
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
            disabled={loading || added}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl font-bold text-xs sm:text-sm transition-all duration-300 ${
              added 
                ? 'bg-[#6E8B45] text-white shadow-md'
                : 'bg-[#5A123E] text-white hover:bg-[#42102F] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed'
            }`}
          >
            {loading ? 'ADDING...' : added ? 'ADDED ✓' : '+ ADD'}
          </button>
        </div>
        {error && (
          <div className="mt-2 text-xs text-red-500 font-medium text-right">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
