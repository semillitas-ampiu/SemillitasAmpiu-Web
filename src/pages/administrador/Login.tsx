import {
  type ChangeEvent,
  type FC,
  type FormEvent,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

import { AuthContext } from '@/context/authContext';
import type { Credenciales, LoginResponse } from '@/types';
import { getApiUrl } from '@/utils/apiConfig';

/**
 * Página de login para administradores
 * Incluye toggle de visibilidad de password
 */
const AdminLogin: FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const [mensaje, setMensaje] = useState<string>('');
  const [credenciales, setCredenciales] = useState<Credenciales>({
    username: '',
    password: '',
  });
  const [mostrarPassword, setMostrarPassword] = useState<boolean>(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const message = query.get('message');
    if (message) {
      setMensaje(message);
      const timer = setTimeout(() => {
        setMensaje('');
      }, 7200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [location]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoadingBtn(true);
    try {
      const response = await fetch(getApiUrl('token/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales),
      });
      const respuesta: LoginResponse = await response.json();
      authContext?.login(respuesta);

      const rol = respuesta.user.rol;
      console.log(rol);

      if (rol === 'Admin') {
        navigate('/dashboard');
      }
    } catch (error) {
      setMensaje(
        `credenciales invalidas${
          error instanceof Error ? `: ${error.message}` : ''
        }`
      );
      setTimeout(() => {
        setMensaje('');
      }, 7200);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-gray-900">
      {/* ======================= SECCIÓN FORMULARIO ======================= */}
      <div className="flex flex-col flex-1">
        <div className="w-full max-w-md pt-10 mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            <span className="mr-1">←</span>
            Volver al inicio
          </Link>
        </div>
        <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
          <div>
            <div className="mb-5 sm:mb-8">
              <h1 className="mb-2 font-semibold text-gray-800 text-3xl dark:text-white/90 sm:text-4xl">
                Iniciar Sesión
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Ingresa tus credenciales para iniciar sesión
              </p>
            </div>

            {/* MENSAJE */}
            {mensaje && (
              <div
                role="alert"
                className="mb-5 p-3 text-sm rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
              >
                {mensaje}
              </div>
            )}

            <div>
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="username"
                      type="text"
                      name="username"
                      placeholder="info@gmail.com"
                      onChange={handleChange}
                      required
                      value={credenciales.username}
                      className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        type={mostrarPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Enter your password"
                        onChange={handleChange}
                        required
                        value={credenciales.password}
                        className="w-full px-4 py-3 text-sm border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      />
                      <span
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      >
                        {mostrarPassword ? (
                          <EyeOff className="text-gray-500 dark:text-gray-400 size-5" />
                        ) : (
                          <Eye className="text-gray-500 dark:text-gray-400 size-5" />
                        )}
                      </span>
                    </div>
                  </div>

                  {/* SUBMIT BUTTON */}
                  <div>
                    <button
                      type="submit"
                      disabled={loadingBtn}
                      className={`w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                        loadingBtn ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                    >
                      {loadingBtn ? 'Cargando...' : 'Iniciar Sesión'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ======================= SECCIÓN DERECHA ======================= */}
      <aside
        aria-label="Panel informativo Semillitas Ampiu"
        className="hidden md:flex w-1/2 bg-[#0B1437] items-center justify-center relative"
      >
        <div className="absolute inset-0 opacity-20 bg-grid-white" />
        <section className="text-center z-10 px-8">
          <h2 className="text-3xl font-semibold text-white">
            Semillitas Ampiu
          </h2>
          <p className="text-gray-300 mt-2 text-sm leading-relaxed">
            Este proyecto fue desarrollado con mucho cariño por el equipo de
            Ampiü Wan con la colaboración de la comunidad Ambaló.
          </p>
        </section>
      </aside>
    </main>
  );
};

export default AdminLogin;
