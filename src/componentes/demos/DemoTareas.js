import { useState, useEffect } from 'react';

function DemoTareas() {
  const [tareas, setTareas] = useState(JSON.parse(localStorage.getItem('demoTareas')) || []);
  const [texto, setTexto] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem('demoTareas', JSON.stringify(tareas));
  }, [tareas]);

  function agregar(e) {
    e.preventDefault();
    if (texto.trim() === '') {
      setError('Escribí una tarea');
      return;
    }
    if (texto.length > 60) {
      setError('Máximo 60 caracteres');
      return;
    }
    setTareas([...tareas, { id: Date.now(), texto: texto.trim(), hecha: false }]);
    setTexto('');
    setError('');
  }

  function cambiar(id) {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  }

  function borrar(id) {
    setTareas(tareas.filter((t) => t.id !== id));
  }

  const pendientes = tareas.filter((t) => !t.hecha).length;

  return (
    <div>
      <form className="d-flex gap-2" onSubmit={agregar}>
        <input
          className={error ? 'form-control is-invalid' : 'form-control'}
          placeholder="Nueva tarea..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
        <button className="btn btn-violeta">Agregar</button>
      </form>
      {error && <small className="text-danger">{error}</small>}

      <ul className="list-group mt-3">
        {tareas.map((t) => (
          <li className="list-group-item d-flex justify-content-between align-items-center" key={t.id}>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" checked={t.hecha} onChange={() => cambiar(t.id)} />
              <span className={t.hecha ? 'text-decoration-line-through texto-gris' : ''}>{t.texto}</span>
            </div>
            <button className="btn btn-sm btn-outline-danger" onClick={() => borrar(t.id)}>
              <i className="bi bi-trash"></i>
            </button>
          </li>
        ))}
      </ul>
      {tareas.length === 0 && <p className="texto-gris text-center mt-3 mb-0">No hay tareas todavía</p>}
      {tareas.length > 0 && <p className="texto-gris small mt-2 mb-0">Te quedan {pendientes} tareas pendientes</p>}
    </div>
  );
}

export default DemoTareas;
