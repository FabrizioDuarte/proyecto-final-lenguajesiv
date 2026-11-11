import { useState } from 'react';
import { useMensajes, marcarRespondido } from '../store';

function PanelOperador() {
  const mensajes = useMensajes();
  const [filtroTipo, setFiltroTipo] = useState('Todos');
  const [filtroEstado, setFiltroEstado] = useState('Todos');
  const [seleccionadoId, setSeleccionadoId] = useState(null);

  const seleccionado = mensajes.find((m) => m.id === seleccionadoId);

  let lista = mensajes;
  if (filtroTipo !== 'Todos') {
    lista = lista.filter((m) => m.tipo === filtroTipo);
  }
  if (filtroEstado !== 'Todos') {
    lista = lista.filter((m) => m.estado === filtroEstado);
  }

  return (
    <div className="container seccion">
      <h2 className="mb-4"><i className="bi bi-inbox texto-violeta"></i> Panel de operador</h2>

      <div className="row g-4">
        <div className="col-lg-7">
          <div className="tarjeta tarjeta-fija p-3">
            <div className="d-flex gap-2 mb-3 flex-wrap">
              <select className="form-select w-auto" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
                <option>Todos</option>
                <option>Consulta general</option>
                <option>Pedido de presupuesto</option>
                <option>Asesoramiento técnico</option>
              </select>
              <select className="form-select w-auto" value={filtroEstado} onChange={(e) => setFiltroEstado(e.target.value)}>
                <option>Todos</option>
                <option>Pendiente</option>
                <option>Respondido</option>
              </select>
            </div>
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Nombre</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((m) => (
                    <tr
                      key={m.id}
                      className={seleccionadoId === m.id ? 'fila-mensaje table-active' : 'fila-mensaje'}
                      onClick={() => setSeleccionadoId(m.id)}
                    >
                      <td className="small">{m.fecha}</td>
                      <td>{m.nombre}</td>
                      <td className="small">{m.tipo}</td>
                      <td>
                        <span className={m.estado === 'Pendiente' ? 'badge estado-pendiente' : 'badge estado-respondido'}>
                          {m.estado}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {lista.length === 0 && <p className="texto-gris text-center mt-3 mb-0">No hay mensajes con esos filtros</p>}
          </div>
        </div>

        <div className="col-lg-5">
          <div className="tarjeta tarjeta-fija p-4">
            {!seleccionado && <p className="texto-gris text-center mb-0">Elegí un mensaje para ver el detalle</p>}
            {seleccionado && (
              <div>
                <span className={seleccionado.estado === 'Pendiente' ? 'badge estado-pendiente' : 'badge estado-respondido'}>
                  {seleccionado.estado}
                </span>
                <h5 className="mt-2">{seleccionado.asunto}</h5>
                <p className="small texto-gris mb-1">{seleccionado.tipo} - {seleccionado.fecha}</p>
                <p className="mb-1"><i className="bi bi-person"></i> {seleccionado.nombre}</p>
                <p><i className="bi bi-envelope"></i> {seleccionado.email}</p>
                <p className="bg-light rounded p-3">{seleccionado.mensaje}</p>
                {seleccionado.archivo && (
                  <p className="small"><i className="bi bi-paperclip"></i> {seleccionado.archivo}</p>
                )}
                <div className="d-flex gap-2 flex-wrap">
                  <a href={'mailto:' + seleccionado.email + '?subject=Re: ' + seleccionado.asunto} className="btn btn-violeta btn-sm">
                    <i className="bi bi-reply"></i> Responder por email
                  </a>
                  {seleccionado.estado === 'Pendiente' && (
                    <button className="btn btn-borde btn-sm" onClick={() => marcarRespondido(seleccionado.id)}>
                      Marcar respondido
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PanelOperador;
