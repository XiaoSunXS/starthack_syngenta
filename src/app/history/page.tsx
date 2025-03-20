"use client";

import { useEffect, useState } from "react";
import { FarmersData, HistoryData } from "../helpers/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const getPicture = (crop: string)=>{
  if (crop == 'Rice') return 'rice.jpg';
  if (crop == 'Cotton') return 'cotton.jpeg';
  
  return 'wheat.jpg';
}

// const getBackgroundColor = (crop: string)=>{
//   if (crop == 'Rice') return 'rice.jpg';
//   if (crop == 'Cotton') return 'cotton.jpeg';
  
//   return 'wheat.jpg';
// }

const HistoryCard = ({ history }: { history: HistoryData }) => (
  <Card className="my-4 bg-light rounded shadow-sm overflow-hidden">
    <div className="flex flex-row items-stretch">
      <div className="flex-grow">
        <CardHeader className="font-bold text-xl text-primary">{history.crop}</CardHeader>
        <CardContent className="text-sm text-gray-700">
          <div>Applied <strong>{history.amount}%</strong> {history.biologicals} on {history.date}</div>
        </CardContent>
      </div>
      <div className="w-20 h-auto flex items-center justify-center bg-gray-100">
        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
          <img 
            src={getPicture(history.crop)}
            alt={`${history.crop} image`} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </Card>
);
export default function Page() {
  const [data, setData] = useState<FarmersData | null>(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch("/api/users")  // Ensure this matches the API route
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setData(data))
      .catch(error => {
        console.error("Error fetching JSON:", error);
        setError(error.message);
      });
  }, []);
  
  if (!!error) {
    return (<p style={{ color: "red" }}>Error: {error}</p>)
  };
  
  if (data == null){
    return (<p>Loading...</p>)
  }

  const historyData = data.farmers[0].historyData;

  return (
    <div>
      {historyData.map((v, i) => (
        <HistoryCard key={`history-card-${i}`} history={v} />
      ))}
    </div>
  );
}