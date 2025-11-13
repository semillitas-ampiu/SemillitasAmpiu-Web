import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className={`fixed md:static top-0 left-0 h-full w-60 bg-[#1C85DB] text-white shadow-lg transform transition-transform duration-300 z-40`}>
        <h2 className="text-xl font-bold p-4 border-b">Panel Admin</h2>
        <nav className="flex flex-col flex-1 p-2">
            <NavLink
            to="/usuarios"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                    isActive ? "bg-white text-[#1C85DB] font-semibold" : "hover:bg-blue-500 hover:text-white"
                }`
            }
            >
            Usuarios
            </NavLink>

            <NavLink
            to="/palabras"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                    isActive ? "bg-white text-[#1C85DB] font-semibold" : "hover:bg-blue-500 hover:text-white"
                }`
            }
            >
            Palabras
            </NavLink>

            <NavLink
            to="/evaluaciones"
            className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-md transition ${
                    isActive ? "bg-white text-[#1C85DB] font-semibold" : "hover:bg-blue-500 hover:text-white"
                }`
            }
            >
            Evaluaciones
            </NavLink>
        </nav>
        </aside>
    );
}
