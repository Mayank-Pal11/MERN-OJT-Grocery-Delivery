import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        
        {/* Protected Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={
            <div className="min-h-screen bg-[#FFF8E8] flex justify-center items-center text-3xl font-bold text-[#5A123E]">
              Admin access verified
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
