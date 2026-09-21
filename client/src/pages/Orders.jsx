import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders, cancelOrder } from '../api/orderApi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const data = await getMyOrders();
        setOrders(data.orders || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load your orders.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      setCancellingId(orderId);
      setError(null);
      const updatedData = await cancelOrder(orderId);
      // Update the specific order in the state
      setOrders((currentOrders) =>
        currentOrders.map((o) =>
          o._id === orderId ? updatedData.order : o
        )
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cancel the order. Please try again.');
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] flex justify-center items-center font-sans">
        <div className="text-xl text-[#5A123E] font-bold animate-pulse">Loading your orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans pb-12">
      <header className="bg-[#5A123E] py-6 px-4 shadow-md sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-3xl font-extrabold text-[#F6C96A] tracking-wider drop-shadow-sm hover:opacity-90 transition-opacity">
            GROVIA
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            My Orders
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
            {error}
          </div>
        )}

        {orders.length === 0 ? (
          <div className="bg-[#FFFDF5] rounded-3xl p-10 sm:p-16 text-center shadow-sm border border-[#EBDDBF]/50 max-w-2xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-[#2B1723] mb-4">You haven't placed any orders yet.</h2>
            <Link
              to="/"
              className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-lg font-bold rounded-xl text-white bg-[#5A123E] hover:bg-[#42102F] shadow-md hover:-translate-y-0.5 transition-all duration-300 mt-4"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const date = new Date(order.createdAt).toLocaleDateString();
              const isCancelling = cancellingId === order._id;
              
              return (
                <div key={order._id} className="bg-[#FFFDF5] rounded-2xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-md">
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 flex-1 text-sm sm:text-base text-[#2B1723]">
                    <div>
                      <p className="text-gray-500 mb-1">Order ID</p>
                      <p className="font-bold font-mono text-xs sm:text-sm">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Order Date</p>
                      <p className="font-bold">{date}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Total</p>
                      <p className="font-bold text-[#5A123E]">₹{order.totalAmount}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Status</p>
                      <p className="font-bold uppercase text-[#F6C96A] bg-[#2B1723] inline-block px-2 py-0.5 rounded text-xs">{order.status}</p>
                    </div>
                    
                    <div className="col-span-2 md:col-span-4 flex gap-4 text-xs sm:text-sm mt-2">
                      <span className="text-gray-500">{order.items.length} items</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-gray-500">{order.deliveryAddress?.city}, {order.deliveryAddress?.state}</span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[#6E8B45] font-bold uppercase">{order.paymentMethod} - {order.paymentStatus}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Link 
                      to={`/orders/${order._id}`}
                      className="text-center py-2 px-6 rounded-lg shadow-sm text-sm font-bold text-[#5A123E] bg-white border border-[#5A123E] hover:bg-[#FFF8E8] transition-colors"
                    >
                      View Details
                    </Link>
                    {order.status === 'pending' && (
                      <button 
                        onClick={() => handleCancel(order._id)}
                        disabled={isCancelling}
                        className="text-center py-2 px-6 rounded-lg shadow-sm text-sm font-bold text-red-600 bg-white border border-red-200 hover:bg-red-50 transition-colors disabled:opacity-50"
                      >
                        {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Orders;
