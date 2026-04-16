import { NavLink } from "react-router-dom";

export default function Aside() {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="/" className="brand-link">
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
              alt="usuario"
            />
          </div>
          <div className="info">
            <a href="/" className="d-block">
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
              <a href="/horarios" className="nav-link">
                <i className=" nav-icon fas fa-clock " />
                <p>
                  Actividades <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/listado-actividades" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Listado Actividades</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/profesores" className="nav-link">
                <i className="nav-icon fas fa-chalkboard-teacher" />
                <p>
                  Profesores <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/listado-profesores" className="nav-link">
                    <i className="far fa-circle nav-icon" />{" "}
                    <p>Listado Profesores</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-users" />
                <p>
                  Alumnos <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/listado-alumnos" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Listado Alumnos</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item has-treeview">
              <a href="/" className="nav-link">
                <i className="nav-icon fas fa-dollar-sign" />
                <p>
                  Pagos
                  <i className="right fas fa-angle-left" />
                </p>
              </a>

              <ul className="nav nav-treeview">
                <li className="nav-item">
                  <NavLink to="/pagos" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Pagar Clase / Tomar Presentes</p>
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink to="/listado-pagos" className="nav-link">
                    <i className="far fa-circle nav-icon" />
                    <p>Listado de Pagos</p>
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a href="/clases" className="nav-link">
                <i className="nav-icon fas fa-music" />
                <p>Clases</p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
}
