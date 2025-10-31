import React from "react";
import { Outlet, Link } from "react-router-dom";
import {
  ShoppingBag,
  Users,
  Package,
  BarChart3,
  Settings,
} from "lucide-react";

const AdminLayout = () => {
    
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:flex flex-col justify-between">
        <nav className="space-y-3">
          <Link
            to="/admin/dashboard"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <BarChart3 size={20} /> Dashboard
          </Link>

           <Link
            to="/admin/order-list"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <Package size={20} /> Orders
          </Link>
         

          <Link
            to="/admin/add-product"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <ShoppingBag size={20} /> Add Product
          </Link>

          <Link
            to="/admin/user-list"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <Users size={20} /> Users
          </Link>
           <Link
            to="/admin/product-list"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <Package size={20} /> Products
          </Link>

          <Link
            to="/admin/settings"
            className="flex items-center gap-3 text-gray-700 hover:text-black"
          >
            <Settings size={20} /> Settings
          </Link>
        </nav>
        <p className="text-sm text-gray-400">&copy; 2025 House of Ada</p>
      </aside>

      {/* Dynamic Page Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* 👈 This renders the selected admin page */}
      </main>
    </div>
  );
};

export default AdminLayout;
