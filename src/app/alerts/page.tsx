"use client";

import { useEffect, useState } from "react";
import { AnalysisSection } from "../components/AnalysisSection";
import {
  fetchWeatherData,
  fetchSoilData,
  fetchDiseaseRisk,
} from "../helpers/getMockData";
import { Weather, Soil, Disease } from "../helpers/types";
import { CHHATTISGARH_LOCATION } from "../helpers/constants";



export default function Page() {
  // State management
  const [location, setLocation] = useState(CHHATTISGARH_LOCATION); // Default: Chhattisgarh
  const [date, setDate] = useState(new Date());

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
          fetchWeatherData({date, location}),
          fetchSoilData({date, location}),
          fetchDiseaseRisk({date, location}),
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
    <AnalysisSection
      soilData={soilData}
      weatherData={weatherData}
      diseaseRisk={diseaseRisk}
      setActiveTab={setActiveTab}
      activeTab={activeTab}
    />
  );
}
