import React, { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import useTitle from "../hooks/useTitle";


const Contact = () => {
  useTitle("Contact Us");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert("Message sent successfully!"); // এখানে নিজের API/ফাংশন দিয়ে বদলাও
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="bg-base-100 text-base-content min-h-screen px-4 py-10">
      <div className="max-w-4xl mx-auto space-y-10">
        <h2 className="text-4xl font-bold text-primary text-center mb-6">Contact Us</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary text-2xl" />
              <p>123 Marathon Road, Sports City, USA</p>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary text-2xl" />
              <p>+1 (234) 567-8901</p>
            </div>
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary text-2xl" />
              <p>support@marathonpro.com</p>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              required
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="input input-bordered w-full"
            />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              required
              rows={5}
              className="textarea textarea-bordered w-full"
            />
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
