export type Location = {
    lat: number;
    lng: number;
}

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

export type Crop = {
    name: string;
    area_hectare: number;
};

export type HistoryData = {
    date: string;
    amount: number;
    crop: string,
    biologicals: string
}

export type Farmer = {
    first_name: string;
    last_name: string;
    location: string;
    latitude: number;
    longitude: number;
    country: string;
    language: string;
    farming_method: string;
    crops: Crop[];
    historyData: HistoryData[];
};

export type FarmersData = {
    farmers: Farmer[];
};