import { ListadoClases } from "./clases";

const PageListadoClases = () => {
  let listado_clases = ListadoClases ();
    return (
    <div className="card">
      <div class="card-header">
        <div className="card-tools">
          <a class="btn btn-sm btn-info float-right" href='/crearclases' > crear nombre clase</a>
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-download" />
          </a>
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-bars" />
          </a>
        </div>
        
      </div>
      <div className="card-body table-responsive p-0">
        <div className="card-body table-responsive p-0">{listado_clases}

        </div>
      </div>
    </div>
  );
};

export default PageListadoClases;
