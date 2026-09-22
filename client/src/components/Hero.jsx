import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Tag, Leaf } from 'lucide-react';
import { motion } from 'motion/react';
import chipsImg from '../assets/hero/chips.png';
import sodaImg from '../assets/hero/soda.png';
import milkImg from '../assets/hero/milk.png';
import chocolateImg from '../assets/hero/chocolate.png';

const Hero = () => {
  const [isCartHovered, setIsCartHovered] = useState(false);

  useEffect(() => {
    const handleCartHoverStart = () => setIsCartHovered(true);
    const handleCartHoverEnd = () => setIsCartHovered(false);

    window.addEventListener('cartHoverStart', handleCartHoverStart);
    window.addEventListener('cartHoverEnd', handleCartHoverEnd);

    return () => {
      window.removeEventListener('cartHoverStart', handleCartHoverStart);
      window.removeEventListener('cartHoverEnd', handleCartHoverEnd);
    };
  }, []);

  // Central alignment translation for when the cart is hovered
  const getCartHoverTransform = (direction) => {
    switch (direction) {
      case 'top-left': return { x: 15, y: 15 };
      case 'top-right': return { x: -15, y: 15 };
      case 'bottom-right': return { x: -15, y: -15 };
      case 'bottom-left': return { x: 15, y: -15 };
      default: return { x: 0, y: 0 };
    }
  };

  return (
    <section className="relative w-full pt-6 pb-6 sm:pt-10 sm:pb-10 lg:pt-12 lg:pb-12 mb-8 flex flex-col md:flex-row items-center justify-between min-h-[450px] overflow-visible rounded-3xl">

      {/* Subtle Decorative Background Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-10 left-10 w-6 h-6 bg-[#6E8B45]/30 rounded-full blur-[2px]"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-10 left-1/4 w-8 h-8 bg-[#5A123E]/10 rounded-full blur-[2px]"
      />

      {/* Left Side: Typography */}
      <div className="md:w-[50%] z-10 text-center md:text-left mb-12 md:mb-0 md:pr-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center bg-[#F8EED8] rounded-full pr-4 p-1 mb-6 border border-[#EBDDBF]/50 shadow-sm"
        >
          <div className="bg-[#F6C96A]/30 p-1.5 rounded-full mr-3 flex items-center justify-center">
            <Zap className="w-4 h-4 fill-[#F6C96A] text-[#F6C96A]" />
          </div>
          <span className="font-bold text-sm text-[#42102F]">Fast | Fresh | Reliable</span>
        </motion.div>

        <div className="relative inline-block">
          {/* Yellow Circular Accent */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="absolute -top-4 -right-6 w-12 h-12 bg-[#F6C96A] rounded-full -z-10 blur-[1px]"
          />
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl sm:text-7xl lg:text-[5.5rem] font-extrabold text-[#5A123E] leading-[1.05] mb-6 tracking-tight relative z-10"
          >
            Lightning<br />
            Speed<br />
            Groceries.
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-[#2B1723]/70 text-lg sm:text-xl mb-8 max-w-md mx-auto md:mx-0 leading-relaxed"
        >
          Your favorite groceries, snacks, drinks, and daily essentials delivered to your door in 10 minutes.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <button
            onClick={() => document.getElementById('trending-products')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#5A123E] hover:bg-[#42102F] text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 mx-auto md:mx-0 group mb-8"
          >
            Start Ordering
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
        </motion.div>

        {/* 4 Benefit Boxes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-wrap gap-4 mt-2 mx-auto md:mx-0 justify-center md:justify-start"
        >
          {/* Benefit 1 */}
          <div className="flex items-center gap-3 bg-transparent px-2 py-1 rounded-2xl w-[130px]">
            <div className="bg-[#FFF8E8] p-2 rounded-xl shadow-sm flex-shrink-0">
              <Zap className="w-5 h-5 fill-[#42102F] text-[#42102F]" />
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#42102F] leading-tight">10 Min<br />Delivery</div>
          </div>

          {/* Benefit 2 */}
          <div className="flex items-center gap-3 bg-transparent px-2 py-1 rounded-2xl w-[140px]">
            <div className="bg-[#FFF8E8] p-2 rounded-xl shadow-sm flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#42102F]" />
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#42102F] leading-tight">Fresh &<br />Quality Products</div>
          </div>

          {/* Benefit 3 */}
          <div className="flex items-center gap-3 bg-transparent px-2 py-1 rounded-2xl w-[130px]">
            <div className="bg-[#FFF8E8] p-2 rounded-xl shadow-sm flex-shrink-0">
              <Tag className="w-5 h-5 text-[#42102F]" />
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#42102F] leading-tight">Best<br />Prices</div>
          </div>

          {/* Benefit 4 */}
          <div className="flex items-center gap-3 bg-transparent px-2 py-1 rounded-2xl w-[130px]">
            <div className="bg-[#FFF8E8] p-2 rounded-xl shadow-sm flex-shrink-0">
              <Leaf className="w-5 h-5 text-[#42102F]" />
            </div>
            <div className="text-[11px] sm:text-xs font-bold text-[#42102F] leading-tight">Wide<br />Variety</div>
          </div>
        </motion.div>

      </div>

      {/* Right Side: Floating Composition */}
      <div className="md:w-[50%] relative w-full h-[400px] sm:h-[500px] lg:h-[550px] flex items-center justify-center mt-8 md:mt-0">

        {/* Subtle Decorative Shapes */}
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-[20%] left-[20%] w-64 h-64 bg-[#EBDDBF]/40 rounded-full blur-3xl z-0"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[20%] right-[20%] w-56 h-56 bg-[#F6C96A]/20 rounded-full blur-3xl z-0"
        />

        {/* Floating Product 1 (Chips - Top Left) z-20 */}
        <motion.div
          className="absolute top-[10%] left-[10%] w-[38%] max-w-[200px] z-20"
          animate={{ y: [0, -12, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        >
          <motion.img
            src={chipsImg}
            alt="Lays Chips"
            className="w-full h-auto drop-shadow-2xl cursor-pointer"
            initial={{ rotate: -8 }}
            animate={{
              scale: isCartHovered ? 1.02 : 1,
              x: isCartHovered ? 12 : 0,
              y: isCartHovered ? 12 : 0,
              rotate: isCartHovered ? -4 : -8,
              filter: isCartHovered ? 'brightness(1.05)' : 'brightness(1)'
            }}
            whileHover={{ scale: 1.08, y: -5, rotate: -12, filter: 'brightness(1.05)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>

        {/* Floating Product 2 (Coke - Top Right) z-30 */}
        <motion.div
          className="absolute top-[15%] right-[15%] w-[22%] max-w-[120px] z-30"
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
        >
          <motion.img
            src={sodaImg}
            alt="Coca Cola"
            className="w-full h-auto drop-shadow-2xl cursor-pointer"
            initial={{ rotate: 12 }}
            animate={{
              scale: isCartHovered ? 1.02 : 1,
              x: isCartHovered ? -12 : 0,
              y: isCartHovered ? 12 : 0,
              rotate: isCartHovered ? 6 : 12,
              filter: isCartHovered ? 'brightness(1.05)' : 'brightness(1)'
            }}
            whileHover={{ scale: 1.08, y: -5, rotate: 16, filter: 'brightness(1.05)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>

        {/* Floating Product 3 (Chocolate - Bottom Left) z-20 */}
        <motion.div
          className="absolute bottom-[15%] left-[12%] w-[42%] max-w-[220px] z-20"
          animate={{ y: [0, -14, 0] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1.5 }}
        >
          <motion.img
            src={chocolateImg}
            alt="Chocolate Bar"
            className="w-full h-auto drop-shadow-2xl cursor-pointer"
            initial={{ rotate: -12 }}
            animate={{
              scale: isCartHovered ? 1.02 : 1,
              x: isCartHovered ? 12 : 0,
              y: isCartHovered ? -12 : 0,
              rotate: isCartHovered ? -6 : -12,
              filter: isCartHovered ? 'brightness(1.05)' : 'brightness(1)'
            }}
            whileHover={{ scale: 1.08, y: -5, rotate: -16, filter: 'brightness(1.05)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>

        {/* Floating Product 4 (Milk - Bottom Right) z-10 */}
        <motion.div
          className="absolute bottom-[20%] right-[12%] w-[28%] max-w-[150px] z-10"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1 }}
        >
          <motion.img
            src={milkImg}
            alt="Milk Carton"
            className="w-full h-auto drop-shadow-2xl cursor-pointer"
            initial={{ rotate: 8 }}
            animate={{
              scale: isCartHovered ? 1.02 : 1,
              x: isCartHovered ? -12 : 0,
              y: isCartHovered ? -12 : 0,
              rotate: isCartHovered ? 4 : 8,
              filter: isCartHovered ? 'brightness(1.05)' : 'brightness(1)'
            }}
            whileHover={{ scale: 1.08, y: -5, rotate: 12, filter: 'brightness(1.05)' }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
