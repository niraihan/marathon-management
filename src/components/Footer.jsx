import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content mt-10">
      <div className="container mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-6">

        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">🏁 MarathonPro</h2>
          <p className="text-sm mt-2">
            Your trusted marathon event management platform.<br />
            © 2025 All Rights Reserved. <br /> <span className="text-gray-700">Developed by [Nurul Islam Rayhan] </span>
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="footer-title mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link to="/" className="link link-hover">Home</Link></li>
            <li><Link to="/marathons" className="link link-hover">Marathons</Link></li>
            {/* <li><Link to="/login" className="link link-hover">Login</Link></li>
            <li><Link to="/register" className="link link-hover">Register</Link></li> */}
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="footer-title mb-2">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-400">
              <FaFacebookF />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-300">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-pink-400">
              <FaInstagram />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-blue-500">
              <FaLinkedinIn />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
