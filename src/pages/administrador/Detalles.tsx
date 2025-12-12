import { type ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { Recoleccion } from '@/types';
import { getApiUrl } from '@/utils/apiConfig';

export default function Detalles(): ReactElement {
  const [recolecciones, setRecolecciones] = useState<Recoleccion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchRecolecciones = async (): Promise<void> => {
      try {
        const response = await fetch(getApiUrl(`recoleccion/?usuario=${id}`));
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data: Recoleccion[] = await response.json();
        setRecolecciones(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error desconocido');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecolecciones();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center text-gray-400">Cargando datos del jugador...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (recolecciones.length === 0) {
    return (
      <p className="text-center text-gray-400">
        No hay datos de recolección disponibles.
      </p>
    );
  }

  return (
    <div className="space-y-6 pt-11">
      <div className="rounded-2xl border border-gray-800 bg-white/[0.03]">
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-white/90">
            Palabras recolectadas del jugador {id}
          </h3>
        </div>

        <div className="p-4 border-t border-gray-800 sm:p-6">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-white/[0.05]">
                    <tr>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        Palabra en ampiu
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        Palabra en español
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        Nivel
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        Fecha de recolección
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.05]">
                    {recolecciones.map((item) => (
                      <tr key={item.id}>
                        <td className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-white/90 text-theme-sm">
                            {item.palabra_data.pal_ampiu}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-start text-theme-sm">
                          {item.palabra_data.pal_español}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-start text-theme-sm">
                          {item.palabra_data.nivel}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-start text-theme-sm">
                          {new Date(item.fecha_recogida).toLocaleDateString(
                            'es-CO'
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
