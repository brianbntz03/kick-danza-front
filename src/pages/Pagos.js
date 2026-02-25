import React from 'react';


const Pagos = () => {
  return (
    <div className="card">
      <div className="card-header border-0">
        <h1 className="card-title">Pagos</h1>
        <div className="card-tools">
          <a class="btn btn-sm btn-info float-right" href='/crearcategorias' >Pagos</a>
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-download" />
          </a>
          <a href="#" className="btn btn-tool btn-sm">
            <i className="fas fa-bars" />
          </a>
        </div>
      </div>
      <div className="card-body table-responsive p-0">
      </div>
    </div>
  )
}

export default Pagos