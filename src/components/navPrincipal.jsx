import React, { useContext, useState } from 'react'; //  AGREGAR useContext
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext'; //  AGREGAR importación del contexto

const NavPrincipal = ({ navbarOpen }) => {
    //  OBTENER el estado del usuario
    const { usuario } = useContext(AuthContext);
    
    // Renderizado condicional
    return (
        <nav
            className={`${navbarOpen ? "block" : "hidden"
                } absolute top-full right-0 w-full bg-[#1E232E] text-gray-300 lg:static lg:block lg:w-auto lg:bg-transparent`}
        >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 px-6 lg:px-0">

                {/* Acciones del usuario */}
                {usuario ? (
                    <>
                        <li>
                            <Link
                                to="/dashboard"
                                className="text-white hover:text-gray-300 font-semibold"
                            >
                                Dashboard
                            </Link>
                        </li>

                        <li className="mt-4 lg:mt-0">
                            <Link
                                to="/administradores"
                                className="text-white hover:text-gray-300 font-semibold"
                            >
                                Administradores
                            </Link>
                        </li>
                        <li className="mt-4 lg:mt-0">
                            <Link
                                to="/jugadores"
                                className="text-white hover:text-gray-300 font-semibold"
                            >
                                Jugadores
                            </Link>

                        </li>
                        <li className="mt-4 lg:mt-0">
                            <Link
                                to="/logout"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                            >
                                Cerrar sesión
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="mt-2 lg:mt-0">
                            <Link
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
                            >
                                Iniciar sesión
                            </Link>
                        </li>
                    </>
                )}

                {/* Modo oscuro
                <li className="mt-2 lg:mt-0 flex justify-center lg:justify-start">
                    <ThemeToggler />
                </li> */}
            </ul>
        </nav>
    );
};

export default NavPrincipal;