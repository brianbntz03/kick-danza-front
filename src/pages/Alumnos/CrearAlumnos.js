import React, { useState } from "react";
import { api, publicUrl } from "../../service/apiRest";
import Swal from "sweetalert2";

export default function CrearAlumnos() {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [fechaInscripcion, setFechaInscripcion] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const MostrarAlerta = () => {
    Swal.fire({
      title: "Creación de Alumno",
      text: "El alumno fue creado correctamente.",
      icon: "success",
      timer: 2000,
    }).then(() => {
      window.location.href = `${publicUrl}/listado-alumnos`;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    MostrarAlerta();

    try {
      // ENVIAR DATOS: Pasamos un objeto con nombre y descripcion
      await api.post("/alumnos", {
        nombre: nombre,
        dni: dni,
        telefono: telefono,
        email: email,
        fechaNacimiento: fechaNacimiento,
        fechaInscripcion: fechaInscripcion,
      });

      setSuccess(true);
      setNombre("");
      setDescripcion("");
      setDni("");
      setTelefono("");
      setEmail("");
      setFechaNacimiento("");
      setFechaInscripcion("");
    } catch (err) {
      console.error(err);
      setError("Error al crear alumno. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card card-primary">
      <div className="card-header">
        <h3 className="card-title">Crear Alumno</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{ padding: "20px", marginBottom: "100px" }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        {success && (
          <div className="alert alert-success">Alumno creado exitosamente</div>
        )}

        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            className="form-control"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Ej: Juan Pérez"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Dni:</label>
          <input
            className="form-control"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            type="text"
            placeholder="Ej: numero de dni"
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
            placeholder="Ej: 1122548556"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">fecha nacimiento:</label>
          <input
            type="date"
            className="form-control"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">fecha inscripcion:</label>
          <input
            type="date"
            className="form-control"
            value={fechaInscripcion}
            onChange={(e) => setFechaInscripcion(e.target.value)}
            required
          />
        </div>

        <div
          className="card-footer"
          style={{ background: "none", paddingLeft: 0 }}
        >
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Creando..." : "Crear Alumno"}
          </button>
        </div>
      </form>
    </div>
  );
}
