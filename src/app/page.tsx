"use client";

import { useEffect, useState } from "react";
import { AnalysisSection } from "./components/AnalysisSection";
import { SummarySection } from "./components/SummrySection";
import { fetchWeatherData } from './helpers/getData';
import { Soil, Weather } from './helpers/types';
import { CHHATTISGARH_LOCATION } from "./helpers/constants";
import { fetchSoilData } from "./helpers/getMockData";

const FarmRiskDashboard = () => {
  // State management
  const [location, setLocation] = useState(CHHATTISGARH_LOCATION); // Default: Chhattisgarh

  const [weatherData, setWeatherData] = useState<Weather[]>([]);
  const [soilData, setSoilData] = useState<Soil>();

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("weather");

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [weather, soil] = await Promise.all([
          fetchWeatherData(),
          fetchSoilData(),
        ]);

        console.log('weather', weather);
        console.log('soil', soil);
        setWeatherData(weather);
        setSoilData(soil);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
    console.log('post loadData, location:', location);
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        Loading farm data...
      </div>
    );
  }

  return (
      <SummarySection
        soilData={soilData}
        weatherData={weatherData}
      />
  );
};

export default FarmRiskDashboard;
