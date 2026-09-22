import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import CategoryProductSection from '../components/CategoryProductSection';
import SpecialOffer from '../components/SpecialOffer';
import Footer from '../components/Footer';
import { getProducts } from '../api/productApi';

import chipsImg from '../assets/hero/chips.png';
import sodaImg from '../assets/hero/soda.png';
import milkImg from '../assets/hero/milk.png';
import chocolateImg from '../assets/hero/chocolate.png';

import dairyImg from '../assets/categories/dairy.jpg';
import fruitsImg from '../assets/categories/fruits.jpg';
import vegetablesImg from '../assets/categories/vegetables.jpg';
import staplesImg from '../assets/categories/staples.jpg';
import bakeryImg from '../assets/categories/bakery.jpg';
import instantFoodImg from '../assets/categories/instant-food.jpg';
import personalCareImg from '../assets/categories/personal-care.jpg';
import householdImg from '../assets/categories/household.jpg';
import electronicsImg from '../assets/categories/electronics.jpg';
import exoticFruitsImg from '../assets/categories/exotic-fruits.jpg';
import babyCareImg from '../assets/categories/baby-care.jpg';
import beveragesImg from '../assets/categories/beverages.jpg';
import breakfastImg from '../assets/categories/breakfast.jpg';

const defaultCategories = [
  { name: 'Snacks', image: chipsImg },
  { name: 'Drinks', image: sodaImg },
  { name: 'Dairy', image: dairyImg },
  { name: 'Fruits', image: fruitsImg },
  { name: 'Vegetables', image: vegetablesImg },
  { name: 'Staples', image: staplesImg },
  { name: 'Bakery', image: bakeryImg },
  { name: 'Instant Food', image: instantFoodImg },
  { name: 'Personal Care', image: personalCareImg },
  { name: 'Household', image: householdImg },
  { name: 'Electronics', image: electronicsImg },
  { name: 'Exotic Fruits', image: exoticFruitsImg },
  { name: 'Baby Care', image: babyCareImg },
  { name: 'Beverages', image: beveragesImg },
  { name: 'Breakfast', image: breakfastImg },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        // Extract the products array as returned by the backend format
        setProducts(data.products || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProducts = (regexes) => {
    return products.filter(p => p.category && regexes.some(r => r.test(p.category)));
  };

  const snacks = filterProducts([/snack/i, /munchie/i, /chip/i, /biscuit/i, /namkeen/i, /nut/i, /chocolate/i]);
  const beverages = filterProducts([/drink/i, /beverage/i, /juice/i, /soda/i, /water/i]);
  const dairy = filterProducts([/dairy/i, /breakfast/i, /milk/i, /curd/i, /butter/i, /cheese/i]);
  const fruits = filterProducts([/fruit/i, /vegetable/i, /veg/i]);
  const staples = filterProducts([/staple/i, /grocery/i, /rice/i, /flour/i, /dal/i, /pulse/i, /cooking/i]);
  const electronics = filterProducts([/electronic/i, /charge/i, /cable/i, /battery/i, /headphone/i, /mobile/i]);
  const exotic = filterProducts([/exotic/i, /avocado/i, /kiwi/i, /dragon fruit/i, /broccoli/i]);
  const personalCare = filterProducts([/personal care/i, /shampoo/i, /soap/i, /face wash/i, /toothpaste/i, /skincare/i]);

  return (
    <div className="min-h-screen font-sans bg-[#FFF8E8] flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        
        {/* 2. Hero Section - Extracted to Hero.jsx */}
        <Hero />

        {/* 3. Shop by Category */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#2B1723] tracking-tight">
              Popular Categories
            </h2>
            <Link to="/products" className="text-[#5A123E] font-bold text-sm sm:text-base hover:text-[#42102F] transition-colors flex items-center gap-1 group">
              View All <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
          <div className="flex gap-4 sm:gap-6 overflow-x-auto pb-8 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {/* We use defaultCategories directly for the beautiful predefined layout, or mix if needed. */}
            {defaultCategories.map((cat, idx) => (
              <div key={idx} className="shrink-0">
                <CategoryCard name={cat.name} image={cat.image} />
              </div>
            ))}
          </div>
        </section>

        {/* 4. Product Sections (Dynamic from Backend) */}
        <section id="trending-products">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="text-lg text-[#5A123E] font-medium animate-pulse">Loading products...</div>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-500 p-4 rounded-xl border border-red-100 text-center mb-16">
              {error}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12 text-gray-500 mb-16">
              No products available at the moment.
            </div>
          ) : (
            <>
              <CategoryProductSection title="🔥 Trending This Week" category="" products={products} limit={5} />
              <CategoryProductSection title="Snacks & Munchies" category="Snacks" products={snacks} limit={5} />
              <CategoryProductSection title="Drinks & Beverages" category="Beverages" products={beverages} limit={5} />
              <CategoryProductSection title="Dairy & Breakfast" category="Dairy" products={dairy} limit={5} />
              <CategoryProductSection title="Fruits & Vegetables" category="Vegetables" products={fruits} limit={5} />
              <CategoryProductSection title="Staples & Grocery" category="Staples" products={staples} limit={5} />
              <CategoryProductSection title="Electronics" category="Electronics" products={electronics} limit={5} />
              <CategoryProductSection title="Exotic Fruits & Veggies" category="Exotic Fruits" products={exotic} limit={5} />
              <CategoryProductSection title="Personal Care" category="Personal Care" products={personalCare} limit={5} />
            </>
          )}
        </section>

        {/* 5. Promotional Section */}
        <SpecialOffer />

      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
};

export default Home;
