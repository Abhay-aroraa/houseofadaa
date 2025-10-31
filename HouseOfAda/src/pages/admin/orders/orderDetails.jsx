import React from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../../store/api/orderApi";

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64 text-gray-600">
        Loading order details...
      </div>
    );

  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        ❌ Failed to load order details.
      </div>
    );

  const formatDate = (dateString) => {
    if (!dateString) return "Date not available";
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
    <div className="p-6 bg-white rounded-xl shadow border border-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Order #{order.orderCode}
        </h2>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            order.status === "Delivered"
              ? "bg-green-100 text-green-700"
              : order.status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Customer + Order Info */}
      <div className="grid md:grid-cols-2 gap-4 text-sm mb-6">
        <div>
          <p className="text-gray-500">Order ID</p>
          <p className="font-medium text-gray-800">{order.id}</p>
        </div>

        <div>
          <p className="text-gray-500">Order Date</p>
          <p className="font-medium text-gray-800">{formatDate(order.createdAt)}</p>
        </div>

        <div>
          <p className="text-gray-500">Total Amount</p>
          <p className="font-semibold text-gray-900">₹{order.totalAmount}</p>
        </div>

        <div>
          <p className="text-gray-500">Payment ID</p>
          <p className="font-medium text-gray-800">
            {order.paymentId ? order.paymentId : "Not Paid Yet"}
          </p>
        </div>
      </div>

      {/* Shipping Address */}
      <h3 className="text-lg font-semibold mt-6 mb-3">Shipping Address</h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm mb-6 border rounded-lg p-4 bg-gray-50">
        
        <div>
          <p className="text-gray-500">Name</p>
          <p className="font-medium text-gray-800">
            {order.shippingAddress?.customerName}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Phone</p>
          <p className="font-medium text-gray-800">
            {order.shippingAddress?.phone}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Address</p>
          <p className="font-medium text-gray-800">
            {order.shippingAddress?.addressLine}
          </p>
        </div>

        <div>
          <p className="text-gray-500">City</p>
          <p className="font-medium text-gray-800">
            {order.shippingAddress?.city}
          </p>
        </div>

        <div>
          <p className="text-gray-500">Pincode</p>
          <p className="font-medium text-gray-800">
            {order.shippingAddress?.pincode}
          </p>
        </div>
      </div>

      {/* Order Items */}
      <h3 className="text-lg font-semibold mb-3">Ordered Items</h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm text-gray-700">
          <thead className="bg-gray-100 uppercase text-xs text-gray-600">
            <tr>
              <th className="py-2 px-4 text-left">Product</th>
              <th className="py-2 px-4 text-center">Image</th>
                <th className="py-2 px-4 text-center">Size</th>
              <th className="py-2 px-4 text-center">Qty</th>
              <th className="py-2 px-4 text-center">Price</th>
              <th className="py-2 px-4 text-center">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} className="border-t hover:bg-gray-50 transition-all">
                <td className="py-2 px-4">{item.product.name}</td>
                <td className="py-2 px-4 text-center">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                   <td className="py-2 px-4 text-center">{item.size}</td>
                <td className="py-2 px-4 text-center">{item.quantity}</td>
                <td className="py-2 px-4 text-center">₹{item.price}</td>
                <td className="py-2 px-4 text-center">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Summary */}
      <div className="flex justify-end mt-4 text-sm">
        <div className="text-right">
          <p className="font-semibold text-gray-800">
            Total: ₹{order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
