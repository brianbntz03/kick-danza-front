import { useEffect, useState } from "react";
import { api } from "../../service/apiRest";

export function ListadoProfesores() {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // --- Estados para la edición ---
  const [showModal, setShowModal] = useState(false);
  const [profesorEditando, setProfesorEditando] = useState({
    id: null,
    nombre: "",
    telefono: "", 
    email: "",
    dni: "",
  });

  const fetchProfesores = async () => {
    setLoading(true);
    try {
      const res = await api.get("/profesores");
      setProfesores(res.data);
    } catch (err) {
      setError("Error al cargar profesores");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfesores();
  }, []);

  const handleEditClick = (profesor) => {
    setProfesorEditando(profesor);
    setShowModal(true);
  };

  const handleSaveChanges = async () => {
    try {
      // Usamos el endpoint de profesores para el PATCH
      await api.patch(`/profesores/${profesorEditando.id}`, profesorEditando);
      setShowModal(false);
      fetchProfesores(); 
      alert("Profesor actualizado con éxito");
    } catch (err) {
      alert("Error al actualizar profesor");
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este profesor?")) return;
    try {
      // Usamos el endpoint de profesores para el DELETE
      await api.delete(`/profesores/${id}`);
      fetchProfesores();
      alert("Profesor eliminado");
    } catch (err) {
      alert("Error al eliminar");
    }
  };

  if (loading) return <p>Cargando profesores...</p>;

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title"> Profesores</h3>
      </div>

      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>telefono</th>
              <th>email</th>
              <th>dni</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesores.map((profe) => (
              <tr key={profe.id}>
                <td>{profe.id}</td>
                <td>{profe.nombre}</td>
                <td>{profe.telefono}</td>
                <td>{profe.email}</td>
                <td>{profe.dni}</td>
                <td>
                  <button className="btn btn-sm btn-primary mr-2" onClick={() => handleEditClick(profe)}>
                    Editar
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(profe.id)}>
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
        <div className="modal show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Editar Profesor #{profesorEditando.id}</h5>
                <button type="button" className="close" onClick={() => setShowModal(false)}>&times;</button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label>Nombre Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profesorEditando.nombre}
                    onChange={(e) => setProfesorEditando({ ...profesorEditando, nombre: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>telefono</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profesorEditando.telefono}
                    onChange={(e) => setProfesorEditando({ ...profesorEditando, telefono: e.target.value })}
                  />
                </div>
                 <div className="form-group">
                  <label>gmail</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profesorEditando.email}
                    onChange={(e) => setProfesorEditando({ ...profesorEditando, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>dni</label>
                  <input
                    type="text"
                    className="form-control"
                    value={profesorEditando.dni}
                    onChange={(e) => setProfesorEditando({ ...profesorEditando, dni: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="btn btn-primary" onClick={handleSaveChanges}>Guardar Cambios</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}