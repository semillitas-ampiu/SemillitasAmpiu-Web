import { useContext } from 'react';
import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { AuthContext } from '@/context/authContext';
import type { AuthContextValue, NavPrincipalProps } from '@/types';

/**
 * Navegación principal que se muestra en el header
 * Renderiza diferentes links según si el usuario está logueado o no
 */
const NavPrincipal = ({ navbarOpen }: NavPrincipalProps): ReactNode => {
  const authContext = useContext(AuthContext);
  const { usuario } = authContext as AuthContextValue;
  const location = useLocation();

  return (
    <nav
      id="navbarCollapse"
      className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 px-6 py-4 duration-300 lg:visible lg:static lg:w-auto lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 ${
        navbarOpen
          ? 'visibility top-full opacity-100 bg-gray-800'
          : 'invisible top-[120%] opacity-0'
      }`}
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
        {usuario ? (
          <>
            <ul className="flex flex-col lg:flex-row lg:space-x-8">
              <li className="group relative">
                <Link
                  to="/dashboard"
                  className={`flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                    location.pathname === '/dashboard'
                      ? 'text-blue-400'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  Dashboard
                </Link>
              </li>

              <li className="group relative">
                <Link
                  to="/administradores"
                  className={`flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                    location.pathname === '/administradores'
                      ? 'text-blue-400'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  Administradores
                </Link>
              </li>

              <li className="group relative">
                <Link
                  to="/jugadores"
                  className={`flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                    location.pathname === '/jugadores'
                      ? 'text-blue-400'
                      : 'text-blue-100 hover:text-white'
                  }`}
                >
                  Jugadores
                </Link>
              </li>
            </ul>

            <div className="mt-4 lg:mt-0">
              <Link
                to="/logout"
                className="ease-in-up shadow-btn hover:shadow-btn-hover rounded-sm bg-blue-600 px-6 py-2.5 text-base font-medium text-white transition duration-300 hover:bg-blue-700 inline-block"
              >
                Cerrar sesión
              </Link>
            </div>
          </>
        ) : (
          <div>
            <Link
              to="/login"
              className="ease-in-up shadow-btn hover:shadow-btn-hover rounded-sm bg-blue-600 px-6 py-2.5 text-base font-medium text-white transition duration-300 hover:bg-blue-700 inline-block"
            >
              Iniciar sesión
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavPrincipal;
