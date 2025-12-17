import { useState } from 'react';

import type { ApiError } from '@/types';
import getCookie from '@/utils/CSRFToken';
import { getApiUrl } from '@/utils/apiConfig';

/**
 * Retorno del hook useDeleteRequest
 */
interface UseDeleteRequestReturn {
  deleteData: (endpoint: string, id: number | string) => Promise<void>;
  success: boolean;
  error: ApiError | null;
  loading: boolean;
}

/**
 * Hook para realizar peticiones DELETE a la API
 * 
 * @example
 * const { deleteData, success, error } = useDeleteRequest();
 * 
 * await deleteData('jugador', 1);
 * if (success) {
 *   // El jugador fue eliminado
 * }
 */
const useDeleteRequest = (): UseDeleteRequestReturn => {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const deleteData = async (
    endpoint: string,
    id: number | string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    const url = getApiUrl(`${endpoint}/${id}`);

    try {
      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          'X-CSRFToken': getCookie('csrftoken') ?? '',
        },
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const result: ApiError = await res.json();
        setError(result);
      }
    } catch (err) {
      setError({ error: `Error de red: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setLoading(false);
    }
  };

  return { deleteData, success, error, loading };
};

export default useDeleteRequest;
