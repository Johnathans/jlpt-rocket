'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, Rocket } from 'lucide-react';

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  
  const { signUp, signInWithGoogle } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    const { error } = await signUp(formData.email, formData.password, formData.name);
    
    if (error) {
      setErrors({ general: error.message });
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setErrors({});
    const { error } = await signInWithGoogle();
    if (error) {
      setErrors({ general: error.message });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md lg:max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left Column - Image and Links (Desktop Only) */}
            <div className="hidden lg:flex flex-col items-center justify-start bg-white rounded-lg border border-gray-200 p-8">
              <div className="w-full max-w-md mb-6 mt-4">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80" 
                  alt="Happy person using laptop" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-6 mt-2">Helpful Resources</h3>
              <div className="space-y-4 w-full">
                <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors group">
                  <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                  <span className="text-base">Getting Started Guide</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors group">
                  <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                  <span className="text-base">JLPT Study Tips</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors group">
                  <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                  <span className="text-base">How to Use Rocket JLPT</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors group">
                  <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                  <span className="text-base">FAQ & Support</span>
                </a>
              </div>
            </div>

            {/* Right Column - Success Message */}
            <div className="bg-white py-12 px-8 lg:px-12 shadow-sm rounded-lg border border-gray-200">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-6">
                <Mail className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-sm text-gray-600 mb-4">
                We've sent you a confirmation link at <strong>{formData.email}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Already confirmed?{' '}
                <Link href="/login" className="font-medium text-pink-500 hover:text-pink-600">
                  Sign in here
                </Link>
              </p>
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md lg:max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Image and Links (Desktop Only) */}
          <div className="hidden lg:flex flex-col items-center justify-start bg-white rounded-lg border border-gray-200 p-8">
            <div className="w-full max-w-md mb-6 mt-4">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80" 
                alt="Happy person using laptop" 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-6 mt-2">Helpful Resources</h3>
            <div className="space-y-4 w-full">
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors group">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                <span className="text-base">Getting Started Guide</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors group">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                <span className="text-base">JLPT Study Tips</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors group">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                <span className="text-base">How to Use Rocket JLPT</span>
              </a>
              <a href="#" className="flex items-center gap-3 text-gray-700 hover:text-pink-500 transition-colors group">
                <div className="w-2 h-2 bg-orange-500 rounded-full group-hover:bg-pink-500 transition-colors"></div>
                <span className="text-base">FAQ & Support</span>
              </a>
            </div>
          </div>

          {/* Right Column - Signup Form */}
          <div className="bg-white py-12 px-8 lg:px-12 shadow-sm rounded-lg border border-gray-200">
          {/* Logo and Header */}
          <div className="text-center mb-10">
            <div className="flex items-center justify-center mb-6">
              <Rocket className="h-8 w-8 text-pink-500" />
              <span className="text-3xl text-gray-900 ml-3">
                <span className="font-light">Rocket</span>
                <span className="font-black ml-1">JLPT</span>
              </span>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Create your account
            </h2>
            <p className="text-lg text-gray-600">
              Start your Japanese learning journey today
            </p>
          </div>

          {/* Error Messages */}
          {errors.general && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {errors.general}
            </div>
          )}

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignup}
            className="w-full flex justify-center items-center gap-3 px-6 py-4 border border-gray-300 border-b-4 border-b-gray-400 rounded-md text-base text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-400 hover:border-b-gray-500 font-semibold transition-all duration-200 mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-7">
            <div>
              <label htmlFor="name" className="block text-base font-medium text-gray-700 mb-2">
                Full name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-3.5 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`block w-full pl-10 pr-3 py-3.5 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`block w-full pl-10 pr-10 py-3.5 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-base font-medium text-gray-700 mb-2">
                Confirm password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`block w-full pl-10 pr-10 py-3.5 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 transition-colors ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 focus:ring-pink-500 border-gray-300 rounded" style={{ accentColor: '#ec4899' }}
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <Link href="/terms" className="text-pink-500 hover:text-pink-600">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-pink-500 hover:text-pink-600">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-4 px-6 border border-transparent border-b-4 border-b-pink-700 rounded-md text-lg font-semibold text-white bg-pink-500 hover:bg-pink-600 hover:border-b-pink-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                'Create account'
              )}
            </button>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <span className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-pink-500 hover:text-pink-600">
                  Sign in
                </Link>
              </span>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
