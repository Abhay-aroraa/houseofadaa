import React from "react";
import { Heart, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from "../../store/api/WishlistApi";

const Wishlist = () => {
  const { data, isLoading } = useGetWishlistQuery();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();
  const navigate = useNavigate();

  const handleRemove = async (productId) => {
    try {
      await removeFromWishlist(productId).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[70vh] text-gray-500">
        Loading wishlist...
      </div>
    );
  }

  const wishlist = data?.wishlist || [];

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh] text-center">
        <Heart size={60} className="text-gray-400 mb-4" />
        <p className="text-gray-600 text-lg mb-4">Your wishlist is empty.</p>
        <button
          onClick={() => navigate("/home")}
          className="border border-black text-black px-6 py-2 hover:bg-black hover:text-white transition-all"
        >
          Start Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-wide text-center mb-10 uppercase text-black">
        Wishlist
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((item) => (
          <div
            key={item.id}
            className="group flex flex-col border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white"
          >
            {/* Product Image */}
            <div
              className="relative cursor-pointer bg-gray-50"
              onClick={() => navigate(`/product/${item.product.id}`)}
            >
              <img
                src={item.product.imageUrl}
                alt={item.product.name}
                className="w-full h-[320px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(item.product.id);
                }}
                className="absolute top-3 right-3 bg-white hover:bg-black hover:text-white text-black p-2 rounded-full shadow-sm transition-all"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col gap-2 text-left">
              <h2 className="text-lg font-medium text-gray-800 truncate">
                {item.product.name}
              </h2>
              <p className="text-sm text-gray-600 line-clamp-2">
                {item.product.description || "No description available."}
              </p>

              <div className="flex items-center justify-between mt-2">
                <span className="text-base font-semibold text-black">
                  ₹{item.product.price}
                </span>
                {item.product.size && (
                  <span className="text-sm text-gray-500">
                    Size: {item.product.size.toUpperCase()}
                  </span>
                )}
              </div>

              <button
                onClick={() => navigate(`/product/${item.product.id}`)}
                className="mt-3 border border-black text-black text-sm px-4 py-2 rounded-full hover:bg-black hover:text-white transition-all"
              >
                View Product
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
