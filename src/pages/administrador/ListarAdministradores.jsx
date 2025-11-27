import { useState, useEffect } from "react";
import useGetRequest from "../../hooks/useGetRequest";
import ModalAgregarAdministrador from "../../components/modals/ModalAgregarAdministrador";

const ListarAdministradores = () => {
  const { getData, data: administradores, error, loading } = useGetRequest();

  const [mostrarModalAdmin, setMostrarModalAdmin] = useState(false);

  useEffect(() => {
    getData("administrador");
  }, []);

  const handleAdminCreated = () => {
    // volver a pedir la lista al backend
    getData("administrador");
  };

  if (loading)
    return (
      <p className="text-center text-gray-400">cargando Administradores...</p>
    );
  if (error)
    return (
      <p className="text-center text-red-500">
        Error al cargar: {error?.error || "error desconocido"}
      </p>
    );

  return (
    <div className="space-y-6 pt-11">


      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        {/* Card Header */}
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Lista de Administradores
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <table className="min-w-full">
                  {/* Table Header */}
                  <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                    <tr>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Nombres y Apellidos
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Correo
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Fecha de Nacimiento
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {administradores.map((admin) => (
                      <tr key={admin.id}>
                        <td className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {admin.first_name} {admin.last_name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {admin.email}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {admin.fecha_nacimiento}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
                <div className="flex justify-end mb-4 px-6">
                  <button
                    onClick={() => setMostrarModalAdmin(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                  >
                    + Agregar Administrador
                  </button>
                </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalAgregarAdministrador
        isOpen={mostrarModalAdmin}
        onClose={() => setMostrarModalAdmin(false)}
        onAdminCreated={handleAdminCreated}
      />
    </div>
  );
};

export default ListarAdministradores;
