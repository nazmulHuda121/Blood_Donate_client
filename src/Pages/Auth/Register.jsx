import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router';
import useAxios from '../../hooks/useAxios';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = () => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState();
  const axiosSecure = useAxios();
  const { resigterUser } = useAuth();
  const area = useLoaderData();

  const { register, handleSubmit } = useForm();

  const handleUserRegistation = async (data) => {
    try {
      // Firebase account create
      const result = await resigterUser(data.email, data.password);
      console.log('Firebase user created:', result.user);

      // Prepare MongoDB user
      const userInfo = {
        name: data.fullname,
        email: data.email,
        avatar: avatarFile,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upozila,
      };

      // Save to MongoDB
      await axiosSecure.post('/user', userInfo);

      alert('Registration successful!');
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <section
      className=" py-18 bg-cover bg-center bg-no-repeat flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1723132609728-01b6cd5cdab1?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      {/* Dark red overlay */}
      <div className="absolute inset-0 bg-red-900/40 backdrop-blur-sm"></div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl shadow-2xl border border-red-200 p-10 rounded-3xl z-10"
      >
        <h2 className="text-4xl font-bold text-center text-red-700 mb-6">
          Create Donor Account
        </h2>

        <form
          onSubmit={handleSubmit(handleUserRegistation)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          <div className="col-span-2">
            <label className="font-semibold">Full Name</label>
            <input
              {...register('fullname')}
              type="text"
              className="input input-bordered w-full bg-red-50/30 mt-1 rounded-xl"
              placeholder="Your Name"
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Email</label>
            <input
              {...register('email')}
              type="email"
              className="input input-bordered w-full bg-red-50/30 mt-1 rounded-xl"
              placeholder="Your Email"
            />
          </div>

          <div className="col-span-2">
            <label className="font-semibold">Avatar (ImageBB)</label>
            <input
              {...register('image')}
              type="file"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              className="file-input file-input-bordered bg-red-50/30 w-full mt-1 rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold">Blood Group</label>
            <select
              {...register('bloodGroup')}
              className="select select-bordered bg-red-50/30 w-full mt-1 rounded-xl"
            >
              <option disabled selected>
                Select
              </option>
              {bloodGroups.map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">District</label>
            <select
              {...register('district')}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="select select-bordered bg-red-50/80 w-full mt-1 rounded-xl"
            >
              <option>Select</option>
              {Object.keys(area).map((district, ind) => (
                <option key={ind}>{district}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Upazila</label>
            <select
              {...register('upozila')}
              className="select select-bordered bg-red-50/30 w-full mt-1 rounded-xl"
            >
              <option>Select</option>
              {selectedDistrict &&
                area[selectedDistrict]?.map((upozila, ind) => (
                  <option key={ind}>{upozila}</option>
                ))}
            </select>
          </div>

          <div>
            <label className="font-semibold">Password</label>
            <input
              {...register('password')}
              type="password"
              className="input input-bordered w-full bg-red-50/30 mt-1 rounded-xl"
            />
          </div>

          <div>
            <label className="font-semibold">Confirm Password</label>
            <input
              {...register('confirmPassword')}
              type="password"
              className="input input-bordered w-full bg-red-50/30 mt-1 rounded-xl"
            />
          </div>

          <div className="col-span-2 mt-3">
            <button className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl shadow-lg transition-all">
              Register Now
            </button>
          </div>
        </form>

        <p className="text-center mt-4 text-white font-medium">
          Already have an account?{' '}
          <a href="/login" className="text-yellow-300 underline">
            Login
          </a>
        </p>
      </motion.div>
    </section>
  );
};

export default Register;
