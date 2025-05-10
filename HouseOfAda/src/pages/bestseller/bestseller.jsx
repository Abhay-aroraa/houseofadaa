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
        price: "$60.00",
        originalPrice: null,
    },
    {
        id: 2,
        name: "Top",
        image: best2,
        price: "$58.00",
        originalPrice: "$70.00",
    },
    {
        id: 3,
        name: "Lehanga",
        image: lehanga,
        price: "$60.00",
        originalPrice: "$100.00",
    },
    {
        id: 4,
        name: "Top",
        image: cart13,
        price: "$65.00",
        originalPrice: "$80.00",
    },
];

const BestSellerSection = () => {
    return (
        <div className="w-full py-14 bg-white px-6 md:px-20">
            {/* Heading */}
            <h2 
              className="text-4xl font-bold text-center mb-10 text-[#344C3D]"
              style={{ fontFamily: "fangsong, serif" }} // Custom font
            >
                Best Seller
            </h2>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {bestSellers.map((product) => {
                    return (
                        <div
                            key={product.id}
                            className="rounded-lg p-4 bg-[#BFCFBB] shadow-lg transition-transform duration-300 hover:scale-105"
                        >
                            <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-[300px] md:h-[400px] object-contain  mb-4"
                            />

                            <h3 className="text-base font-medium text-gray-800">{product.name}</h3>

                            {product.originalPrice && (
                                <p className="text-sm text-gray-600 line-through">
                                    {product.originalPrice}
                                </p>
                            )}

                            <p className="text-lg text-gray-900 font-semibold mt-1">{product.price}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default BestSellerSection;
