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
  X,
} from 'lucide-react';

import type { SidebarLinkProps, SidebarProps } from '@/types';
import { cn } from '@/utils/cn';

/**
 * Sidebar del panel de administración
 * - Desktop: fixed sidebar con opción de colapsar
 * - Mobile: drawer con overlay que se abre desde el botón hamburguesa
 */
export default function Sidebar({
  isCollapsed,
  onToggle,
  isMobileOpen,
  onMobileClose,
}: SidebarProps): ReactNode {
  const location = useLocation();

  return (
    <>
      {/* Overlay para mobile - cierra el sidebar al hacer click fuera */}
      <div
        className={cn(
          'fixed inset-0 z-30 bg-black/50 transition-opacity md:hidden',
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onMobileClose}
        onKeyDown={(e) => e.key === 'Escape' && onMobileClose()}
        role="button"
        tabIndex={0}
        aria-label="Cerrar menú"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          // Base styles
          'fixed top-0 left-0 z-40 h-screen flex flex-col bg-gray-900 text-white border-r-2 border-gray-700',
          // Transición
          'transition-all duration-300 ease-in-out',
          // Mobile: drawer que se desliza
          isMobileOpen ? 'translate-x-0' : '-translate-x-full',
          // Desktop: siempre visible, ancho según collapsed
          'md:translate-x-0',
          isCollapsed ? 'md:w-20' : 'md:w-64'
        )}
      >
        {/* Header con logo y botón cerrar (mobile) / colapsar (desktop) */}
        <div className="p-4 border-b border-gray-700 flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg flex-shrink-0">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>

          {/* Título - se oculta cuando está colapsado en desktop */}
          <div
            className={cn(
              'flex-1 min-w-0 transition-opacity duration-200',
              isCollapsed ? 'md:opacity-0 md:w-0 md:overflow-hidden' : ''
            )}
          >
            <h1 className="text-lg font-bold truncate">Semillitas</h1>
            <p className="text-xs text-gray-400">Panel Admin</p>
          </div>

          {/* Botón cerrar (solo mobile) */}
          <button
            type="button"
            onClick={onMobileClose}
            className="p-2 rounded-lg hover:bg-gray-700 transition md:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Botón colapsar (solo desktop) */}
        <button
          type="button"
          onClick={onToggle}
          className={cn(
            'absolute -right-3 top-6 z-50 hidden md:flex',
            'h-7 w-7 items-center justify-center',
            'rounded-full bg-gray-700 border border-gray-600 shadow-md',
            'hover:bg-gray-600 transition'
          )}
          aria-label={isCollapsed ? 'Expandir sidebar' : 'Colapsar sidebar'}
        >
          <ChevronLeft
            className={cn(
              'h-4 w-4 transition-transform duration-300',
              isCollapsed && 'rotate-180'
            )}
          />
        </button>

        {/* Menú de navegación */}
        <nav className="p-4 flex-1 space-y-2 overflow-y-auto">
          <SidebarLink
            to="/"
            label="Inicio"
            icon={HomeIcon}
            active={location.pathname === '/'}
            isCollapsed={isCollapsed}
            onMobileClose={onMobileClose}
          />
          <SidebarLink
            to="/dashboard"
            label="Dashboard"
            icon={ChartNoAxesCombined}
            active={location.pathname.startsWith('/dashboard')}
            isCollapsed={isCollapsed}
            onMobileClose={onMobileClose}
          />
          <SidebarLink
            to="/administradores"
            label="Administradores"
            icon={Users}
            active={location.pathname.startsWith('/administradores')}
            isCollapsed={isCollapsed}
            onMobileClose={onMobileClose}
          />
          <SidebarLink
            to="/jugadores"
            label="Jugadores"
            icon={Users}
            active={location.pathname.startsWith('/jugadores')}
            isCollapsed={isCollapsed}
            onMobileClose={onMobileClose}
          />
          <SidebarLink
            to="/palabras"
            label="Palabras"
            icon={BookOpen}
            active={location.pathname.startsWith('/palabras')}
            isCollapsed={isCollapsed}
            onMobileClose={onMobileClose}
          />
          <SidebarLink
            to="/logout"
            label="Cerrar sesión"
            icon={LogOut}
            active={location.pathname.startsWith('/logout')}
            isCollapsed={isCollapsed}
            onMobileClose={onMobileClose}
          />
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-gray-700 text-center text-xs text-gray-500">
          {isCollapsed ? '©' : '© 2025 Semillitas'}
        </div>
      </aside>
    </>
  );
}

interface SidebarLinkWithCloseProps extends SidebarLinkProps {
  onMobileClose: () => void;
}

function SidebarLink({
  to,
  label,
  icon: Icon,
  active,
  isCollapsed,
  onMobileClose,
}: SidebarLinkWithCloseProps): ReactNode {
  return (
    <Link
      to={to}
      onClick={onMobileClose}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200',
        active
          ? 'bg-indigo-600 text-white'
          : 'text-white hover:bg-gray-700 hover:text-white',
        // En desktop colapsado, centrar el icono
        isCollapsed && 'md:justify-center'
      )}
      title={isCollapsed ? label : undefined}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      {/* Label: siempre visible en mobile, oculto cuando colapsado en desktop */}
      <span
        className={cn(
          'font-medium',
          isCollapsed && 'md:hidden'
        )}
      >
        {label}
      </span>
    </Link>
  );
}
