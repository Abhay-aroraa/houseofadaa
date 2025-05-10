import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import mastercard from "../../assets/images/download.jpg";
import visa from "../../assets/images/visa.jpg";
import paypal from "../../assets/images/paypal.jpg";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold">House of Ada.</h2>
          <p className="mt-3 text-gray-600">Contact our customer happiness team</p>
          <p className="text-gray-600">Monday-Friday 9am-5pm</p>
          <p className="text-gray-600">9306356179</p>
          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start space-x-3 mt-4">
            {[
              { icon: <FaFacebookF size={18} />, hover: "hover:bg-[#54d9e1]" },
              { icon: <FaXTwitter size={18} />, hover: "hover:bg-black" },
              { icon: <FaInstagram size={18} />, hover: "hover:bg-pink-500" },
              { icon: <FaTiktok size={18} />, hover: "hover:bg-black" },
            ].map((item, index) => (
              <div
                key={index}
                className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 ${item.hover} hover:text-white transition duration-300 cursor-pointer`}
              >
                {item.icon}
              </div>
            ))}
          </div>
        </div>

        {/* Shop Section */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            {["Track Order", "Returns", "Shipping Info", "Recalls & Advisories", "Help"].map((item, i) => (
              <li key={i} className="hover:text-black cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Services</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            {["FAQs", "Shipping", "Returns", "Size Guides", "Materials & Care", "Contact Us"].map((item, i) => (
              <li key={i} className="hover:text-black cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Stay in touch...</h3>
          <p className="text-gray-600 text-sm">
            Subscribe and be the first to know about exclusive offers, products,
            promotions & more.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center sm:items-stretch">
            <input
              type="email"
              placeholder="Email address..."
              className="w-full border border-gray-300 p-2 rounded-md sm:rounded-l-md sm:rounded-r-none focus:outline-none mb-2 sm:mb-0"
            />
            <button className="bg-[#54d9e1] text-white px-4 py-2 rounded-md sm:rounded-r-md sm:rounded-l-none w-full sm:w-auto hover:bg-black transition duration-200">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center">
        <p className="text-gray-600 text-sm">&copy; 2025 - House of Ada. All Rights Reserved.</p>
        {/* Payment Methods */}
        <div className="flex justify-center space-x-4">
          <img src={visa} alt="Visa" className="h-6 object-contain" />
          <img src={mastercard} alt="MasterCard" className="h-6 object-contain" />
          <img src={paypal} alt="PayPal" className="h-6 object-contain" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
