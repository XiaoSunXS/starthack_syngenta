import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Thermometer, Droplets, Wind, CloudRain, AlertTriangle } from "lucide-react";

const FarmRiskDashboard = () => {
  // State management
  const [location, setLocation] = useState({ lat: 47.558399, lng: 7.57327 }); // Default: Basel
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [diseaseRisk, setDiseaseRisk] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('weather');
  
  // Create dates for API calls (today and 5 days ahead)
  const today = new Date();
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 5);
  
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  // Mock function to simulate API calls (in a real app, these would be actual API calls)
  const fetchWeatherData = async () => {
    // This would be a real API call in production
    // Example: fetch(`https://services.cehub.syngenta-ais.com/api/Forecast/ShortRangeForecastDaily?latitude=${location.lat}&longitude=${location.lng}&startDate=${formatDate(today)}&endDate=${formatDate(fiveDaysLater)}&supplier=Meteoblue&format=json&ApiKey=d4f087c7-7efc-41b4-9292-0f22b6199215`)
    
    // Mock data for demonstration
    const mockWeatherData = [
      { date: formatDate(today), temperature: 22, precipitation: 0, humidity: 45, windSpeed: 8, riskLevel: 'Low' },
      { date: formatDate(new Date(today.getTime() + 86400000)), temperature: 24, precipitation: 0, humidity: 50, windSpeed: 10, riskLevel: 'Low' },
      { date: formatDate(new Date(today.getTime() + 86400000 * 2)), temperature: 25, precipitation: 10, humidity: 65, windSpeed: 12, riskLevel: 'Medium' },
      { date: formatDate(new Date(today.getTime() + 86400000 * 3)), temperature: 20, precipitation: 25, humidity: 85, windSpeed: 15, riskLevel: 'High' },
      { date: formatDate(new Date(today.getTime() + 86400000 * 4)), temperature: 19, precipitation: 5, humidity: 70, windSpeed: 8, riskLevel: 'Medium' },
      { date: formatDate(new Date(today.getTime() + 86400000 * 5)), temperature: 21, precipitation: 0, humidity: 55, windSpeed: 6, riskLevel: 'Low' },
    ];
    
    return mockWeatherData;
  };

  const fetchSoilData = async () => {
    // This would be a real API call in production
    // Example: fetch(`https://services.cehub.syngenta-ais.com/api/SoilAnalysis/GetSearchSoil`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'ApiKey': '7b29a207a0de' },
    //   body: JSON.stringify({ latitude: location.lat, longitude: location.lng })
    // })
    
    // Mock data for demonstration
    const mockSoilData = {
      soilType: 'Clay Loam',
      texture: 4,
      organicMatter: 2.4,
      pH: 6.8,
      moisture: [
        { depth: '0-10cm', value: 22 },
        { depth: '10-20cm', value: 25 },
        { depth: '20-30cm', value: 28 },
        { depth: '30-40cm', value: 30 },
      ],
      minerals: {
        nitrogen: 45,
        phosphorus: 25,
        potassium: 180,
        calcium: 1200
      }
    };
    
    return mockSoilData;
  };

  const fetchDiseaseRisk = async () => {
    // This would be a real API call in production
    // Example: fetch(`https://services.cehub.syngenta-ais.com/api/DiseaseRisk/CornRisk?latitude=${location.lat}&longitude=${location.lng}&startDate=${formatDate(today)}&endDate=${formatDate(fiveDaysLater)}&ApiKey=d4f087c7-7efc-41b4-9292-0f22b6199215`)
    
    // Mock data for demonstration
    const mockDiseaseRisk = {
      crop: 'Corn',
      diseases: [
        { name: 'Northern Corn Leaf Blight', riskLevel: 'High', riskFactor: 0.8 },
        { name: 'Gray Leaf Spot', riskLevel: 'Medium', riskFactor: 0.5 },
        { name: 'Common Rust', riskLevel: 'Low', riskFactor: 0.2 },
        { name: 'Southern Rust', riskLevel: 'Very Low', riskFactor: 0.1 }
      ],
      dailyRisk: [
        { date: formatDate(today), risk: 0.3 },
        { date: formatDate(new Date(today.getTime() + 86400000)), risk: 0.4 },
        { date: formatDate(new Date(today.getTime() + 86400000 * 2)), risk: 0.6 },
        { date: formatDate(new Date(today.getTime() + 86400000 * 3)), risk: 0.8 },
        { date: formatDate(new Date(today.getTime() + 86400000 * 4)), risk: 0.7 },
        { date: formatDate(new Date(today.getTime() + 86400000 * 5)), risk: 0.5 },
      ]
    };
    
    return mockDiseaseRisk;
  };

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [weather, soil, disease] = await Promise.all([
          fetchWeatherData(),
          fetchSoilData(),
          fetchDiseaseRisk()
        ]);
        
        setWeatherData(weather);
        setSoilData(soil);
        setDiseaseRisk(disease);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [location]);

  // Helper function to determine risk color
  const getRiskColor = (risk) => {
    if (risk === 'High' || risk > 0.7) return 'text-red-500';
    if (risk === 'Medium' || (risk > 0.4 && risk <= 0.7)) return 'text-yellow-500';
    return 'text-green-500';
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading farm data...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Farm Risk Visualization Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Weather Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Current Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Thermometer className="mr-2 text-red-500" />
                <span>{weatherData[0].temperature}°C</span>
              </div>
              <div className="flex items-center">
                <Droplets className="mr-2 text-blue-500" />
                <span>{weatherData[0].humidity}%</span>
              </div>
              <div className="flex items-center">
                <Wind className="mr-2 text-gray-500" />
                <span>{weatherData[0].windSpeed} m/s</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Soil Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Soil Condition</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p><strong>Type:</strong> {soilData.soilType}</p>
              <p><strong>pH:</strong> {soilData.pH}</p>
              <p><strong>Moisture (0-10cm):</strong> {soilData.moisture[0].value}%</p>
            </div>
          </CardContent>
        </Card>
        
        {/* Disease Risk Summary Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Disease Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className={`mr-2 ${getRiskColor(diseaseRisk.diseases[0].riskLevel)}`} />
              <span className="font-semibold">Primary Risk: {diseaseRisk.diseases[0].name}</span>
            </div>
            <p className={`mt-1 ${getRiskColor(diseaseRisk.diseases[0].riskLevel)}`}>
              Risk Level: {diseaseRisk.diseases[0].riskLevel}
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="weather">Weather Forecast</TabsTrigger>
          <TabsTrigger value="soil">Soil Analysis</TabsTrigger>
          <TabsTrigger value="disease">Disease Risk</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weather">
          <Card>
            <CardHeader>
              <CardTitle>5-Day Weather Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={weatherData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#ff7300" name="Temperature (°C)" />
                    <Line yAxisId="right" type="monotone" dataKey="precipitation" stroke="#0088fe" name="Precipitation (mm)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Weather Risk Assessment</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-2 text-left">Date</th>
                        <th className="px-4 py-2 text-left">Risk Level</th>
                        <th className="px-4 py-2 text-left">Temperature</th>
                        <th className="px-4 py-2 text-left">Precipitation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {weatherData.map((day, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-4 py-2">{day.date}</td>
                          <td className={`px-4 py-2 font-semibold ${getRiskColor(day.riskLevel)}`}>{day.riskLevel}</td>
                          <td className="px-4 py-2">{day.temperature}°C</td>
                          <td className="px-4 py-2">{day.precipitation} mm</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="soil">
          <Card>
            <CardHeader>
              <CardTitle>Soil Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Soil Profile</h3>
                  <p><strong>Soil Type:</strong> {soilData.soilType}</p>
                  <p><strong>USDA Texture Class:</strong> {soilData.texture}</p>
                  <p><strong>Organic Matter:</strong> {soilData.organicMatter}%</p>
                  <p><strong>pH Level:</strong> {soilData.pH}</p>
                  
                  <h3 className="font-semibold mt-4 mb-3">Soil Moisture by Depth</h3>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={soilData.moisture} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="depth" type="category" />
                        <Tooltip />
                        <Bar dataKey="value" fill="#3b82f6" name="Moisture (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Soil Nutrients (ppm)</h3>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { name: 'Nitrogen', value: soilData.minerals.nitrogen },
                        { name: 'Phosphorus', value: soilData.minerals.phosphorus },
                        { name: 'Potassium', value: soilData.minerals.potassium / 10 } // Scaled for visibility
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 p-4 bg-yellow-50 rounded border border-yellow-200">
                    <h3 className="font-semibold text-yellow-800 mb-2">Soil Health Assessment</h3>
                    <p className="text-yellow-700">
                      This soil has adequate nutrients for corn growth but may benefit from additional nitrogen application. 
                      The clay loam texture provides good water retention but may have drainage issues during heavy rain periods.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="disease">
          <Card>
            <CardHeader>
              <CardTitle>Disease Risk Analysis for {diseaseRisk.crop}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Disease Risk Forecast</h3>
                  <div className="h-60">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={diseaseRisk.dailyRisk}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={[0, 1]} />
                        <Tooltip />
                        <Line type="monotone" dataKey="risk" stroke="#ef4444" name="Risk Factor" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-4 p-4 bg-red-50 rounded border border-red-200">
                    <h3 className="font-semibold text-red-800 mb-2">Risk Alert</h3>
                    <p className="text-red-700">
                      High risk period detected for {diseaseRisk.diseases[0].name} in the next 3-4 days.
                      Consider preventative fungicide application if conditions persist.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-3">Disease Risk Assessment</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-2 text-left">Disease</th>
                          <th className="px-4 py-2 text-left">Risk Level</th>
                          <th className="px-4 py-2 text-left">Risk Factor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {diseaseRisk.diseases.map((disease, index) => (
                          <tr key={index} className="border-b">
                            <td className="px-4 py-2">{disease.name}</td>
                            <td className={`px-4 py-2 font-semibold ${getRiskColor(disease.riskLevel)}`}>
                              {disease.riskLevel}
                            </td>
                            <td className="px-4 py-2">{disease.riskFactor.toFixed(2)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <h3 className="font-semibold mt-4 mb-2">Risk Factors</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>High humidity (85%) forecasted in 3 days</li>
                    <li>Temperature range (19-25°C) optimal for disease development</li>
                    <li>Precipitation events may increase leaf wetness duration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FarmRiskDashboard;