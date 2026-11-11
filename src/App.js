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
import { sumarVisita, buscarPerfil } from './store';
import { supabase } from './supabaseClient';

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
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    function cargarPerfil(sesion) {
      if (!sesion) {
        setUsuario(null);
        setCargando(false);
        return;
      }
      buscarPerfil(sesion.user.id).then((perfil) => {
        if (perfil && perfil.activo) {
          setUsuario(perfil);
        } else {
          setUsuario(null);
        }
        setCargando(false);
      });
    }

    const { data } = supabase.auth.onAuthStateChange((evento, sesion) => {
      setTimeout(() => cargarPerfil(sesion), 0);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  function iniciarSesion(perfil) {
    setUsuario(perfil);
  }

  function cerrarSesion() {
    supabase.auth.signOut();
    setUsuario(null);
  }

  if (cargando) {
    return (
      <div className="min-vh-100 d-flex align-items-center justify-content-center">
        <p className="texto-gris">Cargando...</p>
      </div>
    );
  }

  const esOperador = usuario && (usuario.rol === 'operador' || usuario.rol === 'admin');

  return (
    <Routes>
      <Route
        path="/admin/*"
        element={<AdminApp usuario={usuario} iniciarSesion={iniciarSesion} cerrarSesion={cerrarSesion} />}
      />
      <Route element={<LandingLayout usuario={usuario} cerrarSesion={cerrarSesion} />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/proyectos" element={<Proyectos usuario={usuario} />} />
        <Route path="/proyectos/:id" element={usuario ? <DetalleProyecto /> : <Navigate to="/login" />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto usuario={usuario} />} />
        <Route path="/login" element={<Login iniciarSesion={iniciarSesion} />} />
        <Route path="/registro" element={<Registro iniciarSesion={iniciarSesion} />} />
        <Route path="/operador" element={esOperador ? <PanelOperador /> : <Navigate to="/login" />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}

export default App;
