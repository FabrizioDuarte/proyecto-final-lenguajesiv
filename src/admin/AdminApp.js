import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';

function AdminApp() {
  const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')));

  function entrar(datos) {
    localStorage.setItem('admin', JSON.stringify(datos));
    setAdmin(datos);
  }

  function salir() {
    localStorage.removeItem('admin');
    setAdmin(null);
  }

  return (
    <Routes>
      <Route path="login" element={admin ? <Navigate to="/admin" /> : <AdminLogin entrar={entrar} />} />
      <Route path="*" element={admin ? <AdminLayout admin={admin} salir={salir} /> : <Navigate to="/admin/login" />} />
    </Routes>
  );
}

export default AdminApp;
