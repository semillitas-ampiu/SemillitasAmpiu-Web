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
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
