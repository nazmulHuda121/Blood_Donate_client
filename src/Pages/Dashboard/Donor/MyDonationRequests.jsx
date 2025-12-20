import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import useAxios from '../../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const MyDonationRequests = () => {
  const { user } = useAuth();
  const axios = useAxios();
  const navigate = useNavigate();

  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data = {}, refetch } = useQuery({
    queryKey: ['my-donations', user?.email, status, page],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get('/donation-request', {
        params: {
          email: user.email,
          status,
          page,
          limit,
        },
      });
      return res.data;
    },
  });

  const { requests = [], total = 0 } = data;
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="bg-[#1d232b] p-6 rounded-xl shadow">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm btn-outline mb-4"
      >
        ← Back
      </button>

      <h2 className="text-xl font-semibold text-white mb-4">
        My Donation Requests
      </h2>

      {/* Filter */}
      <select
        className="select select-bordered mb-4"
        value={status}
        onChange={(e) => {
          setStatus(e.target.value);
          setPage(1);
        }}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="inprogress">In Progress</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((d) => (
              <tr key={d._id}>
                <td>{d.recipientName}</td>
                <td>
                  {d.recipientDistrict}, {d.recipientUpazila}
                </td>
                <td>{d.donationDate}</td>
                <td>{d.donationTime}</td>
                <td>{d.bloodGroup}</td>
                <td className="capitalize">{d.status}</td>

                <td className="space-x-1">
                  <Link
                    to={`/dashboard/donation-details/${d._id}`}
                    className="btn btn-xs btn-primary"
                  >
                    View
                  </Link>

                  <button
                    onClick={async () => {
                      await axios.delete(`/donation-request/${d._id}`);
                      refetch();
                    }}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>

                  {d.status === 'inprogress' && (
                    <>
                      <button
                        onClick={async () => {
                          await axios.patch(
                            `/donation-request/status/${d._id}`,
                            { status: 'done' }
                          );
                          refetch();
                        }}
                        className="btn btn-xs btn-success"
                      >
                        Done
                      </button>

                      <button
                        onClick={async () => {
                          await axios.patch(
                            `/donation-request/status/${d._id}`,
                            { status: 'canceled' }
                          );
                          refetch();
                        }}
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

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          {[...Array(totalPages).keys()].map((n) => (
            <button
              key={n}
              onClick={() => setPage(n + 1)}
              className={`btn btn-xs ${
                page === n + 1 ? 'btn-error' : 'btn-outline'
              }`}
            >
              {n + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyDonationRequests;
