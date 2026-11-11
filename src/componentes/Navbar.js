import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Navbar({ usuario, cerrarSesion }) {
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  function cerrarMenu() {
    setAbierto(false);
  }

  function salir() {
    cerrarSesion();
    setAbierto(false);
    navigate('/');
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-custom sticky-top">
      <div className="container">
        <Link className="navbar-brand logo" to="/" onClick={cerrarMenu}>
          Andrew<span>.dev</span>
        </Link>
        <button className="navbar-toggler" type="button" onClick={() => setAbierto(!abierto)}>
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={abierto ? 'collapse navbar-collapse show' : 'collapse navbar-collapse'}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end onClick={cerrarMenu}>Inicio</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/proyectos" onClick={cerrarMenu}>Proyectos</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/servicios" onClick={cerrarMenu}>Servicios</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto" onClick={cerrarMenu}>Contacto</NavLink>
            </li>
            {usuario && usuario.rol === 'operador' && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/operador" onClick={cerrarMenu}>
                  <i className="bi bi-inbox"></i> Panel
                </NavLink>
              </li>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2 ms-lg-3 pb-3 pb-lg-0">
            {usuario ? (
              <>
                <span className="text-white small">
                  <i className="bi bi-person-circle"></i> {usuario.nombre}
                </span>
                <button className="btn btn-borde btn-sm" onClick={salir}>Salir</button>
              </>
            ) : (
              <>
                <Link className="btn btn-borde btn-sm" to="/login" onClick={cerrarMenu}>Ingresar</Link>
                <Link className="btn btn-violeta btn-sm" to="/registro" onClick={cerrarMenu}>Registrarse</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
