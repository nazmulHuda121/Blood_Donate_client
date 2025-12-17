import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useRole = () => {
  const { user, loading } = useAuth();
  const axios = useAxios();

  const { data, isLoading } = useQuery({
    queryKey: ['user-role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/users/${user.email}/role`);
      return res.data.role;
    },
  });

  return {
    role: data || 'donor',
    roleLoading: loading || isLoading,
  };
};

export default useRole;
