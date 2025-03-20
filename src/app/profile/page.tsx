"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Badge, Globe, Languages, Leaf, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Farmer, FarmersData } from "../helpers/types";

export function FarmerProfile({ farmer }: { farmer: Farmer }) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex flex-col gap-4">          
          <h2 className="text-lg font-medium">{farmer.first_name} {farmer.last_name}</h2>
          
          <div className="grid grid-cols-3 gap-6 w-full mt-2">
            <div className="flex flex-col items-center">
              <MapPin className="h-5 w-5 text-gray-500" />
              <span className="text-xs mt-1">{farmer.location}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <Globe className="h-5 w-5 text-gray-500" />
              <span className="text-xs mt-1">{farmer.country}</span>
            </div>
            
            <div className="flex flex-col items-center">
              <Languages className="h-5 w-5 text-gray-500" />
              <span className="text-xs mt-1">{farmer.language}</span>
            </div>
          </div>
          
          <div className="w-full mt-4 border-t pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-4 w-4 text-green-600" />
              <span className="text-sm">Crops</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {farmer.crops.map((crop, index) => (
                <div key={index} className="bg-gray-50 rounded p-2 text-center">
                  <div className="text-sm">{crop.name}</div>
                  <div className="text-xs text-gray-500">{crop.area_hectare} ha</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

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
    return <p>Loading...</p>
   }
    const farmer = data.farmers[0];

    return (
      <FarmerProfile farmer={farmer} />
    );
}
