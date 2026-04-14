import React, { useEffect, useState } from "react";
import { api, publicUrl } from "../../service/apiRest";
import Swal from "sweetalert2";

const Pagos = () => {
  const hoy = new Date().toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    claseId: "",
    alumnoId: "",
    tipo: "CLASE",
    fechaPago: hoy,
  });

  const [clase, setClase] = useState([]);
  const [alumno, setAlumno] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ type: "", msg: "" });
  const [success, setSuccess] = useState(false);

  const alumnosFiltrados = alumno;

  useEffect(() => {
    api.get("/nombre-clase").then((res) => setClase(res.data));
    api.get("/alumnos").then((res) => setAlumno(res.data));
  }, []);

  useEffect(() => {
    api.get("/alumnos").then((res) => {
      console.log("ALUMNOS:", res.data);
      setAlumno(res.data);
    });
  }, []);

  const MostrarAlerta = () => {
      Swal.fire({
        title: "Creación de Alumno",
        text: "El alumno fue creado correctamente.",
        icon: "success",
        timer: 2000,
      }).then(() => {
        window.location.href = `${publicUrl}/listado-pagos`;
      });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    MostrarAlerta()

    if (!formData.claseId || !formData.alumnoId || !formData.fechaPago) {
      setStatus({
        type: "danger",
        msg: "Debe completar todos los campos",
      });
      return;
    }

    setLoading(true);

    try {
      await api.post("/pagos", {
        claseId: parseInt(formData.claseId),
        alumnoId: parseInt(formData.alumnoId),
        tipo: formData.tipo,
        fechaPago: new Date(formData.fechaPago),
      });

      setStatus({ type: "sucess", msg: "Pago registrado correctamente" });

      setFormData({
        claseId: "",
        alumnoId: "",
        tipo: "CLASE",
        fechaoPago: hoy,
      });
    } catch (err) {
      console.error(err);
      setStatus({
        type: "danger",
        msg: "Error al registrar el pago",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="card-header border-0">
        <h1 className="card-title">Pagos</h1>
      </div>

      <div className="card-body ">
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
        {success && ( 
          <div className="alert alert-success">Alumno creado exitosamente</div>
        )}
        
          <div className="form-group">
            <label>clase </label>
            <select
              className="form-control"
              value={formData.claseId}
              onChange={(e) =>
                setFormData({ ...formData, claseId: e.target.value })
              }
            >
              <option value="">Seleccione una clase</option>
              {clase.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>fecha</label>
            <input
              type="date"
              className="form-control"
              value={formData.fechaPago}
              onChange={(e) =>
                setFormData({ ...formData, fechaPago: e.target.value })
              }
            />
          </div>

          <div>
            <label>alumnos </label>
            <select
              className="form-control"
              value={formData.alumnoId}
              onChange={(e) =>
                setFormData({ ...formData, alumnoId: e.target.value })
              }
            >
              <option value="">seleccione un alumno</option>
              {alumnosFiltrados.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nombre} {a.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tipo de pago</label>
            <select
              className="form-control"
              value={formData.tipo}
              onChange={(e) =>
                setFormData({ ...formData, tipo: e.target.value })
              }
            >
              <option value="CLASE">Por Clase</option>
              <option value="MENSUAL">Mensual</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            {loading ? "Guardando..." : "Guardar"}
          </button>

          {status.msg && (
            <div className={`alert alert-${status.type}`}>{status.msg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Pagos;
