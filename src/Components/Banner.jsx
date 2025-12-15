import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';

const slogans = [
  'Donate Blood, Save Lives',
  "Be the Reason for Someone's Heartbeat",
  'Your Blood Can Make a Difference',
];

const Banner = () => {
  const navigate = useNavigate();
  const [currentSlogan, setCurrentSlogan] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlogan((prev) => (prev + 1) % slogans.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-white to-gray-100 text-gray-900 py-24 px-6 overflow-hidden lg:h-120">
      {/* Soft Red Glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 3 }}
        className="absolute top-10 right-10 w-[500px] h-[500px] bg-red-200 rounded-full blur-[120px]"
      />

      {/* Falling BLOOD background */}
      <div className="absolute inset-0 flex justify-center items-start pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 800, opacity: 0.1 }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              repeatType: 'loop',
              delay: i * 1.2,
            }}
            className="absolute text-[120px] font-extrabold text-red-600 select-none"
            style={{ left: `${i * 12}%` }}
          >
            BLOOD
          </motion.span>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center justify-center">
        {/* Animated Slogan with fixed height */}
        <div className="h-[4.5rem] md:h-[6rem] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentSlogan}
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              {slogans[currentSlogan]}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="lg:mt-20 mt-10  lg:text-2xl opacity-80 text-gray-500"
        >
          Join the donor community and make an impact today.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex justify-center gap-4 mt-8 flex-wrap"
        >
          <button
            onClick={() => navigate('/register')}
            className="btn bg-red-600 text-white border-none px-6 py-6 rounded-lg font-semibold hover:bg-red-700 shadow-lg transition-all lg:text-[16px]"
          >
            Join as a Donor
          </button>

          <button
            onClick={() => navigate('/search')}
            className="btn bg-white text-gray-800 border border-gray-300 px-6 py-6 rounded-lg font-semibold hover:bg-gray-200 shadow-md transition-all lg:text-[16px]"
          >
            Search Donors
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
