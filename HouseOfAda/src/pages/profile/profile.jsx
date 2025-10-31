import React from "react";
import { Package, Heart, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "My Orders",
      icon: <Package size={22} />,
      route: "/orders",
    },
    {
      title: "Wishlist",
      icon: <Heart size={22} />,
      route: "/wishlist",
    },
    {
      title: "Saved Addresses",
      icon: <MapPin size={22} />,
      route: "/addresses",
    },
    {
      title: "Account Settings",
      icon: <User size={22} />,
      route: "/account-settings",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f5] px-4 sm:px-10 py-8">
      
      <h2 className="text-2xl font-semibold mb-6 text-[#27272a] text-center sm:text-left">
        Your Profile
      </h2>

      {/* ✅ DESKTOP VIEW - GRID */}
      <div
        className="
          hidden sm:grid
          grid-cols-2 lg:grid-cols-4 
          gap-6
        "
      >
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.route)}
            className="
              cursor-pointer rounded-[18px]
              backdrop-blur-sm bg-white/60
              shadow-[0_4px_18px_rgba(0,0,0,0.06)]
              hover:shadow-[0_6px_22px_rgba(0,0,0,0.08)]
              transition-all duration-300
              p-5 text-center border border-[#e7e7e7]
            "
          >
            <div className="
              mx-auto w-14 h-14 rounded-2xl flex items-center justify-center
              bg-white text-neutral-600 shadow-sm border border-neutral-200
            ">
              {item.icon}
            </div>

            <h3 className="mt-3 font-medium text-[#3b3b3b] text-lg tracking-wide">
              {item.title}
            </h3>
          </div>
        ))}
      </div>

      {/* ✅ MOBILE VIEW - 2x2 GRID */}
      <div
        className="
          sm:hidden
          grid grid-cols-2
          gap-4 mt-5
        "
      >
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => navigate(item.route)}
            className="
              flex flex-col items-center justify-center gap-2
              rounded-[18px]
              backdrop-blur-sm bg-white/75
              shadow-[0_4px_14px_rgba(0,0,0,0.05)]
              border border-[#ececec]
              p-4 cursor-pointer 
              hover:bg-white/90 
              hover:shadow-[0_6px_18px_rgba(0,0,0,0.06)]
              transition-all duration-200
            "
          >
            <div className="
              w-12 h-12 rounded-xl flex items-center justify-center 
              bg-white shadow-sm border border-neutral-200 text-neutral-600
            ">
              {item.icon}
            </div>
            <h3 className="font-medium text-[#3b3b3b] text-[14px] tracking-wide text-center">
              {item.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
