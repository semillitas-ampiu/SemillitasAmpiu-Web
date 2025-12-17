import { useState } from 'react';

import type { ApiError } from '@/types';
import getCookie from '@/utils/CSRFToken';
import { getApiUrl } from '@/utils/apiConfig';

/**
 * Retorno del hook usePutRequest
 */
interface UsePutRequestReturn<TResponse> {
  putData: (
    endpoint: string,
    id: number | string,
    data: unknown,
    isFormData?: boolean
  ) => Promise<void>;
  response: TResponse | null;
  error: ApiError | null;
  loading: boolean;
  clearState: () => void;
}

/**
 * Hook para realizar peticiones PUT a la API
 * 
 * @example
 * const { putData, response, error } = usePutRequest<Administrador>();
 * 
 * await putData('administrador', 1, { first_name: 'Juan Actualizado' });
 */
const usePutRequest = <TResponse = unknown>(): UsePutRequestReturn<TResponse> => {
  const [response, setResponse] = useState<TResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const clearState = (): void => {
    setResponse(null);
    setError(null);
  };

  const putData = async (
    endpoint: string,
    id: number | string,
    data: unknown,
    isFormData: boolean = false
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const url = getApiUrl(`${endpoint}/${id}`);

    const headers: HeadersInit = {
      'X-CSRFToken': getCookie('csrftoken') ?? '',
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await fetch(url, {
        method: 'PUT',
        headers,
        body: isFormData ? (data as FormData) : JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setError(result as ApiError);
      } else {
        setResponse(result as TResponse);
      }
    } catch (err) {
      setError({ error: `Error de red: ${err instanceof Error ? err.message : String(err)}` });
    } finally {
      setLoading(false);
    }
  };

  return { putData, response, error, loading, clearState };
};

export default usePutRequest;
