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

        // Get all the measures we want from the API
        const measures = [
        'TempAir_DailyAvg',
        'TempAir_DailyMax',
        'TempAir_DailyMin',
        'Precip_DailySum',
        'HumidityRel_DailyAvg',
        'WindSpeed_DailyAvg',
        'WindDirection_DailyAvg',
        'CloudCover_DailyAvg'
        ].join(';');

        // Construct URL WITHOUT the API key in the query parameters
        const url = `${BASE_URL}/Forecast/ShortRangeForecastDaily?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}&supplier=Meteoblue&measureLabel=${measures}&top=20&format=json`;
        
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
        
        // Process the data to match what your component expects
        const processedData = processWeatherData(data);
        console.log('Weather API Processed data first 50 chars:', JSON.stringify(processedData).slice(0, 50));
        
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
    
    // Group by date first
    const groupedByDate = rawData.reduce((acc: any, item: any) => {
        // Format date string to YYYY-MM-DD
        const date = formatDate(item.date);
        
        if (!acc[date]) {
        acc[date] = {};
        }
        
        // Extract measure name without units
        const label = item.measureLabel.split(' ')[0];
        acc[date][label] = parseFloat(item.dailyValue);
        
        return acc;
    }, {});
    
    // Convert to array format expected by the component
    return Object.keys(groupedByDate)
        .sort() // Sort dates chronologically
        .map(date => {
      const dayData = groupedByDate[date];
      
      return {
        date,
        temperature: dayData.TempAir_DailyAvg || 0,
        temperatureMax: dayData.TempAir_DailyMax || 0,
        temperatureMin: dayData.TempAir_DailyMin || 0,
        precipitation: dayData.Precip_DailySum || 0,
        humidity: dayData.HumidityRel_DailyAvg || 0,
        windSpeed: dayData.WindSpeed_DailyAvg || 0,
        windDirection: dayData.WindDirection_DailyAvg || 0,
        cloudCover: dayData.CloudCover_DailyAvg || 0,
        riskLevel: calculateWeatherRisk(dayData)
      };
    });
}

// Format date string to YYYY-MM-DD
function formatDate(dateString: string): string {
  try {
    // Handle both "MM/DD/YYYY HH:MM:SS" and "YYYY-MM-DD" formats
    if (dateString.includes('/')) {
      const parts = dateString.split(' ')[0].split('/');
      // Assume MM/DD/YYYY format
      if (parts.length === 3) {
        return `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
      }
    }
    
    // If already in YYYY-MM-DD format or unknown, return as is
    return dateString.split(' ')[0];
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

// Calculate risk level based on weather conditions
function calculateWeatherRisk(dayData: any) {
  // Get values with defaults
  const temp = dayData.TempAir_DailyAvg || 0;
  const tempMax = dayData.TempAir_DailyMax || 0;
  const precip = dayData.Precip_DailySum || 0;
  const humidity = dayData.HumidityRel_DailyAvg || 0;
  const windSpeed = dayData.WindSpeed_DailyAvg || 0;
  
  // High risk conditions
  if (
    (humidity > 85 && temp > 25) || // Hot and very humid
    (precip > 25) ||                // Heavy rain
    (tempMax > 35) ||               // Extreme heat
    (windSpeed > 30)                // Strong winds
  ) {
    return 'High';
  } 
  // Medium risk conditions
  else if (
    (humidity > 75 && temp > 20) || // Warm and humid
    (precip > 10) ||                // Moderate rain
    (tempMax > 30) ||               // Very hot
    (windSpeed > 20)                // Moderate winds
  ) {
    return 'Medium';
  } 
  // Low risk
  else {
    return 'Low';
  }
}