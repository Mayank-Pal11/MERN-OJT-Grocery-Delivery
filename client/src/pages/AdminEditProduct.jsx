import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { getProductById, updateProduct } from '../api/productApi';
import { ArrowLeft, Save } from 'lucide-react';

const AdminEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: ''
  });
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        const product = data.product || data;
        
        setFormData({
          name: product.name || '',
          description: product.description || '',
          price: product.price !== undefined ? product.price : '',
          image: product.image || product.imageUrl || '',
          category: product.category || '',
          stock: product.stock !== undefined ? product.stock : ''
        });
        
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch product details.');
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic frontend validation
    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      formData.price === '' ||
      !formData.image.trim() ||
      !formData.category.trim() ||
      formData.stock === ''
    ) {
      setError('Please fill in all fields.');
      return;
    }
    
    if (Number(formData.price) < 0) {
      setError('Price cannot be negative.');
      return;
    }
    
    if (Number(formData.stock) < 0 || !Number.isInteger(Number(formData.stock))) {
      setError('Stock must be a whole number greater than or equal to 0.');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      await updateProduct(id, {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
      
      setSuccessMsg('Product updated successfully!');
      
      // Navigate back after a short delay
      setTimeout(() => {
        navigate('/admin/products');
      }, 1500);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product. Please try again.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans flex flex-col md:flex-row">
      <AdminSidebar />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header & Back Button */}
          <div className="mb-8">
            <Link 
              to="/admin/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#5A123E] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1723]">Edit Product</h1>
            <p className="text-gray-600 mt-1">Update existing grocery item details</p>
          </div>

          {/* Form Card */}
          <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50">
            
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium shadow-sm">
                {error}
              </div>
            )}
            
            {successMsg && (
              <div className="mb-6 bg-[#6E8B45]/10 border border-[#6E8B45]/30 text-[#6E8B45] px-4 py-3 rounded-xl text-sm font-medium shadow-sm">
                {successMsg} Redirecting...
              </div>
            )}

            {loading ? (
              <div className="text-center py-12 text-[#5A123E] font-bold animate-pulse">
                Loading product details...
              </div>
            ) : fetchError ? (
              <div className="text-center py-8">
                <Link
                  to="/admin/products"
                  className="inline-flex px-6 py-3.5 rounded-xl font-bold text-white bg-[#5A123E] hover:bg-[#42102F] transition-all focus:outline-none shadow-md"
                >
                  Return to Products
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-bold text-[#2B1723] mb-2">Product Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Farm Fresh Apples"
                    className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF]/50 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A123E]/50 transition-all text-[#2B1723]"
                    disabled={submitting || successMsg}
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-bold text-[#2B1723] mb-2">Description</label>
                  <textarea 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Enter a brief product description..."
                    className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF]/50 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A123E]/50 transition-all text-[#2B1723] resize-none"
                    disabled={submitting || successMsg}
                  ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Category */}
                  <div>
                    <label className="block text-sm font-bold text-[#2B1723] mb-2">Category</label>
                    <input 
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      placeholder="e.g. Fruits"
                      className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF]/50 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A123E]/50 transition-all text-[#2B1723]"
                      disabled={submitting || successMsg}
                    />
                  </div>

                  {/* Image URL */}
                  <div>
                    <label className="block text-sm font-bold text-[#2B1723] mb-2">Image URL</label>
                    <input 
                      type="text"
                      name="image"
                      value={formData.image}
                      onChange={handleChange}
                      placeholder="https://example.com/image.png"
                      className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF]/50 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A123E]/50 transition-all text-[#2B1723]"
                      disabled={submitting || successMsg}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-bold text-[#2B1723] mb-2">Price (₹)</label>
                    <input 
                      type="number"
                      name="price"
                      min="0"
                      step="0.01"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="0.00"
                      className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF]/50 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A123E]/50 transition-all text-[#2B1723]"
                      disabled={submitting || successMsg}
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-sm font-bold text-[#2B1723] mb-2">Stock Quantity</label>
                    <input 
                      type="number"
                      name="stock"
                      min="0"
                      step="1"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF]/50 bg-white focus:outline-none focus:ring-2 focus:ring-[#5A123E]/50 transition-all text-[#2B1723]"
                      disabled={submitting || successMsg}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-[#EBDDBF]/50 flex flex-col sm:flex-row gap-4 justify-end">
                  <Link
                    to="/admin/products"
                    className="px-6 py-3.5 rounded-xl font-bold text-[#5A123E] bg-white border-2 border-[#5A123E] hover:bg-[#FFF8E8] transition-all text-center focus:outline-none"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    disabled={submitting || successMsg}
                    className="flex justify-center items-center gap-2 px-8 py-3.5 rounded-xl shadow-md font-bold text-white bg-[#5A123E] hover:bg-[#42102F] transition-all disabled:opacity-70 disabled:hover:bg-[#5A123E] focus:outline-none"
                  >
                    {submitting ? (
                      'Updating Product...'
                    ) : (
                      <>
                        <Save className="w-5 h-5" />
                        Update Product
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminEditProduct;
