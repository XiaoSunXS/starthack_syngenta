export type Weather = {
    date: string;
    temperature: number;
    precipitation: number;
    humidity: number;
    windSpeed: number;
    riskLevel: string;
}

export type Soil = {
    soilType: string;
    texture: number;
    organicMatter: number;
    pH: number;
    moisture: {
        depth: string;
        value: number;
    }[];
    minerals: {
        nitrogen: number;
        phosphorus: number;
        potassium: number;
        calcium: number;
    };
}

export type Disease = {
    crop: string;
    diseases: {
        name: string;
        riskLevel: string;
        riskFactor: number;
    }[];
    dailyRisk: {
        date: string;
        risk: number;
    }[];
}