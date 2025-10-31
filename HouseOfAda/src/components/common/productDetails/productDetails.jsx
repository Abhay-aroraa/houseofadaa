import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, X } from "lucide-react";
import { useGetProductByIdQuery } from "../../../store/api/productApi";
import { useAddToCartMutation } from "../../../store/api/CartApi";
import { useAddToWishlistMutation } from "../../../store/api/WishlistApi";

const ProductDetails = () => {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductByIdQuery(id);
  const [addToCart, { isLoading: isAdding }] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [selectedSize, setSelectedSize] = useState(null);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const nvg = useNavigate();
  const userId = localStorage.getItem("userId");

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading product...</p>;
  if (isError || !product)
    return <p className="text-center mt-10 text-red-500">Failed to load product details.</p>;

  const handleAddToCart = async () => {
    if (!userId) {
      alert("Please login first!");
      return nvg("/login");
    }
    if (!selectedSize) return alert("Please select a size!");

    try {
      await addToCart({
        userId,
        productId: product.id,
        size: selectedSize,
        quantity: 1,
      }).unwrap();
      alert("Successfully added to cart");
    } catch (err) {
      console.error(err);
      alert(err?.data?.error ?? "Failed to add to cart");
    }
  };

  const handleWishlist = async () => {
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
    <div className="bg-white text-black min-h-screen">
      <div className="container mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          {/* LEFT SECTION */}
          <div className="md:w-1/2 flex flex-col items-center gap-4">
            <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-md border border-gray-200">
      <img
  src={product.imageUrl || product.files?.[0]?.url}
  alt={product.name}
  className="w-[85%] md:w-full h-[280px] sm:h-[340px] md:h-[450px] object-contain mx-auto rounded-lg border border-gray-100"
/>


            </div>

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

          {/* RIGHT SECTION */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-semibold">{product.name}</h1>
            <p className="text-sm text-gray-600">
              {product.brand || "House of Ada"} | Premium Collection
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-3 mt-2">
              <span className="text-3xl font-bold">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-400 line-through text-lg">
                    ₹{product.originalPrice}
                  </span>
                  <span className="text-pink-600 text-lg font-medium">
                    ({Math.round(
                      ((product.originalPrice - product.price) / product.originalPrice) * 100
                    )}% OFF)
                  </span>
                </>
              )}
            </div>

            <p className="text-sm text-green-600 font-medium">
              Inclusive of all taxes
            </p>

            {/* SIZE SELECTION */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-gray-800">SELECT SIZE</p>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-sm text-gray-600 hover:text-black underline"
                >
                  Size Guide
                </button>
              </div>

              <div className="flex gap-3 flex-wrap">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`border rounded-full w-12 h-12 flex items-center justify-center transition font-medium ${
                      selectedSize === size
                        ? "border-black text-black"
                        : "border-gray-400 text-gray-700"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-black text-white font-semibold py-3 rounded-lg hover:bg-gray-800 transition"
              >
                {isAdding ? "Adding..." : "ADD TO BAG"}
              </button>

              <button
                onClick={handleWishlist}
                className="p-3 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition"
              >
                <Heart className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* PRODUCT DESCRIPTION */}
            <div className="mt-8 border-t border-gray-200 pt-4">
              <h3 className="font-semibold mb-2 text-gray-800">
                Product Details
              </h3>
              <p className="text-gray-600 leading-relaxed text-sm">
                {product.description ||
                  "A stylish and comfortable piece from House of Ada, designed to elevate your daily look."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SIZE GUIDE MODAL */}
      {showSizeGuide && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-[90%] max-w-2xl p-6 shadow-xl relative">
            <button
              onClick={() => setShowSizeGuide(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-center">
              Size Guide (UK)
            </h2>

            <table className="w-full border border-gray-200 text-sm text-gray-700">
              <thead className="bg-black text-white">
                <tr>
                  <th className="py-2">Size</th>
                  <th>Bust (in)</th>
                  <th>Waist (in)</th>
                  <th>Hip (in)</th>
                  <th>UK</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["XS", "31–32", "24–25", "33–34", "6"],
                  ["S", "33–34", "26–27", "35–36", "8"],
                  ["M", "35–36", "28–29", "37–38", "10"],
                  ["L", "37–38", "30–31", "39–40", "12"],
                  ["XL", "39–40", "32–33", "41–42", "14"],
                  ["XXL", "41–42", "34–35", "43–44", "16"],
                ].map(([size, bust, waist, hip, uk]) => (
                  <tr key={size} className="border-t text-center">
                    <td className="py-2 font-medium">{size}</td>
                    <td>{bust}</td>
                    <td>{waist}</td>
                    <td>{hip}</td>
                    <td>UK {uk}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="text-gray-500 text-sm mt-4 text-center">
              For the best fit, measure your bust, waist, and hips.  
              If you’re between sizes, choose the larger one for comfort.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
