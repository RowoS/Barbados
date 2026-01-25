"use client";
import { Mail, Lock, Eye, EyeOff, User, Smartphone } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { useSignUpForm } from '../hooks/useSignUpForm';
import GoogleButton from '@/features/auth/components/GoogleSignInButton';
import { InputField } from '@/shared/components/InputField';

interface SignUpProps {
  onSwitchToLogin?: () => void;
}

export default function SignUpPage({ onSwitchToLogin }: SignUpProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { values, setters, fieldErrors, isLoading, submit } = useSignUpForm();

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
          <h1 className="text-3xl font-bold text-[#1F2421] mb-2">
            Create Account
          </h1>
          <p className="text-[#1F2421]/70">
            Join us and start ordering delicious food
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="space-y-5"
          >
            {/* Full Name */}
            <InputField
              label="Full Name"
              icon={<User />}
              value={values.username}
              error={fieldErrors.username}
              onChange={(e) => setters.setUsername(e.target.value)}
            />

            {/* Email */}
            <InputField
              label="Email Address"
              type="email"
              icon={<Mail />}
              value={values.email}
              error={fieldErrors.email}
              onChange={(e) => setters.setEmail(e.target.value)}
            />

            <InputField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              icon={<Lock />}
              value={values.password}
              error={fieldErrors.password}
              onChange={(e) => setters.setPassword(e.target.value)}
              endAdornment={
                <Button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? <EyeOff /> : <Eye />}
                </Button>
              }
            />

            {/* Confirm Password */}
            <InputField
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              icon={<Lock />}
              value={values.confirmPassword}
              error={fieldErrors.confirmPassword}
              onChange={(e) =>
              setters.setConfirmPassword(e.target.value)}
              endAdornment={
                <Button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                {showConfirmPassword ? <EyeOff /> : <Eye />}
                </Button>
              }
            />


            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 mt-1 rounded border-[#216869] text-[#216869] focus:ring-[#216869]"
                required
              />
              <label htmlFor="terms" className="text-sm text-[#1F2421]">
                I agree to the{' '}
                <a className="text-[#216869] font-medium hover:text-[#1a5657]">
                  Terms & Conditions
                </a>{' '}
                and{' '}
                <a className="text-[#216869] font-medium hover:text-[#1a5657]">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#216869] to-[#49A078] text-white py-3.5 rounded-xl font-medium"
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#DCE1DE]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#1F2421]/60">
                Or sign up with
              </span>
            </div>
          </div>

          <GoogleButton nextRoute="/dashboard" />

          {/* Login */}
          <div className="mt-6 text-center">
            <p className="text-[#1F2421]/70">
              Already have an account?{' '}
              <Button
                onClick={onSwitchToLogin}
                className="text-[#216869] font-medium hover:text-[#1a5657]"
              >
                Sign In
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

