import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { PackagePlus, Settings, ListOrdered, TrendingUp, IndianRupee, Clock, Package } from 'lucide-react';
import { getProducts } from '../api/productApi';
import { getAdminDashboardStats } from '../api/orderApi';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalOrders: 0, pendingOrders: 0, totalRevenue: 0 });
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [productsData, statsData] = await Promise.all([
          getProducts(),
          getAdminDashboardStats()
        ]);
        
        // Handle variations in API response formats safely
        const productsList = productsData?.products || (Array.isArray(productsData) ? productsData : []);
        setTotalProducts(productsList.length);
        
        if (statsData?.stats) {
          setStats(statsData.stats);
        }
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);
  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans flex flex-col md:flex-row">
      <AdminSidebar />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1723]">Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of your GROVIA store</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
              {error}
            </div>
          )}

          {/* Stats Cards */}
          {loading ? (
            <div className="bg-[#FFFDF5] rounded-3xl p-12 shadow-sm border border-[#EBDDBF]/50 text-center mb-10">
              <div className="text-[#5A123E] font-bold animate-pulse text-lg">
                Loading dashboard...
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
              {/* Stat 1 */}
              <div className="bg-[#FFFDF5] p-6 rounded-2xl shadow-sm border border-[#EBDDBF]/50 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#5A123E]/10 rounded-full flex items-center justify-center shrink-0">
                  <Package className="w-6 h-6 text-[#5A123E]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Total Products</p>
                  <p className="text-2xl font-extrabold text-[#2B1723]">{totalProducts}</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="bg-[#FFFDF5] p-6 rounded-2xl shadow-sm border border-[#EBDDBF]/50 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#F6C96A]/20 rounded-full flex items-center justify-center shrink-0">
                  <ListOrdered className="w-6 h-6 text-[#2B1723]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Total Orders</p>
                  <p className="text-2xl font-extrabold text-[#2B1723]">{stats.totalOrders || 0}</p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="bg-[#FFFDF5] p-6 rounded-2xl shadow-sm border border-[#EBDDBF]/50 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Pending Orders</p>
                  <p className="text-2xl font-extrabold text-[#2B1723]">{stats.pendingOrders || 0}</p>
                </div>
              </div>

              {/* Stat 4 */}
              <div className="bg-[#FFFDF5] p-6 rounded-2xl shadow-sm border border-[#EBDDBF]/50 flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-[#6E8B45]/10 rounded-full flex items-center justify-center shrink-0">
                  <IndianRupee className="w-6 h-6 text-[#6E8B45]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500 uppercase">Revenue</p>
                  <p className="text-2xl font-extrabold text-[#2B1723]">₹{stats.totalRevenue?.toLocaleString() || 0}</p>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <h2 className="text-lg font-bold text-[#2B1723] mb-4">Quick Actions</h2>
              <div className="bg-[#FFFDF5] rounded-3xl p-6 shadow-sm border border-[#EBDDBF]/50 flex flex-col gap-4">
                <Link to="/admin/products/new" className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-sm text-sm font-bold text-[#42102F] bg-[#F6C96A] hover:bg-[#F2B94A] transition-all hover:-translate-y-0.5">
                  <PackagePlus className="w-5 h-5" />
                  Add Product
                </Link>
                <Link to="/admin/products" className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-sm text-sm font-bold text-[#5A123E] bg-white border-2 border-[#5A123E] hover:bg-[#FFF8E8] transition-all hover:-translate-y-0.5">
                  <Settings className="w-5 h-5" />
                  Manage Products
                </Link>
                <Link to="/admin/orders" className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl shadow-sm text-sm font-bold text-[#5A123E] bg-white border-2 border-[#5A123E] hover:bg-[#FFF8E8] transition-all hover:-translate-y-0.5">
                  <ListOrdered className="w-5 h-5" />
                  Manage Orders
                </Link>
              </div>
            </div>

            {/* Recent Activity (Placeholders) */}
            <div className="lg:col-span-2">
              <h2 className="text-lg font-bold text-[#2B1723] mb-4 flex justify-between items-center">
                Recent Activity
                <span className="text-xs text-gray-400 font-normal border border-gray-200 px-2 py-1 rounded bg-white">Sample Data</span>
              </h2>
              <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50">
                
                <div className="space-y-6">
                  {/* Activity 1 */}
                  <div className="flex items-start gap-4 pb-6 border-b border-[#EBDDBF]/50 last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0 mt-1">
                      <ListOrdered className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2B1723]">New order received</p>
                      <p className="text-sm text-gray-600 mt-0.5">Order #64b5f9e2... for ₹1,240</p>
                      <p className="text-xs font-bold text-gray-400 mt-2">10 minutes ago</p>
                    </div>
                  </div>

                  {/* Activity 2 */}
                  <div className="flex items-start gap-4 pb-6 border-b border-[#EBDDBF]/50 last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-[#5A123E]/10 text-[#5A123E] rounded-full flex items-center justify-center shrink-0 mt-1">
                      <PackagePlus className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2B1723]">Product added</p>
                      <p className="text-sm text-gray-600 mt-0.5">"Organic Whole Milk 1L" added to Dairy</p>
                      <p className="text-xs font-bold text-gray-400 mt-2">2 hours ago</p>
                    </div>
                  </div>

                  {/* Activity 3 */}
                  <div className="flex items-start gap-4 pb-6 border-b border-[#EBDDBF]/50 last:border-0 last:pb-0">
                    <div className="w-10 h-10 bg-[#6E8B45]/10 text-[#6E8B45] rounded-full flex items-center justify-center shrink-0 mt-1">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-[#2B1723]">Stock updated</p>
                      <p className="text-sm text-gray-600 mt-0.5">Inventory increased for "Farm Fresh Eggs (12 pack)"</p>
                      <p className="text-xs font-bold text-gray-400 mt-2">Yesterday</p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
