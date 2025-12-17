import Loading from '../Components/Loading';
import useRole from '../hooks/useRoles';

const VolunteerRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <Loading />;

  if (role !== 'volunteer' && role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default VolunteerRoute;
