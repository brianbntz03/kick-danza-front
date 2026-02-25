import { useEffect, useState } from "react";
import { api } from "../../service/apiRest";

export function ListadoClases() {
  const [clases, setClases] = useState([]);
  const [profesores, setProfesores] = useState([]);
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Estado para la edición ---
  const [showModal, setShowModal] = useState(false);
  const [claseEditando, setClaseEditando] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    profesorId: "",
    actividad: "",
    nivel: "",
    duracion: "",
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resClases, resProfesores, resActividades] = await Promise.all([
        api.get("/nombre-clase"),
        api.get("/profesores"),
        api.get("/actividades"),
      ]);
      setClases(resClases.data);
      console.log(resClases.data);
      setProfesores(resProfesores.data);
      setActividades(resActividades.data);
    } catch (err) {
      console.error("Error al sincronizar:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Mapeo de nombres ---
  const getNombreProfesor = (id) => {
    const p = profesores.find((item) => Number(item.id) === Number(id));
    return p ? p.nombre : "Sin profesor";
  };

  const getNombreActividad = (id) => {
    const a = actividades.find((item) => Number(item.id) === Number(id));
    return a ? a.nombre : "Sin actividad";
  };

  // --- Acciones ---
  const handleEditClick = (clase) => {
    setClaseEditando({
      id: clase.id,
      nombre: clase.nombre || "",
      descripcion: clase.descripcion || "",
      profesorId: clase.profesor?.id || "",
      actividad: clase.actividad ?? "",
    });
    setShowModal(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Deseas eliminar esta clase?")) return;
    try {
      await api.delete(`/nombre-clase/${id}`);
      setClases(clases.filter((c) => c.id !== id));
      alert("Clase eliminada correctamente");
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  const handleSaveChanges = async () => {
    try {
      const dataUpdate = {
        nombre: claseEditando.nombre,
        actividad: claseEditando.actividad,
        descripcion: claseEditando.descripcion,
        profesorId: claseEditando.profesorId,
      };

      await api.patch(`/nombre-clase/${claseEditando.id}`, dataUpdate);
      setShowModal(false);
      fetchData(); // Refrescamos lista
      alert("Clase actualizada con éxito");
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  if (loading) return <div className="p-5 text-center">Cargando datos...</div>;

  return (
    <div className="card shadow">
      <div className="card-header bg-dark text-white d-flex justify-content-between">
        <h3 className="card-title">Nombre de la clase</h3>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Clase</th>
              <th>Actividad</th>
              <th>Profesor</th>
              <th>descripcion</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clases.map((clase) => (
              <tr key={clase.id}>
                <td>{clase.id}</td>
                <td>
                  <strong>{clase.nombre}</strong>
                </td>
                <td>{clase.actividad?.deporte}</td>
                <td>{clase.profesor?.nombre || "Sin profesor"}</td>
                <td>
                  <span className="badge badge-info">{clase.descripcion}</span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEditClick(clase)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(clase.id)}
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
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Editando: {claseEditando.nombre}
                </h5>
                <button className="close" onClick={() => setShowModal(false)}>
                  &times;
                </button>
              </div>
              <div >
                <div >
                  <div className="col-md-6 form-group">
                    <label>Nombre de la Clase</label>
                    <input
                      type="text"
                      className="form-control"
                      value={claseEditando.nombre}
                      onChange={(e) =>
                        setClaseEditando({
                          ...claseEditando,
                          nombre: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div >
                  <div className="col-md-6 form-group">
                    <label>Actividad Relacionada</label>
                    <select
                      className="form-control"
                      value={claseEditando.actividad}
                      onChange={(e) =>
                        setClaseEditando({
                          ...claseEditando,
                          actividad: e.target.value,
                        })
                      }
                    >
                      {actividades.map((a) => (
                        <option key={a.id} value={a.id}>
                          {a.deporte}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Profesor</label>
                    <select
                      className="form-control"
                      value={claseEditando.profesorId}
                      onChange={(e) =>
                        setClaseEditando({
                          ...claseEditando,
                          profesorId: e.target.value,
                        })
                      }
                    >
                      {profesores.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    className="form-control"
                    value={claseEditando.descripcion}
                    onChange={(e) =>
                      setClaseEditando({
                        ...claseEditando,
                        descripcion: e.target.value,
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
