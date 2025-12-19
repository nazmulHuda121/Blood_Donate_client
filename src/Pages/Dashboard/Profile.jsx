import useAuth from '../../hooks/useAuth';
import { FaEdit, FaKey } from 'react-icons/fa';
import useRole from '../../hooks/useRoles';

const Profile = () => {
  const { user } = useAuth() || {};
  const { role } = useRole();
  console.log(user);

  return (
    <div className="max-w-md mx-auto p-4">
      {/* Card */}
      <div className="bg-[#1d232b] text-white rounded-2xl shadow-2xl py-10 px-5 border border-gray-700">
        {/* User Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={user?.photoURL || 'https://i.pravatar.cc/80'}
            className="w-20 h-20 rounded-full object-cover border-4 border-gray-700 shadow-md"
          />
          <h2 className="text-xl font-semibold mt-3">
            {user?.displayName || 'Unknown User'}
          </h2>

          <span className="mt-1 px-3 py-1 text-xs bg-gray-800 border border-gray-700 rounded-full">
            {role || 'User'}
          </span>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-5">
          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400">Full Name</p>
            <p className="text-base font-medium">
              {user?.displayName || 'N/A'}
            </p>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400">Email</p>
            <p className="text-base font-medium">{user?.email || 'N/A'}</p>
          </div>

          <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
            <p className="text-xs text-gray-400">Role</p>
            <p className="text-base font-medium capitalize">{role}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex justify-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition">
            <FaEdit /> Edit
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium transition">
            <FaKey /> Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
