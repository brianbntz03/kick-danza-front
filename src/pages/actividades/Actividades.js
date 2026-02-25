import { useEffect, useState } from "react";
import { api } from "../../service/apiRest";

export function ListadoActividades() {
  const [actividades, setActividades] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Estados para la edición ---
  const [showModal, setShowModal] = useState(false);
  const [actividadEditando, setActividadEditando] = useState({
    id: null,
    deporte: "",
    descripcion: "",
  });

  // Función para cargar todos los datos necesarios
  const fetchData = async () => {
    setLoading(true);
    try {
      // Cargamos ambas listas en paralelo para mejorar la velocidad
      const [resActividades] = await Promise.all([api.get("/actividades")]);

      setActividades(resActividades.data);
    } catch (err) {
      console.error("Error al cargar datos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEditClick = (actividad) => {
    setActividadEditando({
      ...actividad,
      descripcion: actividad.descripcion || "",
    });
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      const { id, ...datos } = actividadEditando;

      await api.patch(`/actividades/${id}`, datos);
      setShowModal(false);
      fetchData(); 
      alert("Actividad actualizada");
    } catch (err) {
      alert("Error al actualizar");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro?")) return;
    try {
      await api.delete(`/actividades/${id}`);
      fetchData();
      alert("Eliminado con éxito");
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {actividades.map((actividad) => (
              <tr key={actividad.id}>
                <td>{actividad.id}</td>
                <td>{actividad.deporte}</td>
                <td>{actividad.descripcion}</td>

                <td>
                  <button
                    className="btn btn-sm btn-primary mr-2"
                    onClick={() => handleEditClick(actividad)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleEliminar(actividad.id)}
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
                  Editar Actividad #{actividadEditando.id}
                </h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setShowModal(false)}
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>deporte</label>
                  <input
                    type="text"
                    className="form-control"
                    value={actividadEditando.deporte}
                    onChange={(e) =>
                      setActividadEditando({
                        ...actividadEditando,
                        deporte: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>descripcion</label>
                  <input
                    type="text"
                    className="form-control"
                    value={actividadEditando.descripcion}
                    onChange={(e) =>
                      setActividadEditando({
                        ...actividadEditando,
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
