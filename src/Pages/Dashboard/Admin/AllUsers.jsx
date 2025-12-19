import { useQuery } from '@tanstack/react-query';
import useAxios from '../../../hooks/useAxios';
import Swal from 'sweetalert2';

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
    try {
      const { data } = await axios.patch(`/admin/users/role/${id}`, { role });

      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: data.message,
        timer: 1500,
        showConfirmButton: false,
      });

      refetch();
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Failed!',
        text: 'Role update failed',
      });
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
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
              <td className="flex gap-2">
                {u.role !== 'admin' && (
                  <button
                    className="btn btn-sm btn-success"
                    onClick={() => updateRole(u._id, 'admin')}
                  >
                    Make Admin
                  </button>
                )}
                {u.role !== 'volunteer' && (
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => updateRole(u._id, 'volunteer')}
                  >
                    Volunteer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
