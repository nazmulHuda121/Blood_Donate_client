import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-1 mb-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="red"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 21c4.97-3.5 8-7 8-11a8 8 0 10-16 0c0 4 3 7.5 8 11z"></path>
            </svg>
            <h2 className="text-2xl font-bold">
              Blood<span className="text-red-600">Donate</span>
            </h2>
          </div>
          <p className="text-gray-200 text-sm leading-relaxed">
            Join our mission to connect blood donors with those in need. Your
            contribution can save lives every day.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <Facebook
              className="cursor-pointer text-red-400 hover:text-red-300 transition"
              size={22}
            />
            <Instagram
              className="cursor-pointer text-red-400 hover:text-red-300 transition"
              size={22}
            />
            <Twitter
              className="cursor-pointer text-red-400 hover:text-red-300 transition"
              size={22}
            />
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Useful Links</h3>
          <ul className="space-y-3 text-gray-200">
            <li className="hover:text-red-300 cursor-pointer transition">
              Donation Requests
            </li>
            <li className="hover:text-red-300 cursor-pointer transition">
              Search Donors
            </li>
            <li className="hover:text-red-300 cursor-pointer transition">
              Become a Donor
            </li>
            <li className="hover:text-red-300 cursor-pointer transition">
              Eligibility Rules
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Support</h3>
          <ul className="space-y-3 text-gray-200">
            <li className="hover:text-red-300 cursor-pointer transition">
              Privacy Policy
            </li>
            <li className="hover:text-red-300 cursor-pointer transition">
              Terms & Conditions
            </li>
            <li className="hover:text-red-300 cursor-pointer transition">
              FAQ
            </li>
            <li className="hover:text-red-300 cursor-pointer transition">
              Help Center
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-gray-200 text-sm">
            <li>Email: support@blooddonate.com</li>
            <li>Phone: +880 123 456 789</li>
            <li>Address: Dhaka, Bangladesh</li>
            <li className="hover:text-red-300 cursor-pointer transition">
              Contact Form
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-red-950 mt-12 pt-5 text-center">
        <p className="text-gray-300 text-sm">
          © {new Date().getFullYear()} BloodDonate — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
