import React, { useState, useEffect } from "react";
import { api, publicUrl } from "../../service/apiRest";
import Swal from "sweetalert2";

export default function CrearClase() {
  const [formData, setFormData] = useState({
    nombre: "",
    profesorId: "",
    actividadId: "",
  });

  const [profesores, setProfesores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    api.get("/profesores").then((res) => setProfesores(res.data));
    api.get("/actividades").then((res) => setActividades(res.data));
  }, []);

  const MostrarAlerta = () => {
      Swal.fire({
        title: "Creación de Clases",
        text: "El nombre de la clase fue creado correctamente.",
        icon: "success",
        timer: 2000,
      }).then(() => {
        window.location.href = `${publicUrl}/clases`;
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    MostrarAlerta();
    setError(null);
    setSuccess(false);
    setLoading(true);

    if (!formData.profesorId || !formData.actividadId) {
      setStatus({
        type: "danger",
        msg: "Debe seleccionar profesor y actividad",
      });
      return;
    }

    setLoading(true);

    try {
      await api.post("/nombre-clase", {
        nombre: formData.nombre,
        profesorId: parseInt(formData.profesorId),
        actividad: parseInt(formData.actividadId),
      });
      
      setStatus({ type: "success", msg: "Clase creada correctamente" });

      setFormData({
        nombre: "",
        descripcion: "",
        profesorId: "",
        actividadId: "",
      });
    } catch (err) {
      setStatus({ type: "danger", msg: "Error al crear la clase" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Nueva Clase (White Tiger)</h3>
      </div>
      <form onSubmit={handleSubmit} className="p-3">
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">Nombre de la clase creado exitosamente</div>
        )}

        <div className="row">
          <div className="col-md-6 form-group">
            <label>Nombre de la Clase</label>
            <input
              className="form-control"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              required
            />
          </div>
          <div className="col-md-6 form-group">
            <label>Profesor</label>
            <select
              className="form-control"
              value={formData.profesorId}
              onChange={(e) =>
                setFormData({ ...formData, profesorId: e.target.value })
              }
              required
            >
              <option value="">Seleccione...</option>
              {profesores.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 form-group">
            <label>actividad </label>
            <select
              className="form-control"
              value={formData.actividadId}
              onChange={(e) =>
                setFormData({ ...formData, actividadId: e.target.value })
              }
              required
            >
              <option value="">Seleccione ...</option>
              {actividades.map((act) => (
                <option key={act.id} value={act.id}>
                  {act.deporte}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : "Crear Clase"}
        </button>
      </form>
    </div>
  );
}
