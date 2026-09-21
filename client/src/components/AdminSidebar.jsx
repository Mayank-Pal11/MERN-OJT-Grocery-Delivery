import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingBag, Store, LogOut } from 'lucide-react';

const AdminSidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBag },
  ];

  return (
    <aside className="w-full md:w-64 bg-[#5A123E] text-white flex flex-col shadow-md md:min-h-screen">
      {/* Header */}
      <div className="p-6 pb-4 border-b border-[#42102F] hidden md:block">
        <Link to="/admin" className="text-3xl font-extrabold text-[#F6C96A] tracking-wider drop-shadow-sm hover:opacity-90 transition-opacity block">
          GROVIA
        </Link>
        <span className="text-xs font-bold text-white/70 uppercase tracking-widest mt-1 block">
          Admin Panel
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        <div className="md:hidden flex items-center justify-center mr-4 shrink-0">
          <Link to="/admin" className="text-xl font-extrabold text-[#F6C96A] tracking-wider">
            GROVIA
          </Link>
        </div>
        {navItems.map((item) => {
          const isActive = currentPath === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all whitespace-nowrap shrink-0 md:shrink ${
                isActive 
                  ? 'bg-[#FFF8E8] text-[#5A123E] shadow-sm' 
                  : 'text-white/80 hover:bg-[#42102F] hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-[#42102F] flex flex-row md:flex-col gap-2 shrink-0 overflow-x-auto md:overflow-visible">
        <Link 
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-white/80 hover:bg-[#42102F] hover:text-white transition-all whitespace-nowrap"
        >
          <Store className="w-5 h-5" />
          View Store
        </Link>
        {/* Placeholder for future logout functionality */}
        <button 
          className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-red-300 hover:bg-[#42102F] hover:text-red-200 transition-all text-left whitespace-nowrap md:w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
