'use client';

import Link from 'next/link';
import { FiMenu } from 'react-icons/fi';
import { useState } from 'react';

export default function Sidebar() {
  const [open, setOpen] = useState(true);

  const menuItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'About', href: '/about' },
    { label: 'Skills', href: '/skills' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blogs', href: '/blogs' },
    { label: 'Experience', href: '/experience' },
    { label: 'Services', href: '/services' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: 'Messages', href: '/messages' },
    { label: 'Media', href: '/media' }
  ];

  return (
    <aside
      className={`${
        open ? 'w-64' : 'w-20'
      } bg-gray-900 text-white transition-all duration-300 min-h-screen`}
    >
      <div className="p-4 flex items-center justify-between">
        {open && <h1 className="text-xl font-bold">CMS</h1>}
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded hover:bg-gray-700"
        >
          <FiMenu />
        </button>
      </div>

      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`block px-4 py-3 hover:bg-gray-700 transition ${
              !open && 'text-center'
            }`}
          >
            {open ? item.label : item.label.charAt(0)}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
