"use client";
import { Mail, Lock, Eye, EyeOff, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface LoginProps {
  onClose?: () => void;
  onSwitchToSignup?: () => void;
}

export default function Login({ onClose, onSwitchToSignup }: LoginProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login submitted', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#DCE1DE] to-[#9CC5A1] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-[#216869] to-[#49A078] rounded-2xl flex items-center justify-center">
              <Smartphone className="w-8 h-8 text-white" />
            </div>
            <span className="text-3xl font-bold text-[#1F2421]">FoodHub</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1F2421] mb-2">Welcome Back</h1>
          <p className="text-[#1F2421]/70">Sign in to continue ordering delicious food</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1F2421]">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#216869]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-12 pr-4 py-3 bg-[#DCE1DE] text-[#1F2421] rounded-xl outline-none focus:ring-2 focus:ring-[#216869] transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1F2421]">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#216869]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 bg-[#DCE1DE] text-[#1F2421] rounded-xl outline-none focus:ring-2 focus:ring-[#216869] transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#216869] hover:text-[#1a5657]"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-[#216869] text-[#216869] focus:ring-[#216869]"
                />
                <span className="text-sm text-[#1F2421]">Remember me</span>
              </label>
              <a href="#" className="text-sm text-[#216869] hover:text-[#1a5657] font-medium">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#216869] to-[#49A078] hover:from-[#1a5657] hover:to-[#3d8a66] text-white py-3.5 rounded-xl font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DCE1DE]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#1F2421]/60">Or continue with</span>
            </div>
          </div>

          {/* Social Signup */}
          <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#DCE1DE] hover:border-[#9CC5A1] rounded-xl transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span className="text-[#1F2421] font-medium">Google</span>
          </button>
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-[#1F2421]/70">
              Don't have an account?{' '}
              <button
                onClick={()=> router.push('/sign-up')}
                className="text-[#216869] hover:text-[#1a5657] font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
