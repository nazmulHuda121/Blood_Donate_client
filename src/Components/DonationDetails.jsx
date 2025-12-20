import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import useAxios from '../hooks/useAxios';
import useAuth from '../hooks/useAuth';
import { FaMapMarkerAlt, FaHospital, FaTint } from 'react-icons/fa';

const DonationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axios = useAxios();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['donation-details', id],
    queryFn: async () => {
      const res = await axios.get(`/donation-request/${id}`);
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading...
      </div>
    );

  if (!data) return null;

  // Status color logic
  const statusColors = {
    pending: 'text-yellow-400',
    inprogress: 'text-blue-400',
    completed: 'text-green-400',
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative font-sans"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1524721696987-b9527df9e512?q=80&w=2233&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative max-w-4xl mx-auto px-4 py-24">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-white hover:text-gray-300 underline"
        >
          ← Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 text-white shadow-2xl"
        >
          {/* HEADER */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
              🩸 Donation Request
            </h2>
            <span className="px-5 py-1 rounded-full bg-red-600 text-sm md:text-base font-semibold">
              {data.bloodGroup}
            </span>
          </div>

          {/* INFO GRID */}
          <div className="grid md:grid-cols-2 gap-6 text-sm md:text-base">
            <Info label="Recipient" value={data.recipientName} />
            <Info
              label="Location"
              value={`${data.recipientDistrict}, ${data.recipientUpazila}`}
              icon={<FaMapMarkerAlt />}
            />
            <Info
              label="Hospital"
              value={data.hospitalName}
              icon={<FaHospital />}
            />
            <Info label="Address" value={data.fullAddress} />
            <Info label="Date" value={data.donationDate} />
            <Info label="Time" value={data.donationTime} />
          </div>

          {/* MESSAGE */}
          <div className="mt-8 bg-white/10 rounded-2xl p-5">
            <p className="text-xs uppercase tracking-wider text-gray-400 mb-1">
              Message
            </p>
            <p className="text-sm md:text-base leading-relaxed">
              {data.requestMessage}
            </p>
          </div>

          {/* STATUS & ACTION */}
          <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
            <p
              className={`text-sm md:text-base font-medium ${
                statusColors[data.status]
              }`}
            >
              Status: <span className="font-bold">{data.status}</span>
            </p>

            {data.status === 'pending' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setOpen(true)}
                className="px-6 py-3 text-sm md:text-base rounded-xl bg-gradient-to-r from-red-600 to-red-700 font-semibold shadow-lg"
              >
                Donate Now
              </motion.button>
            )}
          </div>
        </motion.div>
      </div>

      {/* CONFIRM MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white rounded-2xl p-6 w-96 text-gray-800 shadow-2xl"
            >
              <h3 className="text-xl md:text-2xl font-bold mb-5 text-center">
                Confirm Donation
              </h3>

              {/* DONOR INFO */}
              <div className="flex items-center gap-3 mb-5">
                <img
                  src={user?.photoURL || 'https://i.pravatar.cc/100'}
                  alt="donor"
                  className="w-14 h-14 rounded-full object-cover border-2 border-red-600"
                />
                <div>
                  <p className="text-base md:text-lg font-semibold">
                    {user?.displayName}
                  </p>
                  <p className="text-sm md:text-base text-gray-500">
                    {user?.email}
                  </p>
                </div>
              </div>

              <button
                onClick={async () => {
                  await axios.patch(`/donation-request/confirm/${id}`, {
                    donorName: user.displayName,
                    donorEmail: user.email,
                  });
                  setOpen(false);
                  refetch();
                }}
                className="w-full py-3 text-base rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition-colors"
              >
                Confirm Donation
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-full mt-3 text-sm text-gray-500 hover:text-gray-700"
              >
                Cancel
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Info = ({ label, value, icon }) => (
  <div className="flex items-start gap-3">
    {icon && <span className="mt-1 text-red-400 text-lg">{icon}</span>}
    <div>
      <p className="text-xs md:text-sm uppercase tracking-wide text-gray-400">
        {label}
      </p>
      <p className="text-sm md:text-base font-medium leading-relaxed">
        {value}
      </p>
    </div>
  </div>
);

export default DonationDetails;
