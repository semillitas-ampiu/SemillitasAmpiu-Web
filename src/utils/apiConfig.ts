/**
 * Configuración de la URL base de la API
 * Lee la URL desde las variables de entorno de Vite
 */
export const API_BASE_URL: string = import.meta.env.VITE_URL_API || 'http://127.0.0.1:8000/';

/**
 * Construye una URL completa para un endpoint de la API
 * 
 * @param endpoint - El endpoint de la API (ej: 'api/usuarios/')
 * @returns La URL completa
 * 
 * @example
 * getApiUrl('jugador/') // => 'http://127.0.0.1:8000/jugador/'
 * getApiUrl('/jugador') // => 'http://127.0.0.1:8000/jugador'
 */
export const getApiUrl = (endpoint: string): string => {
  // Asegurarse de que no haya dobles barras
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const cleanBaseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  
  return `${cleanBaseUrl}${cleanEndpoint}`;
};
