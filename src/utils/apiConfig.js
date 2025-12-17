/**
 * Configuración de la URL base de la API
 * Lee la URL desde las variables de entorno
 */
export const API_BASE_URL = import.meta.env.VITE_URL_API || 'http://127.0.0.1:8000/';

/**
 * Construye una URL completa para un endpoint de la API
 * @param {string} endpoint - El endpoint de la API (ej: 'api/usuarios/')
 * @returns {string} La URL completa
 */
export const getApiUrl = (endpoint) => {
  // Asegurarse de que no haya dobles barras
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  const cleanBaseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
  
  return `${cleanBaseUrl}${cleanEndpoint}`;
};
