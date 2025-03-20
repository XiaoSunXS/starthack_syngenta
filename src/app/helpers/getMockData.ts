import { formatDate, today } from "./dates";


// Mock function to simulate API calls (in a real app, these would be actual API calls)
export const fetchWeatherData = async () => {
    // This would be a real API call in production
    // Example: fetch(`https://services.cehub.syngenta-ais.com/api/Forecast/ShortRangeForecastDaily?latitude=${location.lat}&longitude=${location.lng}&startDate=${formatDate(today)}&endDate=${formatDate(fiveDaysLater)}&supplier=Meteoblue&format=json&ApiKey=d4f087c7-7efc-41b4-9292-0f22b6199215`)

    // Mock data for demonstration
    const mockWeatherData = [
        { date: formatDate(today), temperature: 22, precipitation: 0, humidity: 45, windSpeed: 8, riskLevel: 'Low' },
        { date: formatDate(new Date(today.getTime() + 86400000)), temperature: 24, precipitation: 0, humidity: 50, windSpeed: 10, riskLevel: 'Low' },
        { date: formatDate(new Date(today.getTime() + 86400000 * 2)), temperature: 25, precipitation: 10, humidity: 65, windSpeed: 12, riskLevel: 'Medium' },
        { date: formatDate(new Date(today.getTime() + 86400000 * 3)), temperature: 20, precipitation: 25, humidity: 85, windSpeed: 15, riskLevel: 'High' },
        { date: formatDate(new Date(today.getTime() + 86400000 * 4)), temperature: 19, precipitation: 5, humidity: 70, windSpeed: 8, riskLevel: 'Medium' },
        { date: formatDate(new Date(today.getTime() + 86400000 * 5)), temperature: 21, precipitation: 0, humidity: 55, windSpeed: 6, riskLevel: 'Low' },
    ];

    return mockWeatherData;
};

export const fetchSoilData = async () => {
    // This would be a real API call in production
    // Example: fetch(`https://services.cehub.syngenta-ais.com/api/SoilAnalysis/GetSearchSoil`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json', 'ApiKey': '7b29a207a0de' },
    //   body: JSON.stringify({ latitude: location.lat, longitude: location.lng })
    // })

    // Mock data for demonstration
    const mockSoilData = {
        soilType: 'Clay Loam',
        texture: 4,
        organicMatter: 2.4,
        pH: 6.8,
        moisture: [
            { depth: '0-10cm', value: 22 },
            { depth: '10-20cm', value: 25 },
            { depth: '20-30cm', value: 28 },
            { depth: '30-40cm', value: 30 },
        ],
        minerals: {
            nitrogen: 45,
            phosphorus: 25,
            potassium: 180,
            calcium: 1200
        }
    };

    return mockSoilData;
};


export const fetchDiseaseRisk = async () => {
    // This would be a real API call in production
    // Example: fetch(`https://services.cehub.syngenta-ais.com/api/DiseaseRisk/CornRisk?latitude=${location.lat}&longitude=${location.lng}&startDate=${formatDate(today)}&endDate=${formatDate(fiveDaysLater)}&ApiKey=d4f087c7-7efc-41b4-9292-0f22b6199215`)

    // Mock data for demonstration
    const mockDiseaseRisk = {
        crop: 'Corn',
        diseases: [
            { name: 'Northern Corn Leaf Blight', riskLevel: 'High', riskFactor: 0.8 },
            { name: 'Gray Leaf Spot', riskLevel: 'Medium', riskFactor: 0.5 },
            { name: 'Common Rust', riskLevel: 'Low', riskFactor: 0.2 },
            { name: 'Southern Rust', riskLevel: 'Very Low', riskFactor: 0.1 }
        ],
        dailyRisk: [
            { date: formatDate(today), risk: 0.3 },
            { date: formatDate(new Date(today.getTime() + 86400000)), risk: 0.4 },
            { date: formatDate(new Date(today.getTime() + 86400000 * 2)), risk: 0.6 },
            { date: formatDate(new Date(today.getTime() + 86400000 * 3)), risk: 0.8 },
            { date: formatDate(new Date(today.getTime() + 86400000 * 4)), risk: 0.7 },
            { date: formatDate(new Date(today.getTime() + 86400000 * 5)), risk: 0.5 },
        ]
    };

    return mockDiseaseRisk;
};


