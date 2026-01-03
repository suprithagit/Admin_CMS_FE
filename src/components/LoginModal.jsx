import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/router';

const LoginModal = ({ onClose }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState(null);

  // Load Content from JSON
  useEffect(() => {
    fetch('/site-content.json')
      .then((res) => res.json())
      .then((data) => setContent(data.login));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
    
      localStorage.setItem('token', 'demo-token-123');
      localStorage.setItem('user', JSON.stringify({ name: 'Admin', role: 'SuperAdmin' }));
      
      setLoading(false);
      
      // Redirect to the new "Applications Hub" instead of direct Dashboard
      router.push('/apps'); 
    }, 1500);
  };

  if (!content) return null; // Wait for JSON to load

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md p-1 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl">
        <div className="bg-[#121212] rounded-xl p-8 shadow-2xl border border-white/10">
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">{content.title}</h2>
            <p className="text-gray-400 text-sm">{content.subtitle}</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{content.emailLabel}</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                <input 
                  type="email" 
                  placeholder="admin@example.com"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">{content.passwordLabel}</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-500" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? content.buttonLoading : (
                <>
                  {content.buttonDefault} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;