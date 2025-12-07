import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-100 text-gray-900 py-24 px-6 overflow-hidden">
      {/* Soft Red Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute top-10 right-10 w-[500px] h-[500px] bg-red-200 rounded-full blur-[120px]"
      />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Heading */}
        <motion.h1
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.9 }}
          className="text-4xl md:text-6xl font-bold leading-tight"
        >
          Donate Blood, Save Lives
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="mt-4 text-lg opacity-80"
        >
          Be the reason for someone's heartbeat. Join the donor community today.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex justify-center gap-4 mt-8"
        >
          <button
            onClick={() => navigate('/register')}
            className="btn bg-red-600 text-white border-none px-6 py-3 rounded-lg font-semibold 
              hover:bg-red-700 shadow-lg transition-all"
          >
            Join as a Donor
          </button>

          <button
            onClick={() => navigate('/search')}
            className="btn bg-white text-gray-800 border border-gray-300 px-6 py-3 rounded-lg font-semibold 
              hover:bg-gray-200 shadow-md transition-all"
          >
            Search Donors
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
