import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useProyectos } from '../store';
import DemoTareas from '../componentes/demos/DemoTareas';
import DemoClima from '../componentes/demos/DemoClima';
import DemoCarrito from '../componentes/demos/DemoCarrito';
import NoEncontrada from './NoEncontrada';

function DetalleProyecto() {
  const { id } = useParams();
  const [aviso, setAviso] = useState('');
  const proyectos = useProyectos();

  if (proyectos === null) {
    return <div className="container seccion text-center texto-gris">Cargando...</div>;
  }

  const proyecto = proyectos.find((p) => p.id === Number(id) && p.visible);

  if (!proyecto) {
    return <NoEncontrada />;
  }

  function copiarLink() {
    navigator.clipboard.writeText(window.location.href);
    setAviso('Link copiado');
  }

  return (
    <div>
      <div className="encabezado-pagina">
        <div className="container">
          <i className={'bi ' + proyecto.icono + ' icono-grande'}></i>
          <h1 className="mt-2">{proyecto.titulo}</h1>
          <span className="badge bg-light text-dark">{proyecto.categoria}</span>
        </div>
      </div>

      <div className="container seccion">
        <Link to="/proyectos" className="text-decoration-none texto-violeta">
          <i className="bi bi-arrow-left"></i> Volver a proyectos
        </Link>

        <div className="row g-4 mt-1">
          <div className="col-lg-5">
            <div className="tarjeta tarjeta-fija p-4">
              {proyecto.imagen && <img src={proyecto.imagen} alt={proyecto.titulo} className="img-proyecto mb-3" />}
              <h5>Descripción</h5>
              <p className="texto-gris">{proyecto.descripcion}</p>
              <h5>Funciones</h5>
              <ul className="texto-gris">
                {proyecto.funciones.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <h5>Tecnologías</h5>
              <div className="mb-4">
                {proyecto.tecnologias.map((t) => (
                  <span className="badge-tec" key={t}>{t}</span>
                ))}
              </div>
              <div className="d-flex gap-2 flex-wrap">
                <a href="https://github.com" target="_blank" rel="noreferrer" className="btn btn-borde">
                  <i className="bi bi-github"></i> Código
                </a>
                <button className="btn btn-violeta" onClick={copiarLink}>
                  <i className="bi bi-link-45deg"></i> Copiar link
                </button>
              </div>
              {aviso && <div className="alert alert-success mt-3 mb-0 py-2">{aviso}</div>}
            </div>
          </div>

          <div className="col-lg-7">
            <div className="tarjeta tarjeta-fija p-4">
              <h5><i className="bi bi-play-circle"></i> Demo interactiva</h5>
              <div className="caja-demo mt-3">
                {proyecto.demo === 'tareas' && <DemoTareas />}
                {proyecto.demo === 'clima' && <DemoClima />}
                {proyecto.demo === 'carrito' && <DemoCarrito />}
                {!proyecto.demo && (
                  <p className="texto-gris text-center mb-0">
                    <i className="bi bi-hourglass-split"></i> La demo de este proyecto todavía no está disponible.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetalleProyecto;
