import React, { useMemo } from "react";
import { Trash, Minus, Plus } from "lucide-react";
import {
  useClearCartMutation,
  useGetCartByIdQuery,
  useRemoveItemMutation,
  useUpdateQuantityMutation,
} from "../../store/api/CartApi";

const Cart = () => {
  const userId = localStorage.getItem("userId");

  const { data: cartData, isLoading, isFetching, isError, error } =
    useGetCartByIdQuery(userId);

  const [updateQuantity] = useUpdateQuantityMutation();
  const [removeItem] = useRemoveItemMutation();
  const [clearCart] = useClearCartMutation();

  const items = cartData?.items ?? [];
  const subtotal = useMemo(
    () =>
      items.reduce((acc, it) => acc + (it.price ?? 0) * (it.quantity ?? 0), 0),
    [items]
  );

  const handleQuantity = async (productId, size, type) => {
    try {
      const current = items.find(
        (i) => i.productId === productId && i.size === size
      );
      if (!current) return;
      const newQty =
        type === "inc"
          ? current.quantity + 1
          : Math.max(1, current.quantity - 1);

      await updateQuantity({ userId, productId, size, quantity: newQty }).unwrap();
    } catch (err) {
      console.error("Update quantity failed:", err);
      alert(err?.data?.error ?? "Failed to update quantity");
    }
  };

  const handleRemove = async (productId, size) => {
    if (!confirm("Remove this item from your cart?")) return;
    try {
      await removeItem({ userId, productId, size }).unwrap();
    } catch (err) {
      console.error("Remove failed:", err);
      alert(err?.data?.error ?? "Failed to remove item");
    }
  };

  const handleClear = async () => {
    if (!confirm("Clear your entire cart?")) return;
    try {
      const res = await clearCart(userId).unwrap();
      alert(res.message);
    } catch (err) {
      console.error("Clear cart failed:", err);
      alert(err?.data?.error ?? "Failed to clear cart");
    }
  };

  // === UI ===
  if (isLoading)
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-gray-500">
        Loading your cart...
      </div>
    );

  if (isError)
    return (
      <div className="w-full min-h-screen flex justify-center items-center text-red-500">
        Failed to load cart: {error?.data?.error ?? "Unknown error"}
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-black px-4 md:px-8 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold tracking-wide uppercase">
            Shopping Cart
          </h2>
          <span className="text-gray-500 text-sm">
            {isFetching ? "Refreshing..." : `${items.length} item(s)`}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 border border-gray-200 rounded-xl shadow-sm">
            <p className="text-gray-600 text-lg mb-4">
              Your cart is empty 😢
            </p>
            <a
              href="/"
              className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="md:col-span-2 space-y-6">
              {items.map((item) => (
                <div
                  key={`${item.productId}-${item.size}`}
                  className="flex flex-col sm:flex-row bg-gray-50 border border-gray-200 rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="w-full sm:w-40 h-52 sm:h-40 flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-contain bg-white"
                    />
                  </div>

                  <div className="flex flex-col justify-between p-4 flex-1">
                    <div>
                      <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                      <p className="text-gray-500 text-sm mb-1">
                        Size: {item.size}
                      </p>
                      <p className="font-semibold text-lg">₹{item.price}</p>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-gray-300 rounded-full">
                        <button
                          className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition"
                          onClick={() =>
                            handleQuantity(item.productId, item.size, "dec")
                          }
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 text-sm">{item.quantity}</span>
                        <button
                          className="px-3 py-1 text-gray-700 hover:bg-gray-200 transition"
                          onClick={() =>
                            handleQuantity(item.productId, item.size, "inc")
                          }
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <button
                        onClick={() => handleRemove(item.productId, item.size)}
                        className="text-gray-500 hover:text-red-600 transition"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <aside className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm p-6 h-fit">
              <h3 className="text-lg font-semibold mb-4 uppercase">
                Order Summary
              </h3>
              <div className="flex justify-between mb-3">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>

              <p className="text-sm text-gray-500 mb-6">
                Taxes and delivery will be calculated at checkout.
              </p>

              <button
                className="w-full bg-black text-white py-3 rounded-md mb-3 hover:bg-gray-900 transition"
                onClick={() => alert("Go to checkout (implement)")}
              >
                Checkout
              </button>

              <button
                className="w-full border border-gray-400 py-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
                onClick={handleClear}
              >
                Clear Cart
              </button>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
