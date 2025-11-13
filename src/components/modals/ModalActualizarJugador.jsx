import React, { useState } from "react";

const ModalActualizarJugador = ({ isOpen, onClose, jugador, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: jugador?.username || "",
    fecha_nacimiento: jugador?.fecha_nacimiento || "",
  });

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
    <div className="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8 relative">
        {/* Encabezado */}
        <div className="flex items-center">
          <h3 className="text-blue-600 text-xl font-semibold flex-1">
            Actualizar Jugador
          </h3>
          <button
            onClick={onClose}
            className="w-4 h-4 ml-2 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500"
          >
            ✕
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          <div>
            <label className="text-slate-900 text-sm mb-2 block">
              Nombre del jugador
            </label>
            <input
              type="text"
              name="username"
              value={jugador?.username}
              onChange={handleChange}
              placeholder="Ingrese el nombre"
              className="px-4 py-3 bg-gray-100 w-full text-slate-900 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
            />
          </div>

          <div>
            <label className="text-slate-900 text-sm mb-2 block">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              name="fecha_nacimiento"
              value={jugador?.fecha_nacimiento}
              onChange={handleChange}
              className="px-4 py-3 bg-gray-100 w-full text-slate-900 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
            />
          </div>

          <div>
            <label className="text-slate-900 text-sm mb-2 block">
              Estado
            </label>
            <input
              type="text"
              name="Estado"
              value={jugador?.Estado}
              onChange={handleChange}
              className="px-4 py-3 bg-gray-100 w-full text-slate-900 text-sm border-none focus:outline-blue-600 focus:bg-transparent rounded-lg"
            />
          </div>

          <div className="flex gap-4 mt-8">
            <button
              type="submit"
              className="px-6 py-3 rounded-lg cursor-pointer text-white text-sm font-medium border-none outline-none tracking-wide bg-blue-600 hover:bg-blue-700"
            >
              Actualizar
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg cursor-pointer text-slate-900 text-sm font-medium border-none outline-none tracking-wide bg-gray-200 hover:bg-gray-300"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalActualizarJugador;
