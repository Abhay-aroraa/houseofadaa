import React from "react";
import card11 from "../../assets/images/cart11.jpg";
import best2 from "../../assets/images/best2.jpg";
import { useNavigate } from "react-router-dom";
import { CardDetails, Categories, InstaIteams } from "../../utilities/export";
import BestSellerSection from "../bestseller/bestseller";

function Home() {
  const nvg = useNavigate();
  return (
    <div>
      {/* Hero Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-10 md:pt-24 md:h-screen">
        {/* Left Side - Text Content */}
        <div className="text-center md:text-left w-full md:w-1/2 z-10">
          <h1 className="text-4xl md:text-7xl font-semibold text-black leading-tight">
            Unveiling <br /> This Season's
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
          <button className="mt-6 text-lg font-semibold border-b-2 text-[#1b2e22] border-black py-2 px-4 hover:opacity-75">
            Shop now
          </button>
        </div>

        {/* Right Side - Two Images with Border and Gap */}
        <div className="w-full md:w-1/2 mt-10 md:mt-0 flex flex-col md:flex-row items-center justify-center gap-6">
          {/* First Image */}
          <div className="  hidden md:flex p-2 border-2 border-black rounded-t-full">
            <img
              src={card11}
              alt="Season Fashion 1"
              className="w-full h-full md:w-[350px] md:h-[500px] object-cover rounded-t-full shadow-lg"
            />
          </div>

          {/* Second Image */}
          <div className="p-2 border-2 border-black rounded-t-full">
            <img
              src={best2}
              alt="Season Fashion 2"
              className="w-full h-full md:w-[350px] md:h-[500px] object-cover rounded-t-full shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full py-10 bg-white px-6 md:px-10">
        <h2
          className="text-4xl font-bold text-center mb-16 text-[#344C3D]"
          style={{ fontFamily: "fangsong, serif" }} // Custom font
        >
          Recommend By Us !
        </h2>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
          {CardDetails.map((card, index) => (
            <div
              key={index}
              className="relative rounded-2xl overflow-hidden shadow-xl group transform transition duration-300 hover:scale-105"
            >
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent group-hover:via-black/60 transition duration-300"></div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-white px-4">
                <h3 className="text-2xl md:text-3xl font-bold mb-3 drop-shadow-md font-serif">
                  {card.title}
                </h3>
                <button className="mt-2 px-6 py-2 bg-white text-black font-semibold rounded-full shadow-md hover:bg-[#344C3D] hover:text-white transition duration-300">
                  Shop now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* Categories Section */}
      <div className="w-full py-14 bg-white px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center mb-16 font-fangsong; text-[#344C3D]" style={{ fontFamily: "fangsong, serif" }}>
          Shop by Categories
        </h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 justify-center">
          {Categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-32 h-32 md:w-52 md:h-52 rounded-full overflow-hidden shadow-lg transition-transform duration-500 hover:scale-110">
                <img
                  src={category.img}
                  alt={category.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mt-4">
                {category.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Best Seller Section */}
      <BestSellerSection />

      {/* Instagram Section */}
      <div className="w-full py-14 bg-white px-6 md:px-20 text-center">
        <h2 className="text-4xl font-bold mb-9 font-fangsong; text-[#344C3D]" style={{ fontFamily: "fangsong, serif" }}>
          Follow us on Instagram
        </h2>
        <h5 className="mb-12 font-sans font-bold">
          <a
            href="https://www.instagram.com/house_of_ada_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
          >
            @HouseofAda
          </a>
        </h5>
        <div className="w-full px-4 py-8">

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 place-items-center">
            {InstaIteams.map((insta, index) => (
              <a
                key={index}
                href="https://www.instagram.com/house_of_ada_?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-xl overflow-hidden shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105">
                  <img
                    src={insta.img}
                    alt="Instagram Post"
                    className="w-full h-full object-cover group-hover:brightness-75 transition duration-300"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
