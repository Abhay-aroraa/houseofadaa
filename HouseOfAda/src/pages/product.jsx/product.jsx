import { products } from "../../utilities/export";

export default function Products({ cart, setCart }) {
  const addToCart = (product) => setCart([...cart, product]);

  return (
    <div className="min-h-screen p-10">
      {/* <h2 className="text-3xl font-semibold text-center mb-8 tracking-tight">Our Collection</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
        {products.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded-xl p-5 flex flex-col items-center hover:shadow-md transition duration-200"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-contain rounded-md"
            />
            <h3 className="text-lg font-medium mt-4">{product.name}</h3>
            <p className="text-gray-600 mt-1">{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-4 border border-gray-800 text-gray-800 px-4 py-2 rounded-full hover:bg-gray-100 transition"
            >
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
