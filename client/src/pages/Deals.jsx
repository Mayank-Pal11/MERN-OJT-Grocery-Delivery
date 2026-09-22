import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/productApi';

const Deals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        // Since we don't have a discount field yet, just pick a few products to showcase as deals.
        // For example, slice the first 8 products.
        setProducts((data.products || []).slice(0, 8));
        setError(null);
      } catch (err) {
        setError('Failed to fetch deals. Please try again later.');
        console.error('Error fetching deals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8E8] flex flex-col font-outfit text-[#2B1723]">
      <Navbar />

      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back Navigation */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center text-[#5A123E] hover:text-[#42102F] font-semibold transition-colors duration-200">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Hero / Header Area */}
          <div className="bg-[#5A123E] rounded-[2rem] p-8 md:p-12 mb-12 relative overflow-hidden shadow-lg">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 text-center md:text-left max-w-2xl"
            >
              <span className="inline-flex items-center bg-[#F6C96A] text-[#2B1723] px-4 py-1.5 rounded-full text-xs font-bold tracking-wider mb-4 uppercase shadow-sm">
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                GROVIA DEALS
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 tracking-tight">
                Fresh Picks. <br className="hidden md:block"/>Better Prices.
              </h1>
              <p className="text-[#EBDDBF] text-lg max-w-md mx-auto md:mx-0">
                Discover special offers on your everyday grocery favourites.
              </p>
            </motion.div>
          </div>

          {/* Deals Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold mb-8 tracking-tight">Today's Deals</h2>

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-white rounded-2xl h-80 shadow-sm border border-[#EBDDBF]/30"></div>
                ))}
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100">
                {error}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && products.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-[#EBDDBF]/30 shadow-sm">
                <p className="text-[#2B1723]/60 text-lg">No deals available at the moment. Check back soon!</p>
              </div>
            )}

            {/* Product Grid */}
            {!loading && !error && products.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {products.map((product) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Deals;
