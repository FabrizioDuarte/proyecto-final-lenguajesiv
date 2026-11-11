import { useState } from 'react';
import { useUsuarios, cambiarRol, cambiarActivo, borrarUsuario } from '../store';

function UsuariosAdmin() {
  const usuarios = useUsuarios() || [];
  const [buscar, setBuscar] = useState('');
  const [rol, setRol] = useState('Todos');
  const [estado, setEstado] = useState('Todos');

  const texto = buscar.toLowerCase();
  let lista = usuarios.filter(
    (u) => u.nombre.toLowerCase().includes(texto) || u.email.toLowerCase().includes(texto)
  );
  if (rol !== 'Todos') {
    lista = lista.filter((u) => u.rol === rol);
  }
  if (estado === 'Activos') {
    lista = lista.filter((u) => u.activo);
  }
  if (estado === 'Bloqueados') {
    lista = lista.filter((u) => !u.activo);
  }

  function borrar(u) {
    if (window.confirm('¿Borrar al usuario ' + u.nombre + '? Ya no va a poder entrar al sitio.')) {
      borrarUsuario(u.id);
    }
  }

  return (
    <div>
      <h2 className="mb-4">Usuarios registrados</h2>
      <div className="tarjeta tarjeta-fija p-3">
        <div className="d-flex gap-2 flex-wrap mb-3">
          <input
            className="form-control"
            style={{ maxWidth: '280px' }}
            placeholder="Buscar por nombre o email..."
            value={buscar}
            onChange={(e) => setBuscar(e.target.value)}
          />
          <select className="form-select w-auto" value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="Todos">Todos los roles</option>
            <option value="usuario">Usuario</option>
            <option value="operador">Operador</option>
            <option value="admin">Admin</option>
          </select>
          <select className="form-select w-auto" value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option>Todos</option>
            <option>Activos</option>
            <option>Bloqueados</option>
          </select>
        </div>
        <p className="small texto-gris">Mostrando {lista.length} de {usuarios.length} usuarios</p>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Registro</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((u) => (
                <tr key={u.id}>
                  <td>{u.nombre}</td>
                  <td className="small">{u.email}</td>
                  <td>
                    {u.rol === 'admin' ? (
                      <span className="badge bg-dark">Admin</span>
                    ) : (
                      <select className="form-select form-select-sm" value={u.rol} onChange={(e) => cambiarRol(u.id, e.target.value)}>
                        <option value="usuario">Usuario</option>
                        <option value="operador">Operador</option>
                      </select>
                    )}
                  </td>
                  <td className="small">{u.fecha_registro}</td>
                  <td>
                    <span className={u.activo ? 'badge estado-respondido' : 'badge bg-secondary'}>
                      {u.activo ? 'Activo' : 'Bloqueado'}
                    </span>
                  </td>
                  <td className="text-nowrap">
                    {u.rol !== 'admin' && (
                      <>
                        <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => cambiarActivo(u)}>
                          {u.activo ? <i className="bi bi-lock"></i> : <i className="bi bi-unlock"></i>}
                        </button>
                        <button className="btn btn-sm btn-outline-danger" onClick={() => borrar(u)}>
                          <i className="bi bi-trash"></i>
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lista.length === 0 && <p className="texto-gris text-center mt-3 mb-0">No se encontraron usuarios</p>}
      </div>
    </div>
  );
}

export default UsuariosAdmin;
