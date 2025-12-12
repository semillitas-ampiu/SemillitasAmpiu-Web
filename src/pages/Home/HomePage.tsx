import type { FC } from 'react';

import About from '@/components/home/About';
import Hero from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import { useScrollToTop } from '@/hooks/home/useScrollToTop';

/**
 * Página principal del sitio web público
 * Muestra hero, about y features del juego Ampiu
 */
const HomePage: FC = () => {
  useScrollToTop();

  return (
    <main className="w-full text-white bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-800">
      <Hero />
      <About />
      <HowItWorks />
    </main>
  );
};

export default HomePage;
