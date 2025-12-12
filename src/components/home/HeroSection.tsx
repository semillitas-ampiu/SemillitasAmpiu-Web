import type { FC } from 'react';
import type { Settings } from 'react-slick';
import Slider from 'react-slick';
import { SparklesIcon } from '@heroicons/react/24/solid';

import pantalla1 from '@/assets/photos/pantalla1.png';
import pantalla2 from '@/assets/photos/pantalla2.png';
import pantalla3 from '@/assets/photos/pantalla3.png';
import pantalla4 from '@/assets/photos/pantalla4.png';
import pantalla5 from '@/assets/photos/pantalla5.png';

// =======================================================
// 🟢 CONFIGURACIÓN DE LA DESCARGA
// =======================================================
interface ApkDownloadConfig {
  /** ID extraído del enlace de Google Drive */
  googleDriveId: string;
  /** Nombre que se sugiere para el archivo descargado */
  nombreArchivo: string;
}

const APK_DOWNLOAD_CONFIG: ApkDownloadConfig = {
  googleDriveId: '10R6uA96bW6IOX06P-VtEjYxZg8jleVL7',
  nombreArchivo: 'game_semillitas_ampiu.apk',
};
// =======================================================

const downloadUrl = `https://drive.google.com/uc?export=download&id=${APK_DOWNLOAD_CONFIG.googleDriveId}`;

/**
 * Hero section con carrusel de imágenes y botón de descarga del APK
 */
const Hero: FC = () => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };

  const images: string[] = [pantalla1, pantalla2, pantalla3, pantalla4, pantalla5];

  return (
    <section className="relative min-h-[90vh] text-center text-white overflow-hidden">
      <Slider {...settings} className="absolute inset-0 w-full h-full">
        {images.map((img, index) => (
          <div key={index}>
            <div
              className="w-full h-full min-h-[90vh] bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          </div>
        ))}
      </Slider>
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[90vh] px-6">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            ¡Bienvenid@s a <span className="text-blue-200">Ampiü</span>!{' '}
            <SparklesIcon className="w-12 h-12 inline-block text-blue-200" />
          </h1>
          <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed">
            Aprende el idioma indígena <strong>Ambaló</strong> y descubre la
            riqueza de su cultura a través de juegos y actividades divertidas.
          </p>
          <a
            href={downloadUrl}
            download={APK_DOWNLOAD_CONFIG.nombreArchivo}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-indigo-700 px-8 py-4 rounded-lg font-semibold shadow-lg hover:bg-indigo-100 transition"
          >
            Descargar juego (APK para Android)
          </a>
          <p className="mt-4 text-sm text-blue-100/80 font-medium">
            * Descarga e instala el archivo APK directamente en tu dispositivo
            Android.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
