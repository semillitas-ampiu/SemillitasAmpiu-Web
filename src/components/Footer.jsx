import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
return (
    <footer className="py-16 px-8 bg-indigo-950/60 text-center text-blue-200">
    <h2 className="text-2xl font-bold mb-4">Créditos</h2>
    <p className="max-w-2xl mx-auto mb-6">
      Este proyecto fue desarrollado con mucho cariño por el equipo de <strong>Ampiü Wan</strong> 
      con la colaboración de la comunidad <strong>Ambaló </strong>.
    </p>
    <p className="text-sm">
      © {new Date().getFullYear()} Ampiü Wan — Creando juegos que enseñan cultura y lengua.
    </p>
  </footer>
);
};

export default Footer;