import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detalles() {
    const [recolecciones, setRecolecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchRecolecciones = async () => {
        try {
            const response = await fetch(`https://semillitasampiu-api-production.up.railway.app/api/recoleccion/?usuario=${id}`);
            if (!response.ok) throw new Error("Error al obtener los datos");
            const data = await response.json();
            setRecolecciones(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
        };

        fetchRecolecciones();
    }, [id]);

    if (loading)
        return <p className="text-center text-gray-400">Cargando datos del jugador...</p>;

    if (error)
        return <p className="text-center text-red-500">Error: {error}</p>;

    if (recolecciones.length === 0)
        return <p className="text-center text-gray-400">No hay datos de recolección disponibles.</p>;

    return (
        <section className="container mx-auto px-4 py-8">
        <h2 className="text-center text-2xl font-semibold mb-4 text-white pt-4">
            Palabras recolectadas del jugador 17
        </h2>

        <div className="overflow-x-auto bg-indigo-900/30 rounded-lg shadow-lg">
            <table className="w-full text-white">
            <thead className="bg-black/30">
                <tr>
                <th className="px-4 py-2 text-left font-semibold">Palabra en ampiu</th>
                <th className="px-4 py-2 text-left font-semibold">Palabra en español</th>
                <th className="px-4 py-2 text-left font-semibold">Nivel</th>
                <th className="px-4 py-2 text-left font-semibold">Fecha de recolección</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
                {recolecciones.map((item) => (
                <tr
                    key={item.id}
                    className="hover:bg-indigo-800/40 transition-colors duration-200"
                >
                    <td className="px-4 py-2 text-sm">{item.palabra_data.pal_ampiu}</td>
                    <td className="px-4 py-2 text-sm">{item.palabra_data.pal_español}</td>
                    <td className="px-4 py-2 text-sm">{item.palabra_data.nivel}</td>
                    <td className="px-4 py-2 text-sm">
                    {new Date(item.fecha_recogida).toLocaleDateString("es-CO")}
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        </section>
    );
}
