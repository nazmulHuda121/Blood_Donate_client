import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';

const AdminDashboardHome = () => {
  const axios = useAxios();

  const { data: stats = {} } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axios.get('/admin/stats');
      return res.data;
    },
  });

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatCard title="Total Users" value={stats.totalUsers} />
      <StatCard title="Total Requests" value={stats.totalRequests} />
      <StatCard title="Pending Requests" value={stats.pending} />
      <StatCard title="In Progress" value={stats.inprogress} />
      <StatCard title="Completed" value={stats.done} />
    </div>
  );
};
export default AdminDashboardHome;
