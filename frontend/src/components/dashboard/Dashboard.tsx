import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { ResponsiveContainer, LineChart, BarChart, PieChart, Line, Bar, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, Landmark, FileText, Satellite, Home, LogOut, TrendingUp, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { auth } from '@/lib/api';

interface User {
  id: number;
  email: string;
  username: string;
  is_farmer: boolean;
  phone_number?: string;
  address?: string;
}

interface DashboardStats {
  totalFarmers: number;
  totalLand: number;
  activeSchemes: number;
  growthRate: number;
  recentRegistrations: Array<{
    date: string;
    count: number;
  }>;
  landDistribution: Array<{
    region: string;
    area: number;
  }>;
  schemeSuccess: Array<{
    scheme: string;
    approved: number;
    rejected: number;
    date: string;
  }>;
}

interface MockStats {
  totalFarmers: number;
  totalLand: number;
  activeSchemes: number;
  growthRate: number;
  recentRegistrations: Array<{
    date: string;
    count: number;
  }>;
  schemeSuccess: Array<{
    scheme: string;
    approved: number;
    rejected: number;
    date: string;
  }>;
}

const mockStats: DashboardStats = {
  totalFarmers: 3240,
  totalLand: 12758,
  activeSchemes: 48,
  growthRate: 15,
  recentRegistrations: [
    { date: 'Jan', count: 240 },
    { date: 'Feb', count: 280 },
    { date: 'Mar', count: 320 },
    { date: 'Apr', count: 290 },
    { date: 'May', count: 350 },
    { date: 'Jun', count: 380 }
  ],
  landDistribution: [
    { region: 'North', area: 1500 },
    { region: 'South', area: 1200 },
    { region: 'East', area: 1000 },
    { region: 'West', area: 1300 },
  ],
  schemeSuccess: [
    { scheme: 'PM Fasal Bima Yojana', approved: 156, rejected: 23, date: '2024-03-15' },
    { scheme: 'Kisan Credit Card', approved: 89, rejected: 12, date: '2024-03-14' },
    { scheme: 'Soil Health Card', approved: 234, rejected: 45, date: '2024-03-13' },
    { scheme: 'PM Kisan Samman Nidhi', approved: 567, rejected: 78, date: '2024-03-12' },
    { scheme: 'National Agriculture Market', approved: 123, rejected: 34, date: '2024-03-11' }
  ]
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await auth.getCurrentUser();
        setUser(userData);
      } catch (error) {
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [navigate]);

  const handleLogout = () => {
    auth.logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/home" className="flex items-center space-x-2 text-gray-600 hover:text-primary">
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Farmers</p>
                    <h3 className="text-2xl font-bold mt-1">3,240</h3>
                    <p className="text-sm text-green-600 mt-1">+12% from last month</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Land</p>
                    <h3 className="text-2xl font-bold mt-1">12,758 ha</h3>
                    <p className="text-sm text-green-600 mt-1">+8% from last month</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <Landmark className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Schemes</p>
                    <h3 className="text-2xl font-bold mt-1">48</h3>
                    <p className="text-sm text-green-600 mt-1">+5% from last month</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <FileText className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Aerial Images</p>
                    <h3 className="text-2xl font-bold mt-1">5,429</h3>
                    <p className="text-sm text-green-600 mt-1">+15% from last month</p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Satellite className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Farmer Registration Trends</CardTitle>
                <CardDescription>Monthly registration and approval statistics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockStats.recentRegistrations}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="count" stroke="#2563eb" name="Registrations" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Land Distribution</CardTitle>
                <CardDescription>Regional land area distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockStats.landDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="region" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="area" fill="#2563eb" name="Area (hectares)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activities and updates</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockStats.schemeSuccess.map((scheme) => (
                  <div key={scheme.scheme} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{scheme.scheme}</p>
                      <p className="text-sm text-gray-500">
                        {scheme.approved} approved, {scheme.rejected} rejected
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {new Date(scheme.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 