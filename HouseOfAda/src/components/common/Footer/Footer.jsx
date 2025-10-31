import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center sm:text-left">
        {/* Brand Section */}
        <div>
          <h2 className="text-3xl font-bold">House of Ada.</h2>
       
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
            <li>
              <Link to="/track-order" className="hover:text-black">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/shipping-info" className="hover:text-black">
                Shipping Info
              </Link>
            </li>
            <li>
              <Link to="/help" className="hover:text-black">
                Help
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Customer Services</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <Link to="/shipping" className="hover:text-black">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/sizechart" className="hover:text-black">
                Size Guides
              </Link>
            </li>
            <li>
              <Link to="/contactus" className="hover:text-black">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        {/* Store Location */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Our Store</h3>
          <div className="rounded-lg overflow-hidden border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d635.0621621046806!2d75.45362850466485!3d29.513501058621255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391165bea28f8dd1%3A0x66fc2b36346c6084!2sHouse%20of%20Ada!5e0!3m2!1sen!2sin!4v1761811376031!5m2!1sen!2sin"
              width="100%"
              height="180"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="House of Ada Location"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center">
        <p className="text-gray-600 text-sm">&copy; 2025 - House of Ada. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
