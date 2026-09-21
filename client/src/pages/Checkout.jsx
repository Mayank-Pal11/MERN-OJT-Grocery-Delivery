import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart } from '../api/cartApi';
import { createRazorpayOrder, verifyRazorpayPayment } from '../api/paymentApi';

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = await getCart();
        setCart(data.cart);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load checkout details.');
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPaymentLoading(true);
    setError(null);
    setSuccessMsg(null);

    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      setError('Payment service is unavailable. Please try again.');
      setPaymentLoading(false);
      return;
    }

    try {
      const data = await createRazorpayOrder();
      const { razorpayOrder } = data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Frontend TEST key ID
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "GROVIA",
        description: "Grocery Order",
        order_id: razorpayOrder.id,
        prefill: {
          name: formData.fullName,
          contact: formData.phone,
        },
        theme: {
          color: "#5A123E",
        },
        handler: async function (response) {
          try {
            setError(null);
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              deliveryAddress: {
                fullName: formData.fullName,
                phone: formData.phone,
                addressLine: formData.address,
                city: formData.city,
                state: formData.state,
                pincode: formData.pincode
              }
            };
            const verificationResult = await verifyRazorpayPayment(verificationData);
            setSuccessMsg('Payment successful! Your order has been placed.');
            console.log('Order created:', verificationResult);
          } catch (err) {
            setError(err.response?.data?.message || 'Payment verification failed. Please try again.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        setError('Payment failed or cancelled. Please try again.');
      });
      rzp.open();
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to start payment. Please try again.');
    } finally {
      setPaymentLoading(false);
    }
  };

  const cartItems = cart?.items || [];
  const cartSubtotal = cart?.subtotal || 0;

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] flex justify-center items-center font-sans">
        <div className="text-xl text-[#5A123E] font-bold animate-pulse">Loading checkout...</div>
      </div>
    );
  }

  if (!loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] font-sans pb-12">
        <header className="bg-[#5A123E] py-6 px-4 shadow-md sm:px-6 lg:px-8 mb-8">
          <div className="max-w-7xl mx-auto flex items-center">
            <Link to="/" className="text-3xl font-extrabold text-[#F6C96A] tracking-wider drop-shadow-sm hover:opacity-90 transition-opacity">
              GROVIA
            </Link>
          </div>
        </header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFFDF5] rounded-3xl p-10 sm:p-16 text-center shadow-sm border border-[#EBDDBF]/50 max-w-2xl mx-auto mt-10">
            <h2 className="text-3xl font-bold text-[#2B1723] mb-4">Your cart is empty</h2>
            <Link
              to="/"
              className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-lg font-bold rounded-xl text-white bg-[#5A123E] hover:bg-[#42102F] shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
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
            Checkout
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Delivery Form */}
          <div className="flex-1">
            <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#EBDDBF]/50">
              <h2 className="text-2xl font-bold text-[#2B1723] mb-6">Delivery Address</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-[#2B1723] mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF] focus:outline-none focus:ring-2 focus:ring-[#5A123E] focus:border-[#5A123E] bg-white transition-shadow"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#2B1723] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    pattern="[0-9]{10,15}"
                    title="Please enter a valid phone number (10-15 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF] focus:outline-none focus:ring-2 focus:ring-[#5A123E] focus:border-[#5A123E] bg-white transition-shadow"
                    placeholder="9876543210"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#2B1723] mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF] focus:outline-none focus:ring-2 focus:ring-[#5A123E] focus:border-[#5A123E] bg-white transition-shadow"
                    placeholder="123 Main St, Apt 4B"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-[#2B1723] mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF] focus:outline-none focus:ring-2 focus:ring-[#5A123E] focus:border-[#5A123E] bg-white transition-shadow"
                      placeholder="Mumbai"
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-[#2B1723] mb-1">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF] focus:outline-none focus:ring-2 focus:ring-[#5A123E] focus:border-[#5A123E] bg-white transition-shadow"
                      placeholder="Maharashtra"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-[#2B1723] mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    pattern="[0-9]{6}"
                    title="Please enter a valid 6-digit pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-[#EBDDBF] focus:outline-none focus:ring-2 focus:ring-[#5A123E] focus:border-[#5A123E] bg-white transition-shadow"
                    placeholder="400001"
                  />
                </div>

                <button
                  type="submit"
                  disabled={paymentLoading}
                  className="w-full py-4 px-4 rounded-xl shadow-md text-lg font-bold text-[#42102F] bg-[#F6C96A] hover:bg-[#F2B94A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F6C96A] transition-all hover:-translate-y-0.5 duration-300 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {paymentLoading ? 'Creating Payment...' : 'Proceed to Payment'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="w-full lg:w-96 shrink-0">
            <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-md border border-[#EBDDBF]/50 sticky top-6">
              <h2 className="text-xl font-bold text-[#2B1723] mb-6 pb-4 border-b border-[#EBDDBF]/50">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => {
                  const product = item.product;
                  if (!product) return null;
                  return (
                    <div key={product._id || product.id} className="flex justify-between items-start text-sm">
                      <div className="flex-1 pr-4">
                        <p className="font-medium text-[#2B1723] line-clamp-2">{product.name}</p>
                        <p className="text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-bold text-[#2B1723]">₹{product.price * item.quantity}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-4 pt-4 border-t border-[#EBDDBF]/50 text-[#2B1723]">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold">₹{cartSubtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-bold text-[#6E8B45]">FREE</span>
                </div>
              </div>
              
              <div className="border-t border-[#EBDDBF]/50 pt-4 mt-6 flex justify-between items-center">
                <span className="text-lg font-bold text-[#2B1723]">Total</span>
                <span className="text-2xl font-extrabold text-[#5A123E]">
                  ₹{cartSubtotal}
                </span>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Checkout;
