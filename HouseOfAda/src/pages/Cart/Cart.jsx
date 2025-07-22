import { useEffect, useState } from "react";
import ScrollToTop from "../../utilities/scroll";

export default function Cart({ cart, removeFromCart, setCart }) {
  const [localCart, setLocalCart] = useState([]);

  // 🔁 Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setLocalCart(JSON.parse(savedCart));
      setCart(JSON.parse(savedCart)); // sync with parent if needed
    }
  }, []);

  // 💾 Save cart to localStorage when it changes
  useEffect(() => {
    if (cart.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
      setLocalCart(cart);
    }
  }, [cart]);

  // 💸 Convert INR price string to number (₹1200 → 1200)
  const parseINR = (price) => {
    if (typeof price === "string") {
      return parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
    }
    return price;
  };

  // 🧮 Calculate total correctly in INR
  const totalPrice = localCart.reduce((sum, item) => sum + parseINR(item.price), 0);
  const deliveryFee = localCart.length > 0 ? 149 : 0;
  const finalTotal = totalPrice + deliveryFee;

  const sendCartToWhatsApp = () => {
    if (localCart.length === 0) return;

    const cartDetails = localCart
      .map(item => `🛍 *${item.name}* (${item.selectedSize || "Size N/A"}) - 💰 ₹${parseINR(item.price)}`)
      .join("\n");
    const message = `Hello, I want to buy the following items:\n\n${cartDetails}\n\n🔗 View my cart here: ${encodeURIComponent(window.location.href)}`;
    window.open(`https://wa.me/919306356179?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleRemove = (index) => {
    const updated = [...localCart];
    updated.splice(index, 1);
    setCart(updated); // update parent
    setLocalCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <>
      <ScrollToTop />

      <div className="min-h-screen bg-white p-6 sm:p-12 text-[#1a1a1a]">
        <h1 className="text-4xl font-black mb-10">SHOPPING BAG</h1>

        {localCart.length === 0 ? (
          <p className="text-gray-500 text-lg">Your bag is currently empty.</p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items */}
            <div className="flex-1 space-y-6">
              {localCart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border p-4 rounded-lg shadow-sm"
                >
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-28 object-cover rounded-lg"
                    />
                    <div className="ml-4 flex flex-col gap-1">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      <p className="text-sm text-gray-500">Size: {item.selectedSize || "N/A"}</p>
                      <p className="text-sm text-gray-500">Price: ₹{parseINR(item.price)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="w-full lg:w-96 space-y-6">
              <div className="border p-6 rounded-lg shadow-sm bg-gray-50">
                <h2 className="text-xl font-semibold mb-4">DISCOUNTS</h2>
                <div className="flex justify-between text-sm">
                  <span>Order value</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span>Estimated delivery fee</span>
                  <span>₹{deliveryFee}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <button
                onClick={sendCartToWhatsApp}
                className="w-full bg-black text-white text-lg font-semibold py-4 rounded-md hover:bg-gray-800 transition"
              >
                CONTINUE TO WHATSAPP
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
