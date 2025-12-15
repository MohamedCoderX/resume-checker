import { FaLinkedinIn, FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";
import bgImage from "../../assets/footer.png"; // Replace with your own image path
import logo from "../../assets/logo.png"
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer
      className="relative text-gray-800 py-12 px-6 md:px-16 lg:px-24 overflow-hidden mt-10"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      

      {/* Footer Content */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 z-10">
        {/* Brand Section */}
        <div>
        <Link to="/">
         <img src={logo} className="w-25 h-18"/>
        </Link>
          <p className="text-sm leading-relaxed text-gray-700 mb-5">
            Learnitence helps students and developers master SQL with hands-on tutorials,
            challenges, and real-world projects.
          </p>
          <div className="flex gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn className="text-black hover:text-indigo-600 text-xl transition" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-black hover:text-indigo-600 text-xl transition" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-black hover:text-indigo-600 text-xl transition" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-black hover:text-indigo-600 text-xl transition" />
            </a>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600">Interactive SQL editor</a></li>
            <li><a href="#" className="hover:text-indigo-600">Downloadable cheat-sheets</a></li>
            <li><a href="#" className="hover:text-indigo-600">Sample datasets</a></li>
            <li><a href="#" className="hover:text-indigo-600">Practice problems with solutions</a></li>
          </ul>
        </div>

        {/* Popular Courses */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Popular Courses</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600">SQL Basics</a></li>
            <li><a href="#" className="hover:text-indigo-600">Python</a></li>
            <li><a href="#" className="hover:text-indigo-600">MongoDB</a></li>
            <li><a href="#" className="hover:text-indigo-600">C++</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-black mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-indigo-600">Home</a></li>
            <li><a href="#" className="hover:text-indigo-600">Course</a></li>
            <li><a href="#" className="hover:text-indigo-600">Tutorials</a></li>
            <li><a href="#" className="hover:text-indigo-600">About Us</a></li>
            <li><a href="#" className="hover:text-indigo-600">Contact Us</a></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="relative border-t border-gray-300 mt-12 pt-4 text-center text-sm text-gray-700 z-10">
        © 2025 <span className="font-medium">Learnitence</span>. All rights reserved. •{" "}
        <a href="#" className="hover:text-indigo-600">Privacy Policy</a> •{" "}
        <a href="#" className="hover:text-indigo-600">Terms of Service</a>
      </div>
    </footer>
  );
}
