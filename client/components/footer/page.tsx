"use client";

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'; 

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo or Brand */}
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold">E-Exam</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="#" className="text-sm hover:text-gray-400">Home</a>
            <a href="#" className="text-sm hover:text-gray-400">About Us</a>
            <a href="#" className="text-sm hover:text-gray-400">Services</a>
            <a href="#" className="text-sm hover:text-gray-400">Contact</a>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faFacebook} /> {/* Sử dụng FontAwesomeIcon cho Facebook */}
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faTwitter} /> {/* Sử dụng FontAwesomeIcon cho Twitter */}
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faInstagram} /> {/* Sử dụng FontAwesomeIcon cho Instagram */}
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FontAwesomeIcon icon={faLinkedin} /> {/* Sử dụng FontAwesomeIcon cho LinkedIn */}
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Your Brand. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
