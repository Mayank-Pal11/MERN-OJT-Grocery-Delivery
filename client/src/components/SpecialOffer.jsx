import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import offerGraphic from '../assets/hero.png';

const SpecialOffer = () => {
  return (
    <section className="mb-16 rounded-[2rem] bg-[#5A123E] overflow-hidden relative shadow-xl">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between p-6 sm:p-8 md:px-12 md:py-8 relative z-10">
        
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block bg-[#F6C96A] text-[#2B1723] px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-3 uppercase">
              Special Offer
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2 tracking-tight">
              Better Choices,<br className="hidden md:block"/>
              Healthier You.
            </h2>
            <p className="text-[#EBDDBF] text-base mb-6 max-w-md mx-auto md:mx-0">
              Fresh, quality groceries for a healthier lifestyle.
            </p>
            <Link to="/deals" className="inline-flex items-center justify-center gap-2 mx-auto md:mx-0 bg-[#F6C96A] hover:bg-yellow-400 text-[#2B1723] px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all duration-300 group">
              Explore Deals 
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Right Side Visual */}
        <div className="md:w-1/2 flex justify-center md:justify-end mt-8 md:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <img src={offerGraphic} alt="Fresh Groceries" className="w-48 sm:w-56 md:w-64 lg:w-72 h-auto drop-shadow-2xl" />
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default SpecialOffer;
