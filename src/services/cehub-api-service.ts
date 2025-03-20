/* eslint-disable @typescript-eslint/no-explicit-any */
const FORECAST_API_KEY = process.env.NEXT_PUBLIC_CEHUB_FORECAST_API_KEY;
const HISTORICAL_API_KEY = process.env.NEXT_PUBLIC_CEHUB_HISTORICAL_API_KEY;
const BASE_URL = process.env.NEXT_PUBLIC_CEHUB_BASE_URL;

/**
 * Formats a Date object into YYYY-MM-DD format
 * @param {Date} date - The date to format
 * @returns {string} Formatted date string
 */
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * Fetches daily weather forecast for a location
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {Date} startDate - Start date for forecast
 * @param {Date} endDate - End date for forecast
 * @returns {Promise<Array>} Weather forecast data
 */
export const getWeatherForecast = async (latitude: number, longitude: number, startDate: Date, endDate: Date): Promise<Array<any>> => {
  try {
    const url = `${BASE_URL}/Forecast/ShortRangeForecastDaily?latitude=${latitude}&longitude=${longitude}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&supplier=Meteoblue&format=json&ApiKey=${FORECAST_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return processWeatherData(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

/**
 * Processes raw weather data into a more usable format
 * @param {Object} rawData - Raw API response
 * @returns {Array} Processed weather data
 */
const processWeatherData = (rawData: any) => {
  // This processing would depend on the actual structure of the API response
  // For now, we'll make an assumption of the structure based on the documentation
  if (!rawData || !rawData.data || !Array.isArray(rawData.data)) {
    return [];
  }
  
  return rawData.data.map((day: any) => {
    // Extract the relevant data points
    // Actual implementation would depend on real response structure
    return {
      date: day.date,
      temperature: day.TempAir_DailyAvg_C || day.TempAir_DailyAvg || 0,
      precipitation: day.Precip_DailySum_mm || day.Precip_DailySum || 0,
      humidity: day.HumidityRel_DailyAvg_pct || day.HumidityRel_DailyAvg || 0,
      windSpeed: day.WindSpeed_DailyAvg_ms || day.WindSpeed_DailyAvg || 0,
      // Calculate risk level based on weather conditions
      riskLevel: calculateWeatherRisk(day)
    };
  });
};

/**
 * Calculates weather risk level based on conditions
 * @param {Object} dayData - Weather data for a single day
 * @returns {string} Risk level (Low, Medium, High)
 */
const calculateWeatherRisk = (dayData: any) => {
  // This is a simple example - in a real application, you would use more 
  // sophisticated algorithms based on crop type and other factors
  const temp = dayData.TempAir_DailyAvg_C || dayData.TempAir_DailyAvg || 0;
  const precip = dayData.Precip_DailySum_mm || dayData.Precip_DailySum || 0;
  const humidity = dayData.HumidityRel_DailyAvg_pct || dayData.HumidityRel_DailyAvg || 0;
  
  if (humidity > 80 && temp > 20) {
    return 'High';
  } else if ((humidity > 70 && temp > 15) || precip > 20) {
    return 'Medium';
  } else {
    return 'Low';
  }
};

/**
 * Fetches soil data for a location
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<Object>} Soil data
 */
export const getSoilData = async (latitude: number, longitude: number) => {
  try {
    // For soil data, we need to use the historical API with a POST request
    const url = `${BASE_URL}/SoilAnalysis/GetSearchSoil`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        'ApiKey': HISTORICAL_API_KEY || ''
      }),
      body: JSON.stringify({
        latitude,
        longitude,
        // Add any other required parameters based on the API documentation
      })
    });
    
    if (!response.ok) {
      throw new Error(`Soil API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return processSoilData(data);
  } catch (error) {
    console.error('Error fetching soil data:', error);
    throw error;
  }
};

/**
 * Processes raw soil data into a more usable format
 * @param {Object} rawData - Raw API response
 * @returns {Object} Processed soil data
 */
const processSoilData = (rawData: any) => {
  // This processing would depend on the actual structure of the API response
  // For now, we'll make a placeholder that returns a structure matching our UI needs
  
  // In a real implementation, you'd extract the soil information from the API response
  return {
    soilType: determineSoilType(rawData),
    texture: extractTextureClass(rawData),
    organicMatter: extractOrganicMatter(rawData),
    pH: extractPH(rawData),
    moisture: extractMoistureByDepth(rawData),
    minerals: extractMinerals(rawData)
  };
};

// Helper functions for soil data processing
// These would be implemented based on the actual API response structure
const determineSoilType = (data: any) => {
  // Extract soil type from the data
  // This is a placeholder implementation
  return data.soilType || 'Clay Loam';
};

const extractTextureClass = (data: any) => {
  // Extract USDA texture class from the data
  // This is a placeholder implementation
  return data.textureClass || 4;
};

const extractOrganicMatter = (data: any) => {
  // Extract organic matter percentage from the data
  // This is a placeholder implementation
  return data.organicMatter || 2.4;
};

const extractPH = (data: any) => {
  // Extract pH level from the data
  // This is a placeholder implementation
  return data.pH || 6.8;
};

const extractMoistureByDepth = (data: any) => {
  // Extract moisture levels by depth from the data
  // This is a placeholder implementation
  return [
    { depth: '0-10cm', value: data.moisture_0_10cm || 22 },
    { depth: '10-20cm', value: data.moisture_10_20cm || 25 },
    { depth: '20-30cm', value: data.moisture_20_30cm || 28 },
    { depth: '30-40cm', value: data.moisture_30_40cm || 30 },
  ];
};

const extractMinerals = (data: any) => {
  // Extract mineral concentrations from the data
  // This is a placeholder implementation
  return {
    nitrogen: data.nitrogen || 45,
    phosphorus: data.phosphorus || 25,
    potassium: data.potassium || 180,
    calcium: data.calcium || 1200
  };
};

/**
 * Fetches disease risk data for a location
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {string} cropType - Type of crop (e.g., 'Corn', 'Potato')
 * @param {Date} startDate - Start date for risk assessment
 * @param {Date} endDate - End date for risk assessment
 * @returns {Promise<Object>} Disease risk data
 */
export const getDiseaseRisk = async (latitude: number, longitude: number, cropType: string, startDate: Date, endDate: Date) => {
  try {
    // The endpoint varies based on crop type
    const endpoint = getCropEndpoint(cropType);
    const url = `${BASE_URL}/DiseaseRisk/${endpoint}?latitude=${latitude}&longitude=${longitude}&startDate=${formatDate(startDate)}&endDate=${formatDate(endDate)}&ApiKey=${FORECAST_API_KEY}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Disease Risk API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    return processDiseaseRiskData(data, cropType);
  } catch (error) {
    console.error('Error fetching disease risk data:', error);
    throw error;
  }
};

/**
 * Gets the appropriate API endpoint based on crop type
 * @param {string} cropType - Type of crop
 * @returns {string} API endpoint name
 */
const getCropEndpoint = (cropType: string) => {
  switch (cropType.toLowerCase()) {
    case 'corn':
    case 'maize':
      return 'CornRisk';
    case 'potato':
      return 'PotatoRisk';
    case 'wheat':
    case 'barley':
    case 'oats':
      return 'CerealRisk';
    case 'apple':
      return 'AppleRisk';
    case 'grape':
    case 'grapes':
      return 'GrapesRisk';
    case 'pepper':
      return 'PepperRisk';
    default:
      // Default to CornRisk if crop type is not recognized
      return 'CornRisk';
  }
};

/**
 * Processes raw disease risk data into a more usable format
 * @param {Object} rawData - Raw API response
 * @param {string} cropType - Type of crop
 * @returns {Object} Processed disease risk data
 */
const processDiseaseRiskData = (rawData: any, cropType: string) => {
  // This processing would depend on the actual structure of the API response
  // For now, we'll make a placeholder that returns a structure matching our UI needs
  
  console.log(rawData);
  console.log(cropType);
  
  return {
    diseaseRisk: rawData.diseaseRisk || 0,
    diseaseRiskLevel: rawData.diseaseRiskLevel || 'Low',
    diseaseRiskDescription: rawData.diseaseRiskDescription || 'No significant disease risk'
  };
};
