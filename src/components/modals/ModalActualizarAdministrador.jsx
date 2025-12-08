import React, { useEffect, useState } from "react";
import usePutRequest from "../../hooks/usePutRequest";
import Swal from "sweetalert2";

const ModalActualizarAdministrador = ({ isOpen, onClose, admin, onAdminUpdated }) => {
    const { putData, response, error, loading, clearState } = usePutRequest();

    const [datos, setDatos] = useState({
        fecha_nacimiento: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    useEffect(() => {
        if (admin) {
        setDatos({
            fecha_nacimiento: admin.fecha_nacimiento || "",
            first_name: admin.first_name || "",
            last_name: admin.last_name || "",
            email: admin.email || "",
        });
        }
    }, [admin]);

    useEffect(() => {
        if (response) {
        Swal.fire({
            toast: true,
            position: "top-end",
            icon: "success",
            title: "Administrador actualizado correctamente",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
        });

        if (onAdminUpdated) {
            onAdminUpdated(response);
        }
        if (clearState) {
            clearState();
        }
        onClose();
        }
    }, [response, onAdminUpdated, onClose, clearState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDatos((prev) => ({
        ...prev,
        [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await putData("administrador", admin.id, {
        fecha_nacimiento: datos.fecha_nacimiento,
        first_name: datos.first_name,
        last_name: datos.last_name,
        email: datos.email,
        });
    };

    if (!isOpen || !admin) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Actualizar administrador</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium mb-1">Nombre</label>
                <input
                type="text"
                name="first_name"
                value={datos.first_name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Apellido</label>
                <input
                type="text"
                name="last_name"
                value={datos.last_name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Correo electrónico</label>
                <input
                type="email"
                name="email"
                value={datos.email}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                required
                />
            </div>

            <div>
                <label className="block text-sm font-medium mb-1">Fecha de nacimiento</label>
                <input
                type="date"
                name="fecha_nacimiento"
                value={datos.fecha_nacimiento}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm">
                {typeof error === "string"
                    ? error
                    : error.error || "Error al actualizar el administrador"}
                </p>
            )}

            <div className="flex justify-end gap-2 pt-2">
                <button
                type="button"
                onClick={() => {
                    if (clearState) clearState();
                    onClose();
                }}
                className="px-4 py-2 text-sm border rounded"
                disabled={loading}
                >
                Cancelar
                </button>
                <button
                type="submit"
                className="px-4 py-2 text-sm rounded bg-blue-600 text-white disabled:opacity-60"
                disabled={loading}
                >
                {loading ? "Guardando..." : "Guardar cambios"}
                </button>
            </div>
            </form>
        </div>
        </div>
    );
};

export default ModalActualizarAdministrador;
