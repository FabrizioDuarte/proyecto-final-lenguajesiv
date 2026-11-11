import { useState } from 'react';
import { useServicios, guardarServicio, borrarServicio } from '../store';
import { iconos } from '../datos/datos';

const vacio = { titulo: '', icono: 'bi-code-slash', descripcion: '', incluye: '' };

function ServiciosAdmin() {
  const servicios = useServicios() || [];
  const [form, setForm] = useState(vacio);
  const [editando, setEditando] = useState(null);
  const [errores, setErrores] = useState({});
  const [errorGuardar, setErrorGuardar] = useState('');
  const [guardando, setGuardando] = useState(false);

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function editar(s) {
    setEditando(s.id);
    setForm({ titulo: s.titulo, icono: s.icono, descripcion: s.descripcion, incluye: s.incluye.join(', ') });
    setErrores({});
    setErrorGuardar('');
    window.scrollTo(0, 0);
  }

  function cancelar() {
    setEditando(null);
    setForm(vacio);
    setErrores({});
  }

  async function guardar(e) {
    e.preventDefault();
    const incluye = form.incluye.split(',').map((i) => i.trim()).filter((i) => i !== '');
    const nuevos = {};

    if (form.titulo.trim().length < 3) {
      nuevos.titulo = 'El título tiene que tener al menos 3 letras';
    }
    if (form.descripcion.trim().length < 10) {
      nuevos.descripcion = 'La descripción tiene que tener al menos 10 caracteres';
    }
    if (incluye.length === 0) {
      nuevos.incluye = 'Poné al menos un ítem';
    }

    setErrores(nuevos);
    setErrorGuardar('');
    if (Object.keys(nuevos).length > 0) {
      return;
    }

    setGuardando(true);
    const error = await guardarServicio(
      {
        titulo: form.titulo.trim(),
        icono: form.icono,
        descripcion: form.descripcion.trim(),
        incluye: incluye
      },
      editando
    );
    setGuardando(false);

    if (error) {
      setErrorGuardar('No se pudo guardar: ' + error);
    } else {
      cancelar();
    }
  }

  function borrar(s) {
    if (window.confirm('¿Borrar el servicio ' + s.titulo + '?')) {
      borrarServicio(s.id);
      if (editando === s.id) {
        cancelar();
      }
    }
  }

  return (
    <div>
      <h2 className="mb-4">Servicios</h2>
      <div className="row g-4">
        <div className="col-lg-5">
          <div className="tarjeta tarjeta-fija p-4">
            <h5>{editando ? 'Editar servicio' : 'Nuevo servicio'}</h5>
            {errorGuardar && <div className="alert alert-danger py-2">{errorGuardar}</div>}
            <form onSubmit={guardar} noValidate>
              <div className="mb-3">
                <label className="form-label">Título</label>
                <input
                  name="titulo"
                  className={errores.titulo ? 'form-control is-invalid' : 'form-control'}
                  value={form.titulo}
                  onChange={cambiar}
                />
                <div className="invalid-feedback">{errores.titulo}</div>
              </div>
              <div className="mb-3">
                <label className="form-label">Ícono</label>
                <div className="d-flex align-items-center gap-2">
                  <i className={'bi ' + form.icono + ' fs-3 texto-violeta'}></i>
                  <select name="icono" className="form-select" value={form.icono} onChange={cambiar}>
                    {iconos.map((icono) => (
                      <option key={icono} value={icono}>{icono.replace('bi-', '')}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea
                  name="descripcion"
                  rows="3"
                  className={errores.descripcion ? 'form-control is-invalid' : 'form-control'}
                  value={form.descripcion}
                  onChange={cambiar}
                ></textarea>
                <div className="invalid-feedback">{errores.descripcion}</div>
              </div>
              <div className="mb-4">
                <label className="form-label">Qué incluye (separado por coma)</label>
                <input
                  name="incluye"
                  className={errores.incluye ? 'form-control is-invalid' : 'form-control'}
                  value={form.incluye}
                  onChange={cambiar}
                />
                <div className="invalid-feedback">{errores.incluye}</div>
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-violeta" disabled={guardando}>
                  <i className="bi bi-save"></i> {editando ? 'Guardar cambios' : 'Agregar'}
                </button>
                {editando && (
                  <button type="button" className="btn btn-outline-secondary" onClick={cancelar}>Cancelar</button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="col-lg-7">
          {servicios.map((s) => (
            <div className={editando === s.id ? 'tarjeta tarjeta-fija h-auto p-3 mb-3 borde-violeta' : 'tarjeta tarjeta-fija h-auto p-3 mb-3'} key={s.id}>
              <div className="d-flex gap-3 align-items-start">
                <i className={'bi ' + s.icono + ' fs-2 texto-violeta'}></i>
                <div className="flex-grow-1">
                  <h6 className="mb-1">{s.titulo}</h6>
                  <p className="small texto-gris mb-1">{s.descripcion}</p>
                  <small className="texto-gris">{s.incluye.length} ítems</small>
                </div>
                <div className="text-nowrap">
                  <button className="btn btn-sm btn-outline-secondary me-1" onClick={() => editar(s)}>
                    <i className="bi bi-pencil"></i>
                  </button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => borrar(s)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
          {servicios.length === 0 && <p className="texto-gris text-center">No hay servicios cargados</p>}
        </div>
      </div>
    </div>
  );
}

export default ServiciosAdmin;
