import React from 'react';
import Header from './Header';
import Footer from './Footer'; // Asegúrate de ajustar la ruta
import NavPrincipal from './navPrincipal'; // Asegúrate de ajustar la ruta

// El componente Layout recibe 'children' (la página actual)
const Layout = ({ children }) => {
  return (
    <div className="layout-container min-h-screen flex flex-col">
      
      {/* HEADER y Navegación fijos */}
      <Header>
        <NavPrincipal />
      </Header>
      
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