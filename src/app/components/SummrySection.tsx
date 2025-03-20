import React from "react";
import { AlertTriangle } from "lucide-react";
import { Soil, Weather } from '../helpers/types';
import { calculateRiskLevel, getWeatherIcon } from "./WeatherUtils";

export const SummarySection = ({ weatherData, soilData }: { weatherData: Weather[], soilData?: Soil }) => {
  if (!weatherData || weatherData.length === 0) {
    return <div>No weather data available</div>;
  }

  const currentWeather = weatherData[0];
  const riskData = calculateRiskLevel(weatherData);
console.log({riskData})
  return (
    <div className="px-4 py-6 space-y-6">
      {/* Location Search */}
      <div className="bg-gray-100 rounded-full p-3 flex items-center mb-2">
        <span className="mr-2 text-gray-500">📍</span>
        <input 
          type="text" 
          placeholder="Punjab, India" 
          className="bg-transparent w-full outline-none"
          value="Punjab, India"
          readOnly
        />
      </div>
      
      {/* Temperature Card */}
      <div>
        <h2 className="text-xl font-medium mb-3">Temperature</h2>
        <div className="bg-indigo-900 rounded-xl p-4 text-white flex justify-between items-center">
          <div>
            <div className="text-6xl font-semibold">{Math.round(currentWeather.temperature)}°</div>
            <div className="text-sm mt-1">
              H:{Math.round(currentWeather.temperatureMax)}° L:{Math.round(currentWeather.temperatureMin)}°
            </div>
            <div className="mt-2">Punjab, India</div>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center">
                {getWeatherIcon(currentWeather)}
              </div>
              <div className="mt-2">
                {getWeatherCondition(currentWeather)}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Soil Health Card */}
      {soilData && (
        <div>
          <h2 className="text-xl font-medium mb-3">Soil Health</h2>
          <div className="bg-amber-600 rounded-xl p-4 text-white flex justify-between items-center">
            <div>
              <div className="text-6xl font-semibold">80%</div>
              <div className="mt-2">Excellent</div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-16 h-16 flex items-center justify-center">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#4CAF50" fillOpacity="0.3" stroke="white" strokeWidth="1.5"/>
                  <path d="M12 16C12 16 16 12.4183 16 9C16 5.58172 12 7 12 7C12 7 8 5.58172 8 9C8 12.4183 12 16 12 16Z" fill="#4CAF50" stroke="white" strokeWidth="1.5"/>
                  <path d="M15 17C15 14.2386 13.7614 13 11 13C8.23858 13 7 14.2386 7 17" stroke="white" strokeWidth="1.5"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Risk Card */}
      <div>
        <h2 className="text-xl font-medium mb-3">Risk</h2>
        <div className="bg-red-500 rounded-xl p-4 text-white flex justify-between items-center">
          <div>
            <div className="text-6xl font-semibold">{riskData.riskPercentage}%</div>
            <div className="mt-2">{riskData.riskMessage}</div>
            <div className="mt-1">{riskData.actionMessage}</div>
          </div>
          <div className="text-center">
            <div className="flex flex-col items-center">
              <AlertTriangle size={64} className="text-yellow-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to determine weather condition based on API data
function getWeatherCondition(weather) {
  const { precipitation, cloudCover, temperature } = weather;
  
  if (precipitation > 10) return "Heavy Rain";
  if (precipitation > 3) return "Mid Rain";
  if (precipitation > 0) return "Light Rain";
  
  if (cloudCover > 70) return "Cloudy";
  if (cloudCover > 30) return "Partly Cloudy";
  
  if (temperature > 30) return "Hot & Clear";
  if (temperature < 15) return "Cold & Clear";
  
  return "Clear";
}