import React from 'react';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import useRole from '../../hooks/useRoles';
import Swal from 'sweetalert2';

const DashboardHome = () => {
  const { user } = useAuth() || {};
  const { role } = useRole();
  const axios = useAxios();
  const queryClient = useQueryClient();

  /* ===== Fetch last 3 donation requests ===== */
  const { data: donations = [] } = useQuery({
    queryKey: ['recent-donations', user?.email],
    enabled: role === 'donor' && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(`/donation-request`, {
        params: { email: user.email, limit: 3 },
      });
      return res.data;
    },
  });

  /* ===== Handle Status Update ===== */
  const handleStatusUpdate = async (id, status) => {
    try {
      await axios.patch(`/donation-request/${id}/status`, { status });
      Swal.fire('Updated!', `Donation status set to ${status}`, 'success');
      queryClient.invalidateQueries(['recent-donations', user?.email]);
    } catch (err) {
      Swal.fire('Error!', 'Could not update status', 'error');
    }
  };

  /* ===== Handle Delete Donation ===== */
  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This donation request will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/donation-request/${id}`);
          Swal.fire(
            'Deleted!',
            'Your donation request has been deleted.',
            'success'
          );
          queryClient.invalidateQueries(['recent-donations', user?.email]);
        } catch (err) {
          Swal.fire('Error!', 'Failed to delete request', 'error');
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      {role === 'donor' && (
        <div className="bg-[#1d232b] text-white rounded-xl p-6 shadow-lg">
          <h1 className="text-2xl font-bold">
            Welcome, {user?.displayName || 'Donor'}!
          </h1>
          <p className="text-gray-400 mt-2">
            Here are your recent donation requests.
          </p>
        </div>
      )}

      {/* Recent Donation Requests */}
      {role === 'donor' && donations.length > 0 && (
        <div className="bg-[#1d232b] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            My Recent Donation Requests
          </h2>

          <div className="overflow-x-auto">
            <table className="table text-sm w-full">
              <thead className="text-gray-300">
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {donations.map((d) => (
                  <tr key={d._id} className="hover">
                    <td>{d.recipientName}</td>
                    <td>
                      {d.recipientDistrict}, {d.recipientUpazila}
                    </td>
                    <td>{d.donationDate}</td>
                    <td>{d.donationTime}</td>
                    <td>{d.bloodGroup}</td>
                    <td className="capitalize font-medium">{d.status}</td>

                    {/* Donor Info */}
                    <td>
                      {d.status === 'inprogress' ? (
                        <div className="text-xs">
                          <p>{user.displayName}</p>
                          <p className="text-gray-400">{user.email}</p>
                        </div>
                      ) : (
                        '-'
                      )}
                    </td>

                    {/* Actions */}
                    <td className="space-x-1">
                      <Link
                        to={`/dashboard/edit-donation/${d._id}`}
                        className="btn btn-xs btn-info"
                      >
                        Edit
                      </Link>

                      <Link
                        to={`/dashboard/donation-details/${d._id}`}
                        className="btn btn-xs btn-primary"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleDelete(d._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>

                      {d.status === 'inprogress' && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(d._id, 'done')}
                            className="btn btn-xs btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(d._id, 'canceled')
                            }
                            className="btn btn-xs btn-warning"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All Button */}
          <div className="text-right mt-4">
            <Link
              to="/dashboard/my-donation-requests"
              className="btn btn-sm btn-outline btn-error"
            >
              View My All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
