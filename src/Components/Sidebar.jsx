import { NavLink } from 'react-router';
import {
  FaUser,
  FaPlusCircle,
  FaClipboardList,
  FaUsers,
  FaHeartbeat,
  FaSignOutAlt,
  FaHome,
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';

const Sidebar = () => {
  const { role = 'admin', logOut } = useAuth() || {};

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 border-l-4 rounded-md transition
     hover:bg-red-100 hover:text-red-700
     ${
       isActive
         ? 'font-semibold bg-red-200 text-red-700 border-red-600'
         : 'text-gray-300 border-[#1d232b]'
     }`;

  return (
    <div className="drawer-side">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <aside className="w-64 bg-[#1d232b] min-h-full p-4 flex flex-col">
        {/* ===== LOGO ===== */}
        <div className="mb-10">
          <NavLink to="/" className="text-2xl font-semibold block">
            Blood<span className="text-red-600">Donate</span>
          </NavLink>
          <p className="text-xs text-gray-400 mt-1">Dashboard Panel</p>
        </div>

        {/* ===== MAIN MENU ===== */}
        <ul className="menu gap-3">
          <li>
            <NavLink to="profile" className={navLinkClass}>
              <FaUser /> Profile
            </NavLink>
          </li>

          {role === 'donor' && (
            <>
              <li>
                <NavLink to="create-donation-request" className={navLinkClass}>
                  <FaPlusCircle /> Create Donation
                </NavLink>
              </li>
              <li>
                <NavLink to="my-donation-requests" className={navLinkClass}>
                  <FaClipboardList /> My Requests
                </NavLink>
              </li>
            </>
          )}

          {role === 'admin' && (
            <>
              <li>
                <NavLink to="all-users" className={navLinkClass}>
                  <FaUsers /> All Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="all-blood-donation-request"
                  className={navLinkClass}
                >
                  <FaHeartbeat /> All Requests
                </NavLink>
              </li>
            </>
          )}

          {role === 'volunteer' && (
            <li>
              <NavLink to="all-blood-donation-request" className={navLinkClass}>
                <FaHeartbeat /> Blood Requests
              </NavLink>
            </li>
          )}
        </ul>

        {/* ===== HOME + LOGOUT (NOT FULL BOTTOM) ===== */}
        <div className="mt-8">
          <div className="border-t border-gray-700 mb-4"></div>

          <NavLink to="/dashboard" className={navLinkClass}>
            <FaHome /> Dashboard
          </NavLink>

          <button
            onClick={logOut}
            className="flex items-center gap-3 px-3 py-2 mt-2 w-full rounded-md
                       text-gray-300 hover:bg-red-100 hover:text-red-700 transition"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* ===== FOOTER ===== */}
        <div className="mt-auto pt-6 text-xs text-center text-gray-500">
          © {new Date().getFullYear()} Blood Donor System
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
