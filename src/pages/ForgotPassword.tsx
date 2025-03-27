import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type FormData = {
  email: string;
};

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { resetPassword } = useAuth();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async ({ email }: FormData) => {
    try {
      await resetPassword(email);
      setMessage('Password reset email sent! Check your inbox.');
      setError('');
    } catch (err) {
      setError('Failed to send reset email. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
       <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
         <h1 className="text-2xl font-bold text-gray-900 text-center mb-6">Forgot Password</h1>

         {message && (
          <div className="p-4 bg-green-50 rounded-lg flex items-center gap-3">
             <CheckCircle className="w-5 h-5 text-green-600" />
             <p className="text-sm text-green-600">{message}</p>
           </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your email
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

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;

