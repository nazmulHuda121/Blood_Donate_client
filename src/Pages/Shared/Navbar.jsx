import { useState } from 'react';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const closeAll = () => {
    setDrawerOpen(false);
    setAvatarOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout!',
      confirmButtonColor: '#dc2626',
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser().then(() => {
          closeAll();
          Swal.fire({
            icon: 'success',
            title: 'Logged Out',
            timer: 1500,
            showConfirmButton: false,
          });
        });
      }
    });
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur bg-black/90 text-white">
      <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="3"
          >
            <path d="M12 21c4.97-3.5 8-7 8-11a8 8 0 10-16 0c0 4 3 7.5 8 11z" />
          </svg>
          <span className="text-2xl font-semibold">
            Blood<span className="text-red-600">Donate</span>
          </span>
        </NavLink>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-10 text-lg">
          <li className="hover:text-red-400 cursor-pointer">
            Donation Requests
          </li>

          {!user && (
            <>
              <NavLink to="/register" className="hover:text-red-400">
                Register
              </NavLink>
              <NavLink to="/login" className="hover:text-red-400">
                Login
              </NavLink>
            </>
          )}

          {user && (
            <>
              <li className="hover:text-red-400 cursor-pointer">Funding</li>

              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.photoURL || 'https://i.pravatar.cc/40'}
                  className="w-10 h-10 rounded-full cursor-pointer border-2 border-white"
                  onClick={() => setAvatarOpen(!avatarOpen)}
                />

                {avatarOpen && (
                  <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-xl shadow-lg overflow-hidden">
                    <Link
                      to="/dashboard"
                      onClick={closeAll}
                      className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 hover:bg-gray-100"
                    >
                      <LogOut size={18} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </ul>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
          <Menu size={30} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-72 bg-black text-white z-50 transform transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center p-5 border-b border-white/20">
          <h2 className="text-xl font-semibold">Menu</h2>
          <X size={28} onClick={closeAll} />
        </div>

        <div className="p-6 space-y-6 text-lg">
          <p onClick={closeAll} className="hover:text-red-400 cursor-pointer">
            Donation Requests
          </p>

          {!user && (
            <>
              <NavLink to="/register" onClick={closeAll}>
                Register
              </NavLink>
              <NavLink to="/login" onClick={closeAll}>
                Login
              </NavLink>
            </>
          )}

          {user && (
            <>
              <p className="hover:text-red-400 cursor-pointer">Funding</p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/20">
                <img
                  src={user.photoURL || 'https://i.pravatar.cc/40'}
                  className="w-10 h-10 rounded-full"
                />
                <span>{user.displayName || 'User'}</span>
              </div>

              <NavLink
                to="/dashboard"
                onClick={closeAll}
                className="flex items-center gap-2"
              >
                <LayoutDashboard size={18} /> Dashboard
              </NavLink>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/50 z-40" onClick={closeAll} />
      )}
    </nav>
  );
};

export default Navbar;
