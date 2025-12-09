import React, { useEffect } from "react";
import StatsCard from "../../components/barras/statscard";
import SalesLineChart from "../../components/barras/GraficaLineas";
import SalesBarChart from "../../components/barras/GraficaBarras";
import { UserStar, CaseSensitive, LockKeyhole } from "lucide-react";
import useGetRequest from "../../hooks/useGetRequest";

export default function Dashboard() {
  const {
    getData: getJugadores,
    data: jugadores,
    loading: loadingJugadores,
  } = useGetRequest();
  const {
    getData: getPalabras,
    data: palabras,
    loading: loadingPalabras,
  } = useGetRequest();
  const {
    getData: getAdmins,
    data: administradores,
    loading: loadingAdmins,
  } = useGetRequest();

  useEffect(() => {
    const controller = new AbortController();
    getJugadores("jugador", null, "", controller.signal);

    return () => {
      controller.abort();
    };
  }, [getJugadores]);

  useEffect(() => {
    const controller = new AbortController();
    getPalabras("palabra", null, "", controller.signal);

    return () => {
      controller.abort();
    };
  }, [getPalabras]);

  useEffect(() => {
    const controller = new AbortController();
    getAdmins("administrador", null, "", controller.signal);

    return () => {
      controller.abort();
    };
  }, [getAdmins]);

  return (
    <div className="p-6 bg-black-100 min-h-screen">
      {/* TOP STATS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Administradores"
          value={loadingAdmins ? "cargando..." : administradores?.length || 0}
          icon={<LockKeyhole />}
        />

        <StatsCard
          title="Jugadores"
          value={loadingJugadores ? "cargando..." : jugadores?.length || 0}
          icon={<UserStar />}
        />
        <StatsCard
          title="Palabras"
          value={loadingPalabras ? "cargando..." : palabras?.length || 0}
          icon={<CaseSensitive />}
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-xl shadow border-gray-700 border">
          <h2 className="font-semibold mb-4 text-white">Avances De Aprendizaje</h2>
          <SalesLineChart />
        </div>

        <div className="bg-gray-800 p-4 rounded-xl shadow  border-gray-700 border">
          <h2 className="font-semibold mb-4 text-white">Registro Jugadores </h2>
          <SalesBarChart />
        </div>
      </div>
    </div>
  );
}
