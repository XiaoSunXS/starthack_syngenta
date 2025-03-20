"use client";

import { useEffect, useState } from "react";
import { AnalysisSection } from "./components/AnalysisSection";
import { SummarySection } from "./components/SummrySection";
import { fetchDiseaseRisk, fetchSoilData } from './helpers/getMockData';
import { fetchWeatherData } from './helpers/getData';
import { Disease, Soil, Weather } from './helpers/types';

const FarmRiskDashboard = () => {
  // State management
  const [location, setLocation] = useState({ lat: 47.558399, lng: 7.57327 }); // Default: Basel

  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [soilData, setSoilData] = useState<Soil>();
  const [diseaseRisk, setDiseaseRisk] = useState<Disease>();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("weather");

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [weather, soil, disease] = await Promise.all([
          fetchWeatherData(),
          fetchSoilData(),
          fetchDiseaseRisk(),
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading farm data...
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Farm Risk Visualization Dashboard
      </h1>
      <SummarySection
        soilData={soilData}
        weatherData={weatherData}
        diseaseRisk={diseaseRisk}
      />
    </div>
  );
};

export default FarmRiskDashboard;
