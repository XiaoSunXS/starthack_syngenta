"use client";

import { useEffect, useState } from "react";
import { Farmer, FarmersData } from "../helpers/types";

const FarmerProfile = ({ farmer }: { farmer: Farmer }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={`${farmer.first_name} ${farmer.last_name}`}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Language</label>
              <input
                type="text"
                value={farmer.language}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-md"
              />
            </div>
          </div>
        </div>

        {/* Location Information */}
        <div className="col-span-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              value={`${farmer.location}, ${farmer.country}`}
              disabled
              className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-md"
            />
          </div>
        </div>

        {/* Farming Method */}
        <div className="col-span-2 md:col-span-1">
          <div>
            <label className="block text-sm font-medium text-gray-700">Farming Method</label>
            <select
              className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-md"
              value={farmer.farming_method}
              onChange={()=>{}}
            >
              <option>{farmer.farming_method}</option>
              <option>Conventional</option>
              <option>Organic</option>
              <option>Regenerative</option>
              <option>Biodynamic</option>
            </select>
          </div>
        </div>

        {/* Farm Size */}
        <div className="col-span-2 md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">Farm Size (hectares)</label>
          <div>
            <input
              type="number"
              value={farmer.crops.reduce((sum, crop) => sum + crop.area_hectare, 0).toFixed(2)}
              className="mt-1 block w-full px-3 py-2 bg-gray-100 rounded-md"
              onChange={()=>{}}
            />
          </div>
        </div>

        {/* Crops */}
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Crops</label>
          <div className="border rounded-md p-4 bg-gray-50">
            {farmer.crops.length > 0 ? (
              <div className="space-y-4">
                {farmer.crops.map((crop, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-white rounded">
                    <span className="font-medium">{crop.name}</span>
                    <span>{crop.area_hectare} hectares</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No crops added yet</p>
            )}
            <div className="mt-4">
              <button
                type="button"
                className="px-4 py-2 bg-[var(--header-bg)] text-white rounded-md"
                onChange={()=>{}}
              >
                Add Crop
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
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
