import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ProyectosAdmin from './ProyectosAdmin';
import EditorProyecto from './EditorProyecto';
import ServiciosAdmin from './ServiciosAdmin';
import UsuariosAdmin from './UsuariosAdmin';

function AdminLayout({ admin, salir }) {
  return (
    <div className="admin-contenedor">
      <aside className="admin-sidebar">
        <div className="logo fs-4">Andrew<span>.dev</span></div>
        <small className="texto-gris d-block mb-4">Panel de administración</small>
        <nav className="nav flex-column admin-menu">
          <NavLink className="nav-link" to="/admin" end>
            <i className="bi bi-speedometer2"></i> Dashboard
          </NavLink>
          <NavLink className="nav-link" to="/admin/proyectos">
            <i className="bi bi-kanban"></i> Proyectos
          </NavLink>
          <NavLink className="nav-link" to="/admin/servicios">
            <i className="bi bi-briefcase"></i> Servicios
          </NavLink>
          <NavLink className="nav-link" to="/admin/usuarios">
            <i className="bi bi-people"></i> Usuarios
          </NavLink>
        </nav>
        <div className="mt-auto pt-4">
          <a href="/" target="_blank" rel="noreferrer" className="btn btn-borde btn-sm w-100 mb-3">
            <i className="bi bi-box-arrow-up-right"></i> Ver sitio
          </a>
          <p className="small text-white mb-2"><i className="bi bi-person-circle"></i> {admin.nombre}</p>
          <button className="btn btn-outline-light btn-sm w-100" onClick={salir}>Salir</button>
        </div>
      </aside>
      <main className="admin-contenido">
        <Routes>
          <Route index element={<Dashboard />} />
          <Route path="proyectos" element={<ProyectosAdmin />} />
          <Route path="proyectos/:id" element={<EditorProyecto />} />
          <Route path="servicios" element={<ServiciosAdmin />} />
          <Route path="usuarios" element={<UsuariosAdmin />} />
          <Route path="*" element={<Navigate to="/admin" />} />
        </Routes>
      </main>
    </div>
  );
}

export default AdminLayout;
