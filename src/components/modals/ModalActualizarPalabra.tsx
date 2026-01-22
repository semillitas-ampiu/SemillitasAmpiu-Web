import type { ChangeEvent, FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import usePutRequest from '@/hooks/usePutRequest';
import type { Palabra, ActualizarPalabraPayload, ApiError } from '@/types';

interface ModalActualizarPalabraProps {
  isOpen: boolean;
  onClose: () => void;
  palabra: Palabra | null;
  onUpdated?: (updated: Palabra) => void;
}

const ModalActualizarPalabra: FC<ModalActualizarPalabraProps> = ({
  isOpen,
  onClose,
  palabra,
  onUpdated,
}) => {
  const { putData, response, error, loading, clearState } = usePutRequest<Palabra>();
  const [datos, setDatos] = useState<ActualizarPalabraPayload>({
    pal_ampiu: '',
    pal_espanol: '',
    nivel: 1,
  });

  useEffect(() => {
    if (palabra) {
      setDatos({
        pal_ampiu: palabra.pal_ampiu ?? '',
        pal_espanol: palabra.pal_español ?? '',
        nivel: palabra.nivel ?? 1,
      });
    }
  }, [palabra]);

  useEffect(() => {
    if (response) {
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Palabra actualizada correctamente',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
      if (onUpdated) onUpdated(response);
      clearState();
      onClose();
    }
  }, [response, onUpdated, onClose, clearState]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatos((prev) => ({
      ...prev,
      [name]: name === 'nivel' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!palabra) return;
    await putData('palabra', palabra.id, datos);
  };

  const getErrorMessage = (err: ApiError): string => {
    if (err.error) return err.error;
    if (err.mensaje) return err.mensaje;
    if (err.detail) return err.detail;
    return 'Error al actualizar la palabra';
  };

  if (!isOpen || !palabra) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Fondo oscuro */}
      <button
        type="button"
        className="fixed inset-0 bg-black/70 cursor-default"
        onClick={onClose}
        onKeyDown={(e) => e.key === 'Escape' && onClose()}
        aria-label="Cerrar modal"
      />
      <div className="relative z-[10000] w-full max-w-lg">
        <div className="rounded-2xl border border-gray-800 bg-gray-900 shadow-2xl">
          {/* Card Header */}
          <div className="px-6 py-5 flex items-center border-b border-gray-800">
            <h3 className="text-base font-medium text-white flex-1">
              Editar Palabra
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 text-gray-400 hover:text-red-400 text-xl font-bold"
            >
              ✕
            </button>
          </div>
          {/* Card Body */}
          <div className="p-4 border-t border-gray-800 sm:p-6">
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="pal_espanol" className="mb-1.5 block text-sm font-medium text-white/90">
                    Español
                  </label>
                  <input
                    type="text"
                    name="pal_espanol"
                    id="pal_espanol"
                    className="form-control border border-gray-700 rounded p-2 w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Palabra en español"
                    value={datos.pal_espanol}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="pal_ampiu" className="mb-1.5 block text-sm font-medium text-white/90">
                    Ampiu-wam
                  </label>
                  <input
                    type="text"
                    name="pal_ampiu"
                    id="pal_ampiu"
                    className="form-control border border-gray-700 rounded p-2 w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Traducción en Ampiu-wam"
                    value={datos.pal_ampiu}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="nivel" className="mb-1.5 block text-sm font-medium text-white/90">
                    Nivel
                  </label>
                  <input
                    type="number"
                    name="nivel"
                    id="nivel"
                    min={1}
                    className="form-control border border-gray-700 rounded p-2 w-full bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Nivel"
                    value={datos.nivel}
                    onChange={handleChange}
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-400 text-xs">{getErrorMessage(error)}</p>
                )}
                <div className="mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full disabled:opacity-60"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalActualizarPalabra;
