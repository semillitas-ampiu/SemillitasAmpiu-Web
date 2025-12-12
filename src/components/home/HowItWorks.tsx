import type { FC, ReactNode } from 'react';
import { 
  PuzzlePieceIcon, 
  ChatBubbleLeftRightIcon, 
  ChartBarIcon, 
  SparklesIcon 
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
    description: 'Aprende palabras y frases en Ampiu Wam mientras te diviertes con mini-juegos.',
  },
  {
    icon: <ChatBubbleLeftRightIcon className="w-12 h-12 text-white" />,
    title: 'Historias y leyendas',
    description: 'Descubre las tradiciones de Ambaló a través de relatos culturales adaptados para niños.',
  },
  {
    icon: <ChartBarIcon className="w-12 h-12 text-white" />,
    title: 'Progreso',
    description: 'Guarda tus logros y observa cómo mejoras con el tiempo, motivándote a seguir aprendiendo.',
  },
  {
    icon: <SparklesIcon className="w-12 h-12 text-white" />,
    title: 'Accesible',
    description: 'Diseñado para ser usado en cualquier lugar, incluso sin conexión constante a internet.',
  },
];

/**
 * Sección "¿Cómo funciona?" con las características principales del juego
 */
const HowItWorks: FC = () => (
  <section className="py-20 px-8 bg-indigo-900/30 text-center text-white">
    <h2 className="text-3xl font-bold mb-12">¿Cómo funciona?</h2>
    <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
      {features.map((feature, index) => (
        <div 
          key={index} 
          className="bg-white/10 p-8 rounded-xl backdrop-blur-sm text-left flex flex-col items-center transform hover:scale-105 transition-transform duration-300"
        >
          <div className="mb-4">{feature.icon}</div>
          <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
          <p className="text-blue-100 text-center">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default HowItWorks;
