import { useEffect, useState, type ReactElement } from 'react';
import { Trophy } from 'lucide-react';

import useGetRequest from '@/hooks/useGetRequest';
import type { Jugador, Resultado, JugadorRanking } from '@/types';

/**
 * Componente que muestra el TOP 5 de jugadores con mayor puntaje
 * 
 * Hace fetch a:
 * - /api/resultado/ para obtener puntajes
 * - /api/jugador/ para obtener usernames
 * 
 * Luego cruza los datos y muestra el ranking ordenado
 */
const RankingJugadores = (): ReactElement => {
  const [ranking, setRanking] = useState<JugadorRanking[]>([]);

  const {
    getData: getResultados,
    data: resultados,
    loading: loadingResultados,
  } = useGetRequest<Resultado>();

  const {
    getData: getJugadores,
    data: jugadores,
    loading: loadingJugadores,
  } = useGetRequest<Jugador>();

  // Fetch inicial de ambos endpoints
  useEffect(() => {
    const controller = new AbortController();
    getResultados('resultado', null, '', controller.signal);
    getJugadores('jugador', null, '', controller.signal);
    return () => controller.abort();
  }, [getResultados, getJugadores]);

  // Procesar ranking cuando tengamos ambos datos
  useEffect(() => {
    if (!resultados?.length || !jugadores?.length) {
      setRanking([]);
      return;
    }

    // Crear mapa de jugadores: id -> username
    const jugadoresMap = new Map<number, string>(
      jugadores.map((j) => [j.id, j.username])
    );

    // Ordenar resultados por puntaje descendente y tomar top 5
    const top5 = [...resultados]
      .sort((a, b) => b.puntaje - a.puntaje)
      .slice(0, 5)
      .map((resultado, index) => ({
        id: resultado.usuario,
        username: jugadoresMap.get(resultado.usuario) || `Jugador ${resultado.usuario}`,
        puntaje: resultado.puntaje,
        posicion: index + 1,
      }));

    setRanking(top5);
  }, [resultados, jugadores]);

  const isLoading = loadingResultados || loadingJugadores;

  // Iconos de medallas para el podio
  const getMedallaIcon = (posicion: number): string => {
    switch (posicion) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${posicion}`;
    }
  };

  // Colores de fondo según posición
  const getPosicionStyle = (posicion: number): string => {
    switch (posicion) {
      case 1:
        return 'bg-yellow-500/20 border-yellow-500/50';
      case 2:
        return 'bg-gray-400/20 border-gray-400/50';
      case 3:
        return 'bg-orange-600/20 border-orange-600/50';
      default:
        return 'bg-gray-700/50 border-gray-600/50';
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-xl shadow border-gray-700 border">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="text-yellow-500" size={24} />
        <h2 className="font-semibold text-white">Top 5 Jugadores</h2>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500" />
        </div>
      ) : ranking.length === 0 ? (
        <div className="text-gray-400 text-center py-8">
          No hay resultados disponibles
        </div>
      ) : (
        <div className="space-y-2">
          {ranking.map((jugador) => (
            <div
              key={jugador.id}
              className={`flex items-center justify-between p-3 rounded-lg border ${getPosicionStyle(jugador.posicion)} transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl w-10 text-center">
                  {getMedallaIcon(jugador.posicion)}
                </span>
                <span className="text-white font-medium">{jugador.username}</span>
              </div>
              <span className="text-yellow-400 font-bold">
                {jugador.puntaje.toLocaleString()} pts
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RankingJugadores;
