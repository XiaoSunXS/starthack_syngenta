import { formatDate } from "./dates";

const today = new Date();

export const fetchWeatherData = async ({ date = today, location = { lat: 47.558399, lng: 7.57327 } }: { date?: Date; location?: { lat: number; lng: number; }; } = {}) => {
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
      console.log('API response data:', data);
      return data;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      // Fallback to mock data if the API call fails
      return [
        { date: formatDate(date), temperature: 22, precipitation: 0, humidity: 45, windSpeed: 8, riskLevel: 'Low' },
        // ... other mock data entries
      ];
    }
  };
