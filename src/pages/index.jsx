import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout, ChevronRight, Zap, Shield, Globe } from 'lucide-react';

export default function LandingPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Welcome | AdminCMS</title>
      </Head>

      {/* Dark Theme Wrapper with Flex Column to push footer down */}
      <div className="min-h-screen bg-[#0B0B0F] text-white overflow-hidden relative font-sans selection:bg-purple-500/30 flex flex-col">

        {/* 1. ANIMATED BACKGROUND GRADIENTS (Pulse Effect) */}
        <div className="absolute top-[-20%] left-[-10%] w-[420px] h-[420px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[420px] h-[420px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700" />

        {/* Navigation */}
        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-5 flex justify-between items-center w-full animate-in slide-in-from-top-4 fade-in duration-700">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Layout size={18} className="text-white" />
            </div>
            <span>
              Admin<span className="text-purple-400">CMS</span>
            </span>
          </div>

          {/* ATTRACTIVE LOGIN BUTTON (Matches Image) */}
          <button
            onClick={() => router.push('/login')}
            className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500/50 hover:shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)] transition-all duration-300 text-sm font-medium text-white backdrop-blur-sm"
          >
            Login
          </button>
        </nav>

        {/* Hero Section (Uses flex-grow to fill space) */}
        <main className="relative z-10 flex flex-grow flex-col items-center justify-center text-center mt-8 px-4 w-full">

          {/* Heading */}
          <h1 className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-200 text-4xl md:text-6xl font-bold tracking-tight mb-4 max-w-4xl leading-tight">
            Your content, <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 animate-gradient">
              your way.
            </span>
          </h1>

          {/* Description */}
          <p className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-300 text-base md:text-lg text-gray-400 max-w-2xl mb-10 leading-relaxed">
            A powerful, fully customizable content management system built from scratch.
            Manage your portfolio, blog, and projects with complete control.
          </p>

          {/* CTA Button */}
          <div className="animate-in slide-in-from-bottom-4 fade-in duration-700 delay-400">
            <button
              onClick={() => router.push('/login')}
              className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 hover:scale-105 rounded-full font-bold text-white shadow-[0_0_30px_-5px_rgba(168,85,247,0.4)] transition-all duration-300 flex items-center gap-2 group"
            >
              Get Started <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Features Grid */}
          <div className="animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-6xl w-full px-6 pb-10">
            <FeatureCard
              icon={<Zap className="text-yellow-400" />}
              title="Lightning Fast"
              desc="Optimized for speed and performance."
            />
            <FeatureCard
              icon={<Shield className="text-pink-400" />}
              title="Secure"
              desc="Enterprise-grade security built-in."
            />
            <FeatureCard
              icon={<Globe className="text-blue-400" />}
              title="API Ready"
              desc="Connect your content anywhere."
            />
          </div>
        </main>

        {/* Footer (Matches Image) */}
        <footer className="relative z-10 w-full text-center py-6 border-t border-white/5 animate-in fade-in duration-1000 delay-700 bg-[#0B0B0F]/80 backdrop-blur-md">
          <p className="text-gray-600 text-xs">
            © 2025 AdminCMS. All rights reserved. Powered by <span className="text-purple-500/60 font-medium">SRP Admin CMS</span>.
          </p>
        </footer>

      </div>
    </>
  );
}

/* Feature Card Component with Hover Lift Effect */
const FeatureCard = ({ icon, title, desc }) => (
  <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-white/[0.07] hover:-translate-y-1 transition-all duration-300 text-left group shadow-lg hover:shadow-purple-500/10">
    <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-sm">{desc}</p>
  </div>
);