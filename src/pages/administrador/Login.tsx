import { type ChangeEvent, type FC, type FormEvent, useContext, useEffect, useState } from 'react';
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
      setMensaje(`credenciales invalidas${error instanceof Error ? `: ${error.message}` : ''}`);
      setTimeout(() => {
        setMensaje('');
      }, 7200);
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col md:flex-row">
      {/* ======================= SECCIÓN IZQUIERDA ======================= */}
      <section
        aria-label="Formulario de inicio de sesión"
        className="flex flex-col justify-center w-full md:w-1/2 px-8 py-12 bg-white"
      >
        <header className="max-w-md w-full mx-auto mb-6">
          <Link
            to="/"
            className="text-sm text-gray-500 hover:text-indigo-600 flex items-center gap-1"
          >
            <span aria-hidden="true">←</span> Volver al inicio
          </Link>
        </header>

        <article className="max-w-md w-full mx-auto space-y-6">
          <header>
            <h1 className="text-3xl font-semibold text-gray-900">
              Iniciar Sesion
            </h1>
            <p className="text-gray-500 mt-1">
              Ingresa tus credenciales para iniciar sesión
            </p>
          </header>

          {/* FORMULARIO PRINCIPAL */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            aria-label="Formulario de acceso"
          >
            <fieldset className="space-y-4">
              <legend className="sr-only">Credenciales de usuario</legend>

              {/* USERNAME */}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="info@gmail.com"
                  onChange={handleChange}
                  required
                  value={credenciales.username}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <div className="mt-1 relative">
                  <input
                    id="password"
                    type={mostrarPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                    value={credenciales.password}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 pr-12 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setMostrarPassword(!mostrarPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                  >
                    {mostrarPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </fieldset>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loadingBtn}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition ${
                loadingBtn ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loadingBtn ? 'Cargando...' : 'Sign In'}
            </button>
          </form>

          {/* MENSAJE */}
          {mensaje && (
            <aside
              role="alert"
              className="mt-4 p-3 text-sm rounded bg-yellow-100 text-yellow-800"
            >
              {mensaje}
            </aside>
          )}
        </article>
      </section>

      {/* ======================= SECCIÓN DERECHA ======================= */}
      <aside
        aria-label="Panel informativo Semillitas Ampiu"
        className="hidden md:flex w-1/2 bg-[#0B1437] items-center justify-center relative"
      >
        <div className="absolute inset-0 opacity-20 bg-grid-white" />
        <section className="text-center z-10 px-8">
          <h2 className="text-3xl font-semibold text-white">Semillitas Ampiu</h2>
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
