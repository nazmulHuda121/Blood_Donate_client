import React from 'react';
import { Sun, Moon, CloudSun } from 'lucide-react';
import { Link } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import useRole from '../../hooks/useRoles';

const DashboardHome = () => {
  const { user } = useAuth() || {};
  const axios = useAxios();
  const { role } = useRole();

  /* ===== Fetch last 3 donation requests ===== */
  const { data: donations = [] } = useQuery({
    queryKey: ['recent-donations', user?.email],
    enabled: role === 'donor' && !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `/donation-request?email=${user.email}&limit=3`
      );
      return res.data;
    },
  });

  return (
    <div>
      {/* ================= Recent Donation Requests ================= */}
      {role === 'donor' && donations.length > 0 && (
        <div className="bg-[#1d232b] rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            My Recent Donation Requests
          </h2>

          <div className="overflow-x-auto">
            <table className="table text-sm">
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

                    {/* Status */}
                    <td className="capitalize font-medium">{d.status}</td>

                    {/* Donor Info */}
                    <td>
                      {d.status === 'inprogress' ? (
                        <div className="text-xs">
                          <p>{d.donorName}</p>
                          <p className="text-gray-400">{d.donorEmail}</p>
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

                      <button className="btn btn-xs btn-error">Delete</button>

                      {d.status === 'inprogress' && (
                        <>
                          <button className="btn btn-xs btn-success">
                            Done
                          </button>
                          <button className="btn btn-xs btn-warning">
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
