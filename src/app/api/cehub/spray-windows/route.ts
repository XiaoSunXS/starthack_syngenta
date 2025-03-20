import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('inside GET of spray-windows.ts');
    console.log('Using API key:', process.env.NEXT_PUBLIC_CEHUB_FORECAST_API_KEY);
    try {
        const searchParams = request.nextUrl.searchParams;
        const latitude = searchParams.get('latitude');
        const longitude = searchParams.get('longitude');
        const startDate = searchParams.get('startDate');
        const endDate = searchParams.get('endDate');
        const crop = searchParams.get('crop') || 'generic';

        console.log({
            latitude,
            longitude,
            startDate,
            endDate,
            crop
        });

        if (!latitude || !longitude || !startDate || !endDate) {
            return NextResponse.json(
                { error: 'Missing required parameters' },
                { status: 400 }
            );
        }

        const FORECAST_API_KEY = process.env.NEXT_PUBLIC_CEHUB_FORECAST_API_KEY;
        const BASE_URL = process.env.NEXT_PUBLIC_CEHUB_BASE_URL;
        const top = 24;

        const url = `${BASE_URL}/AgronomicsDecisionRecommendation/SprayWindowRecommendation?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}&sprayingType=gc_sw_groundspraygeneric&top=${top}&format=json`;

        console.log('At spray-windows route, Fetching from URL:', url);

        const response = await fetch(url, {
            headers: {
                'ApiKey': FORECAST_API_KEY || '',
                'Accept': '*/*'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch spray windows data: ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error in spray-windows route:', error);
        return NextResponse.json(
            { error: 'Failed to fetch spray windows data' },
            { status: 500 }
        );
    }
}