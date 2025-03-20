/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('inside GET of weather.ts');
    console.log('request', request);
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
    })

    if (!latitude || !longitude || !startDate || !endDate) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const FORECAST_API_KEY = process.env.NEXT_PUBLIC_CEHUB_FORECAST_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_CEHUB_BASE_URL;

    // In file:
    const url = `${BASE_URL}/Forecast/ShortRangeForecastDaily?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}&supplier=Meteoblue&measureLabel=TempAir_DailyAvg_C;Precip_DailySum_mm;HumidityRel_DailyAvg_pct;WindSpeed_DailyAvg_ms&format=json&ApiKey=${FORECAST_API_KEY}`;    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Weather API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Process the data before returning
    const processedData = processWeatherData(data);
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}

// Process the weather data
function processWeatherData(rawData: any) {
  if (!rawData || !rawData.data || !Array.isArray(rawData.data)) {
    return [];
  }
  
  return rawData.data.map((day: any) => {
    return {
      date: day.date,
      temperature: day.TempAir_DailyAvg_C || day.TempAir_DailyAvg || 0,
      precipitation: day.Precip_DailySum_mm || day.Precip_DailySum || 0,
      humidity: day.HumidityRel_DailyAvg_pct || day.HumidityRel_DailyAvg || 0,
      windSpeed: day.WindSpeed_DailyAvg_ms || day.WindSpeed_DailyAvg || 0,
      riskLevel: calculateWeatherRisk(day)
    };
  });
}

// Calculate risk level based on weather conditions
function calculateWeatherRisk(dayData: any) {
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
}