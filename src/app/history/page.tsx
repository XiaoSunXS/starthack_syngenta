"use client";

import { useEffect, useState } from "react";
import { FarmersData, CheckData } from "../helpers/types";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const getPicture = (crop: string)=>{
  if (crop == 'Rice') return 'rice.jpg';
  if (crop == 'Cotton') return 'cotton.jpeg';
  
  return 'wheat.jpg';
}


const getColorClass = (state: string): string => {
  switch(state) {
    case "Good":
      return "bg-[#0A6312]";
    case "Medium":
      return "bg-[#63B9FF]";
    case "Poor":
      return "bg-[#FF6262]"; 
    default:
      return "bg-gray-200";
  }
}

const HistoryCard = ({ checkData }: { checkData: CheckData }) => {
  return (
    <Card className={`my-4 py-0 bg-light rounded-lg border-0 shadow-sm overflow-hidden ${getColorClass(checkData.score)}`}>
      <div className="flex flex-row items-center">
        <div className="flex-grow">
          <CardHeader className="font-bold text-xl text-primary pb-0 text-white">{checkData.crop}</CardHeader>
          <CardContent className="text-sm text-gray-700 pt-2 text-white">
            <div className="text-4xl">{(checkData.score)}</div>
          </CardContent>
        </div>
        <div className="w-28 flex items-center justify-center px-2 py-4">
          <div className="w-24 h-24 rounded-full overflow-hidden flex items-center justify-center border-3 border-white bg-gray-100">
            <img 
              src={getPicture(checkData.crop)}
              alt={`${checkData.crop} image`} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </Card>
)};
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

  const checkData = data.farmers[0].checkData;

  return (
    <div>
      {checkData.map((v, i) => (
        <HistoryCard key={`checkData-card-${i}`} checkData={v} />
      ))}
    </div>
  );
}