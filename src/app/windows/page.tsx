"use client";

import { CHHATTISGARH_LOCATION } from "../helpers/constants";
import { SprayWindowsCard } from "../components/SprayWindowsCard";



export default function Page() {
  const location = CHHATTISGARH_LOCATION;

  return (
    <SprayWindowsCard location={location} />
  );
}
