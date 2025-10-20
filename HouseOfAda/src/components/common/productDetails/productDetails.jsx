import React from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { useGetProductByIdQuery } from "../../../store/api/productApi";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading product...</p>;

  if (isError || !product)
    return (
      <p className="text-center mt-10 text-red-500">
        Failed to load product details.
      </p>
    );

  // static sizes
  const availableSizes = ["XS", "S", "M", "L", "XL"];

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* Left Section: Images */}
          <div className="md:w-1/2 flex flex-col items-center gap-4">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-md border border-gray-200">
              <img
                src={product.imageUrl || product.files?.[0]?.url}
                alt={product.name}
                className="w-full h-[480px] object-fill"
              />
            </div>

            {/* Optional Thumbnails */}
            {product.files?.length > 1 && (
              <div className="flex gap-3 mt-3">
                {product.files.map((file, i) => (
                  <img
                    key={i}
                    src={file.url}
                    alt="thumbnail"
                    className="w-20 h-20 rounded-xl object-cover border border-gray-300 hover:border-black cursor-pointer transition"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right Section: Product Details */}
          <div className="md:w-1/2 flex flex-col gap-4">
            {/* Product Title */}
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-sm text-gray-600">
              {product.brand || "Tokyo Talkies"} Women Checked Sweetheart Neck Top
            </p>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 text-gray-700">
                <span className="bg-green-600 text-white px-2 py-1 rounded-md text-sm font-medium">
                  {product.rating} ★
                </span>
                <span className="text-sm text-gray-500">
                  ({product.reviewCount || 36} Ratings)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-3xl font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-pink-600 text-lg font-medium">
                    (
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    % OFF)
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-green-600 font-medium">
              inclusive of all taxes
            </p>

            {/* Static Sizes */}
            <div className="mt-4">
              <p className="font-semibold mb-2 text-gray-800">SELECT SIZE</p>
              <div className="flex gap-3 flex-wrap">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    className="border border-gray-400 rounded-full w-12 h-12 flex items-center justify-center text-gray-700 hover:border-black hover:text-black transition font-medium"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <button className="flex-1 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition">
                ADD TO BAG
              </button>
              <button className="p-3 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
                <Heart className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Description */}
            <div className="mt-8 border-t border-gray-200 pt-4">
              <h3 className="font-semibold mb-2 text-gray-800">
                Product Details
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description ||
                  "A stylish checked sweetheart neck top designed for comfort and elegance. Perfect for pairing with high-waist jeans, skirts, or trousers to create a classy, minimal look."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
