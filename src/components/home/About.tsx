import type { FC } from 'react';

/**
 * Sección "Sobre el proyecto" de la página principal
 * Explica el propósito de Ampiu y su conexión con la cultura Ambaló
 */
const About: FC = () => (
  <section className="py-20 px-8 bg-indigo-900/30 text-center">
    <h2 className="text-3xl font-bold mb-6">Sobre el proyecto</h2>
    <p className="max-w-3xl mx-auto text-blue-100 leading-relaxed text-lg mb-4">
      Ampiu es un proyecto que busca que niñas y niños aprendan el idioma <strong>Ambaló</strong> de manera divertida,
      mientras conocen las historias y leyendas de su pueblo. 
    </p>
    <p className="max-w-3xl mx-auto text-blue-100 leading-relaxed text-lg">
      Queremos que las nuevas generaciones se sientan orgullosas de sus raíces y disfruten aprendiendo su lengua
      y cultura de manera natural, a través de juegos interactivos.
    </p>
  </section>
);

export default About;
