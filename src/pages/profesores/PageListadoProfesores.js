import { ListadoProfesores } from "./Profesores";

const PageListadoProfesores = () => {
  let listado_profesores = ListadoProfesores ();
    return (
    <div className="card">
      <div class="card-header">
        <h3 class="card-title">Listado actividades</h3>
        <div className="card-tools">
          <a class="btn btn-sm btn-info float-right" href='/crear-profesores' > crear prorfesores</a>
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-download" />
          </a>
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-bars" />
          </a>
        </div>
        
      </div>
      <div className="card-body table-responsive p-0">
        <div className="card-body table-responsive p-0">{listado_profesores}
        </div>
      </div>
    </div>
  );
};

export default PageListadoProfesores;
