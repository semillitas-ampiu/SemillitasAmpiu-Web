import { useState } from 'react';
import type { ReactNode } from 'react';
import { Menu } from 'lucide-react';

import type { SidebarProps } from '@/types';
import { cn } from '@/utils/cn';

import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout para el panel de administración
 * - Desktop: sidebar colapsable con contenido ajustándose al ancho
 * - Mobile: sidebar como drawer + header fijo con hamburguesa
 */
export default function AdminLayout({ children }: AdminLayoutProps): ReactNode {
  // Estado para colapsar sidebar en desktop
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  // Estado para abrir/cerrar sidebar en mobile
  const [isMobileOpen, setIsMobileOpen] = useState<boolean>(false);

  const handleToggleSidebar = (): void => {
    setIsCollapsed((prev) => !prev);
  };

  const handleMobileOpen = (): void => {
    setIsMobileOpen(true);
  };

  const handleMobileClose = (): void => {
    setIsMobileOpen(false);
  };

  const sidebarProps: SidebarProps = {
    isCollapsed,
    onToggle: handleToggleSidebar,
    isMobileOpen,
    onMobileClose: handleMobileClose,
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar {...sidebarProps} />

      {/* Header mobile con botón hamburguesa */}
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-20',
          'flex items-center gap-4 px-4 py-3',
          'bg-gray-900 border-b border-gray-700',
          'md:hidden'
        )}
      >
        <button
          type="button"
          onClick={handleMobileOpen}
          className="p-2 rounded-lg hover:bg-gray-700 transition text-white"
          aria-label="Abrir menú"
        >
          <Menu className="h-6 w-6" />
        </button>
        <span className="font-semibold text-white">Semillitas Admin</span>
      </header>

      {/* Contenido principal */}
      <main
        className={cn(
          'min-h-screen p-4 transition-[padding] duration-300 ease-in-out',
          // Mobile: padding top para el header fijo, sin padding left
          'pt-16 md:pt-4',
          // Desktop: padding left según estado del sidebar
          isCollapsed ? 'md:pl-24' : 'md:pl-72'
        )}
      >
        {children}
      </main>
    </div>
  );
}
