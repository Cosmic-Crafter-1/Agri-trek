import React from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Chart, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

const farmerData = [
  { month: 'Jan', registrations: 65, approvals: 53 },
  { month: 'Feb', registrations: 78, approvals: 70 },
  { month: 'Mar', registrations: 92, approvals: 85 },
  { month: 'Apr', registrations: 105, approvals: 90 },
  { month: 'May', registrations: 120, approvals: 110 },
  { month: 'Jun', registrations: 135, approvals: 125 },
];

const landData = [
  { region: 'Karnataka', area: 1200, parcels: 220 },
  { region: 'Maharashtra', area: 1800, parcels: 350 },
  { region: 'Tamil Nadu', area: 1450, parcels: 280 },
  { region: 'Punjab', area: 1650, parcels: 320 },
  { region: 'Uttar Pradesh', area: 2100, parcels: 420 },
];

const schemeData = [
  { scheme: 'PM Fasal Bima Yojana', applications: 320, approvals: 280, rejections: 40 },
  { scheme: 'PM Kisan Samman Nidhi', applications: 450, approvals: 390, rejections: 60 },
  { scheme: 'Krishi Sinchayee Yojana', applications: 280, approvals: 230, rejections: 50 },
  { scheme: 'Rashtriya Krishi Vikas Yojana', applications: 190, approvals: 150, rejections: 40 },
  { scheme: 'Kisan Credit Card', applications: 210, approvals: 180, rejections: 30 },
];

const farmerChartConfig = {
  registrations: { color: '#8884d8', label: 'Registrations' },
  approvals: { color: '#82ca9d', label: 'Approvals' }
};

const landChartConfig = {
  area: { color: '#8884d8', label: 'Area (hectares)' },
  parcels: { color: '#82ca9d', label: 'Parcels' }
};

const schemeChartConfig = {
  applications: { color: '#8884d8', label: 'Applications' },
  approvals: { color: '#82ca9d', label: 'Approvals' },
  rejections: { color: '#ff6b6b', label: 'Rejections' }
};

const AnalyticsDashboard = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Farmer Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart config={farmerChartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={farmerData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="registrations" fill="#8884d8" />
                  <Bar dataKey="approvals" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Land Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart config={landChartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={landData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="area" stroke="#8884d8" />
                  <Line type="monotone" dataKey="parcels" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Chart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scheme Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <Chart config={schemeChartConfig}>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={schemeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="scheme" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="applications" fill="#8884d8" />
                  <Bar dataKey="approvals" fill="#82ca9d" />
                  <Bar dataKey="rejections" fill="#ff6b6b" />
                </BarChart>
              </ResponsiveContainer>
            </Chart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
