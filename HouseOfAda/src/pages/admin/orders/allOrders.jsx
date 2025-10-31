import React from "react";
import { useGetAllOrdersQuery } from "../../../store/api/orderApi";
import Loadercomp from "../../../components/Loader";
import { useNavigate } from "react-router-dom";

const AllOrders = () => {
  const { data: orders, isLoading, isError } = useGetAllOrdersQuery();
  const navigate = useNavigate();

  if (isLoading) return <Loadercomp />;
  if (isError)
    return (
      <p className="text-center py-10 text-red-500">Failed to load orders.</p>
    );

  // ✅ Sort by createdAt (latest first)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-xl shadow border border-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="py-3 px-4">Order ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Total</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Date</th>
              <th className="py-3 px-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {sortedOrders?.length > 0 ? (
              sortedOrders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b hover:bg-gray-50 transition-all"
                >
                  <td className="py-2 px-4 font-medium text-gray-800">
                    #{order.id}
                  </td>
                  <td className="py-2 px-4">
                    <div className="font-medium">{order.userName}</div>
                    <div className="text-xs text-gray-500">
                      {order.userEmail}
                    </div>
                  </td>
                  <td className="py-2 px-4 font-semibold text-gray-700">
                    ₹{order.totalAmount.toFixed(2)}
                  </td>
                  <td
                    className={`py-2 px-4 font-medium ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Pending"
                        ? "text-yellow-600"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </td>
                  <td className="py-2 px-4 text-gray-600">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/admin/order-details/${order.id}`)
                      }
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
