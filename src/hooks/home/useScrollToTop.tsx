import { useEffect } from 'react';

/**
 * Hook que hace scroll al top de la página cuando el componente se monta
 * Útil para páginas que deben empezar desde arriba
 * 
 * @example
 * const HomePage = () => {
 *   useScrollToTop();
 *   return <div>...</div>;
 * };
 */
export const useScrollToTop = (): void => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
};
