import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import Navbar from './componentes/Navbar';
import Footer from './componentes/Footer';
import Inicio from './paginas/Inicio';
import Proyectos from './paginas/Proyectos';
import DetalleProyecto from './paginas/DetalleProyecto';
import Servicios from './paginas/Servicios';
import Contacto from './paginas/Contacto';
import Login from './paginas/Login';
import Registro from './paginas/Registro';
import PanelOperador from './paginas/PanelOperador';
import NoEncontrada from './paginas/NoEncontrada';
import AdminApp from './admin/AdminApp';
import { sumarVisita } from './store';

function LandingLayout({ usuario, cerrarSesion }) {
  useEffect(() => {
    sumarVisita();
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar usuario={usuario} cerrarSesion={cerrarSesion} />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem('usuario')));
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  function iniciarSesion(datos) {
    localStorage.setItem('usuario', JSON.stringify(datos));
    setUsuario(datos);
  }

  function cerrarSesion() {
    localStorage.removeItem('usuario');
    setUsuario(null);
  }

  return (
    <Routes>
      <Route path="/admin/*" element={<AdminApp />} />
      <Route element={<LandingLayout usuario={usuario} cerrarSesion={cerrarSesion} />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/proyectos" element={<Proyectos usuario={usuario} />} />
        <Route path="/proyectos/:id" element={usuario ? <DetalleProyecto /> : <Navigate to="/login" />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto usuario={usuario} />} />
        <Route path="/login" element={usuario ? <Navigate to="/" /> : <Login iniciarSesion={iniciarSesion} />} />
        <Route path="/registro" element={usuario ? <Navigate to="/" /> : <Registro iniciarSesion={iniciarSesion} />} />
        <Route
          path="/operador"
          element={usuario && usuario.rol === 'operador' ? <PanelOperador /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
