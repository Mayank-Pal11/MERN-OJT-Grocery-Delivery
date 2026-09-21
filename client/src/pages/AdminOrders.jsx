import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import { getAdminOrders, updateOrderStatus } from '../api/orderApi';
import { ShoppingBag, ChevronDown } from 'lucide-react';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Track updating state for individual orders to disable their dropdown
  const [updatingId, setUpdatingId] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAdminOrders();
      setOrders(data.orders || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load orders.');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    if (updatingId === orderId) return; // Prevent multiple clicks

    try {
      setUpdatingId(orderId);
      setUpdateError(null);
      setUpdateSuccess(null);
      
      await updateOrderStatus(orderId, newStatus);
      
      // Update local state
      setOrders(currentOrders => 
        currentOrders.map(order => 
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
      
      setUpdateSuccess(`Order #${orderId.substring(0, 8)} status updated successfully.`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setUpdateSuccess(null), 3000);
      
    } catch (err) {
      setUpdateError(err.response?.data?.message || 'Failed to update order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid': return 'text-[#6E8B45] bg-[#6E8B45]/10';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'failed': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans flex flex-col md:flex-row">
      <AdminSidebar />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1723] flex items-center gap-3">
              <ShoppingBag className="w-8 h-8 text-[#5A123E]" />
              Orders
            </h1>
            <p className="text-gray-600 mt-1">Manage customer orders and delivery status</p>
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
              {error}
            </div>
          )}
          {updateError && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
              {updateError}
            </div>
          )}
          {updateSuccess && (
            <div className="mb-6 bg-[#6E8B45]/10 border border-[#6E8B45]/30 text-[#6E8B45] px-4 py-3 rounded-xl text-center shadow-sm font-medium">
              {updateSuccess}
            </div>
          )}

          {/* Content */}
          <div className="space-y-6">
            {loading ? (
              <div className="bg-[#FFFDF5] rounded-3xl p-12 shadow-sm border border-[#EBDDBF]/50 text-center">
                <div className="text-[#5A123E] font-bold animate-pulse text-lg">
                  Loading orders...
                </div>
              </div>
            ) : orders.length === 0 ? (
              <div className="bg-[#FFFDF5] rounded-3xl p-12 shadow-sm border border-[#EBDDBF]/50 text-center">
                <p className="text-[#2B1723] text-lg font-bold mb-2">No orders found</p>
                <p className="text-gray-500">Your store hasn't received any orders yet.</p>
              </div>
            ) : (
              orders.map((order) => {
                const date = new Date(order.createdAt).toLocaleString();
                const shortId = `#${order._id.substring(0, 8)}`;
                const isUpdating = updatingId === order._id;
                
                return (
                  <div key={order._id} className="bg-[#FFFDF5] rounded-3xl p-6 lg:p-8 shadow-sm border border-[#EBDDBF]/50 flex flex-col gap-6 relative">
                    
                    {/* Top Row: ID, Date, Customer */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 border-b border-[#EBDDBF]/50 pb-6">
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono font-bold text-[#5A123E] text-lg">{shortId}</span>
                          <span className="text-sm text-gray-500">{date}</span>
                        </div>
                        
                        {order.user ? (
                          <div className="text-sm">
                            <p className="font-bold text-[#2B1723]">{order.user.name}</p>
                            <p className="text-gray-600">{order.user.email}</p>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-500 italic">Customer unavailable</div>
                        )}
                      </div>

                      {/* Status Selector */}
                      <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Order Status</label>
                        <div className="relative">
                          <select 
                            value={order.status}
                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                            disabled={isUpdating}
                            className={`appearance-none bg-white border ${isUpdating ? 'border-gray-300 text-gray-400' : 'border-[#EBDDBF] text-[#2B1723] focus:border-[#5A123E] focus:ring-1 focus:ring-[#5A123E] cursor-pointer'} rounded-xl py-2 pl-4 pr-10 font-bold capitalize transition-all outline-none`}
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                          <ChevronDown className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none ${isUpdating ? 'text-gray-400' : 'text-[#5A123E]'}`} />
                        </div>
                        {isUpdating && <span className="text-xs text-[#5A123E] animate-pulse absolute -bottom-5 right-0 whitespace-nowrap">Updating...</span>}
                      </div>

                    </div>

                    {/* Middle Row: Items & Delivery Address */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* Items */}
                      <div>
                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Order Items</h4>
                        <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#EBDDBF]/30 max-h-48 overflow-y-auto">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between items-start gap-4 text-sm">
                              <div>
                                <p className="font-bold text-[#2B1723] line-clamp-1">{item.name}</p>
                                <p className="text-gray-500">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-bold text-[#5A123E] whitespace-nowrap">₹{item.price}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Delivery Address & Payment */}
                      <div className="flex flex-col gap-6">
                        
                        <div>
                          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Delivery Details</h4>
                          {order.deliveryAddress ? (
                            <div className="bg-white p-4 rounded-2xl border border-[#EBDDBF]/30 text-sm text-[#2B1723] leading-relaxed">
                              <p className="font-bold">{order.deliveryAddress.fullName} • {order.deliveryAddress.phone}</p>
                              <p className="text-gray-600 mt-1">{order.deliveryAddress.addressLine}</p>
                              <p className="text-gray-600">{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.pincode}</p>
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">Address not provided</p>
                          )}
                        </div>

                        <div className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-[#EBDDBF]/30">
                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Total</p>
                            <p className="font-extrabold text-[#5A123E] text-lg">₹{order.totalAmount}</p>
                          </div>
                          <div className="h-10 w-px bg-[#EBDDBF]/50"></div>
                          <div>
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1">Payment ({order.paymentMethod})</p>
                            <span className={`inline-block px-2.5 py-0.5 rounded font-bold text-xs uppercase tracking-wider ${getPaymentStatusColor(order.paymentStatus)}`}>
                              {order.paymentStatus}
                            </span>
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                );
              })
            )}
          </div>
          
        </div>
      </main>
    </div>
  );
};

export default AdminOrders;
