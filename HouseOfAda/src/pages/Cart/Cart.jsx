export default function Cart({ cart }) {
    const sendCartToWhatsApp = () => {
      if (cart.length === 0) return;
      
      const cartDetails = cart.map(item => `🛍 *${item.name}* - 💰 ${item.price}`).join("\n");
      const message = `Hello, I want to buy the following items:\n\n${cartDetails}\n\n🔗 View my cart here: ${encodeURIComponent(window.location.href)}`;
      window.open(`https://wa.me/919306356179text=${encodeURIComponent(message)}`, "_blank");
    };
  
    return (
      <div className="text-center">
        <h2 className="text-3xl font-bold text-[#2F4F4F] mb-6">Your Shopping Bag</h2>
        {cart.length === 0 ? (
          <p className="text-gray-600">Your bag is empty.</p>
        ) : (
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
            <ul>
              {cart.map((item, index) => (
                <li key={index} className="flex items-center justify-between border-b py-3">
                  <img src={item.image} alt={item.name} className="w-20 h-20 rounded object-cover" />
                  <div className="ml-4 text-left flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-500">{item.price}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {cart.length > 0 && (
          <button
            onClick={sendCartToWhatsApp}
            className="mt-6 bg-[#2E8B57] text-white text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-[#228B22] transition"
          >
            Proceed to WhatsApp
          </button>
        )}
      </div>
    );
  }
  