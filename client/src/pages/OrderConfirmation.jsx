import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const OrderConfirmation = () => {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] flex flex-col justify-center items-center font-sans p-4 text-center">
        <h2 className="text-2xl font-bold text-[#2B1723] mb-4">Order details are unavailable.</h2>
        <Link to="/" className="text-[#5A123E] hover:text-[#42102F] font-bold transition-colors">
          Return to Home
        </Link>
      </div>
    );
  }

  const { deliveryAddress } = order;

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans pb-12">
      <header className="bg-[#5A123E] py-6 px-4 shadow-md sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="text-3xl font-extrabold text-[#F6C96A] tracking-wider drop-shadow-sm hover:opacity-90 transition-opacity">
            GROVIA
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="bg-[#FFFDF5] rounded-3xl p-8 sm:p-12 shadow-sm border border-[#EBDDBF]/50 text-center">
          <div className="w-20 h-20 bg-[#6E8B45]/10 text-[#6E8B45] rounded-full flex items-center justify-center mx-auto mb-6 text-4xl shadow-sm border border-[#6E8B45]/30">
            ✓
          </div>
          <h1 className="text-3xl font-bold text-[#2B1723] mb-2">Order placed successfully!</h1>
          <p className="text-gray-600 mb-10 text-lg">Thank you for shopping with GROVIA.</p>
          
          <div className="text-left bg-white rounded-2xl p-6 sm:p-8 border border-[#EBDDBF]/30 shadow-sm mb-8 space-y-6">
            <h2 className="text-xl font-bold text-[#2B1723] border-b border-[#EBDDBF]/50 pb-3">Order Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-[#2B1723]">
              <div>
                <p className="text-gray-500 mb-1">Order ID</p>
                <p className="font-bold font-mono">{order._id}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Total Amount</p>
                <p className="font-bold text-[#5A123E]">₹{order.totalAmount}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Order Status</p>
                <p className="font-bold uppercase text-[#F6C96A] bg-[#2B1723] inline-block px-2 py-0.5 rounded text-xs">{order.status}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Payment</p>
                <p className="font-bold uppercase text-[#6E8B45] bg-[#6E8B45]/10 inline-block px-2 py-0.5 rounded text-xs">{order.paymentMethod} - {order.paymentStatus}</p>
              </div>
            </div>

            <h2 className="text-xl font-bold text-[#2B1723] border-b border-[#EBDDBF]/50 pb-3 mt-8">Delivery Address</h2>
            <div className="text-sm sm:text-base text-gray-700 leading-relaxed">
              <p className="font-bold text-[#2B1723]">{deliveryAddress.fullName}</p>
              <p>{deliveryAddress.phone}</p>
              <p>{deliveryAddress.addressLine}</p>
              <p>{deliveryAddress.city}, {deliveryAddress.state} {deliveryAddress.pincode}</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/orders"
              className="py-3.5 px-8 rounded-xl shadow-md text-lg font-bold text-white bg-[#5A123E] hover:bg-[#42102F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A123E] transition-all hover:-translate-y-0.5 duration-300"
            >
              View My Orders
            </Link>
            <Link 
              to="/"
              className="py-3.5 px-8 rounded-xl shadow-sm text-lg font-bold text-[#5A123E] bg-white border-2 border-[#5A123E] hover:bg-[#FFF8E8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A123E] transition-all hover:-translate-y-0.5 duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
