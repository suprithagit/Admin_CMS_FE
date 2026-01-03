'use client';

import { useRouter } from 'next/navigation';
import useAuthStore from '@/context/authStore';
import { FiLogOut } from 'react-icons/fi';

export default function Topbar() {
  const router = useRouter();
  const { logout, user } = useAuthStore();

  const handleLogout = () => {
    logout();
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <div className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Portfolio CMS</h1>
      <div className="flex items-center gap-6">
        <div className="text-sm text-gray-600">
          {new Date().toLocaleDateString()}
        </div>
        {user && (
          <div className="flex items-center gap-4 border-l pl-6">
            <div className="text-right">
              <p className="font-semibold text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 p-2 rounded text-white transition flex items-center gap-2"
              title="Logout"
            >
              <FiLogOut size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
