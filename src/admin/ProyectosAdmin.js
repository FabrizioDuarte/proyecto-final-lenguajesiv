import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useProyectos, cambiarVisible, borrarProyecto } from '../store';
import { demos } from '../datos/datos';

function nombreDemo(valor) {
  for (let i = 0; i < demos.length; i++) {
    if (demos[i].valor === (valor || '')) {
      return demos[i].nombre;
    }
  }
  return '-';
}

function ProyectosAdmin() {
  const proyectos = useProyectos();
  const [buscar, setBuscar] = useState('');
  const [categoria, setCategoria] = useState('Todas');

  let lista = proyectos.filter((p) => p.titulo.toLowerCase().includes(buscar.toLowerCase()));
  if (categoria !== 'Todas') {
    lista = lista.filter((p) => p.categoria === categoria);
  }

  function borrar(p) {
    if (window.confirm('¿Borrar el proyecto ' + p.titulo + '?')) {
      borrarProyecto(p.id);
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <h2 className="mb-0">Proyectos y demos</h2>
        <Link to="/admin/proyectos/nuevo" className="btn btn-violeta">
          <i className="bi bi-plus-lg"></i> Nuevo proyecto
        </Link>
      </div>

      <div className="tarjeta tarjeta-fija p-3">
        <div className="d-flex gap-2 flex-wrap mb-3">
          <input
            className="form-control"
            style={{ maxWidth: '280px' }}
            placeholder="Buscar por título..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
          <select className="form-select w-auto" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            <option>Todas</option>
            <option>Frontend</option>
            <option>Fullstack</option>
            <option>Mobile</option>
          </select>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th></th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Demo</th>
                <th>Visible</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((p) => (
                <tr key={p.id}>
                  <td>
                    {p.imagen ? (
                      <img src={p.imagen} alt="" className="miniatura" />
                    ) : (
                      <i className={'bi ' + p.icono + ' fs-3 texto-violeta'}></i>
                    )}
                  </td>
                  <td>
                    <div className="fw-medium">{p.titulo}</div>
                    <small className="texto-gris">{p.resumen}</small>
                  </td>
                  <td>{p.categoria}</td>
                  <td className="small">{nombreDemo(p.demo)}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" checked={p.visible} onChange={() => cambiarVisible(p.id)} />
                    </div>
                  </td>
                  <td className="text-nowrap">
                    <Link to={'/admin/proyectos/' + p.id} className="btn btn-sm btn-outline-secondary me-1">
                      <i className="bi bi-pencil"></i>
                    </Link>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => borrar(p)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lista.length === 0 && <p className="texto-gris text-center mt-3 mb-0">No se encontraron proyectos</p>}
      </div>
    </div>
  );
}

export default ProyectosAdmin;
