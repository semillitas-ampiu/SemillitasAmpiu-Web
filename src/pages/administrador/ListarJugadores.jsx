import { useEffect, useState, useCallback } from 'react';
import useGetRequest from '../../hooks/useGetRequest';
import useDeleteRequest from '../../hooks/useDeleteRequest';
import usePutRequest from '../../hooks/usePutRequest';
import { FaInfoCircle } from 'react-icons/fa';
import { MdUpdate, MdDelete } from 'react-icons/md';
import ModalActualizarJugador from '../../components/modals/modalActualizarJugador';
import Detalles from './Detalles';
import { Link } from 'react-router-dom';

const ListarJugadores = () => {
  const { getData, data: jugadores, error, loading } = useGetRequest();
  const { deleteData } = useDeleteRequest();
  const { putData } = usePutRequest();
  const [mostrarModal, setMostrarModal] = useState(false);
  const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
  const [listaJugadores, setListaJugadores] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const controller = new AbortController();
    getData('jugador', null, '', controller.signal);

    return () => {
      controller.abort();
    };
  }, [getData]);

  const abrirModalActualizar = useCallback((jugador) => {
    setJugadorSeleccionado(jugador);
    setMostrarModal(true);
  }, []);

  const handleUpdate = async (formData) => {
    if (jugadorSeleccionado) {
      await putData('jugador', jugadorSeleccionado.id, formData);
      setMostrarModal(false);
      setJugadorSeleccionado(null);
      const controller = new AbortController();
      getData('jugador', null, '', controller.signal);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este jugador?')) {
      await deleteData('jugador', id);
      const controller = new AbortController();
      getData('jugador', null, '', controller.signal);
    }
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
      <div
        className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]`}
      >
        {/* Card Header */}
        <div className="px-6 py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            Lista de jugadores
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
                        ID
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Nombre de Jugador
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        fecha de nacimiento
                      </th>
                      <th className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                        Acciones
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
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
                        <td className="px-2 py-2 text-sm">
                          <Link
                            to={`/detalles/${jugador.id}`}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded-md transition inline-block"
                          >
                            <FaInfoCircle size={22} />
                          </Link>

                          <button
                            onClick={() => abrirModalActualizar(jugador)}
                            className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md transition"
                          >
                            <MdUpdate size={22} />
                          </button>

                          <button
                            onClick={() => handleDelete(jugador.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md transition ml-2"
                          >
                            <MdDelete size={22} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/*Control de paginación*/}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-4 mb-4">
                  <button
                    className="px-3 py-1 border rounded disabled:opacity-100 bg-gray-200"
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
                            ? "bg-gray-200 font-semibold"
                            : ""
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
      {mostrarModal && (
        <ModalActualizarJugador
          isOpen={mostrarModal}
          onClose={() => setMostrarModal(false)}
          jugador={jugadorSeleccionado}
          onSubmit={handleUpdate}
        />
      )}
    </div>
  );
};

export default ListarJugadores;
