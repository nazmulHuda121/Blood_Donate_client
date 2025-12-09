import React from 'react';
import { motion } from 'framer-motion';

const Login = () => {
  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1572470468728-1b2277637d30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-red-900/40 backdrop-blur-sm"></div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-red-200 shadow-2xl p-10 rounded-3xl z-10"
      >
        <h2 className="text-4xl font-bold text-center text-red-700 mb-6">
          Welcome Back
        </h2>

        <form className="grid gap-5">
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              className="input input-bordered bg-red-50/30 w-full rounded-xl mt-1"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              type="password"
              className="input input-bordered bg-red-50/30 w-full rounded-xl mt-1"
              placeholder="********"
            />
          </div>

          <button className="py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg font-semibold">
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-white font-medium">
          Don't have an account?{' '}
          <a href="/register" className="text-yellow-300 underline">
            Register
          </a>
        </p>
      </motion.div>
    </section>
  );
};

export default Login;
