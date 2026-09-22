import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#42102F] text-[#FFF8E8] pt-16 pb-8 px-4 sm:px-6 w-full mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12 mb-12">
        
        {/* Brand Column */}
        <div className="md:w-1/3">
          <Link to="/" className="text-3xl font-bold tracking-wider mb-4 inline-block">
            GROVIA
          </Link>
          <p className="text-[#EBDDBF] text-sm font-medium leading-relaxed max-w-xs mt-4">
            Fresh groceries. Simply delivered.<br/>
            Your premium neighborhood store right on your phone.
          </p>
        </div>

        {/* Links Columns Container */}
        <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-8">
          
          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold text-base mb-3">Quick Links</h4>
            <Link to="/" className="text-[#EBDDBF] hover:text-white transition-colors text-sm">Home</Link>
            <Link to="/" className="text-[#EBDDBF] hover:text-white transition-colors text-sm">Categories</Link>
            <Link to="/" className="text-[#EBDDBF] hover:text-white transition-colors text-sm">Trending</Link>
            <Link to="/" className="text-[#EBDDBF] hover:text-white transition-colors text-sm">Offers</Link>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-white font-bold text-base mb-3">Help & Support</h4>
            <Link to="/" className="text-[#EBDDBF] hover:text-white transition-colors text-sm">FAQ</Link>
            <Link to="/orders" className="text-[#EBDDBF] hover:text-white transition-colors text-sm">Track Order</Link>
            <Link to="/" className="text-[#EBDDBF] hover:text-white transition-colors text-sm">Return Policy</Link>
            <Link to="/" className="text-[#EBDDBF] hover:text-white transition-colors text-sm">Contact Us</Link>
          </div>

          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-base mb-3">Contact</h4>
            <p className="text-[#EBDDBF] text-sm">1-800-GROVIA-NOW</p>
            <p className="text-[#EBDDBF] text-sm">support@grovia.com</p>
            <p className="text-[#EBDDBF] text-sm mt-1">Mumbai, India</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto border-t border-[#EBDDBF]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#EBDDBF]/80">
        <p>© 2025 GROVIA Grocery. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
          <Link to="/" className="hover:text-white transition-colors">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
