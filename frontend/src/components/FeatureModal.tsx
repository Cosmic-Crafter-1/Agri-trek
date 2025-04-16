import React, { useState, useRef, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Upload, FileJson, X, Download, ChevronLeft, ChevronRight, BarChart2, LineChart as LineChartIcon, PieChart, ScatterChart as ScatterChartIcon, Map, Users, Landmark, FileText, Satellite, LayoutDashboard } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, ZAxis } from 'recharts';
import { Chart, ChartTooltip, ChartTooltipContent } from './ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Function to generate cluster data for visualization
const generateClusterData = (centers, pointsPerCluster = 20, noiseLevel = 0.3) => {
  let data = [];
  centers.forEach((center, clusterIndex) => {
    for (let i = 0; i < pointsPerCluster; i++) {
      // Add random noise to each point around the center
      const noiseX = (Math.random() - 0.5) * noiseLevel;
      const noiseY = (Math.random() - 0.5) * noiseLevel;
      
      // Ensure points stay within the 0-1 range
      const x = Math.max(0, Math.min(1, center.x + noiseX));
      const y = Math.max(0, Math.min(1, center.y + noiseY));
      
      data.push({
        x,
        y,
        z: 1, // Used for ZAxis scaling in ScatterChart
        cluster: `Cluster ${clusterIndex + 1}`
      });
    }
  });
  return data;
};

// Mock data for charts
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
  { name: 'PM Fasal Bima', approved: 156, rejected: 23 },
  { name: 'Kisan Credit', approved: 89, rejected: 12 },
  { name: 'Soil Health', approved: 234, rejected: 45 },
  { name: 'PM Kisan', approved: 567, rejected: 78 },
  { name: 'NAM', approved: 123, rejected: 34 }
];

const testDatasets = {
  dataset1: {
    name: "Rice Paddy Classification",
    description: "Classification of rice paddy fields in Karnataka region based on moisture content and vegetation health",
    explanation: "This dataset represents aerial imagery analysis of rice paddy fields in Karnataka. The clusters identify different zones based on water saturation and plant health indicators. Cluster 1 (red) shows areas with high moisture content, Cluster 2 (green) indicates healthy vegetation, and Cluster 3 (blue) represents drier areas that may need irrigation.",
    clusterColors: ['#ff5252', '#4caf50', '#2196f3'],
    data: [
      { x: 0.2, y: 0.3, z: 1, cluster: "Cluster 1" },
      { x: 0.3, y: 0.2, z: 1, cluster: "Cluster 1" },
      { x: 0.25, y: 0.25, z: 1, cluster: "Cluster 1" },
      { x: 0.15, y: 0.35, z: 1, cluster: "Cluster 1" },
      { x: 0.1, y: 0.1, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.1, z: 1, cluster: "Cluster 1" },
      { x: 0.1, y: 0.2, z: 1, cluster: "Cluster 1" },
      { x: 0.3, y: 0.4, z: 1, cluster: "Cluster 1" },
      { x: 0.7, y: 0.2, z: 1, cluster: "Cluster 2" },
      { x: 0.8, y: 0.1, z: 1, cluster: "Cluster 2" },
      { x: 0.75, y: 0.15, z: 1, cluster: "Cluster 2" },
      { x: 0.9, y: 0.3, z: 1, cluster: "Cluster 2" },
      { x: 0.8, y: 0.3, z: 1, cluster: "Cluster 2" },
      { x: 0.7, y: 0.25, z: 1, cluster: "Cluster 2" },
      { x: 0.9, y: 0.1, z: 1, cluster: "Cluster 2" },
      { x: 0.6, y: 0.2, z: 1, cluster: "Cluster 2" },
      { x: 0.5, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.6, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.4, y: 0.9, z: 1, cluster: "Cluster 3" },
      { x: 0.5, y: 0.9, z: 1, cluster: "Cluster 3" },
      { x: 0.6, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.4, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.5, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.7, y: 0.8, z: 1, cluster: "Cluster 3" }
    ]
  },
  dataset2: {
    name: "Crop Health Analysis",
    description: "Multi-spectral analysis of crop health in Maharashtra farming regions",
    explanation: "This visualization shows the results of multi-spectral imaging analysis of croplands in Maharashtra. The clusters identify different crop health conditions. Cluster 1 (purple) represents areas with potential pest infestation, Cluster 2 (orange) shows optimally growing crops, Cluster 3 (teal) indicates areas with nutrient deficiencies, and Cluster 4 (yellow) shows water-stressed regions. Farmers can use this data to target specific interventions in each zone.",
    clusterColors: ['#9c27b0', '#ff9800', '#009688', '#ffd600'],
    data: [
      { x: 0.1, y: 0.8, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.7, z: 1, cluster: "Cluster 1" },
      { x: 0.15, y: 0.75, z: 1, cluster: "Cluster 1" },
      { x: 0.25, y: 0.85, z: 1, cluster: "Cluster 1" },
      { x: 0.1, y: 0.9, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.8, z: 1, cluster: "Cluster 1" },
      { x: 0.5, y: 0.2, z: 1, cluster: "Cluster 2" },
      { x: 0.6, y: 0.3, z: 1, cluster: "Cluster 2" },
      { x: 0.45, y: 0.25, z: 1, cluster: "Cluster 2" },
      { x: 0.55, y: 0.15, z: 1, cluster: "Cluster 2" },
      { x: 0.5, y: 0.3, z: 1, cluster: "Cluster 2" },
      { x: 0.6, y: 0.2, z: 1, cluster: "Cluster 2" },
      { x: 0.7, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.8, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.75, y: 0.75, z: 1, cluster: "Cluster 3" },
      { x: 0.85, y: 0.85, z: 1, cluster: "Cluster 3" },
      { x: 0.7, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.8, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.3, y: 0.4, z: 1, cluster: "Cluster 4" },
      { x: 0.2, y: 0.3, z: 1, cluster: "Cluster 4" },
      { x: 0.25, y: 0.35, z: 1, cluster: "Cluster 4" },
      { x: 0.35, y: 0.45, z: 1, cluster: "Cluster 4" },
      { x: 0.3, y: 0.3, z: 1, cluster: "Cluster 4" },
      { x: 0.2, y: 0.4, z: 1, cluster: "Cluster 4" }
    ]
  },
  dataset3: {
    name: "Soil Moisture Distribution",
    description: "Analysis of soil moisture levels across Tamil Nadu farmlands",
    explanation: "This clustering analysis visualizes soil moisture patterns across Tamil Nadu agricultural regions based on thermal and radar satellite imagery. Cluster 1 (red) shows severely dry areas requiring immediate irrigation, Cluster 2 (orange) indicates moderately dry soil, Cluster 3 (light blue) represents optimal moisture levels, and Cluster 4 (dark blue) shows areas with potential waterlogging issues. This information helps farmers implement precision irrigation strategies and prevent crop loss from drought or excess water.",
    clusterColors: ['#d32f2f', '#ff9800', '#29b6f6', '#0d47a1'],
    data: [
      { x: 0.1, y: 0.1, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.2, z: 1, cluster: "Cluster 1" },
      { x: 0.15, y: 0.15, z: 1, cluster: "Cluster 1" },
      { x: 0.25, y: 0.25, z: 1, cluster: "Cluster 1" },
      { x: 0.1, y: 0.2, z: 1, cluster: "Cluster 1" },
      { x: 0.2, y: 0.1, z: 1, cluster: "Cluster 1" },
      { x: 0.4, y: 0.4, z: 1, cluster: "Cluster 2" },
      { x: 0.5, y: 0.5, z: 1, cluster: "Cluster 2" },
      { x: 0.45, y: 0.45, z: 1, cluster: "Cluster 2" },
      { x: 0.55, y: 0.55, z: 1, cluster: "Cluster 2" },
      { x: 0.4, y: 0.5, z: 1, cluster: "Cluster 2" },
      { x: 0.5, y: 0.4, z: 1, cluster: "Cluster 2" },
      { x: 0.7, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.8, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.75, y: 0.75, z: 1, cluster: "Cluster 3" },
      { x: 0.85, y: 0.85, z: 1, cluster: "Cluster 3" },
      { x: 0.7, y: 0.8, z: 1, cluster: "Cluster 3" },
      { x: 0.8, y: 0.7, z: 1, cluster: "Cluster 3" },
      { x: 0.9, y: 0.3, z: 1, cluster: "Cluster 4" },
      { x: 0.8, y: 0.2, z: 1, cluster: "Cluster 4" },
      { x: 0.85, y: 0.25, z: 1, cluster: "Cluster 4" },
      { x: 0.95, y: 0.35, z: 1, cluster: "Cluster 4" },
      { x: 0.9, y: 0.2, z: 1, cluster: "Cluster 4" },
      { x: 0.8, y: 0.3, z: 1, cluster: "Cluster 4" }
    ]
  }
};

const initialClusterCenters = [
  { x: 0.2, y: 0.2 },
  { x: 0.8, y: 0.2 },
  { x: 0.5, y: 0.8 }
];

const dashboardData = {
  farmers: 3240,
  lands: 12758,
  schemes: 48,
  images: 5429,
  recentApplications: [
    { id: 1, farmer: 'Rajesh Kumar', scheme: 'PM Fasal Bima Yojana', date: '2023-05-10', status: 'Approved' },
    { id: 2, farmer: 'Priya Sharma', scheme: 'PM Kisan Samman Nidhi', date: '2023-05-11', status: 'Pending' },
    { id: 3, farmer: 'Amit Patel', scheme: 'Krishi Sinchayee Yojana', date: '2023-05-12', status: 'Rejected' },
    { id: 4, farmer: 'Sunita Verma', scheme: 'Rashtriya Krishi Vikas Yojana', date: '2023-05-13', status: 'Approved' },
    { id: 5, farmer: 'Vikram Singh', scheme: 'Kisan Credit Card', date: '2023-05-14', status: 'Pending' },
  ]
};

const aerialClusterColors = ['#ff5252', '#4caf50', '#2196f3', '#ff9800', '#9c27b0'];

// Add chart configurations
const farmerChartConfig = {
  registrations: { color: '#2563eb', label: 'Registrations' },
  approvals: { color: '#10b981', label: 'Approvals' }
};

const landChartConfig = {
  area: { color: '#2563eb', label: 'Area (hectares)' },
  parcels: { color: '#10b981', label: 'Number of Parcels' }
};

const schemeChartConfig = {
  approvals: { color: '#10b981', label: 'Approved' },
  rejections: { color: '#ef4444', label: 'Rejected' }
};

const clusterDescriptions = [
  "Healthy vegetation with optimal growth conditions",
  "Areas requiring irrigation or water management",
  "Regions with potential soil quality issues",
  "High-yield zones with excellent conditions",
  "Areas needing immediate attention"
];

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: {
    title: string;
    description: string;
    icon: React.ReactNode;
  } | null;
}

const FeatureModal: React.FC<FeatureModalProps> = ({ isOpen, onClose, feature }) => {
  const [clusterData, setClusterData] = useState(() => 
    generateClusterData(initialClusterCenters, 30)
  );
  const [clusterCount, setClusterCount] = useState(3);
  const [noiseLevel, setNoiseLevel] = useState(30);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedJson, setSelectedJson] = useState<string | null>(null);
  const [currentDataset, setCurrentDataset] = useState<string | null>(null);
  const [datasetDescription, setDatasetDescription] = useState<string>("");
  const [datasetExplanation, setDatasetExplanation] = useState<string>("");
  const [datasetColors, setDatasetColors] = useState<string[]>(aerialClusterColors);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const jsonInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem('aerialImage');
    if (savedImage) {
      setSelectedImage(savedImage);
    }
    
    const savedJson = localStorage.getItem('clusterData');
    if (savedJson) {
      try {
        setSelectedJson(savedJson);
      } catch (error) {
        console.error("Error parsing saved JSON:", error);
      }
    }
  }, []);

  const regenerateClusters = () => {
    const centers = Array.from({ length: clusterCount }, () => ({
      x: Math.random(),
      y: Math.random()
    }));
    
    setClusterData(generateClusterData(centers, 30, noiseLevel / 100));
    toast.success("Clusters regenerated successfully!");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setSelectedImage(result);
        localStorage.setItem('aerialImage', result);
        toast.success(`Image "${file.name}" uploaded and stored locally`);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleJsonUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const result = e.target?.result as string;
          JSON.parse(result);
          setSelectedJson(result);
          localStorage.setItem('clusterData', result);
          toast.success(`JSON data "${file.name}" uploaded and stored locally`);
        } catch (error) {
          toast.error("Invalid JSON file. Please upload a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const loadTestDataset = (datasetKey: string) => {
    const dataset = testDatasets[datasetKey as keyof typeof testDatasets];
    if (dataset) {
      setCurrentDataset(datasetKey);
      setClusterData(dataset.data);
      setClusterCount(dataset.clusterColors.length);
      setDatasetDescription(dataset.description);
      setDatasetExplanation(dataset.explanation);
      setDatasetColors(dataset.clusterColors);
      toast.success(`Loaded ${dataset.name} dataset`);
    }
  };

  const downloadTestDataset = (datasetKey: string) => {
    const dataset = testDatasets[datasetKey as keyof typeof testDatasets];
    if (dataset) {
      const jsonData = {
        name: dataset.name,
        description: dataset.description,
        explanation: dataset.explanation,
        clusterColors: dataset.clusterColors,
        data: dataset.data
      };
      
      const dataStr = JSON.stringify(jsonData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `${datasetKey}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success(`Downloaded ${dataset.name} dataset`);
    }
  };

  const renderFeatureContent = () => {
    if (!feature) return null;

    switch (feature.title) {
      case 'Farmer Management':
        return (
          <div className="space-y-6">
            <Tabs defaultValue="stats">
              <TabsList className="mb-4">
                <TabsTrigger value="stats">Statistics</TabsTrigger>
                <TabsTrigger value="records">Farmer Records</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Farmer Registration Trends</CardTitle>
                    <CardDescription>Monthly farmer registrations and approvals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={farmerData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line 
                            type="monotone" 
                            dataKey="registrations" 
                            stroke="#2563eb" 
                            activeDot={{ r: 8 }} 
                            name="Registrations"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="approvals" 
                            stroke="#10b981" 
                            name="Approvals"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="records">
                <Card>
                  <CardHeader>
                    <CardTitle>Farmer Records</CardTitle>
                    <CardDescription>Detailed farmer information and status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900">Total Farmers</h4>
                          <p className="text-2xl font-bold text-primary">1,234</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900">Active Farmers</h4>
                          <p className="text-2xl font-bold text-green-600">1,100</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">Recent Registrations</h4>
                        <div className="space-y-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                              <div>
                                <p className="font-medium">Farmer {i + 1}</p>
                                <p className="text-sm text-gray-500">Registered {new Date().toLocaleDateString()}</p>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                Approved
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'Land Management':
        return (
          <div className="space-y-6">
            <Tabs defaultValue="stats">
              <TabsList className="mb-4">
                <TabsTrigger value="stats">Land Statistics</TabsTrigger>
                <TabsTrigger value="map">Land Mapping</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Regional Land Distribution</CardTitle>
                    <CardDescription>Land area and parcel counts by region</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={landData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="region" />
                          <YAxis yAxisId="left" orientation="left" stroke="#2563eb" />
                          <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                          <Tooltip />
                          <Legend />
                          <Bar 
                            yAxisId="left" 
                            dataKey="area" 
                            fill="#2563eb" 
                            name="Area (hectares)"
                          />
                          <Bar 
                            yAxisId="right" 
                            dataKey="parcels" 
                            fill="#10b981" 
                            name="Number of Parcels"
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="map">
                <Card>
                  <CardHeader>
                    <CardTitle>Land Mapping</CardTitle>
                    <CardDescription>Interactive land parcel visualization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px] bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Map className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-gray-500">Land mapping visualization coming soon</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'Scheme Management':
        return (
          <div className="space-y-6">
            <Tabs defaultValue="stats">
              <TabsList className="mb-4">
                <TabsTrigger value="stats">Scheme Statistics</TabsTrigger>
                <TabsTrigger value="applications">Applications</TabsTrigger>
              </TabsList>
              <TabsContent value="stats">
                <Card>
                  <CardHeader>
                    <CardTitle>Scheme Application Status</CardTitle>
                    <CardDescription>Application statistics by scheme type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={schemeData} layout="vertical">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis type="category" dataKey="name" width={100} />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="approved" fill="#10b981" name="Approved" />
                          <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="applications">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Latest scheme applications and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {schemeData.map((scheme) => (
                        <div key={scheme.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{scheme.name}</p>
                            <p className="text-sm text-gray-500">
                              {scheme.approved} approved, {scheme.rejected} rejected
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        );

      case 'Aerial Analytics':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Aerial Image Clustering Analysis</CardTitle>
                <CardDescription>
                  {currentDataset ? datasetDescription : "Interactive clustering visualization of aerial field patterns"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-center space-x-4">
                    <Button
                      variant="outline"
                      onClick={() => loadTestDataset('dataset1')}
                      className={currentDataset === 'dataset1' ? 'bg-primary text-white' : ''}
                    >
                      Rice Paddy
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => loadTestDataset('dataset2')}
                      className={currentDataset === 'dataset2' ? 'bg-primary text-white' : ''}
                    >
                      Crop Health
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => loadTestDataset('dataset3')}
                      className={currentDataset === 'dataset3' ? 'bg-primary text-white' : ''}
                    >
                      Soil Moisture
                    </Button>
                  </div>
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <ScatterChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="x" name="X" domain={[0, 1]} />
                        <YAxis type="number" dataKey="y" name="Y" domain={[0, 1]} />
                        <ZAxis type="number" dataKey="z" range={[100, 100]} />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        {Array.from({ length: clusterCount }).map((_, i) => (
                          <Scatter 
                            key={i}
                            name={`Cluster ${i + 1}`} 
                            data={clusterData.filter(d => d.cluster === `Cluster ${i + 1}`)}
                            fill={datasetColors[i % datasetColors.length]} 
                          />
                        ))}
                      </ScatterChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Cluster Analysis</h4>
                    <div className="grid grid-cols-3 gap-4">
                      {Array.from({ length: clusterCount }).map((_, i) => (
                        <div key={i} className="p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: datasetColors[i % datasetColors.length] }}
                            />
                            <h5 className="font-medium">Cluster {i + 1}</h5>
                          </div>
                          <p className="mt-2 text-sm text-gray-500">
                            {clusterDescriptions[i % clusterDescriptions.length]}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'Role-Based Access':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role-Based Access Control</CardTitle>
                <CardDescription>Multi-level authentication system with specific permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {['Admin', 'Officer', 'Farmer'].map((role) => (
                      <div key={role} className="border rounded-lg p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            role === 'Admin' ? 'bg-purple-100 text-purple-500' : 
                            role === 'Officer' ? 'bg-blue-100 text-blue-500' : 
                            'bg-green-100 text-green-500'
                          }`}>
                            {role.charAt(0)}
                          </div>
                          <h3 className="font-semibold">{role}</h3>
                        </div>
                        <ul className="text-sm space-y-2">
                          {role === 'Admin' ? (
                            <>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Full system access</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>User management</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Scheme approval</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Report generation</span>
                              </li>
                            </>
                          ) : role === 'Officer' ? (
                            <>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Farmer registration</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Land verification</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Application review</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs">×</span>
                                <span>System configuration</span>
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Profile management</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Land registration</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-xs">✓</span>
                                <span>Scheme application</span>
                              </li>
                              <li className="flex items-center gap-2">
                                <span className="w-4 h-4 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xs">×</span>
                                <span>Other farmer records</span>
                              </li>
                            </>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 bg-secondary/30 rounded-lg">
                    <h4 className="font-medium mb-2">Authentication Flow</h4>
                    <div className="flex justify-between items-center">
                      <div className="text-center p-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-2">1</div>
                        <div className="text-sm">Login</div>
                      </div>
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                      <div className="text-center p-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-2">2</div>
                        <div className="text-sm">Role Check</div>
                      </div>
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                      <div className="text-center p-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-2">3</div>
                        <div className="text-sm">Permission Assignment</div>
                      </div>
                      <div className="flex-grow border-t border-dashed border-gray-300"></div>
                      <div className="text-center p-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-500 flex items-center justify-center mx-auto mb-2">4</div>
                        <div className="text-sm">Access Control</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 'Dashboards':
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Admin Dashboard</CardTitle>
                <CardDescription>Comprehensive system overview for administrators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-6">
                  <Link to="/dashboard">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg">
                      Go to your Dashboard
                    </Button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">System Overview</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Total Users: 1,234</li>
                      <li>• Active Sessions: 45</li>
                      <li>• System Load: 65%</li>
                      <li>• Last Backup: 2 hours ago</li>
                    </ul>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• New user registration</li>
                      <li>• Scheme application submitted</li>
                      <li>• Land record updated</li>
                      <li>• System maintenance completed</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <div className="p-6 text-center text-gray-500">
            No content available for this feature.
          </div>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
        {feature && (
          <>
            <DialogHeader>
              <div className="flex items-start gap-4">
                <div className="p-2 rounded-full inline-flex items-center justify-center bg-secondary mb-1">
                  {feature.icon}
                </div>
                <div>
                  <DialogTitle className="text-2xl">{feature.title}</DialogTitle>
                  <DialogDescription className="text-base mt-1">
                    {feature.description}
                  </DialogDescription>
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4">
              {renderFeatureContent()}
            </div>
            <DialogFooter>
              <Button onClick={onClose}>Close</Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FeatureModal;
