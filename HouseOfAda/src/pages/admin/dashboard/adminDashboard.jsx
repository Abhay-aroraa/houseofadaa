import React from "react";
import {
  ShoppingBag,
  Users,
  Package,
  IndianRupee,
  BarChart3,
  Settings,
} from "lucide-react";
import { useGetAllUsersQuery } from "../../../store/api/Authapi";
import { useGetProductListQuery } from "../../../store/api/productApi";

const AdminDashboard = () => {
  const { data: response, isLoading, isError } = useGetAllUsersQuery();
  const { data: products, HaveLoading, haveError } = useGetProductListQuery();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
   

      {/* Main Dashboard */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Orders</p>
                <h3 className="text-2xl font-bold">328</h3>
              </div>
              <ShoppingBag className="text-pink-600" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Users</p>
                <h3 className="text-2xl font-bold">
                  <h3 className="text-2xl font-bold">
                    {isLoading
                      ? "Loading..."
                      : isError
                      ? "Error"
                      : response?.length || 0}
                  </h3>
                </h3>
              </div>
              <Users className="text-pink-600" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border border-gray-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">Total Products</p>
                <h3 className="text-2xl font-bold">
                  {" "}
                  {HaveLoading
                    ? "Loading..."
                    : haveError
                    ? "Error"
                    : products?.length || 0}
                </h3>
              </div>
              <Package className="text-pink-600" />
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="text-gray-600 border-b">
                <th className="py-2">Order ID</th>
                <th className="py-2">Customer</th>
                <th className="py-2">Total</th>
                <th className="py-2">Status</th>
                <th className="py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="py-2">#1234</td>
                <td className="py-2">Abhay Phutela</td>
                <td className="py-2">₹2,499</td>
                <td className="py-2 text-green-600">Delivered</td>
                <td className="py-2">20 Oct 2025</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 transition">
                <td className="py-2">#1235</td>
                <td className="py-2">Riya Kapoor</td>
                <td className="py-2">₹1,299</td>
                <td className="py-2 text-yellow-600">Processing</td>
                <td className="py-2">19 Oct 2025</td>
              </tr>
              <tr className="hover:bg-gray-50 transition">
                <td className="py-2">#1236</td>
                <td className="py-2">Arjun Sharma</td>
                <td className="py-2">₹999</td>
                <td className="py-2 text-red-600">Cancelled</td>
                <td className="py-2">18 Oct 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
