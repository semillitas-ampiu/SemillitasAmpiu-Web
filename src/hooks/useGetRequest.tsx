import { useCallback, useState } from 'react';

import type { ApiError } from '@/types';
import { getApiUrl } from '@/utils/apiConfig';

/**
 * Retorno del hook useGetRequest
 * Usa genéricos para tipar los datos que esperas recibir
 */
interface UseGetRequestReturn<T> {
  getData: (
    endpoint: string,
    id?: number | string | null,
    params?: string,
    signal?: AbortSignal | null
  ) => Promise<void>;
  data: T[];
  error: ApiError | null;
  loading: boolean;
}

/**
 * Hook para realizar peticiones GET a la API
 * 
 * IMPORTANTE: Este hook usa genéricos para que TypeScript sepa qué tipo de datos esperas.
 * Si no pasás el tipo, los datos serán `unknown[]`.
 * 
 * @example
 * // Con tipo específico
 * const { getData, data } = useGetRequest<Jugador>();
 * // data será de tipo Jugador[]
 * 
 * @example
 * // Sin tipo (no recomendado, pero funciona)
 * const { getData, data } = useGetRequest();
 * // data será unknown[]
 */
const useGetRequest = <T = unknown>(): UseGetRequestReturn<T> => {
  const [data, setData] = useState<T[]>([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getData = useCallback(async (
    endpoint: string,
    id: number | string | null = null,
    params: string = '',
    signal: AbortSignal | null = null
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setData([]);

    const url = getApiUrl(
      `${endpoint}${id ? `/${id}` : ''}/${params ? `?${params}` : ''}`
    );

    try {
      const res = await fetch(url, { signal: signal ?? undefined });
      const result: T[] | ApiError = await res.json();

      if (!res.ok) {
        setError(result as ApiError);
      } else {
        setData(result as T[]);
      }
    } catch (err) {
      // Si es un AbortError, no actualizamos el estado
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }
      setError({ error: `Error de red: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setLoading(false);
    }
  }, []);

  return { getData, data, error, loading };
};

export default useGetRequest;
