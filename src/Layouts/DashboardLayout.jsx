import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
  const { user } = useAuth();
  console.log('Dashboard user', user);
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* CONTENT */}
      <div className="drawer-content flex flex-col">
        <main className="flex-1 max-w-[1240px] mx-auto w-full px-4 py-6 bg-[#1b2028]">
          <Outlet />
        </main>
      </div>

      {/* SIDEBAR */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
