import { Outlet } from 'react-router';
import Sidebar from '../Components/Sidebar';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';
import DashboardBanner from '../Components/DashboardBanner';

const DashboardLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* CONTENT */}
      <div className="drawer-content flex flex-col">
        <main className="flex-1 max-w-[1240px] mx-auto w-full px-4 py-6 bg-[#1b2028]">
          <DashboardBanner />
          <Outlet />
        </main>
      </div>

      {/* SIDEBAR */}
      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
