import { Sun, CloudSun, Moon } from 'lucide-react';
import useRole from '../hooks/useRoles';
import useAuth from '../hooks/useAuth';

const DashboardBanner = () => {
  const { user } = useAuth();
  const { role } = useRole();

  const hour = new Date().getHours();

  const getGreeting = () => {
    if (hour < 12) return { text: 'Good Morning', icon: <Sun size={22} /> };
    if (hour < 18)
      return { text: 'Good Afternoon', icon: <CloudSun size={22} /> };
    return { text: 'Good Evening', icon: <Moon size={22} /> };
  };

  const { text, icon } = getGreeting();

  return (
    <div className="mb-6">
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-red-900 text-white rounded-2xl p-6 shadow-xl flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-lg font-medium text-slate-200">
            {icon}
            <span>{text},</span>
          </div>

          <h1 className="text-3xl font-bold mt-1">
            {user?.displayName || 'Welcome Back'}
          </h1>

          <p className="text-sm text-slate-300 mt-1">
            Glad to see you again on your dashboard ✨
          </p>
        </div>

        <div className="hidden sm:block">
          <span className="px-4 py-2 bg-white/10 rounded-full text-sm font-semibold capitalize border border-white/20">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardBanner;
