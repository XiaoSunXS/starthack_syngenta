import Image from "next/image";
import { DashboardCard } from "./components/card";

export default function Home() {
  return (
    <>
      <h1>Dashboard</h1>
      <DashboardCard title={"Card title"} value={"Card value"} />
    </>
  );
}
