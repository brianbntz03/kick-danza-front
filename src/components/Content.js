import { Route, Routes } from "react-router-dom";
import Profesores from "../pages/Profesores";
import PageListadoAlumnos from "../pages/Alumnos/Pagelistadoalumnos";
import CrearAlumnos from "../pages/Alumnos/CrearAlumnos";
import PageListadoActividades from "../pages/actividades/Pagelistadoactividades";
import PageListadoProfesores from "../pages/profesores/PageListadoProfesores";
import CrearProfesores from "../pages/profesores/CrearProfesores";
import CrearActividades from "../pages/actividades/CrearActividades";
import PageListadoClases from "../pages/clases/PageClases";
import CrearClases from "../pages/clases/CrearClases";
import PageListadoPagos from "../pages/pagos/PageListadoPagos";
import Pagos from "../pages/pagos/PageGenerarPagos";

export default function Content() {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Sistema KickBoxing Danza</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item">
                  <a href="/">Home</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      {/* /.content-header */}

      {/* Main content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <Routes>
                <Route
                  path="/listado-alumnos"
                  element={<PageListadoAlumnos />}
                />
                <Route path="/profesores" element={<Profesores />} />
                <Route path="/clases" element={<PageListadoClases/>} />
                <Route
                  path="/listado-actividades"
                  element={<PageListadoActividades />}
                />
                <Route path="/pagos" element={<Pagos />} />
                <Route path="/crearalumnos" element={<CrearAlumnos />} />
                <Route path="/crearActividades" element={<CrearActividades/>}/>
                <Route
                  path="/listado-profesores"
                  element={<PageListadoProfesores />}
                />
                <Route path="/crear-profesores" element={<CrearProfesores />} />
                <Route path="/crearclases" element={<CrearClases/>} />
                <Route path="/listado-pagos" element={<PageListadoPagos />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
      {/* /.content */}
    </div>
  );
}
