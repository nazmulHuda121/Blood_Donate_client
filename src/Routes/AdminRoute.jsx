import { Navigate } from 'react-router';
import Loading from '../Components/Loading';
import useRole from '../hooks/useRoles';

const AdminRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  if (role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
