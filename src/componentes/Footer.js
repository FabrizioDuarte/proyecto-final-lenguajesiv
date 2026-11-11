import { Link } from 'react-router-dom';
import { perfil } from '../datos/datos';

function Footer() {
  const anio = new Date().getFullYear();

  return (
    <footer className="footer py-4">
      <div className="container text-center">
        <div className="mb-2">
          <a href={perfil.github} target="_blank" rel="noreferrer"><i className="bi bi-github"></i></a>
          <a href={perfil.linkedin} target="_blank" rel="noreferrer"><i className="bi bi-linkedin"></i></a>
          <a href={'mailto:' + perfil.email}><i className="bi bi-envelope"></i></a>
        </div>
        <p className="mb-1 small">© {anio} {perfil.nombre} - Desarrollador Fullstack</p>
        <Link to="/admin" style={{ fontSize: '0.8rem' }}>Panel de administración</Link>
      </div>
    </footer>
  );
}

export default Footer;
