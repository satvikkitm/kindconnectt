import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Mail, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type FormData = {
  email: string;
  password: string;
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { signIn, authLoading, error, clearError, resendVerificationEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [resent, setResent] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: FormData) => {
    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (error) {
      // Error already handled by AuthContext
    }
  };

  const handleResendEmail = async () => {
    if (!error || error !== 'email_not_confirmed') return;
    try {
      await resendVerificationEmail();
      setResent(true);
      clearError();
    } catch (err) {
      console.error('Failed to resend email:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="mx-auto bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-500">Please sign in to continue</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-50 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-600">
                  {error === 'invalid_credentials' && 'Invalid email or password'}
                  {error === 'email_not_confirmed' && 'Your email is not confirmed. Please verify your email.'}
                  {error === 'network_error' && 'Connection problem. Try again later'}
                </p>
                {error === 'email_not_confirmed' && !resent && (
                  <button
                    type="button"
                    onClick={handleResendEmail}
                    className="mt-2 text-sm font-medium text-blue-600 hover:underline"
                  >
                    Resend confirmation email
                  </button>
                )}
                {resent && <p className="text-sm text-green-600 mt-1">Verification email resent! Check your inbox.</p>}
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <div className="relative">
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                type="email"
                id="email"
                autoComplete="email"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                placeholder="name@company.com"
              />
              <Mail className="w-5 h-5 text-gray-400 absolute right-4 top-3.5" />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition`}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-500"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {authLoading ? 'Signing in...' : 'Sign in'}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

<Link
  to="/forgot-password"
  className="text-sm font-medium text-blue-600 hover:text-blue-500"
>
  Forgot password?
</Link>


export default Login;
