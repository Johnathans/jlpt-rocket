'use client';

import { useEffect } from 'react';
import SignupForm from '@/components/auth/SignupForm';

export default function SignupPage() {
  useEffect(() => {
    document.title = 'Sign Up - Rocket JLPT | Start Learning Japanese';
    
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    updateMetaTag('description', 'Create your free Rocket JLPT account and start mastering Japanese with comprehensive JLPT preparation for all levels N5 to N1.');
    updateMetaTag('keywords', 'rocket jlpt signup, create account, jlpt registration, start learning japanese, free jlpt study');
  }, []);

  return <SignupForm />;
}
