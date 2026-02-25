import { ListadoAlumnos } from "./Alumnos";

const PageListadoAlumnos = () => {
  let listado_alumnos = ListadoAlumnos ();
    return (
    <div className="card">
      <div class="card-header">
        <h3 class="card-title">Listado alumnos</h3>
        <div className="card-tools">
          <a class="btn btn-sm btn-info float-right" href='/crearalumnos' > crear alumnos</a>
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-download" />
          </a>
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-bars" />
          </a>
        </div>
        
      </div>
      <div className="card-body table-responsive p-0">
        <div className="card-body table-responsive p-0">{listado_alumnos}

        </div>
      </div>
    </div>
  );
};

export default PageListadoAlumnos;
