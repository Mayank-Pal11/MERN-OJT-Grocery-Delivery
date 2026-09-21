import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import { getAdminOrderById } from '../api/orderApi';
import { ArrowLeft, User, Package, MapPin, CreditCard } from 'lucide-react';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await getAdminOrderById(id);
      setOrder(data.order);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load order details.');
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'paid': return 'text-[#6E8B45] bg-[#6E8B45]/10 border-[#6E8B45]/20';
      case 'pending': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'failed': return 'text-red-600 bg-red-100 border-red-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getOrderStatusColor = (status) => {
    switch(status?.toLowerCase()) {
      case 'delivered': return 'text-[#6E8B45] bg-[#6E8B45]/10';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'confirmed': return 'text-indigo-600 bg-indigo-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans flex flex-col md:flex-row">
      <AdminSidebar />
      
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          
          {/* Header */}
          <div className="mb-8">
            <Link 
              to="/admin/orders"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#5A123E] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Orders
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2B1723]">Order Details</h1>
            {order && <p className="text-gray-600 mt-1">Order #{order._id}</p>}
          </div>

          {/* Messages */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="bg-[#FFFDF5] rounded-3xl p-12 shadow-sm border border-[#EBDDBF]/50 text-center">
              <div className="text-[#5A123E] font-bold animate-pulse text-lg">
                Loading order details...
              </div>
            </div>
          ) : order ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Order Items & Delivery */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Products Section */}
                <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50">
                  <h2 className="text-lg font-bold text-[#2B1723] mb-6 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#5A123E]" />
                    Order Items
                  </h2>
                  
                  <div className="space-y-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border border-[#EBDDBF]/50 bg-white">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                            {item.product?.image ? (
                              <img src={item.product.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <Package className="w-8 h-8 text-gray-300" />
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-[#2B1723] line-clamp-2">{item.name}</p>
                            <p className="text-sm text-gray-500 mt-1">Price: ₹{item.price}</p>
                          </div>
                        </div>
                        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t border-gray-100 sm:border-0 pt-3 sm:pt-0">
                          <p className="text-sm text-gray-500">Qty: <span className="font-bold text-[#2B1723]">{item.quantity}</span></p>
                          <p className="font-bold text-[#5A123E] text-lg sm:mt-1">₹{item.price * item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Section */}
                <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50">
                  <h2 className="text-lg font-bold text-[#2B1723] mb-6 flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#5A123E]" />
                    Delivery Details
                  </h2>
                  
                  {order.deliveryAddress ? (
                    <div className="bg-white p-6 rounded-2xl border border-[#EBDDBF]/50 text-[#2B1723]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Full Name</p>
                          <p className="font-medium">{order.deliveryAddress.fullName}</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                          <p className="font-medium">{order.deliveryAddress.phone}</p>
                        </div>
                        <div className="sm:col-span-2">
                          <p className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Address</p>
                          <p className="font-medium">{order.deliveryAddress.addressLine}</p>
                          <p className="font-medium mt-1">{order.deliveryAddress.city}, {order.deliveryAddress.state} {order.deliveryAddress.pincode}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No delivery address provided.</p>
                  )}
                </div>
              </div>

              {/* Right Column: Customer & Payment */}
              <div className="space-y-6">
                
                {/* Customer Section */}
                <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50">
                  <h2 className="text-lg font-bold text-[#2B1723] mb-6 flex items-center gap-2">
                    <User className="w-5 h-5 text-[#5A123E]" />
                    Customer
                  </h2>
                  
                  {order.user ? (
                    <div className="bg-white p-5 rounded-2xl border border-[#EBDDBF]/50">
                      <p className="font-bold text-[#2B1723]">{order.user.name}</p>
                      <p className="text-gray-600 text-sm mt-1">{order.user.email}</p>
                    </div>
                  ) : (
                    <div className="bg-white p-5 rounded-2xl border border-[#EBDDBF]/50">
                      <p className="text-gray-500 italic">Customer details unavailable</p>
                    </div>
                  )}
                </div>

                {/* Payment Section */}
                <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50">
                  <h2 className="text-lg font-bold text-[#2B1723] mb-6 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#5A123E]" />
                    Order Summary
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-[#EBDDBF]/30">
                      <span className="text-gray-600">Order Date</span>
                      <span className="font-bold text-[#2B1723] text-sm text-right">{new Date(order.createdAt).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center py-3 border-b border-[#EBDDBF]/30">
                      <span className="text-gray-600">Order Status</span>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${getOrderStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-[#EBDDBF]/30">
                      <span className="text-gray-600">Payment Status</span>
                      <span className={`px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-[#EBDDBF]/30">
                      <span className="text-gray-600">Payment Method</span>
                      <span className="font-bold text-[#2B1723] uppercase text-sm">{order.paymentMethod}</span>
                    </div>

                    {order.razorpayOrderId && (
                      <div className="py-3 border-b border-[#EBDDBF]/30">
                        <span className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Razorpay Order ID</span>
                        <span className="font-mono text-xs text-[#2B1723] break-all">{order.razorpayOrderId}</span>
                      </div>
                    )}
                    
                    {order.razorpayPaymentId && (
                      <div className="py-3 border-b border-[#EBDDBF]/30">
                        <span className="block text-xs text-gray-500 uppercase tracking-wide mb-1">Razorpay Payment ID</span>
                        <span className="font-mono text-xs text-[#2B1723] break-all">{order.razorpayPaymentId}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center pt-4 mt-2">
                      <span className="text-lg font-bold text-[#2B1723]">Total Amount</span>
                      <span className="text-2xl font-extrabold text-[#5A123E]">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ) : null}
          
        </div>
      </main>
    </div>
  );
};

export default AdminOrderDetails;
