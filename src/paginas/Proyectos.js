import { useState } from 'react';
import { Link } from 'react-router-dom';
import Aparecer from '../componentes/Aparecer';
import { useProyectos } from '../store';

const categorias = ['Todos', 'Frontend', 'Fullstack', 'Mobile'];

function Proyectos({ usuario }) {
  const [filtro, setFiltro] = useState('Todos');

  const datos = useProyectos();
  const proyectos = datos || [];

  let lista = proyectos.filter((p) => p.visible);
  if (filtro !== 'Todos') {
    lista = lista.filter((p) => p.categoria === filtro);
  }

  return (
    <div>
      <div className="encabezado-pagina">
        <div className="container">
          <h1>Proyectos</h1>
          <p className="mb-0" style={{ color: '#c9c9d6' }}>Algunos de los trabajos que hice</p>
        </div>
      </div>

      <div className="container seccion">
        {!usuario && (
          <div className="alert alert-info text-center">
            <i className="bi bi-lock"></i> Para ver el detalle y las demos de los proyectos tenés que{' '}
            <Link to="/login">iniciar sesión</Link> o <Link to="/registro">registrarte</Link>.
          </div>
        )}

        <div className="text-center mb-4">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={filtro === cat ? 'btn btn-outline-secondary filtro-btn activo' : 'btn btn-outline-secondary filtro-btn'}
              onClick={() => setFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="row g-4">
          {lista.map((proyecto) => (
            <div className="col-md-6 col-lg-4" key={proyecto.id}>
              <Aparecer className="h-100">
                <div className="tarjeta p-4 d-flex flex-column">
                  {proyecto.imagen && <img src={proyecto.imagen} alt={proyecto.titulo} className="img-proyecto mb-3" />}
                  <div className="d-flex justify-content-between align-items-start">
                    <i className={'bi ' + proyecto.icono + ' icono-grande'}></i>
                    <span className="badge bg-dark">{proyecto.categoria}</span>
                  </div>
                  <h5 className="mt-3">{proyecto.titulo}</h5>
                  <p className="texto-gris">{proyecto.resumen}</p>
                  <div className="mb-3">
                    {proyecto.tecnologias.map((t) => (
                      <span className="badge-tec" key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="mt-auto">
                    <Link to={'/proyectos/' + proyecto.id} className="btn btn-violeta w-100">
                      {!usuario && <i className="bi bi-lock me-1"></i>}
                      Ver detalle
                    </Link>
                  </div>
                </div>
              </Aparecer>
            </div>
          ))}
        </div>
        {datos === null && <p className="texto-gris text-center mt-4">Cargando proyectos...</p>}
        {datos !== null && lista.length === 0 && <p className="texto-gris text-center mt-4">No hay proyectos en esta categoría</p>}
      </div>
    </div>
  );
}

export default Proyectos;
