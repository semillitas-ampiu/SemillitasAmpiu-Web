import { useState } from 'react';
import type { ReactNode } from 'react';

import type { SidebarProps } from '@/types';

import Sidebar from './Sidebar';

interface AdminLayoutProps {
  children: ReactNode;
}

/**
 * Layout para el panel de administración
 * Incluye sidebar colapsable y área de contenido principal
 */
export default function AdminLayout({ children }: AdminLayoutProps): ReactNode {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleToggleSidebar = (): void => {
    setIsCollapsed((prev) => !prev);
  };

  const contentPadding = isCollapsed ? 'pl-24' : 'pl-72';

  const sidebarProps: SidebarProps = {
    isCollapsed,
    onToggle: handleToggleSidebar,
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Sidebar {...sidebarProps} />
      <main
        className={`min-h-screen ${contentPadding} p-4 transition-[padding] duration-300 ease-in-out`}
      >
        {children}
      </main>
    </div>
  );
}
