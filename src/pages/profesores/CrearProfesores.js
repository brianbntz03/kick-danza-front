import React, { useState } from 'react';
import { api } from '../../service/apiRest';

export default function CrearProfesores() {
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // ENVIAR DATOS: Pasamos un objeto con nombre y descripcion
            await api.post('/profesores', {
                nombre: nombre,
                telefono: telefono,
                email: email,
                dni: dni
            });

            setSuccess(true);
            setNombre(""); // Limpiar campos tras éxito
        } catch (err) {
            console.error(err);
            setError('Error al crear alumno. Inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card card-primary">
            <div className="card-header">
                <h3 className="card-title">Crear Profesor</h3>
            </div>
            
            <form onSubmit={handleSubmit} style={{ padding: "20px", marginBottom: "100px" }}>
                {/* Mensajes de Estado */}
                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">Profesor creado exitosamente</div>}

                <div className="form-group">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                        className="form-control"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        type="text"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">telefono:</label>
                    <input
                        className="form-control"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        type="text"
                        required
                    />
                </div>

                 <div className="form-group">
                    <label htmlFor="descripcion">email:</label>
                    <input
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="text"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="descripcion">dni:</label>
                    <input
                        className="form-control"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        type="text"
                        required
                    />
                </div>

                <div className="card-footer" style={{ background: "none", paddingLeft: 0 }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? "Creando..." : "Crear profesor"}
                    </button>
                </div>
            </form>
        </div>
    );
}