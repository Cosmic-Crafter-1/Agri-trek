import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../ui/card';
import { auth } from '@/lib/api';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    password2: '',
    phone_number: '',
    address: '',
    is_farmer: false,
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await auth.register(formData);
      // After successful registration, redirect to login
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
          {error && (
            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="password2">
                Confirm Password
              </label>
              <input
                id="password2"
                type="password"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={formData.password2}
                onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="phone">
                Phone Number (Optional)
              </label>
              <input
                id="phone"
                type="tel"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={formData.phone_number}
                onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" htmlFor="address">
                Address (Optional)
              </label>
              <textarea
                id="address"
                className="w-full p-2 rounded-md border border-input bg-background"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                id="is_farmer"
                type="checkbox"
                className="rounded border-input"
                checked={formData.is_farmer}
                onChange={(e) => setFormData({ ...formData, is_farmer: e.target.checked })}
              />
              <label className="text-sm font-medium" htmlFor="is_farmer">
                Register as a Farmer
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Register
            </button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline"
            >
              Login
            </button>
          </div>
        </motion.div>
      </Card>
    </div>
  );
};

export default Register;