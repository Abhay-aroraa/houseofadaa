import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useAddToWishlistMutation } from "../../../store/api/WishlistApi";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };
  const [addToWishlist] = useAddToWishlistMutation();

  const handleWishlist = async () => {
    const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Please login first!");
    return nvg("/login");
  }
  try {
    await addToWishlist(product.id).unwrap();
    alert("Successfully added to wishlist!");
  } catch (err) {
    console.error(err);
    alert(err?.data?.error || "Failed to add to wishlist");
  }
};
  return (
    <div
      onClick={handleViewDetails}
      className="
        group relative bg-white rounded-2xl shadow-md hover:shadow-2xl
        transition-all duration-300 cursor-pointer overflow-hidden
        w-full                             /* Allow grid to control width */
        max-w-xs                           /* Prevent extra stretching */
      "
    >
      {/* Wishlist Icon */}
      <button
        className="absolute top-3 right-3 z-20 rounded-full bg-white/70 p-2 shadow-sm hover:bg-white transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <Heart onClick={handleWishlist} className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-56 sm:h-64 md:h-72 flex items-center justify-center bg-gray-50">
        <img
          src={product.imageUrl || product.files?.[0]?.url}
          alt={product.name}
          className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out"
        />
      </div>

      {/* Product Info */}
      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate group-hover:text-gray-700 transition-colors">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 leading-snug line-clamp-2">
          {product.description || "No description available."}
        </p>
        <div className="flex items-center justify-center gap-2 mt-2">
          <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
