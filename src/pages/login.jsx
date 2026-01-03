import { useRouter } from 'next/navigation'; // Changed to navigation to match your code, or keep 'next/router'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { authAPI } from '@/lib/api';
import useAuthStore from '@/context/authStore';
import { toast } from 'react-toastify';
import { Mail, Lock, ArrowRight, Layout, AlertCircle } from 'lucide-react';
import Head from 'next/head';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(false);
  
  // Using your existing form logic
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. YOUR ORIGINAL LOGIC
      const response = await authAPI.login(data.email, data.password);
      const { accessToken, refreshToken, user } = response.data;

      // 2. YOUR ORIGINAL STORAGE LOGIC
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user, accessToken, refreshToken);
      
      // 3. SUCCESS & REDIRECT
      toast.success('Login successful');
      router.push('/dashboard');
      
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    // DARK THEME WRAPPER (Only applies to this page)
    <div className="min-h-screen bg-[#0B0B0F] text-white flex flex-col items-center justify-center font-sans selection:bg-purple-500/30 relative overflow-hidden">
      <Head>
        <title>Login | AdminCMS</title>
      </Head>

      {/* Visual Background Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Logo Header */}
      <div className="mb-8 flex flex-col items-center z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center mb-4 shadow-lg shadow-purple-500/20">
          <Layout size={24} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">
          Admin<span className="text-purple-400">CMS</span>
        </h2>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md p-1 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl z-10 mx-4">
        <div className="bg-[#121212] rounded-xl p-8 shadow-2xl border border-white/5 backdrop-blur-xl">
          
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Access Your Account</h1>
            <p className="text-gray-400 text-sm">Sign in to manage your content.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input 
                  type="email" 
                  placeholder="admin@example.com"
                  {...register("email", { required: "Email is required" })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                />
              </div>
              {errors.email && <span className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.email.message}</span>}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-3 text-gray-500 group-focus-within:text-purple-400 transition-colors" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                />
              </div>
              {errors.password && <span className="text-red-400 text-xs flex items-center gap-1"><AlertCircle size={12}/> {errors.password.message}</span>}
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg shadow-purple-900/20 hover:shadow-purple-500/30 transition-all duration-200 flex items-center justify-center gap-2 group transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Authenticating...' : (
                <>
                  Login <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>
      </div>

      <footer className="mt-8 text-gray-600 text-xs z-10">
        © 2025 AdminCMS. All rights reserved Powered by SRP Admin CMS.
      </footer>
    </div>
  );
}