import type { FC, ReactNode } from 'react';
import {
  PuzzlePieceIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

/**
 * Tipo para cada feature/característica mostrada en la sección
 */
interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <PuzzlePieceIcon className="w-12 h-12 text-white" />,
    title: 'Juegos interactivos',
    description:
      'Aprende palabras y frases en Ampiu Wam mientras te diviertes con mini-juegos.',
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-12 h-12 text-white" />,
    title: 'Historias y leyendas',
    description:
      'Descubre las tradiciones de Ambaló a través de relatos culturales adaptados para niños.',
  },
  {
    icon: <ChartBarIcon className="w-12 h-12 text-white" />,
    title: 'Progreso',
    description:
      'Guarda tus logros y observa cómo mejoras con el tiempo, motivándote a seguir aprendiendo.',
  },
  {
    icon: <SparklesIcon className="w-12 h-12 text-white" />,
    title: 'Accesible',
    description:
      'Diseñado para ser usado en cualquier lugar, incluso sin conexión constante a internet.',
  },
];

/**
 * Sección "¿Cómo funciona?" con las características principales del juego
 */
const HowItWorks: FC = () => (
  <section className="pt-16 md:pt-20 lg:pt-28 pb-16 md:pb-20 lg:pb-28 bg-gray-900 text-center text-white">
    <div className="container mx-auto px-4">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold !leading-tight text-white sm:text-4xl md:text-[45px]">
          ¿Cómo funciona?
        </h2>
        <p className="text-base !leading-relaxed text-blue-100 md:text-lg">
          Descubre las características principales del juego
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-8 rounded-xl border border-blue-400/20 text-left flex flex-col items-center transform hover:scale-105 transition-all duration-300 hover:border-blue-400/40"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold mb-3 text-white">
              {feature.title}
            </h3>
            <p className="text-blue-100 text-center leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
