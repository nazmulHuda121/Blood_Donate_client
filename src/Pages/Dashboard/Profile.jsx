import { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRoles';
import useAxios from '../../hooks/useAxios';
import { FaEdit, FaSave, FaKey } from 'react-icons/fa';

const Profile = () => {
  const { user } = useAuth() || {};
  const { role } = useRole();
  const axios = useAxios();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    district: '',
    upazila: '',
    bloodGroup: '',
    photoURL: '',
  });

  // Initialize form data with user info
  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || '',
        district: user.district || '',
        upazila: user.upazila || '',
        bloodGroup: user.bloodGroup || '',
        photoURL: user.photoURL || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  const handleSave = async () => {
    try {
      // PATCH request to update user info
      const res = await axios.patch(`/user/${user.email}`, formData);
      console.log('Profile updated:', res.data);
      setEditMode(false);
      // Optionally, refresh user context here
    } catch (err) {
      console.error('Update failed:', err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="bg-[#1d232b] text-white rounded-2xl shadow-2xl py-10 px-5 border border-gray-700">
        {/* Header with Edit/Save */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">My Profile</h2>
          {editMode ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition"
            >
              <FaSave /> Save
            </button>
          ) : (
            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition"
            >
              <FaEdit /> Edit
            </button>
          )}
        </div>

        {/* User Avatar */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={formData.photoURL || 'https://i.pravatar.cc/80'}
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-700 shadow-md mb-3"
          />
          {editMode && (
            <input
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="Avatar URL"
              className="w-3/4 rounded bg-gray-800 px-2 py-1 text-white text-sm text-center"
            />
          )}
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Full Name
            </label>
            <input
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={!editMode}
              className={`w-full px-3 py-2 rounded bg-gray-900 text-white border ${
                editMode ? 'border-red-600' : 'border-gray-700'
              }`}
            />
          </div>

          {/* Email (readonly always) */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Email</label>
            <input
              value={user?.email || ''}
              disabled
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-400 border border-gray-700"
            />
          </div>

          {/* Role */}
          <div>
            <label className="block text-xs text-gray-400 mb-1">Role</label>
            <input
              value={role || 'User'}
              disabled
              className="w-full px-3 py-2 rounded bg-gray-800 text-gray-400 border border-gray-700"
            />
          </div>
        </div>

        {/* Password Button */}
        <div className="mt-6 flex justify-center">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition">
            <FaKey /> Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
