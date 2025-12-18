import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { Navigate, useLoaderData, useNavigate } from 'react-router';
import useAxios from '../../hooks/useAxios';
import axios from 'axios';
import Swal from 'sweetalert2';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = () => {
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const axiosSecure = useAxios();
  const { registerUser, updateUserProfile } = useAuth();
  const area = useLoaderData();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const handleUserRegistation = async (data) => {
    try {
      // 1. Firebase user create
      await registerUser(data.email, data.password);

      // 2. Upload image
      const formData = new FormData();
      formData.append('image', data.image[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        formData
      );

      const photoURL = imgRes.data.data.url;

      // 3. Update Firebase profile
      await updateUserProfile({
        displayName: data.fullname,
        photoURL,
      });

      // 4. Save user to MongoDB
      const userInfo = {
        name: data.fullname,
        email: data.email,
        avatar: photoURL,
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upozila,
        role: 'donor',
        status: 'active',
      };

      await axiosSecure.post('/user', userInfo);

      // SweetAlert success
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful 🎉',
        text: 'Your donor account has been created',
        timer: 2000,
        showConfirmButton: false,
      });

      // Redirect after alert
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 500);
    } catch (error) {
      console.error(error);

      // SweetAlert error
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: error.message,
      });
    }
  };

  return (
    <section
      className="py-18 bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage:
          "url('https://plus.unsplash.com/premium_photo-1723132609728-01b6cd5cdab1')",
      }}
    >
      <div className="absolute inset-0 bg-red-900/40 backdrop-blur-sm"></div>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-2xl bg-white/10 backdrop-blur-xl p-10 rounded-3xl z-10"
      >
        <h2 className="text-4xl font-bold text-center text-red-700 mb-6">
          Create Donor Account
        </h2>

        <form
          onSubmit={handleSubmit(handleUserRegistation)}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Full Name */}
          <div className="col-span-2">
            <label>Full Name</label>
            <input
              {...register('fullname', { required: true })}
              className="input w-full"
            />
          </div>

          {/* Email */}
          <div className="col-span-2">
            <label>Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              className="input w-full"
            />
          </div>

          {/* Avatar */}
          <div className="col-span-2">
            <label>Avatar</label>
            <input
              {...register('image', { required: true })}
              type="file"
              className="file-input w-full"
            />
          </div>

          {/* Blood Group */}
          <select {...register('bloodGroup')} className="select">
            <option>Select Blood</option>
            {bloodGroups.map((bg) => (
              <option key={bg}>{bg}</option>
            ))}
          </select>

          {/* District */}
          <select
            {...register('district')}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="select"
          >
            <option>Select District</option>
            {Object.keys(area).map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>

          {/* Upazila */}
          <select {...register('upozila')} className="select">
            <option>Select Upazila</option>
            {selectedDistrict &&
              area[selectedDistrict]?.map((u) => <option key={u}>{u}</option>)}
          </select>

          {/* Password */}
          <input
            {...register('password', { required: true, minLength: 6 })}
            type="password"
            placeholder="Password"
            className="input"
          />

          {/* Confirm Password */}
          <input
            {...register('confirmPassword', { required: true })}
            type="password"
            placeholder="Confirm Password"
            className="input"
          />

          <button className="col-span-2 bg-red-600 py-3 rounded text-white">
            Register
          </button>
        </form>
      </motion.div>
    </section>
  );
};

export default Register;
