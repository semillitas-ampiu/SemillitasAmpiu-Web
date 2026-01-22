import { useEffect, useState, type ReactElement } from 'react';
import { CaseSensitive, LockKeyhole, UserStar } from 'lucide-react';

import SalesBarChart from '@/components/barras/GraficaBarras';
import SalesLineChart from '@/components/barras/GraficaLineas';
import StatsCard from '@/components/barras/StatsCard';
import useGetRequest from '@/hooks/useGetRequest';
import type { Administrador, Jugador, Palabra, Recoleccion, BarChartDataPoint } from '@/types';

export default function Dashboard(): ReactElement {
    // Hooks y estados para stats
    const {
      getData: getJugadores,
      data: jugadores,
      loading: loadingJugadores,
    } = useGetRequest<Jugador>();

    const {
      getData: getPalabras,
      data: palabras,
      loading: loadingPalabras,
    } = useGetRequest<Palabra>();

    const {
      getData: getAdmins,
      data: administradores,
      loading: loadingAdmins,
    } = useGetRequest<Administrador>();

    useEffect(() => {
      const controller = new AbortController();
      getJugadores('jugador', null, '', controller.signal);
      return () => {
        controller.abort();
      };
    }, [getJugadores]);

    useEffect(() => {
      const controller = new AbortController();
      getPalabras('palabra', null, '', controller.signal);
      return () => {
        controller.abort();
      };
    }, [getPalabras]);

    useEffect(() => {
      const controller = new AbortController();
      getAdmins('administrador', null, '', controller.signal);
      return () => {
        controller.abort();
      };
    }, [getAdmins]);
  // Recolecciones para la gráfica de barras
  const {
    getData: getRecolecciones,
    data: recolecciones,
    loading: loadingRecolecciones,
  } = useGetRequest<Recoleccion>();

  // Estado para el top 5 de palabras
  const [topPalabras, setTopPalabras] = useState<BarChartDataPoint[]>([]);

  // Obtener recolecciones al montar
  useEffect(() => {
    const controller = new AbortController();
    getRecolecciones('recoleccion', null, '', controller.signal);
    return () => {
      controller.abort();
    };
  }, [getRecolecciones]);

  // Procesar top 5 palabras más recolectadas
  useEffect(() => {
    if (!recolecciones || recolecciones.length === 0) {
      setTopPalabras([]);
      return;
    }
    // Contar ocurrencias de cada palabra
    const counts: Record<string, number> = {};
    recolecciones.forEach((rec) => {
      const palabra = rec.palabra_data.pal_ampiu;
      counts[palabra] = (counts[palabra] || 0) + 1;
    });
    // Convertir a arreglo y ordenar
    const sorted: BarChartDataPoint[] = Object.entries(counts)
      .map(([label, count]) => ({ label, count: Number(count) }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
    setTopPalabras(sorted);
  }, [recolecciones]);
  
    return (
      <div className="p-6 bg-black-100 min-h-screen">
        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Administradores"
            value={loadingAdmins ? 'cargando...' : administradores?.length || 0}
            icon={<LockKeyhole />}
          />

          <StatsCard
            title="Jugadores"
            value={loadingJugadores ? 'cargando...' : jugadores?.length || 0}
            icon={<UserStar />}
          />
          <StatsCard
            title="Palabras"
            value={loadingPalabras ? 'cargando...' : palabras?.length || 0}
            icon={<CaseSensitive />}
          />
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow border-gray-700 border">
            <h2 className="font-semibold mb-4 text-white">Palabras mas recolectadas</h2>
            <SalesLineChart />
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow  border-gray-700 border">
            <h2 className="font-semibold mb-4 text-white">Top 5 palabras más recolectadas</h2>
            <SalesBarChart data={topPalabras} loading={loadingRecolecciones} />
          </div>
        </div>
      </div>
    );
  }
