import React, { useState } from "react";
import { useGetProductListQuery } from "../../../../store/api/productApi";
import ProductCard from "../../../../components/common/productCard/productCard";

const List = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, isFetching } = useGetProductListQuery({ page });
console.log("Products API Response:", data)
  const products = data;
  const totalPages = data?.totalPages || 1;

  console.log(products)

  if (isLoading)
    return <p className="text-center mt-10 text-gray-500">Loading products...</p>;

  if (isError)
    return <p className="text-center mt-10 text-red-500">Failed to load products.</p>;

  return (
    <div className="w-full bg-gray-50 min-h-screen py-10 px-6">
      <h2 className="text-2xl font-semibold text-center mb-8 text-gray-800">
        Explore Our Collection
      </h2>

      <div
        className="
          grid 
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-6
          justify-items-center
        "
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {page + 1 < totalPages && (
        <div className="text-center mt-8">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-6 py-2 bg-black text-white rounded-lg"
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default List;
