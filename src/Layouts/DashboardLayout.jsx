import { TbTruckDelivery } from 'react-icons/tb';
import { MdPayment } from 'react-icons/md';
import {
  FaUser,
  FaPlusCircle,
  FaUsers,
  FaHeartbeat,
  FaClipboardList,
} from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import { Link, NavLink, Outlet } from 'react-router';

const DashboardLayout = () => {
  // Assumes useAuth returns at least: { user, role } where role is 'donor' | 'admin' | 'volunteer'
  // If your hook returns different shape adapt below accordingly.
  const { user, role = 'donor' } = useAuth() || {};

  // Menu configuration for clarity & easy editing
  const commonLinks = [
    {
      to: '/dashboard',
      label: 'Home',
      icon: <FaHeartbeat className="w-5 h-5" />,
    },
    {
      to: '/dashboard/profile',
      label: 'Profile',
      icon: <FaUser className="w-5 h-5" />,
    },
  ];

  const donorLinks = [
    {
      to: '/dashboard/create-donation-request',
      label: 'Create Request',
      icon: <FaPlusCircle className="w-5 h-5" />,
    },
    {
      to: '/dashboard/my-donation-requests',
      label: 'My Donation Requests',
      icon: <FaClipboardList className="w-5 h-5" />,
    },
  ];

  const adminLinks = [
    {
      to: '/dashboard/all-users',
      label: 'All Users',
      icon: <FaUsers className="w-5 h-5" />,
    },
    {
      to: '/dashboard/all-blood-donation-request',
      label: 'All Donation Requests',
      icon: <TbTruckDelivery className="w-5 h-5" />,
    },
    // You can add stats/overview route if you want
  ];

  const volunteerLinks = [
    {
      to: '/dashboard/all-blood-donation-request',
      label: 'All Donation Requests',
      icon: <TbTruckDelivery className="w-5 h-5" />,
    },
  ];

  const getRoleLinks = () => {
    if (role === 'admin') return [...commonLinks, ...adminLinks, ...donorLinks];
    if (role === 'volunteer') return [...commonLinks, ...volunteerLinks];
    // default donor
    return [...commonLinks, ...donorLinks];
  };

  const menuLinks = getRoleLinks();

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-base-100">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        {/* Mobile top helper: small bar with drawer toggle and page title (not a full navbar) */}
        <header className="w-full lg:hidden bg-white/60 backdrop-blur sticky top-0 z-40 border-b">
          <div className="max-w-[1240px] mx-auto px-4 py-3 flex items-center gap-3">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-ghost btn-square"
              aria-label="open sidebar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                viewBox="0 0 24 24"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </label>

            <div className="text-lg font-semibold">Dashboard</div>
            <div className="ml-auto text-sm text-gray-600">
              Signed in as{' '}
              <span className="font-medium">
                {user?.displayName ||
                  user?.name ||
                  user?.email?.split('@')?.[0]}
              </span>
            </div>
          </div>
        </header>

        {/* Page container */}
        <main className="flex-1 max-w-[1240px] mx-auto w-full px-4 py-6">
          {/* You can place a small common welcome here; main route components can override */}
          <div className="mb-4">
            <h1 className="text-2xl font-semibold">
              Welcome{user?.displayName ? `, ${user.displayName}` : ''}
            </h1>
            <p className="text-sm text-gray-500">
              Role: <span className="font-medium">{role}</span>
            </p>
          </div>

          {/* Outlet renders the route pages */}
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-200 min-h-full flex flex-col p-4 transition-all duration-300">
          {/* Logo / brand / avatar */}
          <div className="flex items-center gap-3 px-2">
            <div className="avatar">
              <div className="w-12 h-12 rounded-full bg-red-500 text-white flex items-center justify-center font-bold">
                {user?.displayName ? user.displayName[0].toUpperCase() : 'U'}
              </div>
            </div>
            <div>
              <div className="text-sm font-semibold">
                {user?.displayName || user?.name || 'User'}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {user?.email}
              </div>
            </div>
          </div>

          {/* Menu */}
          <nav className="mt-6 flex-1 overflow-auto">
            <ul className="menu">
              {menuLinks.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-100 ${
                        isActive ? 'bg-white/30 font-semibold' : ''
                      }`
                    }
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}

              {/* Extra actions for donor items (delete, view all) can be implemented inside routes */}
              {/* Generic logout / settings links */}
              <li>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-base-100"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    fill="none"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a2 2 0 0 0 0-6l-1 .5a2 2 0 0 1-2.2-3.4l.6-.9a2 2 0 0 0-3.4-2.2l-.5 1a2 2 0 0 1-3.4 0l-.5-1a2 2 0 0 0-3.4 2.2l.6.9A2 2 0 0 1 5.6 9.5l-1-.5a2 2 0 0 0 0 6l1-.5a2 2 0 0 1 2.2 3.4l-.6.9a2 2 0 0 0 3.4 2.2l.5-1a2 2 0 0 1 3.4 0l.5 1a2 2 0 0 0 3.4-2.2l-.6-.9a2 2 0 0 1 2.2-3.4z" />
                  </svg>
                  <span>Settings</span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Footer / small info at the bottom */}
          <div className="mt-4 pt-4 border-t text-xs text-gray-500">
            <div>Blood Donor System</div>
            <div className="mt-1">© {new Date().getFullYear()}</div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
