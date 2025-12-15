import { useEffect, useState } from 'react';
import { getUserRole } from '../api/userApi';
import useAuth from './useAuth';

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      getUserRole(user.email).then((role) => {
        setRole(role);
        setRoleLoading(false);
      });
    }
  }, [user]);

  return { role, roleLoading };
};

export default useRole;
