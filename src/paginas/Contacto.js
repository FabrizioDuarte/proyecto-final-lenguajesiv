import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { perfil } from '../datos/datos';
import { agregarMensaje } from '../store';
import { hoy } from '../utilidades';

const tipos = {
  consulta: 'Consulta general',
  presupuesto: 'Pedido de presupuesto',
  asesoramiento: 'Asesoramiento técnico'
};

function Contacto({ usuario }) {
  const [params] = useSearchParams();
  const tipoInicial = tipos[params.get('tipo')] || 'Consulta general';

  const [form, setForm] = useState({
    nombre: usuario ? usuario.nombre : '',
    email: usuario ? usuario.email : '',
    tipo: tipoInicial,
    asunto: '',
    mensaje: ''
  });
  const [archivo, setArchivo] = useState(null);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function cambiarArchivo(e) {
    setArchivo(e.target.files[0] || null);
  }

  function validar() {
    const nuevos = {};
    if (form.nombre.trim().length < 3) {
      nuevos.nombre = 'El nombre tiene que tener al menos 3 letras';
    }
    if (!form.email.includes('@') || !form.email.includes('.')) {
      nuevos.email = 'Ingresá un email válido';
    }
    if (form.asunto.trim().length < 3) {
      nuevos.asunto = 'Escribí un asunto';
    }
    if (form.mensaje.trim().length < 10) {
      nuevos.mensaje = 'El mensaje tiene que tener al menos 10 caracteres';
    }
    if (form.mensaje.length > 1000) {
      nuevos.mensaje = 'El mensaje no puede tener más de 1000 caracteres';
    }
    if (archivo) {
      const permitidos = ['application/pdf', 'image/jpeg', 'image/png'];
      if (!permitidos.includes(archivo.type)) {
        nuevos.archivo = 'Solo se permiten archivos PDF, JPG o PNG';
      } else if (archivo.size > 2 * 1024 * 1024) {
        nuevos.archivo = 'El archivo no puede pesar más de 2 MB';
      }
    }
    return nuevos;
  }

  function enviar(e) {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) {
      return;
    }

    agregarMensaje({
      id: Date.now(),
      nombre: form.nombre.trim(),
      email: form.email.trim(),
      tipo: form.tipo,
      asunto: form.asunto.trim(),
      mensaje: form.mensaje.trim(),
      archivo: archivo ? archivo.name : null,
      fecha: hoy(),
      estado: 'Pendiente'
    });

    setEnviado(true);
    setForm({ ...form, asunto: '', mensaje: '' });
    setArchivo(null);
    e.target.reset();
  }

  function copiarEmail() {
    navigator.clipboard.writeText(perfil.email);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div>
      <div className="encabezado-pagina">
        <div className="container">
          <h1>Contacto</h1>
          <p className="mb-0" style={{ color: '#c9c9d6' }}>Consultas, presupuestos o asesoramiento técnico</p>
        </div>
      </div>

      <div className="container seccion">
        <div className="row g-4">
          <div className="col-lg-4">
            <div className="tarjeta tarjeta-fija p-4">
              <h5>Hablemos</h5>
              <p className="texto-gris">Respondo todas las consultas en menos de 48 horas.</p>
              <p className="mb-1"><i className="bi bi-envelope texto-violeta"></i> {perfil.email}</p>
              <button className="btn btn-sm btn-borde mt-2" onClick={copiarEmail}>
                <i className={copiado ? 'bi bi-check2' : 'bi bi-clipboard'}></i> {copiado ? 'Copiado' : 'Copiar email'}
              </button>
              <p className="mt-3 mb-0"><i className="bi bi-geo-alt texto-violeta"></i> {perfil.ciudad}</p>
            </div>
          </div>

          <div className="col-lg-8">
            <div className="tarjeta tarjeta-fija p-4">
              {enviado && (
                <div className="alert alert-success">
                  <i className="bi bi-check-circle"></i> ¡Mensaje enviado! Te voy a responder por email a la brevedad.
                </div>
              )}
              <form onSubmit={enviar} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">Nombre</label>
                    <input
                      name="nombre"
                      className={errores.nombre ? 'form-control is-invalid' : 'form-control'}
                      value={form.nombre}
                      onChange={cambiar}
                    />
                    <div className="invalid-feedback">{errores.nombre}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      name="email"
                      type="email"
                      className={errores.email ? 'form-control is-invalid' : 'form-control'}
                      value={form.email}
                      onChange={cambiar}
                    />
                    <div className="invalid-feedback">{errores.email}</div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Tipo de consulta</label>
                    <select name="tipo" className="form-select" value={form.tipo} onChange={cambiar}>
                      <option>Consulta general</option>
                      <option>Pedido de presupuesto</option>
                      <option>Asesoramiento técnico</option>
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Asunto</label>
                    <input
                      name="asunto"
                      className={errores.asunto ? 'form-control is-invalid' : 'form-control'}
                      value={form.asunto}
                      onChange={cambiar}
                    />
                    <div className="invalid-feedback">{errores.asunto}</div>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Mensaje</label>
                    <textarea
                      name="mensaje"
                      rows="5"
                      className={errores.mensaje ? 'form-control is-invalid' : 'form-control'}
                      value={form.mensaje}
                      onChange={cambiar}
                    ></textarea>
                    <div className="invalid-feedback">{errores.mensaje}</div>
                    <small className="texto-gris">{form.mensaje.length}/1000</small>
                  </div>
                  <div className="col-12">
                    <label className="form-label">Adjunto (opcional, PDF/JPG/PNG hasta 2 MB)</label>
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className={errores.archivo ? 'form-control is-invalid' : 'form-control'}
                      onChange={cambiarArchivo}
                    />
                    <div className="invalid-feedback">{errores.archivo}</div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-violeta">
                      <i className="bi bi-send"></i> Enviar mensaje
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contacto;
