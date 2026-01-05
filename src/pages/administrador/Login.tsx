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
import type { ApiError, Credenciales, LoginResponse } from '@/types';
import { getApiUrl } from '@/utils/apiConfig';

/**
 * Página de login para administradores
 * Incluye validación de campos, manejo seguro de errores y toggle de password
 */
const AdminLogin: FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingBtn, setLoadingBtn] = useState<boolean>(false);

  const [mensaje, setMensaje] = useState<string>('');
  const [mensajeTipo, setMensajeTipo] = useState<'error' | 'info'>('info');
  const [credenciales, setCredenciales] = useState<Credenciales>({
    username: '',
    password: '',
  });
  const [mostrarPassword, setMostrarPassword] = useState<boolean>(false);

  // Estados para validación de campos
  const [touched, setTouched] = useState<{ username: boolean; password: boolean }>({
    username: false,
    password: false,
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const message = query.get('message');
    if (message) {
      setMensaje(message);
      setMensajeTipo('info');
      const timer = setTimeout(() => {
        setMensaje('');
      }, 7200);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [location]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setCredenciales({ ...credenciales, [name]: value });
    // Limpiar mensaje de error cuando el usuario empieza a escribir
    if (mensaje && mensajeTipo === 'error') {
      setMensaje('');
    }
  };

  const handleBlur = (field: 'username' | 'password'): void => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  /**
   * Valida los campos del formulario
   * @returns true si el formulario es válido
   */
  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!credenciales.username.trim()) {
      errors.push('El email/usuario es requerido');
    }
    if (!credenciales.password.trim()) {
      errors.push('La contraseña es requerida');
    }

    if (errors.length > 0) {
      setMensaje(errors.join('. '));
      setMensajeTipo('error');
      setTouched({ username: true, password: true });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Validar campos antes de enviar
    if (!validateForm()) {
      return;
    }

    setLoadingBtn(true);
    setMensaje('');

    try {
      const response = await fetch(getApiUrl('token/'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credenciales),
      });

      // CRÍTICO: Verificar que la respuesta sea exitosa ANTES de procesar
      if (!response.ok) {
        // La API devolvió un error (401, 400, 500, etc.)
        const errorData: ApiError = await response.json().catch(() => ({}));
        const errorMessage =
          errorData.detail ||
          errorData.error ||
          errorData.mensaje ||
          'Credenciales inválidas. Por favor, verifica tu usuario y contraseña.';

        setMensaje(errorMessage);
        setMensajeTipo('error');
        setLoadingBtn(false);
        return;
      }

      // La respuesta fue exitosa (2xx)
      const respuesta: LoginResponse = await response.json();

      // Validar que la respuesta tenga la estructura esperada
      if (!respuesta.access || !respuesta.user) {
        setMensaje('Error en la respuesta del servidor. Intenta de nuevo.');
        setMensajeTipo('error');
        setLoadingBtn(false);
        return;
      }

      // Validar que el usuario tenga rol de Admin
      if (respuesta.user.rol !== 'Admin') {
        setMensaje('No tienes permisos de administrador para acceder a este panel.');
        setMensajeTipo('error');
        setLoadingBtn(false);
        return;
      }

      // Todo OK - hacer login y navegar
      authContext?.login(respuesta);
      navigate('/dashboard');
    } catch (error) {
      // Error de red o error inesperado
      console.error('Error en login:', error);
      setMensaje(
        'Error de conexión. Por favor, verifica tu conexión a internet e intenta de nuevo.'
      );
      setMensajeTipo('error');
    } finally {
      setLoadingBtn(false);
    }
  };

  // Determinar si mostrar error de campo individual
  const showUsernameError = touched.username && !credenciales.username.trim();
  const showPasswordError = touched.password && !credenciales.password.trim();

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

            {/* MENSAJE DE ERROR/INFO */}
            {mensaje && (
              <div
                role="alert"
                className={`mb-5 p-3 text-sm rounded ${
                  mensajeTipo === 'error'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}
              >
                {mensaje}
              </div>
            )}

            <div>
              <form onSubmit={handleSubmit} noValidate>
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
                      onBlur={() => handleBlur('username')}
                      autoComplete="username"
                      aria-required="true"
                      aria-invalid={showUsernameError}
                      aria-describedby={showUsernameError ? 'username-error' : undefined}
                      value={credenciales.username}
                      className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                        showUsernameError
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-gray-700'
                      }`}
                    />
                    {showUsernameError && (
                      <p id="username-error" className="mt-1 text-sm text-red-500">
                        El email/usuario es requerido
                      </p>
                    )}
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
                        onBlur={() => handleBlur('password')}
                        autoComplete="current-password"
                        aria-required="true"
                        aria-invalid={showPasswordError}
                        aria-describedby={showPasswordError ? 'password-error' : undefined}
                        value={credenciales.password}
                        className={`w-full px-4 py-3 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                          showPasswordError
                            ? 'border-red-500 dark:border-red-500'
                            : 'border-gray-300 dark:border-gray-700'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setMostrarPassword(!mostrarPassword)}
                        className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                        aria-label={mostrarPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      >
                        {mostrarPassword ? (
                          <EyeOff className="text-gray-500 dark:text-gray-400 size-5" />
                        ) : (
                          <Eye className="text-gray-500 dark:text-gray-400 size-5" />
                        )}
                      </button>
                    </div>
                    {showPasswordError && (
                      <p id="password-error" className="mt-1 text-sm text-red-500">
                        La contraseña es requerida
                      </p>
                    )}
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
