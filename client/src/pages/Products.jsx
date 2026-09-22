import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../api/productApi';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryParam = searchParams.get('category') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getProducts({ category: categoryParam });
        setProducts(data.products || []);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryParam]);

  return (
    <div className="min-h-screen font-sans bg-[#FFF8E8] flex flex-col">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
        {/* Breadcrumb / Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between border-b border-[#EBDDBF] pb-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-[#2B1723]/60 mb-2">
              <Link to="/" className="hover:text-[#5A123E] transition-colors">Home</Link>
              <span>/</span>
              <span className="font-bold text-[#5A123E]">Products</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#2B1723] tracking-tight">
              {categoryParam ? `${categoryParam}` : 'All Products'}
            </h1>
          </div>
          <div className="mt-4 md:mt-0 text-[#2B1723]/70 font-medium">
            {products.length} {products.length === 1 ? 'item' : 'items'}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-[#5A123E] font-bold animate-pulse">Loading amazing products...</div>
          </div>
        ) : error ? (
          <div className="bg-red-50 text-red-500 p-6 rounded-2xl border border-red-100 text-center font-medium">
            {error}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-[#2B1723]/60 bg-white/50 rounded-3xl border border-[#EBDDBF]">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-xl font-bold mb-2">No products found</h3>
            <p>We couldn't find any products in this category right now.</p>
            <Link to="/" className="inline-block mt-6 bg-[#5A123E] text-white px-6 py-2 rounded-full font-bold hover:bg-[#42102F] transition-colors">
              Return Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
            {products.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Products;
