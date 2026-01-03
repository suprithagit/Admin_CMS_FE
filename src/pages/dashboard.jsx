'use client';

import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';
import ProtectedRoute from '@/components/ProtectedRoute';
import { skillsAPI, projectsAPI, blogsAPI, contactAPI } from '@/lib/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    skills: 0,
    projects: 0,
    blogs: 0,
    messages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [skillsRes, projectsRes, blogsRes, messagesRes] = await Promise.all([
          skillsAPI.getAll(),
          projectsAPI.getAll(),
          blogsAPI.getAll(),
          contactAPI.getAll()
        ]);

        setStats({
          skills: skillsRes.data.length,
          projects: projectsRes.data.length,
          blogs: blogsRes.data.length,
          messages: messagesRes.data.length
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Topbar />
          <div className="flex-1 p-8 bg-gray-50 overflow-auto">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-4 gap-4">
              <StatCard label="Skills" value={stats.skills} color="blue" />
              <StatCard label="Projects" value={stats.projects} color="green" />
              <StatCard label="Blogs" value={stats.blogs} color="purple" />
              <StatCard label="Messages" value={stats.messages} color="red" />
            </div>
            <div className="mt-8 bg-white p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4">Welcome to CMS</h2>
              <p className="text-gray-600">
                Use the sidebar to navigate through different sections and manage your portfolio content.
              </p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}

function StatCard({ label, value, color }) {
  const colorClass = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    purple: 'bg-purple-100 text-purple-800',
    red: 'bg-red-100 text-red-800'
  };

  return (
    <div className={`p-6 rounded shadow ${colorClass[color]}`}>
      <p className="text-sm font-semibold">{label}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
