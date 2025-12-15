import useAuth from '../../hooks/useAuth';
import DashboardHome from './DashboardHome';
import AdminDashboardHome from './AdminDasboardHome';

const DashboardIndex = () => {
  const { role = 'donor' } = useAuth() || {};

  if (role === 'admin') return <AdminDashboardHome />;
  if (role === 'volunteer') return <VolunteerDashboardHome />;

  return <DashboardHome />; // donor default
};

export default DashboardIndex;
