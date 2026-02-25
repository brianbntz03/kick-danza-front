import React, { useState, useEffect } from "react";
import { api } from "../../service/apiRest";

export default function CrearClase() {
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    profesorId: "",
    actividadId: "",
  });

  const [profesores, setProfesores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", msg: "" });

  useEffect(() => {
    api.get("/profesores").then((res) => setProfesores(res.data));
    api.get("/actividades").then((res) => setActividades(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        descripcion: formData.descripcion,
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
        {status.msg && (
          <div className={`alert alert-${status.type}`}>{status.msg}</div>
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

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            className="form-control"
            value={formData.descripcion}
            onChange={(e) =>
              setFormData({ ...formData, descripcion: e.target.value })
            }
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Guardando..." : "Crear Clase"}
        </button>
      </form>
    </div>
  );
}
