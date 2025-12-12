import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  children: ReactNode;
}

/**
 * Layout principal para páginas públicas
 * Incluye Header, contenido dinámico y Footer
 */
const Layout = ({ children }: LayoutProps): ReactNode => {
  return (
    <div className="layout-container min-h-screen flex flex-col">
      {/* HEADER y Navegación fijos */}
      <Header />
      
      {/* CONTENIDO DINÁMICO (la página) */}
      <main className="main-content flex-grow p-4">
        {children}
      </main>

      {/* FOOTER fijo */}
      <Footer />
    </div>
  );
};

export default Layout;
