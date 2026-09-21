import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getOrderById, cancelOrder } from '../api/orderApi';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const data = await getOrderById(id);
        setOrder(data.order);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load order details.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      setError(null);
      const updatedData = await cancelOrder(order._id);
      setOrder(updatedData.order);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel the order. Please try again.');
    } finally {
      setCancelling(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] flex justify-center items-center font-sans">
        <div className="text-xl text-[#5A123E] font-bold animate-pulse">Loading order details...</div>
      </div>
    );
  }

  if (error && !order) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] font-sans pb-12">
        <header className="bg-[#5A123E] py-6 px-4 shadow-md sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <Link to="/" className="text-3xl font-extrabold text-[#F6C96A] tracking-wider drop-shadow-sm hover:opacity-90 transition-opacity">
              GROVIA
            </Link>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 text-center">
           <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl shadow-sm inline-block">
            {error}
          </div>
          <br/>
          <Link to="/orders" className="text-[#5A123E] hover:text-[#42102F] font-bold transition-colors">
            ← Back to My Orders
          </Link>
        </main>
      </div>
    );
  }

  const date = new Date(order.createdAt).toLocaleDateString();
  const { deliveryAddress } = order;

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans pb-12">
      <header className="bg-[#5A123E] py-6 px-4 shadow-md sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-3xl font-extrabold text-[#F6C96A] tracking-wider drop-shadow-sm hover:opacity-90 transition-opacity">
            GROVIA
          </Link>
          <div className="flex gap-4">
            <Link to="/orders" className="text-sm font-bold text-white/80 hover:text-white transition-colors">
              ← Back to Orders
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
            {error}
          </div>
        )}

        <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-10 shadow-sm border border-[#EBDDBF]/50">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 border-b border-[#EBDDBF]/50 pb-6 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-[#2B1723] mb-2">Order Details</h1>
              <p className="text-gray-500 font-mono text-sm">ID: {order._id}</p>
              <p className="text-gray-500 text-sm mt-1">Placed on: {date}</p>
            </div>
            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="flex gap-2">
                <span className="font-bold uppercase text-[#F6C96A] bg-[#2B1723] px-3 py-1 rounded text-xs">{order.status}</span>
                <span className="font-bold uppercase text-[#6E8B45] bg-[#6E8B45]/10 px-3 py-1 rounded text-xs">{order.paymentMethod} - {order.paymentStatus}</span>
              </div>
              {order.status === 'pending' && (
                <button 
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 hover:bg-red-100 py-1.5 px-4 rounded transition-colors disabled:opacity-50"
                >
                  {cancelling ? 'Cancelling...' : 'Cancel Order'}
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            {/* Items List */}
            <div className="flex-1 space-y-6">
              <h2 className="text-lg font-bold text-[#2B1723] mb-4">Items</h2>
              {order.items.map((item) => (
                <div key={item.product || item.name} className="flex justify-between items-center text-sm sm:text-base text-[#2B1723] border-b border-[#EBDDBF]/30 pb-4 last:border-0">
                  <div className="flex-1 pr-4">
                    <p className="font-bold mb-1">{item.name}</p>
                    <p className="text-gray-500">₹{item.price} x {item.quantity}</p>
                  </div>
                  <span className="font-bold">₹{item.price * item.quantity}</span>
                </div>
              ))}
              
              <div className="border-t border-[#EBDDBF]/50 pt-4 mt-6 text-[#2B1723]">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{order.totalAmount}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-bold text-[#6E8B45]">FREE</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#EBDDBF]/50 pt-4">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-extrabold text-[#5A123E]">₹{order.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="w-full md:w-72 shrink-0">
              <div className="bg-white rounded-2xl p-6 border border-[#EBDDBF]/30 shadow-sm">
                <h2 className="text-lg font-bold text-[#2B1723] mb-4 border-b border-[#EBDDBF]/50 pb-2">Delivery Address</h2>
                <div className="text-sm text-gray-700 leading-relaxed space-y-1">
                  <p className="font-bold text-[#2B1723] text-base">{deliveryAddress.fullName}</p>
                  <p>{deliveryAddress.phone}</p>
                  <p className="pt-2">{deliveryAddress.addressLine}</p>
                  <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.pincode}</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderDetails;
