import React, { useState } from 'react';
import { registerUser } from '../api/authApi';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const data = await registerUser({ name, email, password });
      setSuccess(data.message || 'Registration successful! You can now login.');
      // Clear form on success
      setName('');
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-sans bg-[#FFF8E8] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-4xl font-extrabold text-[#F6C96A] tracking-wider mb-2 drop-shadow-sm">
          GROVIA
        </h2>
        <h3 className="mt-2 text-center text-2xl font-bold text-[#2B1723]">
          Create your account
        </h3>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join us to get fresh groceries delivered in minutes.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[#FFFDF5] py-8 px-4 shadow-xl border border-[#EBDDBF]/50 sm:rounded-3xl sm:px-10">
          
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl text-sm text-center">
              {success}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#2B1723]">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-[#EBDDBF] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#5A123E] focus:border-[#5A123E] sm:text-sm bg-white"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2B1723]">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-[#EBDDBF] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#5A123E] focus:border-[#5A123E] sm:text-sm bg-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#2B1723]">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  minLength="6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-3 border border-[#EBDDBF] rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#5A123E] focus:border-[#5A123E] sm:text-sm bg-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-bold text-white bg-[#5A123E] hover:bg-[#42102F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A123E] transition-colors disabled:opacity-70 hover:-translate-y-0.5 duration-300"
              >
                {loading ? 'Creating account...' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <span className="font-bold text-[#5A123E] hover:text-[#42102F] cursor-pointer transition-colors">
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
