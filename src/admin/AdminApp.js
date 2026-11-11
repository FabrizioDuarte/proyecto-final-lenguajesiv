import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';

function AdminApp({ usuario, iniciarSesion, cerrarSesion }) {
  const esAdmin = usuario && usuario.rol === 'admin';

  return (
    <Routes>
      <Route path="login" element={esAdmin ? <Navigate to="/admin" /> : <AdminLogin iniciarSesion={iniciarSesion} />} />
      <Route
        path="*"
        element={esAdmin ? <AdminLayout admin={usuario} salir={cerrarSesion} /> : <Navigate to="/admin/login" />}
      />
    </Routes>
  );
}

export default AdminApp;
