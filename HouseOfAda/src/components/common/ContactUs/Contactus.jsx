import React from "react";

const Contactus = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white px-4 text-center">
      <h1 className="text-3xl md:text-4xl font-semibold text-black tracking-wide mb-4">
        Contact Us
      </h1>

      <p className="text-gray-600 max-w-md mb-8 leading-relaxed">
        Have any inquiry, issue, or feedback?  
        We’d love to hear from you.  
        Our team at <span className="font-semibold text-black">House of Ada</span>  
        will respond to your email within <span className="font-semibold">24 hours.</span>
      </p>

      <div className="border border-black/10 px-8 py-5 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
        <p className="text-gray-800 text-lg">
          📧{" "}
          <a
            href="mailto:houseofada@gmail.com"
            className="font-medium text-black hover:underline"
          >
            houseofada@gmail.com
          </a>
        </p>
      </div>

      <p className="text-sm text-gray-400 mt-6">
        © {new Date().getFullYear()} House of Ada. All Rights Reserved.
      </p>
    </div>
  );
};

export default Contactus;
