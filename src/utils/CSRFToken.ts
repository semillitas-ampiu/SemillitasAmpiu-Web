/**
 * Obtiene el valor de una cookie por su nombre
 * Útil para CSRF tokens cuando se trabaja con Django
 * 
 * @param name - Nombre de la cookie a obtener
 * @returns El valor de la cookie o null si no existe
 * 
 * @example
 * const csrfToken = getCookie('csrftoken');
 */
function getCookie(name: string): string | null {
  let cookieValue: string | null = null;
  
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      
      // Verifica si esta cookie coincide con el nombre buscado
      if (cookie.substring(0, name.length + 1) === `${name}=`) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  
  return cookieValue;
}

export default getCookie;
