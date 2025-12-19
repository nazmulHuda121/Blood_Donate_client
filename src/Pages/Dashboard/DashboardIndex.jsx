import DashboardHome from './DashboardHome';
import AdminDashboardHome from './AdminDasboardHome';
import useRole from '../../hooks/useRoles';
import VolunteerDashboardHome from './VolunteerDashboard';

const DashboardIndex = () => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return null;

  if (role === 'admin') return <AdminDashboardHome />;
  if (role === 'volunteer') return <VolunteerDashboardHome />;

  return <DashboardHome />;
};
export default DashboardIndex;
