import React from "react";
import { useNavigate } from "react-router-dom";
import List from "../admin/products/productList/productList";


function Home() {
  const nvg = useNavigate();

  return (
    <>
<div className="w-full h-[40vh] md:h-screen flex items-center justify-center px-6 md:px-16 bg-white relative overflow-hidden">
      {/* Text Content */}
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-7xl font-semibold text-black leading-tight">
          Unveiling This Season's
        </h1>
        <h1
          className="text-3xl md:text-6xl font-semibold mt-2"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #333",
          }}
        >
          Fashion
        </h1>

        <button
          onClick={() => nvg("/shop")}
          className="mt-8 text-lg font-semibold border-b-2 border-black text-[#1b2e22] py-2 px-4 hover:opacity-75 transition-all duration-300"
        >
          Shop Now
        </button>
      </div>
    </div>
    <List/>
    </>
  );
}

export default Home;

