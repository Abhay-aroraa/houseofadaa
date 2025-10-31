import React from "react";
import { useGetProductListQuery } from "../../../../store/api/productApi";
import ProductCard from "../../../../components/common/productCard/productCard";

const List = () => {
  const { data: products = [], isLoading, isError } = useGetProductListQuery();

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading products...</p>;

  if (isError)
    return <p className="text-center mt-10 text-red-500">Failed to load products.</p>;

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10 px-6">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        Explore Our Collection
      </h2>

      {/* 🧩 Responsive Grid */}
      <div
        className="
          grid 
          grid-cols-2       /* ✅ 2 per row on mobile */
          sm:grid-cols-2    /* ✅ 2 per row on small screens (iPhones) */
          md:grid-cols-3    /* 3 on tablets/small laptops */
          lg:grid-cols-4    /* 4 on large screens */
          gap-6 
          justify-items-center
        "
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-full">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
