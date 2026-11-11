import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProyectos, guardarProyecto, subirImagen } from '../store';
import { iconos, demos } from '../datos/datos';
import { achicarImagen } from '../utilidades';

const vacio = {
  titulo: '',
  categoria: 'Frontend',
  resumen: '',
  descripcion: '',
  tecnologias: '',
  funciones: '',
  icono: 'bi-code-slash',
  demo: '',
  imagen: null,
  visible: true
};

function EditorProyecto() {
  const { id } = useParams();
  const proyectos = useProyectos();

  if (proyectos === null) {
    return <p className="texto-gris">Cargando...</p>;
  }

  const esNuevo = id === 'nuevo';
  const original = proyectos.find((p) => p.id === Number(id));

  if (!esNuevo && !original) {
    return (
      <div>
        <h2>El proyecto no existe</h2>
        <Link to="/admin/proyectos" className="texto-violeta">Volver a proyectos</Link>
      </div>
    );
  }

  return <FormProyecto original={original} key={id} />;
}

function FormProyecto({ original }) {
  const navigate = useNavigate();
  const esNuevo = !original;

  let inicial = vacio;
  if (original) {
    inicial = {
      ...original,
      tecnologias: original.tecnologias.join(', '),
      funciones: original.funciones.join(', '),
      demo: original.demo || ''
    };
  }

  const [form, setForm] = useState(inicial);
  const [errores, setErrores] = useState({});
  const [errorImagen, setErrorImagen] = useState('');
  const [errorGuardar, setErrorGuardar] = useState('');
  const [guardando, setGuardando] = useState(false);

  function cambiar(e) {
    if (e.target.type === 'checkbox') {
      setForm({ ...form, [e.target.name]: e.target.checked });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  }

  function cambiarImagen(e) {
    const archivo = e.target.files[0];
    setErrorImagen('');
    if (!archivo) {
      return;
    }
    const permitidos = ['image/jpeg', 'image/png', 'image/webp'];
    if (!permitidos.includes(archivo.type)) {
      setErrorImagen('Solo se permiten imágenes JPG, PNG o WEBP');
      e.target.value = '';
      return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
      setErrorImagen('La imagen no puede pesar más de 5 MB');
      e.target.value = '';
      return;
    }
    achicarImagen(archivo)
      .then((foto) => {
        setForm((anterior) => ({ ...anterior, imagen: foto }));
      })
      .catch(() => {
        setErrorImagen('No se pudo leer la imagen');
      });
  }

  async function guardar(e) {
    e.preventDefault();
    const tecnologias = form.tecnologias.split(',').map((t) => t.trim()).filter((t) => t !== '');
    const funciones = form.funciones.split(',').map((f) => f.trim()).filter((f) => f !== '');
    const nuevos = {};

    if (form.titulo.trim().length < 3) {
      nuevos.titulo = 'El título tiene que tener al menos 3 letras';
    }
    if (form.resumen.trim().length < 10 || form.resumen.trim().length > 100) {
      nuevos.resumen = 'El resumen tiene que tener entre 10 y 100 caracteres';
    }
    if (form.descripcion.trim().length < 20) {
      nuevos.descripcion = 'La descripción tiene que tener al menos 20 caracteres';
    }
    if (tecnologias.length === 0) {
      nuevos.tecnologias = 'Poné al menos una tecnología';
    }

    setErrores(nuevos);
    setErrorGuardar('');
    if (Object.keys(nuevos).length > 0) {
      return;
    }

    setGuardando(true);

    let imagen = form.imagen;
    if (imagen && imagen.startsWith('data:')) {
      imagen = await subirImagen(imagen);
      if (!imagen) {
        setErrorImagen('No se pudo subir la imagen');
        setGuardando(false);
        return;
      }
    }

    const datos = {
      titulo: form.titulo.trim(),
      categoria: form.categoria,
      resumen: form.resumen.trim(),
      descripcion: form.descripcion.trim(),
      tecnologias: tecnologias,
      funciones: funciones,
      icono: form.icono,
      demo: form.demo === '' ? null : form.demo,
      imagen: imagen,
      visible: form.visible
    };

    const error = await guardarProyecto(datos, esNuevo ? null : original.id);
    setGuardando(false);

    if (error) {
      setErrorGuardar('No se pudo guardar: ' + error);
    } else {
      navigate('/admin/proyectos');
    }
  }

  return (
    <div>
      <Link to="/admin/proyectos" className="text-decoration-none texto-violeta">
        <i className="bi bi-arrow-left"></i> Volver a proyectos
      </Link>
      <h2 className="mt-2 mb-4">{esNuevo ? 'Nuevo proyecto' : 'Editar ' + original.titulo}</h2>
      {errorGuardar && <div className="alert alert-danger">{errorGuardar}</div>}

      <form className="row g-4" onSubmit={guardar} noValidate>
        <div className="col-lg-8">
          <div className="tarjeta tarjeta-fija p-4">
            <div className="row g-3">
              <div className="col-md-8">
                <label className="form-label">Título</label>
                <input
                  name="titulo"
                  className={errores.titulo ? 'form-control is-invalid' : 'form-control'}
                  value={form.titulo}
                  onChange={cambiar}
                />
                <div className="invalid-feedback">{errores.titulo}</div>
              </div>
              <div className="col-md-4">
                <label className="form-label">Categoría</label>
                <select name="categoria" className="form-select" value={form.categoria} onChange={cambiar}>
                  <option>Frontend</option>
                  <option>Fullstack</option>
                  <option>Mobile</option>
                </select>
              </div>
              <div className="col-12">
                <label className="form-label">Resumen (se ve en la tarjeta)</label>
                <input
                  name="resumen"
                  className={errores.resumen ? 'form-control is-invalid' : 'form-control'}
                  value={form.resumen}
                  onChange={cambiar}
                />
                <div className="invalid-feedback">{errores.resumen}</div>
                <small className="texto-gris">{form.resumen.length}/100</small>
              </div>
              <div className="col-12">
                <label className="form-label">Descripción</label>
                <textarea
                  name="descripcion"
                  rows="4"
                  className={errores.descripcion ? 'form-control is-invalid' : 'form-control'}
                  value={form.descripcion}
                  onChange={cambiar}
                ></textarea>
                <div className="invalid-feedback">{errores.descripcion}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Tecnologías (separadas por coma)</label>
                <input
                  name="tecnologias"
                  className={errores.tecnologias ? 'form-control is-invalid' : 'form-control'}
                  placeholder="React, Node.js, MySQL"
                  value={form.tecnologias}
                  onChange={cambiar}
                />
                <div className="invalid-feedback">{errores.tecnologias}</div>
              </div>
              <div className="col-md-6">
                <label className="form-label">Funciones (separadas por coma)</label>
                <input name="funciones" className="form-control" value={form.funciones} onChange={cambiar} />
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="tarjeta tarjeta-fija p-4">
            <label className="form-label">Imagen</label>
            {form.imagen && (
              <div className="mb-2">
                <img src={form.imagen} alt="" className="img-proyecto mb-2" />
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => setForm({ ...form, imagen: null })}>
                  Quitar imagen
                </button>
              </div>
            )}
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.webp"
              className={errorImagen ? 'form-control is-invalid' : 'form-control'}
              onChange={cambiarImagen}
            />
            <div className="invalid-feedback">{errorImagen}</div>
            <small className="texto-gris d-block mb-3">JPG, PNG o WEBP hasta 5 MB</small>

            <label className="form-label">Ícono</label>
            <div className="d-flex align-items-center gap-2 mb-3">
              <i className={'bi ' + form.icono + ' fs-3 texto-violeta'}></i>
              <select name="icono" className="form-select" value={form.icono} onChange={cambiar}>
                {iconos.map((icono) => (
                  <option key={icono} value={icono}>{icono.replace('bi-', '')}</option>
                ))}
              </select>
            </div>

            <label className="form-label">Demo interactiva</label>
            <select name="demo" className="form-select mb-3" value={form.demo} onChange={cambiar}>
              {demos.map((d) => (
                <option key={d.valor} value={d.valor}>{d.nombre}</option>
              ))}
            </select>

            <div className="form-check form-switch mb-4">
              <input className="form-check-input" type="checkbox" id="visible" name="visible" checked={form.visible} onChange={cambiar} />
              <label className="form-check-label" htmlFor="visible">Visible en el sitio</label>
            </div>

            <button type="submit" className="btn btn-violeta w-100" disabled={guardando}>
              <i className="bi bi-save"></i> {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditorProyecto;
