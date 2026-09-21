import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { getProducts, deleteProduct } from '../api/productApi';
import { PackagePlus, Edit2, Trash2 } from 'lucide-react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data.products || data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    try {
      setDeletingId(id);
      setError(null);
      setSuccessMsg(null);
      await deleteProduct(id);
      
      setSuccessMsg(`"${name}" was deleted successfully.`);
      // Update state immediately without refetching all
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans flex flex-col md:flex-row">
      <AdminSidebar />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1723]">Products</h1>
              <p className="text-gray-600 mt-1">Manage your grocery inventory</p>
            </div>
            <Link 
              to="/admin/products/new" 
              className="inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl shadow-sm text-sm font-bold text-white bg-[#5A123E] hover:bg-[#42102F] transition-all hover:-translate-y-0.5"
            >
              <PackagePlus className="w-5 h-5" />
              Add Product
            </Link>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 bg-[#6E8B45]/10 border border-[#6E8B45]/30 text-[#6E8B45] px-4 py-3 rounded-xl text-center shadow-sm font-medium">
              {successMsg}
            </div>
          )}

          {/* Content */}
          <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50 overflow-hidden">
            {loading ? (
              <div className="text-center py-12 text-[#5A123E] font-bold animate-pulse">
                Loading products...
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#2B1723] text-lg font-bold mb-2">No products found</p>
                <p className="text-gray-500 mb-6">You haven't added any products to the store yet.</p>
                <Link 
                  to="/admin/products/new" 
                  className="inline-flex items-center gap-2 text-[#5A123E] font-bold hover:text-[#42102F]"
                >
                  <PackagePlus className="w-5 h-5" /> Add your first product
                </Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#EBDDBF]/50">
                      <th className="pb-3 px-4 font-bold text-gray-500 text-sm uppercase">Product</th>
                      <th className="pb-3 px-4 font-bold text-gray-500 text-sm uppercase hidden sm:table-cell">Category</th>
                      <th className="pb-3 px-4 font-bold text-gray-500 text-sm uppercase">Price</th>
                      <th className="pb-3 px-4 font-bold text-gray-500 text-sm uppercase">Stock</th>
                      <th className="pb-3 px-4 font-bold text-gray-500 text-sm uppercase text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EBDDBF]/30">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-white/50 transition-colors">
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-4">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-12 h-12 object-cover rounded-lg bg-gray-100 shrink-0 border border-[#EBDDBF]/50"
                              onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=No+Image'; }}
                            />
                            <p className="font-bold text-[#2B1723] line-clamp-2">{product.name}</p>
                          </div>
                        </td>
                        <td className="py-4 px-4 hidden sm:table-cell">
                          <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-bold capitalize">
                            {product.category}
                          </span>
                        </td>
                        <td className="py-4 px-4 font-bold text-[#5A123E]">
                          ₹{product.price}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`font-bold ${product.stock > 0 ? 'text-[#6E8B45]' : 'text-red-500'}`}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <Link 
                            to={`/admin/products/${product._id}/edit`}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors mr-2"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(product._id, product.name)}
                            disabled={deletingId === product._id}
                            className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors disabled:opacity-50"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminProducts;
