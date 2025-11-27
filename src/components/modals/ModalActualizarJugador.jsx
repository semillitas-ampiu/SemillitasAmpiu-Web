import React, { useState, useEffect } from 'react';

const ModalActualizarJugador = ({ isOpen, onClose, jugador, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '',
    fecha_nacimiento: '',
  });

  useEffect(() => {
    if (jugador) {
      setFormData({
        username: jugador.username || '',
        fecha_nacimiento: jugador.fecha_nacimiento || '',
      });
    }
  }, [jugador]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Fondo oscuro detrás del modal */}
      <div
        className="fixed inset-0 bg-black/70"
        onClick={onClose}
      ></div>

      <div className="relative z-[10000] w-full max-w-lg">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
          {/* Encabezado */}
          <div className="px-6 py-4 flex items-center border-b border-slate-700">
            <h3 className="text-base font-medium text-white flex-1">
              Actualizar Jugador
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 text-slate-400 hover:text-red-400 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Formulario */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-200">
                  Nombre del jugador
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Ingrese el nombre"
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-200">
                  Fecha de nacimiento
                </label>
                <input
                  type="date"
                  name="fecha_nacimiento"
                  value={formData.fecha_nacimiento}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 text-sm font-medium text-slate-100"
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
