import { useEffect, useState } from "react";
import { api } from "../../service/apiRest";

export function ListadoAlumnos() {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Estados para la edición ---
  const [showModal, setShowModal] = useState(false);
  const [alumnoEditando, setAlumnoEditando] = useState({
    id: null,
    nombre: "",
    dni: "",
    telefono: "",
    fechaInscripcion: "",
    fechaNacimiento: "",
  });

  const fetchAlumnos = async () => {
    try {
      const res = await api.get("/alumnos");
      setAlumnos(res.data);
    } catch (err) {
      setError("Error al cargar alumnos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlumnos();
  }, []);

  // Función para abrir el modal con los datos del alumno
  const handleEditClick = (alumno) => {
    setAlumnoEditando({
      ...alumno,
      fechaNacimiento: alumno.fechaNacimiento
        ? alumno.fechaNacimiento.split("T")[0]
        : "",
      fechaInscripcion: alumno.fechaInscripcion
        ? alumno.fechaInscripcion.split("T")[0]
        : "",
    });
    setShowModal(true);
  };

  // Función para guardar los cambios
  const handleSaveChanges = async () => {
    try {
      await api.patch(`/alumnos/${alumnoEditando.id}`, alumnoEditando);
      setShowModal(false);
      fetchAlumnos(); // Refrescar la lista
      alert("Alumno actualizado con éxito");
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este alumno?")) {
      return;
    }
    try {
      await api.delete(`/alumnos/${id}`);
      fetchAlumnos();
      alert("Alumno eliminado con éxito");
    } catch (err) {
      console.error(err);
      alert("Error al eliminar");
    }
  };
  if (loading) return <p>Cargando alumnos...</p>;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Alumnos</h3>
      </div>

      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>dni</th>
              <th>telefono</th>
              <th>fecha Nacimiento</th>
              <th>fecha Inscripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((alumno) => (
              <tr key={alumno.id}>
                <td>{alumno.id}</td>
                <td>{alumno.nombre}</td>
                <td>{alumno.dni}</td>
                <td>{alumno.telefono}</td>
                <td>
                  {alumno.fechaNacimiento}
                </td>
                <td>
                  {alumno.fechaInscripcion}
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEditClick(alumno)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(alumno.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL DE EDICIÓN --- */}
      {showModal && (
        <div
          className="modal show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Editar Alumno #{alumnoEditando.id}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={alumnoEditando.nombre}
                    onChange={(e) =>
                      setAlumnoEditando({
                        ...alumnoEditando,
                        nombre: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>dni</label>
                  <input
                    type="text"
                    className="form-control"
                    value={alumnoEditando.dni}
                    onChange={(e) =>
                      setAlumnoEditando({
                        ...alumnoEditando,
                        dni: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>telefono</label>
                  <input
                    type="number"
                    className="form-control"
                    value={alumnoEditando.telefono}
                    onChange={(e) =>
                      setAlumnoEditando({
                        ...alumnoEditando,
                        telefono: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>fecha nacimiento</label>
                  <input
                    type="date"
                    className="form-control"
                    value={alumnoEditando.fechaNacimiento || ""}
                    onChange={(e) =>
                      setAlumnoEditando({
                        ...alumnoEditando,
                        fechaNacimiento: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>fecha inscripcion</label>
                  <input
                    type="date"
                    className="form-control"
                    value={alumnoEditando.fechaInscripcion }
                    onChange={(e) =>
                      setAlumnoEditando({
                        ...alumnoEditando,
                        fechaInscripcion: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary" onClick={handleSaveChanges}>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
