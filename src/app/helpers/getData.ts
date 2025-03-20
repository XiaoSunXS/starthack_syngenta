import { formatDate } from "./dates";
import { Location } from "./types";

const today = new Date();
const CHHATTISGARH_LOCATION = { lat: 23.181239, lng: 82.546286 };

/**
 * Fetches weather data from the CEHUB API
 * @param date - The date to fetch weather data for. Will return data for the next 5 days if no date is provided
 * @param location - The location to fetch weather data for
 * @returns The weather data
 */
export const fetchWeatherData = async ({ date = today, location = CHHATTISGARH_LOCATION }: { date?: Date; location?: Location } = {}) => {
    const fiveDaysLater = new Date(date.getTime() + 86400000 * 5); // 5 days later easy implementation lol
    console.log('Fetching weather data');
    try {
      console.log('inside fetchWeatherData try');
      const response = await fetch(`/api/cehub/weather?latitude=${location.lat}&longitude=${location.lng}&startDate=${formatDate(today)}&endDate=${formatDate(fiveDaysLater)}`);
      console.log('response', response);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      console.log('Weather API response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);

      // Fallback to mock data if the API call fails
      return [
        { date: formatDate(date), temperature: 22, precipitation: 0, humidity: 45, windSpeed: 8, riskLevel: 'Low' },
      ];
    }
  };

  /**
   * DO NOT USE THIS FUNCTION it doesn't work
   */
export const fetchDiseaseData = async ({ date = today, location = CHHATTISGARH_LOCATION, modelId = 'WheatKarnalPartialBuntTilletiaindicavar' }: { date?: Date; location?: Location, modelId?: string } = {}) => {
  const fiveDaysLater = new Date(date.getTime() + 86400000 * 5); // 5 days later easy implementation lol

    console.log('Fetching disease data');
    console.log({date, location});
    try {
      console.log('inside fetchDiseaseData try');
      const response = await fetch(`/api/cehub/disease?latitude=${location.lat}&longitude=${location.lng}&startDate=${date}&endDate=${fiveDaysLater}&modelId=${modelId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch disease data');
      }
      const data = await response.json();
      console.log('Disease API response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching disease data:', error);
      return [];
    }
  };

  export const fetchSoilData = async ({ date = today, location = CHHATTISGARH_LOCATION }: { date?: Date; location?: Location } = {}) => {
    const fiveDaysLater = new Date(date.getTime() + 86400000 * 5); // 5 days later easy implementation lol
    console.log('Fetching soil data');
    console.log({date, location});

    try {
      console.log('inside fetchSoilData try');
      const response = await fetch(`/api/cehub/soil?latitude=${location.lat}&longitude=${location.lng}&startDate=${date}&endDate=${fiveDaysLater}`);
      if (!response.ok) {
        throw new Error('Failed to fetch soil data');
      }
      const data = await response.json();
      console.log('Soil API response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching soil data:', error);
      return [];
    }
  };
  
  
  
  
  
