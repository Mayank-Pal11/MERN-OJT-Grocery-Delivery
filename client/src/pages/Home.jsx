import React from 'react';
import Navbar from '../components/Navbar';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';

const categories = [
  { name: 'Chips & Munchies', image: 'https://cdn-icons-png.flaticon.com/512/2553/2553691.png' },
  { name: 'Cold Drinks & Juices', image: 'https://cdn-icons-png.flaticon.com/512/2405/2405597.png' },
  { name: 'Instant Food', image: 'https://cdn-icons-png.flaticon.com/512/3480/3480796.png' },
  { name: 'Sweet Tooth', image: 'https://cdn-icons-png.flaticon.com/512/3173/3173531.png' },
  { name: 'Dairy & Bread', image: 'https://cdn-icons-png.flaticon.com/512/3050/3050117.png' },
  { name: 'Fresh Produce', image: 'https://cdn-icons-png.flaticon.com/512/415/415682.png' },
  { name: 'Atta, Rice & Dal', image: 'https://cdn-icons-png.flaticon.com/512/2821/2821815.png' },
];

const trendingProducts = [
  {
    id: 1,
    name: "Lays Classic Salted Potato Chips",
    description: "90g",
    price: 29,
    image: "https://cdn-icons-png.flaticon.com/512/2553/2553691.png"
  },
  {
    id: 2,
    name: "Coca-Cola Zero Sugar Soda",
    description: "500ml",
    price: 74,
    image: "https://cdn-icons-png.flaticon.com/512/2405/2405597.png"
  },
  {
    id: 3,
    name: "Oreo Original Chocolate Sandwich Biscuits",
    description: "120g",
    price: 19,
    image: "https://cdn-icons-png.flaticon.com/512/3173/3173531.png"
  },
  {
    id: 4,
    name: "Maggi 2-Minute Instant Noodles",
    description: "70g",
    price: 65,
    image: "https://cdn-icons-png.flaticon.com/512/3480/3480796.png"
  }
];

const freshPicks = [
  {
    id: 5,
    name: "Amul Taaza Toned Milk (Tetra Pak)",
    description: "1L",
    price: 74,
    image: "https://cdn-icons-png.flaticon.com/512/3050/3050117.png" 
  },
  {
    id: 6,
    name: "Fresh Coriander Leaves",
    description: "100g",
    price: 15,
    image: "https://cdn-icons-png.flaticon.com/512/766/766023.png"
  },
  {
    id: 7,
    name: "Aashirvaad Whole Wheat Atta",
    description: "5kg",
    price: 230,
    image: "https://cdn-icons-png.flaticon.com/512/5766/5766914.png" 
  },
  {
    id: 8,
    name: "Tata Salt",
    description: "1kg",
    price: 28,
    image: "https://cdn-icons-png.flaticon.com/512/3014/3014524.png"
  }
];

const Home = () => {
  return (
    <div className="min-h-screen font-sans bg-[#FFF8E8] flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        
        {/* 2. Hero Section */}
        <section className="relative w-full bg-[#FFFDF5] rounded-3xl p-6 sm:p-10 md:p-16 mb-16 flex flex-col md:flex-row items-center justify-between overflow-hidden shadow-sm border border-[#EBDDBF]/50">
          
          {/* Subtle Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#F6C96A]/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#5A123E]/5 rounded-full blur-2xl -ml-10 -mb-10"></div>

          <div className="md:w-1/2 z-10 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#5A123E] leading-tight mb-4 tracking-tight">
              Fresh groceries. <br/>
              <span className="text-[#2B1723]">Simply delivered.</span>
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl mb-8 max-w-md mx-auto md:mx-0">
              Everything you need, delivered to your door in 10-15 minutes.
            </p>
            <button className="bg-[#5A123E] hover:bg-[#42102F] text-white px-8 py-3.5 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              Shop Now
            </button>
          </div>
          
          <div className="md:w-1/2 z-10 flex justify-center md:justify-end">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3081/3081986.png" 
              alt="Grocery Delivery" 
              className="w-64 sm:w-80 md:w-96 object-contain drop-shadow-xl hover:-translate-y-2 transition-transform duration-700 ease-out cursor-pointer"
            />
          </div>
        </section>

        {/* 3. Shop by Category */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B1723] mb-6 tracking-tight flex items-center gap-2">
            Shop by Category
          </h2>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat, idx) => (
              <div key={idx} className="shrink-0">
                <CategoryCard name={cat.name} image={cat.image} />
              </div>
            ))}
          </div>
        </section>

        {/* 4. Trending This Week */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B1723] mb-6 tracking-tight">
            Trending This Week
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {trendingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* 5. Promotional Section */}
        <section className="w-full bg-[#5A123E] rounded-3xl p-8 sm:p-12 mb-16 flex flex-col md:flex-row items-center justify-between shadow-lg relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-full bg-[#42102F] skew-x-12 translate-x-20 opacity-50 group-hover:translate-x-16 transition-transform duration-700 ease-out"></div>
          
          <div className="z-10 md:w-2/3 text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Your everyday groceries, made easy.
            </h2>
            <p className="text-[#EBDDBF] text-lg max-w-xl mx-auto md:mx-0">
              Fresh picks. Great prices. Delivered fast. Stock up on your daily essentials with GROVIA.
            </p>
          </div>
          <div className="z-10">
            <button className="bg-[#F6C96A] hover:bg-white text-[#42102F] px-8 py-3.5 rounded-xl font-bold text-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              Explore Deals
            </button>
          </div>
        </section>

        {/* 6. Fresh Picks */}
        <section className="mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#2B1723] mb-6 tracking-tight">
            Fresh Picks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {freshPicks.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className="bg-[#42102F] text-[#FFF8E8] pt-12 pb-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
              <h3 className="text-2xl font-bold text-[#F6C96A] tracking-wider mb-4">GROVIA</h3>
              <p className="text-sm text-[#EBDDBF] opacity-90 leading-relaxed">
                Fresh groceries. Simply delivered. Your premium neighborhood store right on your phone.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-sm text-[#EBDDBF]">
                <li className="hover:text-[#F6C96A] cursor-pointer transition-colors w-fit">Home</li>
                <li className="hover:text-[#F6C96A] cursor-pointer transition-colors w-fit">Categories</li>
                <li className="hover:text-[#F6C96A] cursor-pointer transition-colors w-fit">Trending</li>
                <li className="hover:text-[#F6C96A] cursor-pointer transition-colors w-fit">Offers</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Help & Support</h4>
              <ul className="space-y-2 text-sm text-[#EBDDBF]">
                <li className="hover:text-[#F6C96A] cursor-pointer transition-colors w-fit">FAQ</li>
                <li className="hover:text-[#F6C96A] cursor-pointer transition-colors w-fit">Track Order</li>
                <li className="hover:text-[#F6C96A] cursor-pointer transition-colors w-fit">Return Policy</li>
                <li className="hover:text-[#F6C96A] cursor-pointer transition-colors w-fit">Contact Us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-lg mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-sm text-[#EBDDBF]">
                <li>1-800-GROVIA</li>
                <li>support@grovia.com</li>
                <li>Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[#5A123E] pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#EBDDBF]/70">
            <p>© {new Date().getFullYear()} GROVIA Grocery. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <span className="hover:text-[#F6C96A] cursor-pointer transition-colors">Privacy Policy</span>
              <span className="hover:text-[#F6C96A] cursor-pointer transition-colors">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
