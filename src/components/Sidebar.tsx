import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ChartNoAxesCombined,
  ChevronLeft,
  HomeIcon,
  LayoutDashboard,
  LogOut,
  Users,
  BookOpen,
} from 'lucide-react';

import type { SidebarLinkProps, SidebarProps } from '@/types';

/**
 * Sidebar del panel de administración
 * Puede colapsarse para ganar espacio
 */
export default function Sidebar({ isCollapsed, onToggle }: SidebarProps): ReactNode {
  const location = useLocation();

  return (
    <aside
      className={`fixed top-0 left-0 z-40 bg-white-800 text-white mr-10 h-screen flex flex-col transition-[width] duration-300 ease-in-out border-gray-700 border-r-2 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Botón para colapsar / abrir */}
      <button
        type="button"
        onClick={onToggle}
        className="absolute -right-3 top-6 z-50 h-7 w-7 rounded-full bg-gray-700 border border-gray-600 shadow-md flex items-center justify-center hover:bg-gray-600 transition"
        aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
      >
        <ChevronLeft
          className={`h-4 w-4 transition-transform duration-300 ${
            isCollapsed ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Encabezado */}
      <div className="p-4 border-b border-gray-700 flex items-center gap-3">
        <div className="p-2 bg-indigo-600 rounded-lg flex-shrink-0">
          <LayoutDashboard className="h-6 w-6 text-white" />
        </div>
        {!isCollapsed && (
          <div>
            <h1 className="text-lg font-bold">Semillitas</h1>
            <p className="text-xs text-white-400">Panel Admin</p>
          </div>
        )}
      </div>

      {/* Menú */}
      <nav className="p-4 flex-1 space-y-2">
        <SidebarLink
          to="/"
          label="Inicio"
          icon={HomeIcon}
          active={location.pathname === '/'}
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/dashboard"
          label="Dashboard"
          icon={ChartNoAxesCombined}
          active={location.pathname.startsWith('/dashboard')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/administradores"
          label="Administradores"
          icon={Users}
          active={location.pathname.startsWith('/administradores')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/jugadores"
          label="Jugadores"
          icon={Users}
          active={location.pathname.startsWith('/jugadores')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/palabras"
          label="Palabras"
          icon={BookOpen}
          active={location.pathname.startsWith('/palabras')}
          isCollapsed={isCollapsed}
        />
        <SidebarLink
          to="/logout"
          label="Cerrar sesión"
          icon={LogOut}
          active={location.pathname.startsWith('/logout')}
          isCollapsed={isCollapsed}
        />
      </nav>

      <div className="p-3 border-t border-gray-700 text-center text-xs text-gray-500">
        {!isCollapsed ? '© 2025 Semillitas' : '©'}
      </div>
    </aside>
  );
}

function SidebarLink({
  to,
  label,
  icon: Icon,
  active,
  isCollapsed,
}: SidebarLinkProps): ReactNode {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
        active
          ? 'bg-indigo-600 text-white'
          : 'text-white hover:bg-gray-700 hover:text-white'
      } ${isCollapsed ? 'justify-center' : ''}`}
      title={isCollapsed ? label : undefined}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </Link>
  );
}
