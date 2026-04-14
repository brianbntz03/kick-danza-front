import { ListadoPagos } from "./ListadoPagos";

const PageListadoPagos = () => {

  let listado_pagos = ListadoPagos ();
  return (
    <div className="card">
      <div class="card-header">
        <h3 claas="card-title">Listado pagos</h3>
        <div className="card-tools">
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-bars" />
          </a>
        </div>
        
      </div>
      <div className="card-body table-responsive p-0">
        <div className="card-body table-responsive p-0">
          {listado_pagos}
        </div>
      </div>
    </div>
  );
};

export default PageListadoPagos;
