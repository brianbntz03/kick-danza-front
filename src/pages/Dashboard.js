import React from 'react';


const Dashboard = () => {
  return (
    <div className="card">
      <div className="card-header border-0">
        <h1 className="card-title">Categorias</h1>
        <div className="card-tools">
          <a class="btn btn-sm btn-info float-right" href='/crearcategorias' > Dashboard</a>
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

export default Dashboard