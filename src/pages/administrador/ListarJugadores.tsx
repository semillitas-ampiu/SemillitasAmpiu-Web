import {
  type MouseEvent,
  type ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { FaInfoCircle } from 'react-icons/fa';
import { MdDelete, MdUpdate } from 'react-icons/md';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CircleEllipsis } from 'lucide-react';

import ModalActualizarJugador from '@/components/modals/ModalActualizarJugador';
import useDeleteRequest from '@/hooks/useDeleteRequest';
import useGetRequest from '@/hooks/useGetRequest';
import usePutRequest from '@/hooks/usePutRequest';
import type { ActualizarJugadorPayload, ApiError, Jugador } from '@/types';
import { cn } from '@/utils/cn';

interface MenuPosition {
  x: number;
  y: number;
}

const ListarJugadores = (): ReactElement => {
  const { getData, data: jugadores, error, loading } = useGetRequest<Jugador>();
  const { deleteData } = useDeleteRequest();
  const { putData } = usePutRequest<Jugador>();

  const [mostrarModal, setMostrarModal] = useState<boolean>(false);
  const [jugadorSeleccionado, setJugadorSeleccionado] =
    useState<Jugador | null>(null);
  const [listaJugadores, setListaJugadores] = useState<Jugador[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  // Estados del menú (igual que Administradores)
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuJugadorId, setMenuJugadorId] = useState<number | null>(null);
  const [menuPos, setMenuPos] = useState<MenuPosition>({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    getData('jugador', null, '', controller.signal);

    return () => {
      controller.abort();
    };
  }, [getData]);

  useEffect(() => {
    if (jugadores) {
      setListaJugadores(jugadores);
      setCurrentPage(1);
    }
  }, [jugadores]);

  const totalPages = Math.ceil(listaJugadores.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const jugadoresPaginados = listaJugadores.slice(indexOfFirst, indexOfLast);

  const abrirModalActualizar = useCallback((jugador: Jugador): void => {
    setJugadorSeleccionado(jugador);
    setMostrarModal(true);
  }, []);

  // Abrir menú: hacia la izquierda y pegado al botón
  const abrirMenu = (
    jugadorId: number,
    event: MouseEvent<HTMLButtonElement>
  ): void => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;

    setMenuPos({
      x: rect.left - 170,
      y: rect.top + scrollY - 5,
    });

    setMenuJugadorId(jugadorId);
    setMenuVisible(true);
  };

  const handleOpenActualizar = (jugador: Jugador | undefined): void => {
    if (jugador) {
      abrirModalActualizar(jugador);
    }
    setMenuVisible(false);
  };

  const handleUpdate = async (
    formData: ActualizarJugadorPayload
  ): Promise<void> => {
    if (!jugadorSeleccionado) return;

    try {
      await putData('jugador', jugadorSeleccionado.id, formData);

      const controller = new AbortController();
      getData('jugador', null, '', controller.signal);

      setMostrarModal(false);
      setJugadorSeleccionado(null);

      await Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Actualizado',
        text: 'El jugador se actualizó correctamente.',
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
        text: 'No se pudo actualizar el jugador.',
        icon: 'error',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setMenuVisible(false);

    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará el jugador de forma permanente.',
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
      await deleteData('jugador', id);

      const controller = new AbortController();
      getData('jugador', null, '', controller.signal);

      await Swal.fire({
        toast: true,
        position: 'top-end',
        title: 'Eliminado',
        text: 'El jugador ha sido eliminado correctamente.',
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
        text: 'No se pudo eliminar el jugador. Inténtalo de nuevo.',
        icon: 'error',
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      });
    }
  };

  // 🔹 Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleNextPage = (): void => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const goToPage = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-400">cargando Jugadores...</p>;
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
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-white/90">
            Lista de jugadores
          </h3>
        </div>

        <div className="p-4 border-t border-gray-800 sm:p-6">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-white/[0.05] bg-white/[0.03]">
              {/* Vista mobile: Cards */}
              <div className="md:hidden divide-y divide-white/[0.05]">
                {jugadoresPaginados.map((jugador) => (
                  <div
                    key={jugador.id}
                    className="p-4 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-white/90 truncate">
                        {jugador.username}
                      </p>
                      <p className="text-sm text-gray-400">
                        ID: {jugador.id} • {jugador.fecha_nacimiento}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => abrirMenu(jugador.id, e)}
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
                  <thead className="border-b border-white/[0.05]">
                    <tr>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        ID
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        Nombre de Jugador
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-400 text-start text-theme-xs">
                        fecha de nacimiento
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-white/[0.05]">
                    {jugadoresPaginados.map((jugador) => (
                      <tr key={jugador.id}>
                        <td className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-white/90 text-theme-sm">
                            {jugador?.id}
                          </span>
                        </td>

                        <td className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-white/90 text-theme-sm">
                            {jugador?.username}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-gray-400 text-start text-theme-sm">
                          {jugador?.fecha_nacimiento}
                        </td>

                        {/* Acciones con menú desplegable */}
                        <td className="px-4 py-3 text-center relative text-gray-300">
                          <button
                            type="button"
                            onClick={(e) => abrirMenu(jugador.id, e)}
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

              {/* Paginación - visible en ambas vistas */}
              {totalPages > 1 && (
                <div className={cn(
                  'flex items-center justify-center gap-2 py-4 px-4',
                  'border-t border-white/[0.05]'
                )}>
                  <button
                    type="button"
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-lg transition',
                      'bg-gray-700 text-white hover:bg-gray-600',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>

                  {/* En mobile, solo mostrar página actual */}
                  <span className="md:hidden text-sm text-gray-400">
                    {currentPage} / {totalPages}
                  </span>

                  {/* En desktop, mostrar todos los números */}
                  <div className="hidden md:flex gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          type="button"
                          key={page}
                          className={cn(
                            'px-3 py-1.5 text-sm rounded-lg transition',
                            page === currentPage
                              ? 'bg-indigo-600 text-white font-semibold'
                              : 'text-gray-400 hover:bg-gray-700'
                          )}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    type="button"
                    className={cn(
                      'px-3 py-1.5 text-sm rounded-lg transition',
                      'bg-gray-700 text-white hover:bg-gray-600',
                      'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Siguiente
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menú flotante (igual que Administradores) */}
      {menuVisible && (
        <div
          ref={menuRef}
          className="fixed z-[9999] w-44 bg-white rounded-md shadow-lg dark:bg-gray-800 border dark:border-gray-700 text-start"
          style={{ top: menuPos.y, left: menuPos.x }}
        >
          <ul className="py-1">
            <li>
              <Link
                to={`/detalles/${menuJugadorId}`}
                onClick={() => setMenuVisible(false)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <FaInfoCircle size={18} />
                Ver detalles
              </Link>
            </li>

            <li>
              <button
                type="button"
                onClick={() =>
                  handleOpenActualizar(
                    jugadoresPaginados.find((j) => j.id === menuJugadorId) ||
                      listaJugadores.find((j) => j.id === menuJugadorId)
                  )
                }
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                <MdUpdate size={18} />
                Actualizar
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => menuJugadorId && handleDelete(menuJugadorId)}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <MdDelete size={18} />
                Eliminar
              </button>
            </li>
          </ul>
        </div>
      )}

      {mostrarModal && (
        <ModalActualizarJugador
          isOpen={mostrarModal}
          onClose={() => {
            setMostrarModal(false);
            setJugadorSeleccionado(null);
          }}
          jugador={jugadorSeleccionado}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default ListarJugadores;
