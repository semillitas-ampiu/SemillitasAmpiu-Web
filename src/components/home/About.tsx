import type { FC } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

/**
 * Componente de lista con ícono de check
 */
const List: FC<{ text: string }> = ({ text }) => (
  <p className="mb-5 flex items-center text-base font-medium text-white">
    <CheckCircleIcon className="mr-2.5 h-5 w-5 text-blue-400" />
    {text}
  </p>
);

/**
 * Sección "Sobre el proyecto" de la página principal
 * Explica el propósito de Ampiu y su conexión con la cultura Ambaló
 */
const About: FC = () => {
  return (
    <section id="about" className="pt-16 md:pt-20 lg:pt-28 bg-indigo-900/30">
      <div className="container mx-auto px-4">
        <div className="border-b border-blue-400/20 pb-16 md:pb-20 lg:pb-28">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mb-9">
                <h2 className="mb-4 text-3xl font-bold !leading-tight text-white sm:text-4xl md:text-[45px]">
                  Sobre el proyecto Ampiü
                </h2>
                <p className="text-base !leading-relaxed text-blue-100 md:text-lg">
                  Ampiu es un proyecto que busca que niñas y niños aprendan el
                  idioma <strong>Ambaló</strong> de manera divertida, mientras
                  conocen las historias y leyendas de su pueblo.
                </p>
              </div>

              <div className="mb-12 max-w-[570px] lg:mb-0">
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Contenido educativo" />
                    <List text="Idioma Ambaló" />
                    <List text="Acceso gratuito" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Juegos interactivos" />
                    <List text="Cultura indígena" />
                    <List text="Para niños y niñas" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <div className="flex h-full items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 border border-blue-400/20">
                  <div className="text-center">
                    <p className="text-lg font-medium text-blue-100 md:text-xl">
                      Queremos que las nuevas generaciones se sientan orgullosas
                      de sus raíces y disfruten aprendiendo su lengua y cultura
                      de manera natural, a través de juegos interactivos.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
