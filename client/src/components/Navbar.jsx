import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, User, ShoppingCart, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { getCart } from '../api/cartApi';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const data = await getCart();
        const items = data.cart?.items || [];
        const count = items.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      } catch (err) {
        // Quietly fail if not logged in or error occurs
        setCartCount(0);
      }
    };

    fetchCartCount();

    window.addEventListener('cartUpdated', fetchCartCount);
    
    return () => {
      window.removeEventListener('cartUpdated', fetchCartCount);
    };
  }, []);

  return (
    <nav className="bg-[#5A123E] text-white px-4 py-3 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
        
        {/* Mobile Top Row / Desktop Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-2xl font-bold tracking-wider flex items-center gap-1 cursor-pointer shrink-0">
            GROVIA
          </Link>
          
          <div className="md:hidden flex items-center gap-5">
            <Link to="/orders">
              <User className="w-6 h-6 cursor-pointer" />
            </Link>
            <Link to="/cart">
              <div className="relative cursor-pointer">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-[10px] text-[#2B1723] font-bold rounded-full h-4 w-4 flex items-center justify-center">{cartCount}</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Desktop Delivery Badge */}
        <div className="hidden md:flex items-center gap-2 bg-[#F6C96A] px-4 py-2 rounded-full text-sm shrink-0 md:ml-4 shadow-sm">
          <Clock className="w-4 h-4 text-[#42102F]" />
          <span className="font-bold text-[#42102F]">Delivery in 10–15 mins</span>
        </div>

        {/* Search Bar */}
        <div className="w-full flex-1 flex items-center bg-white rounded-full px-4 py-2.5 text-[#2B1723] md:ml-4">
          <input
            type="text"
            placeholder="Search for chips, milk, snacks, or groceries"
            className="w-full outline-none bg-transparent placeholder-gray-400"
          />
          <Search className="w-5 h-5 text-[#5A123E] cursor-pointer" />
        </div>

        {/* Desktop User & Cart */}
        <div className="hidden md:flex items-center gap-6 md:ml-4 shrink-0">
          <Link to="/orders">
            <User className="w-6 h-6 cursor-pointer hover:text-[#F6C96A] transition-colors" />
          </Link>
          <Link to="/cart">
            <motion.div 
              className="relative cursor-pointer hover:text-[#F6C96A] transition-colors"
              onMouseEnter={() => window.dispatchEvent(new Event('cartHoverStart'))}
              onMouseLeave={() => window.dispatchEvent(new Event('cartHoverEnd'))}
              whileHover={{ scale: 1.1, y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-[#2B1723] font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            </motion.div>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
