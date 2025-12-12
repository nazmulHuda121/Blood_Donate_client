import React, { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setAvatarOpen(false);
    setDrawerOpen(false);
  };

  return (
    <nav className="backdrop-blur bg-black text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-1 cursor-pointer">
          <NavLink to="/" className="flex items-center space-x-1">
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
              <path d="M12 21c4.97-3.5 8-7 8-11a8 8 0 10-16 0c0 4 3 7.5 8 11z" />
            </svg>
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

          <NavLink
            to="/register"
            className="hover:text-red-400 transition cursor-pointer"
          >
            Register
          </NavLink>

          {!user && (
            <Link
              to="/login"
              className="hover:text-red-500 transition cursor-pointer"
            >
              Login
            </Link>
          )}

          {user && (
            <>
              <li className="hover:text-red-500 transition cursor-pointer">
                Funding
              </li>

              {/* Avatar + Dropdown */}
              <div className="relative">
                <img
                  src={user.photoURL || 'https://i.pravatar.cc/40'}
                  alt="avatar"
                  onClick={() => setAvatarOpen(!avatarOpen)}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                />
                {avatarOpen && (
                  <div className="absolute right-0 mt-3 bg-white text-black rounded-xl shadow-lg w-40 py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center gap-2"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden"
          onClick={() => setDrawerOpen(!drawerOpen)}
        >
          <Menu size={30} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-3/4 md:hidden bg-black/90 backdrop-blur text-white shadow-xl z-50 transform transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="flex justify-between items-center px-6 py-6 border-b border-white/20">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={() => setDrawerOpen(false)}>
            <X size={30} />
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col p-6 text-lg space-y-6">
          <li
            className="hover:text-yellow-300 cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          >
            Donation Requests
          </li>

          <NavLink
            to="/register"
            className="hover:text-yellow-300 cursor-pointer"
            onClick={() => setDrawerOpen(false)}
          >
            Register
          </NavLink>

          {!user && (
            <NavLink
              to="/login"
              className="hover:text-yellow-300 cursor-pointer"
              onClick={() => setDrawerOpen(false)}
            >
              Login
            </NavLink>
          )}

          {user && (
            <>
              <li
                className="hover:text-yellow-300 cursor-pointer"
                onClick={() => setDrawerOpen(false)}
              >
                Funding
              </li>

              <div className="flex items-center gap-3 mt-4">
                <img
                  src={user.photoURL || 'https://i.pravatar.cc/40'}
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="text-lg font-semibold">
                  {user.displayName || 'User'}
                </span>
              </div>

              <NavLink
                to="/dashboard"
                className="flex items-center gap-2 hover:text-yellow-300 mt-4"
                onClick={() => setDrawerOpen(false)}
              >
                <LayoutDashboard size={18} /> Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 hover:text-yellow-300 mt-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </ul>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
