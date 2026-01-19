import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import NavPrincipal from './NavPrincipal';

/**
 * Header principal de la aplicación
 * Se vuelve sticky al hacer scroll
 */
const Header = (): ReactNode => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);

  const navbarToggleHandler = (): void => {
    setNavbarOpen(!navbarOpen);
  };

  const handleStickyNavbar = (): void => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleStickyNavbar);
    return () => {
      window.removeEventListener('scroll', handleStickyNavbar);
    };
  }, []);

  return (
    <header
      className={`left-0 top-0 z-40 flex w-full items-center transition-all duration-300 ${
        sticky
          ? 'fixed bg-gray-800/0 shadow-lg backdrop-blur-md'
          : 'absolute bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="relative flex items-center justify-between py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className={`text-2xl font-bold text-white transition-all duration-300 ${
                sticky ? 'py-2' : 'py-4'
              }`}
            >
              Semillitas Ampiu
            </Link>
          </div>

          {/* Botón toggle para móvil */}
          <button
            onClick={navbarToggleHandler}
            type="button"
            aria-label="Toggle mobile menu"
            className="block lg:hidden rounded-lg p-2 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                navbarOpen ? 'translate-y-1.5 rotate-45' : 'mb-1.5'
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                navbarOpen ? 'opacity-0' : 'mb-1.5'
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                navbarOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </button>

          {/* Navegación */}
          <NavPrincipal navbarOpen={navbarOpen} />
        </div>
      </div>
    </header>
  );
};

export default Header;
