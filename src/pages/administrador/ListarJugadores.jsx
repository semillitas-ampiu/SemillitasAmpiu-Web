import { useEffect, useState, useCallback, useRef } from 'react';
import useGetRequest from '../../hooks/useGetRequest';
import useDeleteRequest from '../../hooks/useDeleteRequest';
import usePutRequest from '../../hooks/usePutRequest';
import { FaInfoCircle } from 'react-icons/fa';
import { MdUpdate, MdDelete } from 'react-icons/md';
import ModalActualizarJugador from '../../components/modals/ModalActualizarJugador';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { CircleEllipsis } from "lucide-react";

const ListarJugadores = () => {
  const { getData, data: jugadores, error, loading } = useGetRequest();
  const { deleteData } = useDeleteRequest();
  const { putData } = usePutRequest();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
  const [listaJugadores, setListaJugadores] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔹 Estados SOLO del menú (igual que Administradores)
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuJugadorId, setMenuJugadorId] = useState(null);
  const [menuPos, setMenuPos] = useState({ x: 0, y: 0 });
  const menuRef = useRef(null);

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

  const abrirModalActualizar = useCallback((jugador) => {
    setJugadorSeleccionado(jugador);
    setMostrarModal(true);
  }, []);

  // 🔹 Abrir menú: hacia la izquierda y pegado al botón
  const abrirMenu = (jugadorId, event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;

    setMenuPos({
      x: rect.left - 170,
      y: rect.top + scrollY - 5,
    });

    setMenuJugadorId(jugadorId);
    setMenuVisible(true);
  };

  const handleOpenActualizar = (jugador) => {
    abrirModalActualizar(jugador);
    setMenuVisible(false);
  };

  const handleUpdate = async (formData) => {
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

  const handleDelete = async (id) => {
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
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  if (loading)
    return <p className="text-center text-gray-400">cargando Jugadores...</p>;
  if (error)
    return (
      <p className="text-center text-red-500">
        Error al cargar: {error?.error || 'error desconocido'}
      </p>
    );

  return (
    <div className="space-y-6 pt-11">
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Lista de jugadores
          </h3>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-gray-100 dark:border-white/[0.05]">
                    <tr>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        ID
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Nombre de Jugador
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        fecha de nacimiento
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {jugadoresPaginados.map((jugador) => (
                      <tr key={jugador.id}>
                        <td className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {jugador?.id}
                          </span>
                        </td>

                        <td className="px-5 py-4 sm:px-6 text-start">
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {jugador?.username}
                          </span>
                        </td>

                        <td className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                          {jugador?.fecha_nacimiento}
                        </td>

                        {/* 🔹 Acciones con menú desplegable */}
                        <td className="px-4 py-3 text-center relative text-gray-300">
                          <button
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

              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4 mb-4">
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50 bg-gray-200"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        className={`px-3 py-1 rounded ${
                          page === currentPage
                            ? 'bg-gray-200 font-semibold'
                            : ''
                        }`}
                        onClick={() => goToPage(page)}
                      >
                        {page}
                      </button>
                    )
                  )}

                  <button
                    className="px-3 py-1 border rounded disabled:opacity-50 bg-gray-200"
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

      {/* 🔹 Menú flotante (igual que Administradores) */}
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
                onClick={() => handleDelete(menuJugadorId)}
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
