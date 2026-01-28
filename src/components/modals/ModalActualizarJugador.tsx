import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useEffect,
  useState,
} from 'react';

import type { FormDatosJugador, ModalActualizarJugadorProps } from '@/types';
import { cn } from '@/utils/cn';

/**
 * Modal para actualizar los datos de un jugador
 */
const ModalActualizarJugador: FC<ModalActualizarJugadorProps> = ({
  isOpen,
  onClose,
  jugador,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<FormDatosJugador>({
    username: '',
    fecha_nacimiento: '',
  });

  useEffect(() => {
    if (jugador) {
      setFormData({
        username: jugador.username ?? '',
        fecha_nacimiento: jugador.fecha_nacimiento ?? '',
      });
    }
  }, [jugador]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Fondo oscuro detrás del modal */}
      <button
        type="button"
        className="fixed inset-0 bg-black/70 cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-label="Cerrar modal"
      />

      <div
        className={cn(
          'relative z-[10000] w-[calc(100%-2rem)] max-w-lg mx-auto'
        )}
      >
        <div className="rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl">
          {/* Encabezado */}
          <div className="px-6 py-4 flex items-center border-b border-gray-800">
            <h3 className="text-base font-medium text-white flex-1">
              Actualizar Jugador
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 text-gray-400 hover:text-red-400 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Formulario */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="mb-1.5 block text-sm font-medium text-white/90"
                >
                  Nombre del jugador
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="fecha_nacimiento_jugador"
                  className="mb-1.5 block text-sm font-medium text-white/90"
                >
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  id="fecha_nacimiento_jugador"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm font-medium text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-sm font-semibold text-white"
                >
                  Actualizar jugador
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalActualizarJugador;
