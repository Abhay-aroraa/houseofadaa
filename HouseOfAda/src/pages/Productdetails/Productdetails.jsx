import { useParams } from "react-router-dom";
import React, { useState } from "react";
import best1 from "../../assets/images/best1.jpg"; 
import best2 from "../../assets/images/best2.jpg";
import cart13 from "../../assets/images/cart13.jpg";
import lehanga from "../../assets/images/lehnga.jpg";

const bestSellers = [
  {
    id: 1,
    name: "Kurti",
    image:"1800",
    originalPrice: null,
    description: "A beautiful cotton Kurti with fine embroidery.",
    sizes: ["S", "M", "L", "XL"],
    gallery: [best1, best2, lehanga]
  },
  {
    id: 2,
    name: "Top",
    image: best2,
    price: "1800",
    originalPrice: null,
    description: "Trendy crop top perfect for casual outings.",
    sizes: ["S", "M", "L"],
    gallery: [best2, best1, lehanga]
  },
  {
    id: 3,
    name: "Lehanga",
    image: lehanga,
    price: "1800",
    originalPrice: null,
    description: "Traditional lehanga for festive occasions.",
    sizes: ["M", "L", "XL"],
    gallery: [lehanga, best2, cart13]
  },
  {
    id: 4,
    name: "Top",
    image: cart13,
    price: "1800",
    originalPrice: null,
    description: "Elegant top suitable for both formal and casual wear.",
    sizes: ["S", "M", "L", "XL"],
    gallery: [cart13, lehanga, best1]
  },
];

export default function ProductDetails({ cart, setCart }) {
  const { id } = useParams();
  const product = bestSellers.find(item => item.id === parseInt(id));

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  // States for size and image selection
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedImage, setSelectedImage] = useState(product.image);

  // Handle Add to Bag action
  const handleAddToBag = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to the bag.");
      return;
    }
    setCart(prevCart => [
      ...prevCart,
      { ...product, selectedSize }
    ]);
    alert(`Added ${product.name} (${selectedSize}) to the bag!`);
  };

return (
  <div className="w-full  p-4 md:p-10 flex flex-col md:flex-row items-center md:items-start justify-center gap-8 max-w-6xl mx-auto">
    {/* Left: Image Section */}
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src={selectedImage}
        alt={product.name}
        className="w-[90%] sm:w-[80%] md:w-[300px] h-auto rounded-md shadow-md object-cover"
      />
    </div>

    {/* Right: Product Info Section */}
    <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left gap-4">
      <h1 className="text-2xl font-semibold text-[#344C3D]">{product.name}</h1>
      <p className="text-gray-600 text-base">{product.description}</p>

      <div className="flex items-center gap-3 text-lg">
        {product.originalPrice && (
          <span className="line-through text-gray-400">{product.originalPrice}</span>
        )}
        <span className="font-bold text-[#344C3D]">{product.price}</span>
      </div>

      {/* Size Selector */}
      <div>
        <h3 className="text-sm font-medium text-[#344C3D] mb-1">Select Size</h3>
        <div className="flex gap-3 justify-center md:justify-start">
          {product.sizes.map((size) => (
            <button
              key={size}
              className={`px-3 py-1 rounded-full border transition text-sm ${
                selectedSize === size
                  ? "bg-[#344C3D] text-white"
                  : "bg-white text-[#344C3D] border-[#344C3D]"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Add to Bag */}
      <button
        onClick={handleAddToBag}
        className="mt-4 px-5 w-[80%] md:w-auto py-2 bg-[#344C3D] text-white rounded-md text-sm transition"
      >
        Add to Bag
      </button>
    </div>
  </div>
);


}
