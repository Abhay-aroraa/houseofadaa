import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      onClick={handleViewDetails} // navigate when card clicked
      className="group relative bg-white rounded-2xl shadow-md hover:shadow-2xl 
                 transition-all duration-300 cursor-pointer overflow-hidden
                 w-[190px] sm:w-[200px] md:w-[240px] lg:w-[310px]"
    >
      {/* Wishlist Icon */}
      <button
        className="absolute top-3 right-3 z-20 rounded-full p-2 shadow-sm transition-all duration-300"
        onClick={(e) => e.stopPropagation()} // prevent click bubbling
      >
        <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
      </button>

      {/* Product Image */}
      <div className="relative w-full h-64 md:h-72">
        <img
          src={product.imageUrl || product.files?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out"
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
