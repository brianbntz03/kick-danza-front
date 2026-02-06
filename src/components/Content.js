import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

export default function Content() {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0">Sistema KB Danza</h1>
            </div>
            <div className="col-sm-6">
              <ol className="breadcrumb float-sm-right">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                
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
                        <Route path="/" element={<Dashboard />} />
                   </Routes>
                    
                    
                  </div>
                </div>
              </div>
            </div>
            {/* /.content */}
        </div>
  );
}
