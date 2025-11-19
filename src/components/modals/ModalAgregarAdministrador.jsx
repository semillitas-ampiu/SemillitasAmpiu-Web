import React, { useState, useEffect } from "react";
import usePostRequest from "../../hooks/usePostRequest";
import { getApiUrl } from "../../utils/apiConfig";

const ModalAgregarAdministrador = ({ isOpen, onClose }) => {
  const { postData, response, error, loading, clearState } = usePostRequest();

  // 1. Estado: Definir solo los campos necesarios (sin password, que se genera en el backend)
  const [datos, setDatos] = useState({
    // Campos del Usuario (requeridos para la creación anidada)
    fecha_nacimiento: "",
    first_name: "",
    last_name: "",
    email: "",
    // Campos del Jugador
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 2. Estructurar el payload ANIDADO, tal como lo espera JugadorSerializer:
    const payload = {
      // Objeto anidado: clave 'usuario_id' para el Serializer anidado

      // NOTA CLAVE: Tu UsuariosSerializer no permite omitir 'password'.
      // Debemos enviar un valor, aunque el backend lo sobrescriba.
      // Usaremos un valor temporal para pasar la validación inicial del Serializer anidado.
      //password: '1234',
      first_name: datos.first_name,
      last_name: datos.last_name,
      email: datos.email,
      fecha_nacimiento: datos.fecha_nacimiento,
    };

    // 3. Enviar al endpoint de creación de Jugadores
    const url = getApiUrl("administrador/");
    await postData(url, payload);

    // 4. Lógica de respuesta
  };

  useEffect(() => {
    // Ejecuta la lógica solo si NO estamos cargando
    if (!loading) {
      // Lógica de éxito: response tiene datos y contiene el mensaje de éxito del backend
      if (
        response &&
        response.mensaje &&
        response.mensaje.includes("creado correctamente")
      ) {
        // Muestra la alerta
        alert(
          `Administrador ${response.data.username} creado con éxito. Las credenciales han sido enviadas a ${response.data.email}.`
        );

        // Limpiar formulario
        setDatos({
          fecha_nacimiento: "",
          first_name: "",
          last_name: "",
          email: "",
        });

        // 🛑 CLAVE FINAL: Limpia la respuesta para evitar el doble disparo en el siguiente clic.
        clearState();

        if (onClose) onClose();
      }
      // Lógica de error
      else if (error) {
        console.error("Error al crear Administrador:", error);

        // Determina el mensaje de error para la alerta
        const erroresDetallados = error.errores
          ? JSON.stringify(error.errores)
          : "Error desconocido.";
        alert(
          `Error al registrar: ${
            error.mensaje || "Error desconocido."
          }\nDetalles: ${erroresDetallados}`
        );

        // Opcional: limpiar el error después de mostrarlo.
        clearState();
      }
    }
  }, [response, error, loading, clearState, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* Fondo oscuro */}
      <div
        className="fixed inset-0 bg-black/70"
        onClick={onClose}
      ></div>

      <div className="relative z-[10000] w-full max-w-lg">
        <div className="rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl">
          {/* Card Header */}
          <div className="px-6 py-5 flex items-center border-b border-slate-700">
            <h3 className="text-base font-medium text-white flex-1">
              Registrar Nuevo Administrador
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 text-slate-400 hover:text-red-400 text-xl font-bold"
            >
              ✕
            </button>
          </div>

          {/* Card Body */}
          <div className="p-4 border-t border-slate-800 sm:p-6">
            <div className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Campos del Usuario */}

                <div>
                  <label
                    htmlFor="first_name"
                    className="mb-1.5 block text-sm font-medium text-slate-200"
                  >
                    Nombre
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      placeholder="Pedro"
                      className="form-control border border-slate-600 rounded p-2 w-full bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={datos.first_name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <label
                    htmlFor="last_name"
                    className="mb-1.5 block text-sm font-medium text-slate-200"
                  >
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    id="last_name"
                    className="form-control border border-slate-600 rounded p-2 w-full bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Perez"
                    value={datos.last_name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mt-2">
                  <label
                    htmlFor="email"
                    className="mb-1.5 block text-sm font-medium text-slate-200"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="example@gmail.com"
                    className="form-control border border-slate-600 rounded p-2 w-full bg-slate-800 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={datos.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mt-2">
                  <label
                    htmlFor="fecha_nacimiento"
                    className="mb-1.5 block text-sm font-medium text-slate-200"
                  >
                    Fecha de nacimiento
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="fecha_nacimiento"
                      id="fecha_nacimiento"
                      className="form-control border border-slate-600 rounded p-2 w-full bg-slate-800 text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={datos.fecha_nacimiento}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full disabled:opacity-60"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Registrando..." : "Registrar Administrador"}
                  </button>
                </div>

                {/* Indicador de que la contraseña se genera automáticamente */}
                <p className="text-muted mt-2 text-center text-slate-400 text-xs">
                  * La contraseña será generada y enviada al correo electrónico.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAgregarAdministrador;
