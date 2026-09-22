import React, { useState } from 'react';
import { motion } from 'motion/react';
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

  const cardVariants = {
    initial: { y: 0, scale: 1 },
    hover: { y: -8, scale: 1.02, boxShadow: "0 15px 35px -5px rgba(90, 18, 62, 0.12)", transition: { type: "spring", stiffness: 300, damping: 20 } }
  };
  
  const imageVariants = {
    initial: { scale: 1.15, y: 0 },
    hover: { scale: 1.25, y: -8, filter: "drop-shadow(0 8px 12px rgba(0,0,0,0.15))", transition: { type: "spring", stiffness: 300, damping: 20 } }
  };

  return (
    <motion.article 
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      className="bg-[#FFFDF5]/90 backdrop-blur-md rounded-[20px] p-3 shadow-[0_4px_20px_-5px_rgba(90,18,62,0.05)] flex flex-col border border-[#EBDDBF]/60 h-full"
    >
      
      {/* Product Image Container */}
      <div className="relative w-full aspect-square mb-3 rounded-xl flex items-center justify-center bg-[#EBDDBF]/20 overflow-hidden">
        
        {product.image ? (
          <motion.img 
            src={product.image} 
            alt={product.name} 
            variants={imageVariants}
            className="w-full h-full object-contain object-center mix-blend-multiply drop-shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-200 rounded-full" />
        )}
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-[#2B1723] text-xs sm:text-sm leading-tight line-clamp-2 min-h-[2rem]">
            {product.name}
          </h3>
          <p className="text-[#2B1723]/60 text-[10px] sm:text-xs mt-1 font-medium line-clamp-1">
            {product.description}
          </p>
        </div>
        
        <div className="mt-3 flex items-center justify-between gap-1">
          <span className="font-extrabold text-[#5A123E] text-sm sm:text-base">
            ₹{product.price}
          </span>
          <button
            onClick={handleAdd}
            disabled={loading || added}
            className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-full font-bold text-[10px] sm:text-xs transition-all duration-300 transform active:scale-95 ${
              added 
                ? 'bg-[#6E8B45] text-white shadow-md'
                : 'bg-[#5A123E] text-white hover:bg-[#42102F] shadow-sm disabled:opacity-70 disabled:cursor-not-allowed'
            }`}
          >
            {loading ? '...' : added ? '✓' : 'ADD'}
          </button>
        </div>
        {error && (
          <div className="mt-2 text-xs text-red-500 font-medium text-right">
            {error}
          </div>
        )}
      </div>
    </motion.article>
  );
};

export default ProductCard;
