import React from 'react';
import {  Cloud, CloudDrizzle, CloudRain, Sun } from 'lucide-react';
import { Weather } from '../helpers/types';

/**
 * Returns weather icon component based on weather data
 */
export const getWeatherIcon = (weatherData: Weather) => {
  const { precipitation, cloudCover } = weatherData;
  
  // Heavy rain 
  if (precipitation > 10) {
    return (
      <div className="relative">
        <Cloud size={50} className="text-gray-300" />
        <CloudRain size={40} className="text-blue-300 absolute top-5 left-5" />
      </div>
    );
  }
  
  // Light to medium rain
  if (precipitation > 0) {
    return (
      <div className="relative">
        <Sun size={40} className="text-yellow-300 absolute top-0 right-0" />
        <Cloud size={50} className="text-gray-300" />
        <CloudDrizzle size={30} className="text-blue-300 absolute top-6 left-5" />
      </div>
    );
  }
  
  // Cloudy
  if (cloudCover > 60) {
    return <Cloud size={64} className="text-gray-300" />;
  }
  
  // Partly cloudy
  if (cloudCover > 30) {
    return (
      <div className="relative">
        <Sun size={50} className="text-yellow-300" />
        <Cloud size={40} className="text-gray-300 absolute bottom-0 right-0" />
      </div>
    );
  }
  
  // Clear and sunny
  return <Sun size={64} className="text-yellow-300" />;
};

/**
 * Calculate risk level based on weather and soil data
 */
export const calculateRiskLevel = (weatherData: Weather[]) => {
  if (!weatherData || weatherData.length === 0) {
    return {
      riskPercentage: 0,
      riskMessage: "No data available",
      actionMessage: "Update data source"
    };
  }
  
  // Get the first day's risk level
  const baseRiskLevel = weatherData[0].riskLevel || "Low";
  
  // Check for heavy rainfall in next 3 days
  const heavyRainForecast = weatherData.slice(0, 3).some(day => day.precipitation > 7);
  
  // Check for extreme temperatures
  const highTempForecast = weatherData.slice(0, 3).some(day => day.temperatureMax > 35);
  const lowTempForecast = weatherData.slice(0, 3).some(day => day.temperatureMin < 10);
  
  // Calculate initial risk percentage based on API risk level
  let riskPercentage = 0;
  switch (baseRiskLevel) {
    case "High": riskPercentage = 65; break;
    case "Medium": riskPercentage = 35; break;
    case "Low": riskPercentage = 15; break;
    default: riskPercentage = 25;
  }
  
  // Adjust risk based on conditions
  if (heavyRainForecast) riskPercentage += 15;
  if (highTempForecast) riskPercentage += 10;
  if (lowTempForecast) riskPercentage += 10;
  
  // Cap at 100%
  riskPercentage = Math.min(riskPercentage, 100);
  riskPercentage = Math.round(riskPercentage);
  
  // Generate risk message and action
  let riskMessage = "";
  let actionMessage = "";
  
  if (heavyRainForecast) {
    riskMessage = "Heavy rain in 3 days!";
    actionMessage = "Ensure drainage.";
  } else if (highTempForecast) {
    riskMessage = "High temperatures ahead!";
    actionMessage = "Plan irrigation schedule.";
  } else if (lowTempForecast) {
    riskMessage = "Low temperatures ahead!";
    actionMessage = "Consider frost protection.";
  } else if (baseRiskLevel === "High") {
    riskMessage = "High risk conditions!";
    actionMessage = "Monitor crops closely.";
  } else if (baseRiskLevel === "Medium") {
    riskMessage = "Moderate risk detected";
    actionMessage = "Regular monitoring advised.";
  } else {
    riskMessage = "Low risk conditions";
    actionMessage = "Maintain regular care.";
  }
  
  return {
    riskPercentage,
    riskMessage,
    actionMessage
  };
};