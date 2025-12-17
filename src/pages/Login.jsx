import { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { getApiUrl } from "../utils/apiConfig";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [mensaje, setMensaje] = useState("");
  const [credenciales, setCredenciales] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const message = query.get("message");
    if (message) {
      setMensaje(message);
      const timer = setTimeout(() => setMensaje(""), 7200);
      return () => clearTimeout(timer);
    }
  }, [location]);

  const handleChange = (e) => {
    setCredenciales({ ...credenciales, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(getApiUrl("token/"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credenciales),
      });

      const respuesta = await response.json();

      if (!response.ok) {
        const errMsg =
          respuesta?.detail || "Credenciales inválidas. Intenta nuevamente.";
        setMensaje(errMsg);
        setTimeout(() => setMensaje(""), 7200);
        return;
      }

      login(respuesta);
      const rol = respuesta?.user?.rol;
      if (rol === "Admin") {
        navigate("/administradores");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMensaje("Error de conexión con el servidor.");
      setTimeout(() => setMensaje(""), 7200);
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
            <h1 className="text-3xl font-semibold text-gray-900">Iniciar Sesion</h1>
            <p className="text-gray-500 mt-1">
              Ingresa tus credenciales para iniciar sesion
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

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  required
                  value={credenciales.password}
                  className="mt-1 w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </fieldset>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-md transition"
            >
              Sign In
            </button>
          </form>

         

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
            Este proyecto fue desarrollado con mucho cariño por el equipo de Ampiü Wan con la colaboración de la comunidad Ambaló .
          </p>
        </section>
      </aside>
    </main>
  );
};

export default Login;
