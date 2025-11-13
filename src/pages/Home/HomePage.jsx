import React from "react";
import { useScrollToTop } from "../../hooks/home/useScrollToTop";

import Hero from "../../components/home/HeroSection";
import About from "../../components/home/About";
import HowItWorks from "../../components/home/HowItWorks";

const HomePage = () => {
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
