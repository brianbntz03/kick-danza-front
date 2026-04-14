import { useEffect, useState } from "react";
import { api } from "../../service/apiRest";

export function ListadoPagos() {
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPagos = async () => {
    try {
      const response = await api.get("/pagos");
      setPagos(response.data);
    } catch (err) {
      setError("Error al cargar los pagos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  if (loading) return <p>cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="card">
      <div className="card-body">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>nombre y apellido</th>
              <th>clase</th>
              <th>paga por</th>
              <th>fecha</th>
              <th>estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pagos.map((pagos) => (
              <tr key={pagos.id}>
                <td>{pagos.id}</td>
                <td>{pagos.alumno?.nombre ?? "-"}</td>
                <td>{pagos.clase ? pagos.clase.nombre : "-"}</td>
                <td>
                  {pagos.tipo === "CLASE" ? "Clase individual" : "MENSUAL"}
                </td>
                <td>
                  {pagos.fechaPago
                    ? new Date(
                        pagos.fechaPago + "T00:00:00",
                      ).toLocaleDateString()
                    : "Sin fecha"}
                </td>
                <td>
                  <span className="badge bg-success">
                    {pagos.estado === "PAGADO" ? "Pagado" : "Pendiente"}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-primary me-2">Ver</button>
                  <button className="btn btn-sm btn-danger">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
