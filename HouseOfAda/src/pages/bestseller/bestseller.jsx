import React from 'react';
import best1 from "../../assets/images/best1.jpg";
import best2 from "../../assets/images/best2.jpg";
import cart13 from "../../assets/images/cart13.jpg";
import lehanga from "../../assets/images/lehnga.jpg";

const bestSellers = [
  {
    id: 1,
    name: "Kurti",
    image: best1,
    price: "1899",
    originalPrice: "2199",
  },
  {
    id: 2,
    name: "Top",
    image: best2,
    price: "1899",
    originalPrice: "2199",
  },
  {
    id: 3,
    name: "Lehanga",
    image: lehanga,
    price: "1899",
    originalPrice:"2199",
  },
  {
    id: 4,
    name: "Top",
    image: cart13,
    price: "1899",
    originalPrice: "2199",
  },
];

const BestSellerSection = () => {
  return (
    <div className="w-full py-14 bg-white px-6 md:px-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-[#344C3D] font-serif tracking-wide">
        Best Sellers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {bestSellers.map((product) => (
          <a
            href={`/product/${product.id}`}>
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[300px] object-cover"
              />

              <div className="p-6 flex flex-col items-center justify-between text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">{product.name}</h3>

                <div className="flex items-center justify-center gap-3 mb-4">
                  {product.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-xl font-bold text-[#344C3D]">
                    {product.price}
                  </span>
                </div>

                <a
                  href={`/product/${product.id}`}
                  className="px-6 py-2 bg-[#344C3D] text-white rounded-full text-sm font-medium hover:bg-[#344C3D] transition duration-300"
                >
                  Show Now
                </a>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>

  );
};

export default BestSellerSection;
