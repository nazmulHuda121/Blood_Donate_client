import React from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signInUser, googleSignIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (data) => {
    try {
      const result = await signInUser(data.email, data.password);
      console.log('Logged in:', result.user);

      navigate(location?.state || '/dashboard');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    }
  };

  // Google Login Handler
  const handleGoogle = async () => {
    try {
      const result = await googleSignIn();
      console.log(result.user);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Google Login Successful!',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate(location?.state || '/');
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message,
      });
    }
  };

  return (
    <section
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1572470468728-1b2277637d30?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
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

        {/* Login Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="grid gap-5">
          <div>
            <label className="font-semibold">Email</label>
            <input
              {...register('email')}
              type="email"
              className="input input-bordered bg-red-50/30 w-full rounded-xl mt-1"
              placeholder="Enter email"
              required
            />
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              {...register('password')}
              type="password"
              className="input input-bordered bg-red-50/30 w-full rounded-xl mt-1"
              placeholder="********"
              required
            />
          </div>

          <button className="py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl shadow-lg font-semibold">
            Login
          </button>
        </form>

        {/* Google Login */}
        <div className="text-center mt-6">
          {/* Google */}
          <button
            onClick={handleGoogle}
            className="btn border-0 hover:text-red-800 w-full py-3 bg-white  text-black rounded-xl shadow-lg font-semibold"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>

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
