import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import Loading from '../Components/Loading';

const PendingDonationRequests = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data = [], isLoading } = useQuery({
    queryKey: ['pending-donations'],
    queryFn: async () => {
      const res = await axios.get('/donation-requests/pending');
      return res.data.requests;
    },
  });

  if (isLoading) return <Loading />;

  const handleView = (id) => {
    if (!user) return navigate('/login');
    navigate(`/donation-details/${id}`);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1615461066841-6116e61058f4')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          🩸 Pending Blood Donation Requests
        </h2>

        {data.length === 0 ? (
          <p className="text-center text-gray-300">
            No pending donation requests found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((req) => (
              <div
                key={req._id}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white shadow-lg hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold">{req.recipientName}</h3>
                  <span className="px-3 py-1 text-sm rounded-full bg-red-600">
                    {req.bloodGroup}
                  </span>
                </div>

                <p className="text-gray-300 text-sm mb-1">
                  📍 {req.recipientDistrict}, {req.recipientUpazila}
                </p>

                <p className="text-gray-300 text-sm mb-4">
                  🕒 {req.donationDate} at {req.donationTime}
                </p>

                <button
                  onClick={() => handleView(req._id)}
                  className="w-full py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all font-semibold"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingDonationRequests;
