export default function Aside() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link">
        <img
          src="dist/img/AdminLTELogo.png"
          alt="KB Danza Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light">KB Danza</span>
      </a>
      
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block">
              Sistema KB Danza
            </a>
          </div>
        </div>

        {/* SidebarSearch Form */}
        <div className="form-inline">
          <div className="input-group" data-widget="sidebar-search">
            <input
              className="form-control form-control-sidebar"
              type="search"
              placeholder="Buscar"
              aria-label="Search"
            />
            <div className="input-group-append">
              <button className="btn btn-sidebar">
                <i className="fas fa-search fa-fw" />
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            <li className="nav-item">
              <a href="#" className="nav-link active">
                <i className="nav-icon fas fa-tachometer-alt" />
                <p>Dashboard</p>
              </a>
            </li>
            
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>Alumnos</p>
              </a>
            </li>
            
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chalkboard-teacher" />
                <p>Profesores</p>
              </a>
            </li>
            
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-music" />
                <p>Clases</p>
              </a>
            </li>
            
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-calendar-alt" />
                <p>Horarios</p>
              </a>
            </li>
            
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-dollar-sign" />
                <p>Pagos</p>
              </a>
            </li>
            
            <li className="nav-header">CONFIGURACIÓN</li>
            
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-cog" />
                <p>Configuración</p>
              </a>
            </li>
            
            <li className="nav-item">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-chart-bar" />
                <p>Reportes</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}