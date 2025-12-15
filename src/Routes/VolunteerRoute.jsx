import useRole from '../hooks/useRoles';

const VolunteerRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) return <p>Loading...</p>;

  if (role !== 'volunteer' && role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default VolunteerRoute;
