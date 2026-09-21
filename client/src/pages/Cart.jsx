import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItem, removeCartItem } from '../api/cartApi';

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null); // To handle loading states per item

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      // Store the actual nested cart object
      setCart(data.cart);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load your cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (productId, currentQuantity, change) => {
    const newQuantity = currentQuantity + change;
    if (newQuantity < 1) return; // Prevent going below 1

    try {
      setUpdatingId(productId);
      setError(null);
      await updateCartItem(productId, newQuantity);
      await fetchCart(); // Refresh cart to get updated totals from backend
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update item quantity.');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setUpdatingId(productId);
      setError(null);
      await removeCartItem(productId);
      await fetchCart(); // Refresh cart after removal
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove item from cart.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Safe checks for rendering
  const cartItems = cart?.items || [];
  const cartSubtotal = cart?.subtotal || 0;

  if (loading && !cart) {
    return (
      <div className="min-h-screen bg-[#FFF8E8] flex justify-center items-center font-sans">
        <div className="text-xl text-[#5A123E] font-bold animate-pulse">Loading your cart...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF8E8] font-sans pb-12">
      {/* Simple GROVIA Header (as requested) */}
      <header className="bg-[#5A123E] py-6 px-4 shadow-md sm:px-6 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="text-3xl font-extrabold text-[#F6C96A] tracking-wider drop-shadow-sm hover:opacity-90 transition-opacity">
            GROVIA
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
            Your Shopping Cart
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Global Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-center shadow-sm">
            {error}
          </div>
        )}

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-[#FFFDF5] rounded-3xl p-10 sm:p-16 text-center shadow-sm border border-[#EBDDBF]/50 max-w-2xl mx-auto mt-10">
            <div className="text-7xl mb-6">🛒</div>
            <h2 className="text-3xl font-bold text-[#2B1723] mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8 text-lg">Looks like you haven't added any fresh groceries yet.</p>
            <Link
              to="/"
              className="inline-flex justify-center items-center px-8 py-3.5 border border-transparent text-lg font-bold rounded-xl text-white bg-[#5A123E] hover:bg-[#42102F] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          /* Active Cart Layout */
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column: Cart Items List */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => {
                const product = item.product;
                const productId = product?._id || product?.id;
                const isUpdating = updatingId === productId;

                if (!product) return null; // Defensive check for missing product data

                return (
                  <div 
                    key={productId} 
                    className={`bg-[#FFFDF5] rounded-2xl p-4 sm:p-6 shadow-sm border border-[#EBDDBF]/50 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 transition-opacity ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 bg-white rounded-xl p-2 border border-[#EBDDBF]/30 flex items-center justify-center overflow-hidden shadow-inner">
                      <img 
                        src={product.image || 'https://placehold.co/150'} 
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 text-center sm:text-left w-full">
                      <h3 className="text-lg sm:text-xl font-bold text-[#2B1723] mb-1">
                        {product.name}
                      </h3>
                      <p className="text-[#5A123E] font-bold text-lg mb-4">
                        ₹{product.price}
                      </p>

                      <div className="flex items-center justify-between sm:justify-start sm:gap-8 w-full mt-auto">
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center bg-white border border-[#EBDDBF] rounded-lg shadow-sm">
                          <button 
                            onClick={() => handleUpdateQuantity(productId, item.quantity, -1)}
                            disabled={item.quantity <= 1 || isUpdating}
                            className="px-3 py-1 text-[#5A123E] hover:bg-[#FFF8E8] disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xl rounded-l-lg transition-colors"
                          >
                            -
                          </button>
                          <span className="px-4 py-1 font-bold text-[#2B1723] border-x border-[#EBDDBF] min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => handleUpdateQuantity(productId, item.quantity, 1)}
                            disabled={isUpdating}
                            className="px-3 py-1 text-[#5A123E] hover:bg-[#FFF8E8] disabled:opacity-50 disabled:cursor-not-allowed font-bold text-xl rounded-r-lg transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button 
                          onClick={() => handleRemoveItem(productId)}
                          disabled={isUpdating}
                          className="text-red-500 hover:text-red-700 text-sm font-bold uppercase tracking-wider transition-colors ml-auto sm:ml-0 px-2 py-1"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    {/* Desktop Subtotal display */}
                    <div className="hidden sm:block text-right shrink-0">
                      <p className="text-sm text-gray-500 mb-1 font-medium uppercase tracking-wider">Subtotal</p>
                      <p className="text-xl font-bold text-[#2B1723]">
                        ₹{product.price * item.quantity}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Column: Order Summary Sidebar */}
            <div className="w-full lg:w-80 shrink-0">
              <div className="bg-[#FFFDF5] rounded-3xl p-6 sm:p-8 shadow-md border border-[#EBDDBF]/50 sticky top-6">
                <h2 className="text-xl font-bold text-[#2B1723] mb-6 pb-4 border-b border-[#EBDDBF]/50">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6 text-[#2B1723]">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({cartItems.length} items)</span>
                    <span className="font-bold">₹{cartSubtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-bold text-[#6E8B45]">FREE</span>
                  </div>
                </div>
                
                <div className="border-t border-[#EBDDBF]/50 pt-4 mb-8 flex justify-between items-center">
                  <span className="text-lg font-bold text-[#2B1723]">Total</span>
                  <span className="text-2xl font-extrabold text-[#5A123E]">
                    ₹{cartSubtotal}
                  </span>
                </div>

                <Link 
                  to="/checkout"
                  className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-[#42102F] bg-[#F6C96A] hover:bg-[#F2B94A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F6C96A] transition-all hover:-translate-y-0.5 duration-300"
                >
                  Proceed to Checkout
                </Link>
                
                <div className="mt-6 text-center">
                  <Link to="/" className="text-sm font-bold text-[#5A123E] hover:text-[#42102F] transition-colors uppercase tracking-wider">
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
};

export default Cart;
