import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Usuario {
  id: number;
  username: string;
  password: string;
  fechaCreacion: string;
}

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsuarios = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("usuarios").select("*").order("id");
    if (error) console.error("Error al obtener usuarios:", error);
    else setUsuarios(data || []);
    setLoading(false);
  };

  const createUsuario = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return alert("Completa todos los campos");
    const { error } = await supabase.from("usuarios").insert([{ username, password }]);
    if (error) alert("Error al crear usuario: " + error.message);
    else {
      setUsername("");
      setPassword("");
      fetchUsuarios();
    }
  };

  const deleteUsuario = async (id: number) => {
    if (!confirm("¿Eliminar usuario?")) return;
    const { error } = await supabase.from("usuarios").delete().eq("id", id);
    if (error) alert("Error al eliminar: " + error.message);
    else fetchUsuarios();
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

      <form onSubmit={createUsuario} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Crear
        </button>
      </form>

      {loading ? (
        <p>Cargando usuarios...</p>
      ) : (
        <table className="w-full text-sm border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre de usuario</th>
              <th className="border p-2">Fecha de creación</th>
              <th className="border p-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <tr key={u.id}>
                <td className="border p-2">{u.id}</td>
                <td className="border p-2">{u.username}</td>
                <td className="border p-2">
                  {new Date(u.fechaCreacion).toLocaleString()}
                </td>
                <td className="border p-2 text-center">
                  <button
                    onClick={() => deleteUsuario(u.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
