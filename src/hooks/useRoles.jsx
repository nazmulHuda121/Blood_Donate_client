import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxios from './useAxios';

const useRole = () => {
  const { user } = useAuth();
  console.log(user);
  const axios = useAxios();

  const { isLoading: roleLoading, data: role = 'donor' } = useQuery({
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axios.get(`/users/${user.email}/role`);

      return res.data?.role;
    },
  });

  return { role, roleLoading };
};

export default useRole;
