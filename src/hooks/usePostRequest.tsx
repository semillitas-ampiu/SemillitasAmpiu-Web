import { useState } from 'react';

import type { ApiError } from '@/types';
import getCookie from '@/utils/CSRFToken';

/**
 * Retorno del hook usePostRequest
 */
interface UsePostRequestReturn<TResponse> {
  postData: (url: string, data: unknown, isFormData?: boolean) => Promise<void>;
  response: TResponse | null;
  error: ApiError | null;
  loading: boolean;
  clearState: () => void;
}

/**
 * Hook para realizar peticiones POST a la API
 * 
 * @example
 * const { postData, response, error, loading } = usePostRequest<CrearAdministradorResponse>();
 * 
 * await postData(getApiUrl('administrador/'), { first_name: 'Juan', ... });
 */
const usePostRequest = <TResponse = unknown>(): UsePostRequestReturn<TResponse> => {
  const [response, setResponse] = useState<TResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const clearState = (): void => {
    setResponse(null);
    setError(null);
  };

  const postData = async (
    url: string,
    data: unknown,
    isFormData: boolean = false
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    setResponse(null);

    const headers: HeadersInit = {
      'X-CSRFToken': getCookie('csrftoken') ?? '',
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
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
      setError({ error: 'Error de red' });
      console.error('Error de red:', err);
    } finally {
      setLoading(false);
    }
  };

  return { postData, response, error, loading, clearState };
};

export default usePostRequest;
