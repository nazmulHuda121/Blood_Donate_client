import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';

const AllUsers = () => {
  const axios = useAxios();

  const { data: users = [], refetch } = useQuery({
    queryKey: ['admin-users'],
    queryFn: async () => {
      const res = await axios.get('/users');
      return res.data;
    },
  });

  const updateRole = async (id, role) => {
    await axios.patch(`/admin/users/role/${id}`, { role });
    refetch();
  };

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((u) => (
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>
              <button
                className="btn"
                onClick={() => updateRole(u._id, 'admin')}
              >
                Make Admin
              </button>
              <button
                className="btn"
                onClick={() => updateRole(u._id, 'volunteer')}
              >
                Volunteer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AllUsers;
