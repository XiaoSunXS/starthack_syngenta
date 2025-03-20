"use client";

import { useEffect, useState } from "react";
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
  const [farmerLocation, setFarmerLocation] = useState<string>("Punjab, India");
  const [loading, setLoading] = useState(true);

  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Fetch weather and soil data
        const [weather, soil] = await Promise.all([
          fetchWeatherData(),
          fetchSoilData(),
        ]);

        setWeatherData(weather);
        setSoilData(soil);
        
        // Fetch farmer data
        try {
          const response = await fetch("/api/users");
          if (response.ok) {
            const data = await response.json();
            if (data && data.farmers && data.farmers.length > 0) {
              // Set the farmer location
              setFarmerLocation(data.farmers[0].location);
            }
          }
        } catch (error) {
          console.error("Error fetching farmer data:", error);
          // Keep default location if farmer data fetch fails
        }
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
    <SummarySection
      soilData={soilData}
      weatherData={weatherData}
      farmerLocation={farmerLocation}
    />
  );
};

export default FarmRiskDashboard;