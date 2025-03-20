"use client";

import { useState } from "react";
import { CHHATTISGARH_LOCATION } from "../helpers/constants";
import { SprayWindowsCard } from "../components/SprayWindowsCard";



export default function Page() {
  // State management
  const [location, setLocation] = useState(CHHATTISGARH_LOCATION); // Default: Chhattisgarh

  return (
    <SprayWindowsCard location={location} />
  );
}
