import { useCallback, useEffect } from 'react';

import useGetRequest from '@/hooks/useGetRequest';
import type { Palabra, ApiError } from '@/types';

const Palabras = () => {
  const {
    getData,
    data: palabras = [],
    error,
    loading,
  } = useGetRequest<Palabra>();

  const fetchPalabras = useCallback(() => {
    const controller = new AbortController();
    getData('palabra', null, '', controller.signal);
    return controller;
  }, [getData]);

  useEffect(() => {
    const controller = fetchPalabras();
    return () => controller.abort();
  }, [fetchPalabras]);

  if (loading) {
    return <p className="text-center text-gray-400">Cargando palabras...</p>;
  }

  if (error) {
    const apiError = error as ApiError;
    return (
      <p className="text-center text-red-500">
        Error al cargar: {apiError?.error || 'error desconocido'}
      </p>
    );
  }

  return (
    <div className="space-y-6 pt-11">
      <div className="rounded-2xl border border-gray-800 bg-white/[0.03]">
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-white/90">
            Lista de Palabras
          </h3>
        </div>
        <div className="p-4 border-t border-gray-800 sm:p-6">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.03]">
              {palabras.length === 0 ? (
                <p className="text-center text-gray-400 py-6">
                  No hay palabras registradas.
                </p>
              ) : (
                <>
                  {/* Vista mobile: Cards */}
                  <div className="md:hidden divide-y divide-white/[0.05]">
                    {palabras.map((palabra) => (
                      <div key={palabra.id} className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-white/90">
                              {palabra.pal_español}
                            </p>
                            <p className="text-sm text-indigo-400">
                              {palabra.pal_ampiu}
                            </p>
                          </div>
                          <span className="flex-shrink-0 px-2 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded">
                            Nivel {palabra.nivel}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Vista desktop: Tabla */}
                  <div className="hidden md:block max-w-full overflow-x-auto">
                    <table className="min-w-full">
                      <thead className="border-b border-white/[0.05]">
                        <tr>
                          <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                            Español
                          </th>
                          <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                            Ampiu-wam
                          </th>
                          <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                            Nivel
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05]">
                        {palabras.map((palabra) => (
                          <tr key={palabra.id}>
                            <td className="px-5 py-4 sm:px-6 text-start">
                              <span className="block font-medium text-white/90 text-theme-sm">
                                {palabra.pal_español}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-400 text-start text-theme-sm">
                              {palabra.pal_ampiu}
                            </td>
                            <td className="px-4 py-3 text-gray-400 text-start text-theme-sm">
                              {palabra.nivel}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Palabras;
