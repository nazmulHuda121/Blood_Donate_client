import React, { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, NavLink } from 'react-router';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  // Change this later with real auth
  const isLoggedIn = false;

  const [avatarOpen, setAvatarOpen] = useState(false);

  return (
    <nav className="backdrop-blur bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 21c4.97-3.5 8-7 8-11a8 8 0 10-16 0c0 4 3 7.5 8 11z"></path>
          </svg>
          <NavLink to="/">
            <h1 className="text-[28px] font-semibold">
              Blood<span className="text-red-600">Donate</span>
            </h1>
          </NavLink>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-10 items-center text-lg font-medium">
          <li className="hover:text-red-400 transition cursor-pointer">
            Donation Requests
          </li>

          {!isLoggedIn && (
            <Link
              to="/login"
              className="hover:text-red-500 transition cursor-pointer"
            >
              Login
            </Link>
          )}

          {isLoggedIn && (
            <>
              <li className="hover:text-red-500 transition cursor-pointer">
                Funding
              </li>

              {/* Avatar + Dropdown */}
              <div className="relative">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="avatar"
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                />

                {avatarOpen && (
                  <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-lg w-40 py-2 z-50">
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                      <LayoutDashboard size={18} /> Dashboard
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2">
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(true)}>
          <Menu size={30} />
        </button>
      </div>

      {/* ——— RIGHT SIDE MOBILE DRAWER ——— */}

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        ></div>
      )}

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-72 bg-red-800/65 backdrop-blur text-white shadow-xl z-50 transform transition-transform duration-300 lg:hidden ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/20 ">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={() => setOpen(false)}>
            <X size={30} />
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col space-y-6 p-6 text-lg bg-black ">
          <li className="hover:text-yellow-300 transition cursor-pointer">
            Donation Requests
          </li>

          {!isLoggedIn && (
            <li className="hover:text-yellow-300 transition cursor-pointer">
              Login
            </li>
          )}

          {isLoggedIn && (
            <>
              <li className="hover:text-yellow-300 transition cursor-pointer">
                Funding
              </li>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src="https://i.pravatar.cc/40"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="text-lg font-semibold">User</span>
              </div>

              <button className="text-left hover:text-yellow-300 transition flex items-center gap-2 mt-4">
                <LayoutDashboard size={18} /> Dashboard
              </button>

              <button className="text-left hover:text-yellow-300 transition flex items-center gap-2">
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
