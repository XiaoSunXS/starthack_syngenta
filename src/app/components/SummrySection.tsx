import { AlertTriangle, Droplets, Thermometer, Wind } from "lucide-react";
import { SummaryCard } from './SummaryCard';
import { getRiskColor } from '../helpers/getRiskColor';
import { Disease, Soil, Weather } from '../helpers/types';


export const SummarySection = (
    { weatherData, soilData, diseaseRisk }: { weatherData: Weather[], soilData?: Soil, diseaseRisk?: Disease }) =>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Weather Summary Card */}
        <SummaryCard title='Current Weather'>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Thermometer className="mr-2 text-red-500" />
                    <span>{weatherData[0].temperature}°C</span>
                </div>
                <div className="flex items-center">
                    <Droplets className="mr-2 text-blue-500" />
                    <span>{weatherData[0].humidity}%</span>
                </div>
                <div className="flex items-center">
                    <Wind className="mr-2 text-gray-500" />
                    <span>{weatherData[0].windSpeed} m/s</span>
                </div>
            </div>
        </SummaryCard>

        {/* Soil Summary Card */}
        {!!soilData &&
            <SummaryCard title='Soil Condition'>
                <div>
                    <p><strong>Type:</strong> {soilData.soilType}</p>
                    <p><strong>pH:</strong> {soilData.pH}</p>
                    <p><strong>Moisture (0-10cm):</strong> {soilData.moisture[0].value}%</p>
                </div>
            </SummaryCard>}

        {/* Disease Risk Summary Card */}
        {!!diseaseRisk && <SummaryCard title='Disease Risk'>
            <div>
                <div className="flex items-center">
                    <AlertTriangle className={`mr-2 ${getRiskColor(diseaseRisk.diseases[0].riskLevel)}`} />
                    <span className="font-semibold">Primary Risk: {diseaseRisk.diseases[0].name}</span>
                </div>
                <p className={`mt-1 ${getRiskColor(diseaseRisk.diseases[0].riskLevel)}`}>
                    Risk Level: {diseaseRisk.diseases[0].riskLevel}
                </p>
            </div>
        </SummaryCard>}
    </div>