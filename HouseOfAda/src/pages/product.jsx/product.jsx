const products = [
  { id: 1, name: "Casual Top", price: "₹800", image: "https://th.bing.com/th/id/OIP.s0CvZ0f1nI13jyI_cLR17wHaLH?w=184&h=276&c=7&r=0&o=5&pid=1.7" },
  { id: 2, name: "Floral Dress", price: "₹1200", image: "https://th.bing.com/th/id/OIP.XaX4o_xQqEDy0Xop_f2pZQHaLG?w=184&h=276&c=7&r=0&o=5&pid=1.7" },
  { id: 3, name: "Denim Jacket", price: "₹1500", image: "https://th.bing.com/th/id/OIP.TtqkHf4CJMg4lw5qKhDjHgHaLH?w=184&h=276&c=7&r=0&o=5&pid=1.7" },
  { id: 4, name: "Summer Shorts", price: "₹600", image: "https://th.bing.com/th/id/OIP.Z-WYjFMoVYw06AfhzNVkVAHaLH?w=184&h=276&c=7&r=0&o=5&pid=1.7" }
];

export default function Products({ cart, setCart }) {
  const addToCart = (product) => setCart([...cart, product]);

  const sendToWhatsApp = (product) => {
    const message = `Hello, I'm interested in:\n\n🛍 *${product.name}*\n💰 Price: ${product.price}\n🔗 View here: ${encodeURIComponent(window.location.href)}`;
    window.open(`https://wa.me/919306356179?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="text-center bg-[#F5F5DC] min-h-screen p-8">
      <h2 className="text-4xl font-bold text-[#2F4F4F] mb-6">Our Collection</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
            <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg" />
            <h3 className="text-xl font-semibold mt-4 text-gray-800">{product.name}</h3>
            <p className="text-lg text-gray-600">{product.price}</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => addToCart(product)}
                className="bg-[#2E8B57] text-white px-4 py-2 rounded-lg hover:bg-[#228B22] transition"
              >
                Add to Bag
              </button>
              <button
                onClick={() => sendToWhatsApp(product)}
                className="bg-[#006400] text-white px-4 py-2 rounded-lg hover:bg-[#004d00] transition"
              >
                Contact Us
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
