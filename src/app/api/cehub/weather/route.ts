/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('inside GET of weather.ts');
    try {
      const searchParams = request.nextUrl.searchParams;
      const latitude = searchParams.get('latitude');
      const longitude = searchParams.get('longitude');
      const startDate = searchParams.get('startDate');
      const endDate = searchParams.get('endDate');
  
      console.log({
        latitude,
        longitude,
        startDate,
        endDate 
      });
  
      if (!latitude || !longitude || !startDate || !endDate) {
        return NextResponse.json(
          { error: 'Missing required parameters' },
          { status: 400 }
        );
      }
  
      const FORECAST_API_KEY = process.env.NEXT_PUBLIC_CEHUB_FORECAST_API_KEY;
      const BASE_URL = process.env.NEXT_PUBLIC_CEHUB_BASE_URL;
  
      // Construct URL WITHOUT the API key in the query parameters
      const url = `${BASE_URL}/Forecast/ShortRangeForecastDaily?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}&supplier=Meteoblue&top=20&format=json`;
      
      console.log('Fetching from URL:', url);
      
      // Pass the API key as a header instead
      const response = await fetch(url, {
        headers: {
          'ApiKey': FORECAST_API_KEY || '',
          'Accept': '*/*'
        }
      });
      
      console.log('API status:', response.status);
      
      if (!response.ok) {
        throw new Error(`Weather API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Raw API response:', data);
      
      // Process the data to match what your component expects
      const processedData = processWeatherData(data);
      console.log('Processed data:', processedData);
      
      return NextResponse.json(processedData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return NextResponse.json(
        { error: 'Failed to fetch weather data' },
        { status: 500 }
      );
    }
  }
  
  // Process the weather data to match the expected format
  function processWeatherData(rawData: any[]) {
    if (!rawData || !Array.isArray(rawData) || rawData.length === 0) {
      return [];
    }
    
    // The raw data format is different than expected - it's an array of measurements
    // Group by date first
    const groupedByDate = rawData.reduce((acc, item) => {
      const date = item.date.split(' ')[0].replace(/\//g, '-'); // Format to YYYY-MM-DD
      
      if (!acc[date]) {
        acc[date] = {};
      }
      
      // Store each measurement in the date object
      const label = item.measureLabel.split(' ')[0]; // Remove the units part
      acc[date][label] = parseFloat(item.dailyValue);
      
      return acc;
    }, {});
    
    // Now convert to array format expected by the component
    return Object.keys(groupedByDate).map(date => {
      const dayData = groupedByDate[date];
      
      return {
        date: date,
        temperature: dayData.TempAir_DailyAvg || 0,
        precipitation: dayData.Precip_DailySum || 0,
        humidity: dayData.HumidityRel_DailyAvg || 0,
        windSpeed: dayData.WindSpeed_DailyAvg || 0,
        riskLevel: calculateWeatherRisk(dayData)
      };
    });
  }
  
  // Calculate risk level based on weather conditions
  function calculateWeatherRisk(dayData: any) {
    const temp = dayData.TempAir_DailyAvg || 0;
    const precip = dayData.Precip_DailySum || 0;
    const humidity = dayData.HumidityRel_DailyAvg || 0;
    
    if (humidity > 80 && temp > 20) {
      return 'High';
    } else if ((humidity > 70 && temp > 15) || precip > 20) {
      return 'Medium';
    } else {
      return 'Low';
    }
  }