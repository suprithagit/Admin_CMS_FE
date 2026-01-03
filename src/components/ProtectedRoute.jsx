'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAuthStore from '@/context/authStore';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { isAuthenticated, loadFromStorage } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router, loadFromStorage]);

  if (!isAuthenticated) {
    return null;
  }

  return children;
}
