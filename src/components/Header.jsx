import React, { useEffect, useState } from 'react';
import NavPrincipal from './navPrincipal'; // Tu menú

const Header = () => {
    const [sticky, setSticky] = useState(false);
    const [navbarOpen, setNavbarOpen] = useState(false);

    const toggleNavbar = () => setNavbarOpen(!navbarOpen);
    const handleSticky = () => setSticky(window.scrollY >= 80);
    useEffect(() => {
        window.addEventListener("scroll", handleSticky);
        return () => window.removeEventListener("scroll", handleSticky);
    }, []);
    return (
        <header className={`top-0 left-0 z-40 w-full transition-all mb-6 ${sticky
            ? "fixed bg-[#1E232E]/90 backdrop-blur-md shadow-lg"
            : "absolute bg-[#1E232E]"
            }`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="bg-blue-600 w-6 h-6 rounded-sm"></div>
                    <h1 className="text-white font-semibold text-lg">Semillitas Ampiu</h1>
                </div>

                {/* Botón menú móvil */}
                <button
                    onClick={toggleNavbar}
                    className="lg:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        {navbarOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        )}
                    </svg>
                </button>

                {/* Integración del menú principal */}
                
                <NavPrincipal navbarOpen={navbarOpen}/>
                
            </div>
        </header>
    );
};

export default Header;