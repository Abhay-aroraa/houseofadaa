import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import emailjs from "@emailjs/browser";
import { FaUser, FaEnvelope, FaPaperPlane } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Loadercomp from "../../components/Loader";

const Contact = () => {
  const formRef = useRef();
  const navigate = useNavigate(); // For redirection
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Controls success message display

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Abhay Phutela",
          from_email: form.email,
          to_email: "abhayarora071@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSuccess(true); // Show success message
        setForm({ name: "", email: "", message: "" });

        // Redirect to home after 3 seconds
        setTimeout(() => {
          navigate("/home");
        }, 5000);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
        alert("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="w-full mx-auto bg-white p-10 rounded-lg shadow-xl mt-10">
      {success ? (
        // Success message shown after form submission
        <div className="flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-100 to-blue-50 p-8 rounded-2xl shadow-lg">
        <div className="text-blue-500 text-2xl mb-3 drop-shadow-md">✨</div> 
        <h2 className="text-3xl font-extrabold text-blue-700">Message Sent Successfully!</h2>
        <p className="text-gray-600 mt-3 text-lg">Thank you for reaching out! we'll get back to you shortly.</p>
      </div>
      
      
      ) : (
        <>
          <h2 className="text-4xl font-bold text-[#2F4F4F] text-center">Get in Touch</h2>
          <p className="text-lg text-gray-600 mt-2 text-center">
            Feel free to reach out. we’ll respond as soon as possible!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {/* Contact Form */}
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  required
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E8B57]"
                  required
                />
              </div>

              <div className="relative">
                <MdMessage className="absolute left-3 top-3 text-gray-500" />
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Type your message here..."
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2  h-36 resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#f5f5dc] flex items-center justify-center gap-2 text-gray-600 text-lg font-semibold px-5 py-3 rounded-lg  transition duration-300"
                disabled={loading}
              >
                {loading ? <Loadercomp /> : <><FaPaperPlane /> Send Message</>}
              </button>
            </form>

            {/* Google Map Section */}
            <div>
              <h3 className="text-2xl font-semibold text-gray-700 text-center">Our Location</h3>
              <p className="text-gray-600 text-center text-sm mt-2">
                Visit us at our store or contact us anytime.
              </p>
              <div className="mt-4 overflow-hidden rounded-lg shadow-lg">
                <iframe
                  title="Google Map Location"
                  className="w-full h-64 rounded-lg"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d227.36310680673427!2d75.45380003645992!3d29.5135277039684!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391165bea28f8dd1%3A0x66fc2b36346c6084!2sHouse%20of%20Ada!5e0!3m2!1sen!2sin!4v1741193906492!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Contact;
