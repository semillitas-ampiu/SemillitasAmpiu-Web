import { type ChangeEvent, type FC, type FormEvent, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import usePostRequest from '@/hooks/usePostRequest';
import type { 
  CrearAdministradorPayload, 
  CrearAdministradorResponse, 
  FormDatosAdministrador, 
  ModalAgregarAdministradorProps 
} from '@/types';
import { getApiUrl } from '@/utils/apiConfig';

/**
 * Modal para registrar un nuevo administrador
 * El password se genera automáticamente en el backend y se envía al email
 */
const ModalAgregarAdministrador: FC<ModalAgregarAdministradorProps> = ({ 
  isOpen, 
  onClose, 
  onAdminCreated 
}) => {
  const { postData, response, error, loading, clearState } = usePostRequest<CrearAdministradorResponse>();

  const [datos, setDatos] = useState<FormDatosAdministrador>({
    fecha_nacimiento: '',
    first_name: '',
    last_name: '',
    email: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setDatos((prevDatos) => ({
      ...prevDatos,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const payload: CrearAdministradorPayload = {
      first_name: datos.first_name,
      last_name: datos.last_name,
      email: datos.email,
      fecha_nacimiento: datos.fecha_nacimiento,
    };

    const url = getApiUrl('administrador/');
    await postData(url, payload);
  };

  useEffect(() => {
    if (!loading) {
      if (
        response?.mensaje?.includes('creado correctamente')
      ) {
        Swal.fire({
          toast: true,
          position: 'top-end',
          icon: 'success',
          title: 'Administrador Creado',
          text: `Administrador ${response.data.username} creado con éxito. Las credenciales han sido enviadas a ${response.data.email}.`,
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        setDatos({
          fecha_nacimiento: '',
          first_name: '',
          last_name: '',
          email: '',
        });

        clearState();

        if (onAdminCreated) {
          onAdminCreated(response.data);
        }

        onClose();
      } else if (error) {
        console.error('Error al crear Administrador:', error);

        const erroresDetallados = error.errores
          ? JSON.stringify(error.errores)
          : 'Error desconocido.';
        alert(
          `Error al registrar: ${
            error.mensaje ?? 'Error desconocido.'
          }\nDetalles: ${erroresDetallados}`
        );

        clearState();
      }
    }
  }, [response, error, loading, clearState, onClose, onAdminCreated]);

  if (!isOpen) return null;

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
                    {loading ? 'Registrando...' : 'Registrar Administrador'}
                  </button>
                </div>

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
