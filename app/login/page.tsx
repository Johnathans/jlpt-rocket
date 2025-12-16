'use client';

import { useEffect, Suspense } from 'react';
import LoginForm from '@/components/auth/LoginForm';

export default function LoginPage() {
  useEffect(() => {
    document.title = 'Sign In - Rocket JLPT | Access Your Account';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Sign in to your Rocket JLPT account to continue your Japanese learning journey and track your JLPT exam preparation progress.');
    updateMetaTag('keywords', 'rocket jlpt login, sign in, jlpt account, japanese learning login');
  }, []);

  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div></div>}>
      <LoginForm />
    </Suspense>
  );
}
