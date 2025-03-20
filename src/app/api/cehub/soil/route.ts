/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('Inside GET of soil.ts');
  try {
    const searchParams = request.nextUrl.searchParams;
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');
    console.log('SOIL GET PARAMS');
    console.log({searchParams})
    console.log({
      latitude,
      longitude
    });

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    const SOIL_API_KEY = process.env.NEXT_PUBLIC_CEHUB_FORECAST_API_KEY;
    const BASE_URL = process.env.NEXT_PUBLIC_CEHUB_BASE_URL;
    
    // Since the soil endpoint is a POST endpoint, we need to prepare the request body
    const requestBody = {
      searchType: "coordinates",
      coordinates: `${longitude} ${latitude}`, // Note: API expects longitude first, then latitude
      radius: 10000, // 10km radius
      count: 1 // Just get the closest soil profile
    };

    // Construct URL for soil data
    const url = `${BASE_URL}/SoilAnalysis/GetSearchSoil`;
    
    console.log('Fetching from URL:', url);
    console.log('Request body:', requestBody);
    
    // Make the POST request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'ApiKey': SOIL_API_KEY || '',
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify(requestBody)
    });
    
    console.log('API status:', response.status);
    
    if (!response.ok) {
      throw new Error(`Soil API responded with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Raw API response:', data);
    
    // Process the data to match what your component expects
    const processedData = processSoilData(data);
    console.log('Soil API Processed data:', processedData);
    
    return NextResponse.json(processedData);
  } catch (error) {
    console.error('Error fetching soil data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch soil data' },
      { status: 500 }
    );
  }
}

// Process the soil data to match the expected format
function processSoilData(rawData: any) {
  if (!rawData || !rawData.profiles || !rawData.profiles.length) {
    // Return default data if no soil profile found
    return {
      type: 'Unknown',
      texture: 'Unknown',
      ph: 0,
      organicMatter: 0,
      moisture: 0,
      nitrogen: 0,
      phosphorus: 0,
      potassium: 0,
      quality: 'Unknown'
    };
  }

  // Get the first soil profile
  const profile = rawData.profiles[0];
  
  // Extract layers (if any)
  const layers = rawData.layers || [];
  const topLayer = layers.find((layer: any) => 
    layer.profileId === profile.id && layer.depth && layer.depth.includes('0-')
  );
  
  // Extract analyses (if any)
  const analyses = rawData.analyses || [];
  const profileAnalyses = analyses.filter((analysis: any) => 
    analysis.profileId === profile.id
  );

  // Extract soil properties
  const texture = profile.texture || 'Unknown';
  const ph = extractValueFromAnalyses(profileAnalyses, 'pH') || profile.ph || 0;
  const organicMatter = extractValueFromAnalyses(profileAnalyses, 'Organic Matter') || 
                        (topLayer ? topLayer.organicMatter : 0) || 0;
  const moisture = extractValueFromAnalyses(profileAnalyses, 'Moisture') || 
                  (profile.moisture || 0);
  const nitrogen = extractValueFromAnalyses(profileAnalyses, 'Nitrogen') || 
                  (profile.nitrogen || 0);
  const phosphorus = extractValueFromAnalyses(profileAnalyses, 'Phosphorus') || 
                    (profile.phosphorus || 0);
  const potassium = extractValueFromAnalyses(profileAnalyses, 'Potassium') || 
                   (profile.potassium || 0);
  
  // Determine soil type based on texture
  const type = getSoilTypeFromTexture(texture);
  
  // Calculate soil quality based on available data
  const quality = calculateSoilQuality({
    ph,
    organicMatter,
    texture,
    nitrogen,
    phosphorus,
    potassium
  });
  
  return {
    type,
    texture,
    ph,
    organicMatter,
    moisture,
    nitrogen,
    phosphorus,
    potassium,
    quality
  };
}

// Extract a specific value from soil analyses
function extractValueFromAnalyses(analyses: any[], propertyName: string): number | null {
  const analysis = analyses.find((a: any) => 
    a.property && a.property.toLowerCase() === propertyName.toLowerCase()
  );
  
  return analysis ? parseFloat(analysis.value) : null;
}

// Determine soil type based on texture
function getSoilTypeFromTexture(texture: string): string {
  const textureMap: Record<string, string> = {
    'Clay': 'Clay',
    'Clay Loam': 'Clay Loam',
    'Silty Clay': 'Silty Clay',
    'Silty Clay Loam': 'Silty Clay Loam',
    'Sandy Clay': 'Sandy Clay',
    'Sandy Clay Loam': 'Sandy Clay Loam',
    'Loam': 'Loam',
    'Silty Loam': 'Silty Loam',
    'Sandy Loam': 'Sandy Loam',
    'Silt': 'Silt',
    'Loamy Sand': 'Loamy Sand',
    'Sand': 'Sand'
  };
  
  // Search for the texture in the map (case insensitive)
  for (const [key, value] of Object.entries(textureMap)) {
    if (texture.toLowerCase().includes(key.toLowerCase())) {
      return value;
    }
  }
  
  // Default to Unknown if no match found
  return 'Unknown';
}

// Calculate soil quality based on parameters
function calculateSoilQuality(params: any): string {
  let score = 0;
  let maxScore = 0;
  
  // pH score (optimal range 6.0-7.0)
  if (params.ph) {
    maxScore += 10;
    if (params.ph >= 6.0 && params.ph <= 7.0) {
      score += 10;
    } else if (params.ph >= 5.5 && params.ph <= 7.5) {
      score += 7;
    } else if (params.ph >= 5.0 && params.ph <= 8.0) {
      score += 4;
    } else {
      score += 1;
    }
  }
  
  // Organic matter score (higher is better, up to a point)
  if (params.organicMatter) {
    maxScore += 10;
    if (params.organicMatter >= 5) {
      score += 10;
    } else if (params.organicMatter >= 3) {
      score += 8;
    } else if (params.organicMatter >= 1) {
      score += 5;
    } else {
      score += 2;
    }
  }
  
  // Texture score (loamy soils are generally best for most crops)
  if (params.texture && params.texture !== 'Unknown') {
    maxScore += 10;
    if (params.texture.includes('Loam')) {
      score += 10;
    } else if (params.texture.includes('Silt')) {
      score += 8;
    } else if (params.texture.includes('Clay')) {
      score += 6;
    } else if (params.texture.includes('Sand')) {
      score += 4;
    } else {
      score += 2;
    }
  }
  
  // NPK scores
  if (params.nitrogen) {
    maxScore += 5;
    score += Math.min(5, Math.max(1, Math.round(params.nitrogen)));
  }
  
  if (params.phosphorus) {
    maxScore += 5;
    score += Math.min(5, Math.max(1, Math.round(params.phosphorus)));
  }
  
  if (params.potassium) {
    maxScore += 5;
    score += Math.min(5, Math.max(1, Math.round(params.potassium)));
  }
  
  // If no data, return unknown
  if (maxScore === 0) return 'Unknown';
  
  // Calculate percentage
  const percentage = (score / maxScore) * 100;
  
  // Determine quality category
  if (percentage >= 80) {
    return 'Excellent';
  } else if (percentage >= 60) {
    return 'Good';
  } else if (percentage >= 40) {
    return 'Fair';
  } else if (percentage >= 20) {
    return 'Poor';
  } else {
    return 'Very Poor';
  }
}