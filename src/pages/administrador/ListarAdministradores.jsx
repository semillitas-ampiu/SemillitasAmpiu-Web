import { useState, useEffect, useRef } from "react";
import useGetRequest from "../../hooks/useGetRequest";
import useDeleteRequest from "../../hooks/useDeleteRequest";
import ModalAgregarAdministrador from "../../components/modals/ModalAgregarAdministrador";
import ModalActualizarAdministrador from "../../components/modals/ModalActualizarAdministrador";
import { CircleEllipsis } from "lucide-react";
import Swal from "sweetalert2";

const ListarAdministradores = () => {
  const { deleteData } = useDeleteRequest();
  const { getData, data: administradores, error, loading } = useGetRequest();

  const [mostrarModalAdmin, setMostrarModalAdmin] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [adminSeleccionado, setAdminSeleccionado] = useState(null);

  // 🔹 Estados SOLO del menú
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuAdminId, setMenuAdminId] = useState(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

  useEffect(() => {
    getData("administrador");
  }, []);

  const handleAdminCreated = () => {
    getData("administrador");
  };

  const handleAdminUpdated = () => {
    getData("administrador");
  };

  // 🔹 Abrir menú: hacia la izquierda y pegado al botón
  const abrirMenu = (adminId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;

    setMenuPos({
      x: rect.left - 170,        // hacia la izquierda (≈ ancho del menú)
      y: rect.top + scrollY - 5, // un poco más arriba, pegado al botón
    });

    setMenuAdminId(adminId);
    setMenuVisible(true);
  };

  const handleOpenEditar = (admin) => {
    setAdminSeleccionado(admin);
    setMostrarModalEditar(true);
    setMenuVisible(false);
  };

  const handleDelete = async (id) => {
    setMenuVisible(false);

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el administrador de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#0f172a',
      color: '#e2e8f0',
      backdrop: 'rgba(0,0,0,0.7)',
    });

    if (!result.isConfirmed) return;

    try {
      await deleteData('administrador', id);

      const controller = new AbortController();
      getData('administrador', null, '', controller.signal);

      await Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Eliminado',
        text: 'El administrador ha sido eliminado correctamente.',
        icon: 'success',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) { 
      console.error(err);
      Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Error',
        text: 'No se pudo eliminar el administrador. Inténtalo de nuevo.',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // 🔹 Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
                      <th className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                        Acciones
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
                        <td className="px-4 py-3 text-center relative text-gray-300">
                          <button
                            onClick={(e) => abrirMenu(admin.id, e)}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <CircleEllipsis size={20} />
                          </button>
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

      {/* 🔹 Menú flotante hacia la izquierda */}
      {menuVisible && (
        <div
          ref={menuRef}
          className="fixed z-[9999] w-40 bg-white rounded-md shadow-lg dark:bg-gray-800 border dark:border-gray-700 text-start"
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          <ul className="py-1">
            <li>
              <button
                onClick={() =>
                  handleOpenEditar(
                    administradores.find((a) => a.id === menuAdminId)
                  )
                }
                className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Actualizar
              </button>
            </li>
            <li>
              <button
                onClick={() => handleDelete(menuAdminId)}
                className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Eliminar
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Modal Agregar */}
      <ModalAgregarAdministrador
        isOpen={mostrarModalAdmin}
        onClose={() => setMostrarModalAdmin(false)}
        onAdminCreated={handleAdminCreated}
      />

      {/* Modal Editar */}
      <ModalActualizarAdministrador
        isOpen={mostrarModalEditar}
        onClose={() => setMostrarModalEditar(false)}
        admin={adminSeleccionado}
        onAdminUpdated={handleAdminUpdated}
      />
    </div>
  );
};

export default ListarAdministradores;
