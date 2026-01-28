import {
  type MouseEvent,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { CircleEllipsis } from 'lucide-react';
import { MdDelete, MdUpdate } from 'react-icons/md';
import Swal from 'sweetalert2';

import ModalActualizarAdministrador from '@/components/modals/ModalActualizarAdministrador';
import ModalAgregarAdministrador from '@/components/modals/ModalAgregarAdministrador';
import useDeleteRequest from '@/hooks/useDeleteRequest';
import useGetRequest from '@/hooks/useGetRequest';
import type { Administrador, ApiError } from '@/types';
import { cn } from '@/utils/cn';

interface MenuPosition {
  x: number;
  y: number;
}

const ListarAdministradores = (): ReactElement => {
  const { deleteData } = useDeleteRequest();
  const {
    getData,
    data: administradores,
    error,
    loading,
  } = useGetRequest<Administrador>();

  const [mostrarModalAdmin, setMostrarModalAdmin] = useState<boolean>(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState<boolean>(false);
  const [adminSeleccionado, setAdminSeleccionado] =
    useState<Administrador | null>(null);

  // Estados del menú
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuAdminId, setMenuAdminId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<MenuPosition>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const fetchAdministradores = useCallback(() => {
    const controller = new AbortController();
    getData('administrador', null, '', controller.signal);
    return controller;
  }, [getData]);

  useEffect(() => {
    const controller = fetchAdministradores();
    return () => {
      controller.abort();
    };
  }, [fetchAdministradores]);

  const handleAdminCreated = (): void => {
    fetchAdministradores();
  };

  const handleAdminUpdated = (): void => {
    fetchAdministradores();
  };

  // Abrir menú: hacia la izquierda y pegado al botón
  const abrirMenu = (
    adminId: number,
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;

    setMenuPos({
      x: rect.left - 170, // hacia la izquierda (≈ ancho del menú)
      y: rect.top + scrollY - 5, // un poco más arriba, pegado al botón
    });

    setMenuAdminId(adminId);
    setMenuVisible(true);
  };

  const handleOpenEditar = (admin: Administrador): void => {
    setAdminSeleccionado(admin);
    setMostrarModalEditar(true);
    setMenuVisible(false);
  };

  const handleDelete = async (id: number): Promise<void> => {
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
      fetchAdministradores();

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

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (loading) {
    return (
      <p className="text-center text-gray-400">cargando Administradores...</p>
    );
  }

  if (error) {
    const apiError = error as ApiError;
    return (
      <p className="text-center text-red-500">
        Error al cargar: {apiError?.error || 'error desconocido'}
      </p>
    );
  }

  return (
    <div className="space-y-6 pt-11">
      <div className="rounded-2xl border border-gray-800 bg-white/[0.03]">
        {/* Card Header */}
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-white/90">
            Lista de Administradores
          </h3>
        </div>

        {/* Card Body */}
        <div className="p-4 border-t border-gray-800 sm:p-6">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.03]">
              {/* Vista mobile: Cards */}
              <div className="md:hidden divide-y divide-white/[0.05]">
                {administradores.map((admin) => (
                  <div
                    key={admin.id}
                    className="p-4 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white/90 truncate">
                        {admin.first_name} {admin.last_name}
                      </p>
                      <p className="text-sm text-gray-400 truncate">
                        {admin.email}
                      </p>
                      <p className="text-xs text-gray-500">
                        {admin.fecha_nacimiento}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => abrirMenu(admin.id, e)}
                      className="p-2 rounded-full hover:bg-gray-700 text-gray-300 flex-shrink-0"
                    >
                      <CircleEllipsis size={20} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Vista desktop: Tabla */}
              <div className="hidden md:block max-w-full overflow-x-auto">
                <table className="min-w-full">
                  {/* Table Header */}
                  <thead className="border-b border-white/[0.05]">
                    <tr>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        Nombres y Apellidos
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        Correo
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        Fecha de Nacimiento
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-400 text-center text-theme-xs">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y divide-white/[0.05]">
                    {administradores.map((admin) => (
                      <tr key={admin.id}>
                        <td className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-white/90 text-theme-sm">
                            {admin.first_name} {admin.last_name}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-start text-theme-sm">
                          {admin.email}
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-start text-theme-sm">
                          {admin.fecha_nacimiento}
                        </td>
                        <td className="px-4 py-3 text-center relative text-gray-300">
                          <button
                            type="button"
                            onClick={(e) => abrirMenu(admin.id, e)}
                            className="p-2 rounded-full hover:bg-gray-700"
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
            <div className={cn('flex justify-end mb-4 px-2 sm:px-6')}>
              <button
                type="button"
                onClick={() => setMostrarModalAdmin(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm sm:text-base"
              >
                + Agregar Administrador
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Menú flotante hacia la izquierda */}
      {menuVisible && (
        <div
          ref={menuRef}
          className="fixed z-[9999] w-44 bg-white rounded-md shadow-lg dark:bg-gray-800 border dark:border-gray-700 text-start"
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          <ul className="py-1">
            <li>
              <button
                type="button"
                onClick={() => {
                  const admin = administradores.find(
                    (a) => a.id === menuAdminId
                  );
                  if (admin) handleOpenEditar(admin);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <MdUpdate size={18} /> Actualizar
              </button>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  if (menuAdminId !== null) handleDelete(menuAdminId);
                }}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <MdDelete size={18} /> Eliminar
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
