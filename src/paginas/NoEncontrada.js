import { Link } from 'react-router-dom';

function NoEncontrada() {
  return (
    <div className="container seccion text-center">
      <div className="dato-numero" style={{ fontSize: '6rem' }}>404</div>
      <h2>Página no encontrada</h2>
      <p className="texto-gris">La página que buscás no existe.</p>
      <Link to="/" className="btn btn-violeta">Volver al inicio</Link>
    </div>
  );
}

export default NoEncontrada;
