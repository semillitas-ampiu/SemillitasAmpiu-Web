import React from "react";
import StatsCard from "./statscard";
import SalesLineChart from "./GraficaLineas";
import SalesBarChart from "./GraficaBarras";
import { UserStar, CaseSensitive, LockKeyhole } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard title="Administradores" value="3" icon={<LockKeyhole />} />

        <StatsCard
          title="Jugadores"
          value="100"
          icon={<UserStar />}
          trend="+4.35%"
          trendColor="text-green-500"
        />
        <StatsCard
          title="Palabras"
          value="100"
          icon={<CaseSensitive />}
          trend="+2.59%"
          trendColor="text-green-500"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Avances De Aprendizaje</h2>
          <SalesLineChart />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Registro Jugadores </h2>
          <SalesBarChart />
        </div>
      </div>
    </div>
  );
}
