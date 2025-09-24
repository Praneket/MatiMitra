import React from "react";
import { FaInstagram, FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { GiRootTip } from "react-icons/gi";

export default function Footer() {
  return (
    <footer className="bg-green-100 text-gray-700 py-10 px-6 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo + Tagline */}
        <div>
          <div className="flex items-center gap-2 text-green-800 font-extrabold text-2xl">
            <GiRootTip className="text-3xl" />
            <span>MatiMitra</span>
          </div>
          <p className="mt-3 text-sm leading-6">
            Voice of the Soil. Empowering farmers with real-time soil insights
            and AI recommendations for sustainable agriculture.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-green-600 cursor-pointer">Dashboard</li>
            <li className="hover:text-green-600 cursor-pointer">Features</li>
            <li className="hover:text-green-600 cursor-pointer">About</li>
            <li className="hover:text-green-600 cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-green-700 mb-3">
            Connect with us
          </h3>
          <div className="flex gap-4 text-xl text-green-700">
            <a href="https://github.com/" target="_blank" rel="noreferrer">
              <FaGithub className="hover:text-black" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noreferrer">
              <FaLinkedin className="hover:text-blue-700" />
            </a>
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">
              <FaInstagram className="hover:text-pink-500" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noreferrer">
              <FaTwitter className="hover:text-sky-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="mt-8 text-center text-xs text-gray-500">
        &copy; {new Date().getFullYear()} MatiMitra. All rights reserved.
      </div>
    </footer>
  );
}
