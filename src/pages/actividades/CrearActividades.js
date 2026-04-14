import React, { useState } from "react";
import { api, publicUrl } from "../../service/apiRest";
import Swal from "sweetalert2";

export default function CrearActividades() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const MostrarAlerta = () => {
      Swal.fire({
        title: "Creación de actividad",
        text: "La actividad fue creada correctamente.",
        icon: "success",
        timer: 2000,
      }).then(() => {
        window.location.href = `${publicUrl}/listado-actividades`;
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    MostrarAlerta();
    
    try {
      await api.post('/actividades', {
        deporte: nombre,
        descripcion: descripcion,
      });

      setSuccess(true);
      setNombre("");
      setDescripcion("");
    } catch (err) {
      console.error(err);
      setError("Error al crear la actividad. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-success">
      <div className="card-header">
        <h3 className="card-title">Nueva Actividad</h3>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">
            Actividad creada exitosamente
          </div>
        )}

        <div className="form-group">
          <label>Nombre de la Actividad:</label>
          <input
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Ej: Danza Clásica"
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción:</label>
          <input
            className="form-control"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            type="text"
            placeholder="Ej: Ballet clásico de nivel inicial"
            required
          />
        </div>

        <div
          className="card-footer"
          style={{ background: "none", paddingLeft: 0 }}
        >
          <button type="submit" className="btn btn-success" disabled={loading}>
            {loading ? "Procesando..." : "Guardar Actividad"}
          </button>
        </div>
      </form>
    </div>
  );
}
