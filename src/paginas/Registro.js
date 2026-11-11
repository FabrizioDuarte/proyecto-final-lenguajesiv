import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { buscarPerfil, sumarAcceso } from '../store';

function Registro({ iniciarSesion }) {
  const [form, setForm] = useState({ nombre: '', email: '', password: '', repetir: '' });
  const [errores, setErrores] = useState({});
  const [error, setError] = useState('');
  const [aviso, setAviso] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function registrar(e) {
    e.preventDefault();
    const email = form.email;
    const nuevos = {};

    if (form.nombre.length < 3) {
      nuevos.nombre = 'El nombre tiene que tener al menos 3 letras';
    }
    if (!email.includes('@') || !email.includes('.')) {
      nuevos.email = 'Ingresá un email válido';
    }
    if (form.password.length < 6) {
      nuevos.password = 'La contraseña tiene que tener al menos 6 caracteres';
    }
    if (form.password !== form.repetir) {
      nuevos.repetir = 'Las contraseñas no coinciden';
    }

    setErrores(nuevos);
    setError('');
    if (Object.keys(nuevos).length > 0) {
      return;
    }

    setCargando(true);
    const { data, error: errorRegistro } = await supabase.auth.signUp({
      email: email,
      password: form.password,
      options: { data: { nombre: form.nombre } }
    });

    if (errorRegistro) {
      if (errorRegistro.message.includes('registered')) {
        setError('Ya existe una cuenta con ese email');
      } else {
        setError('No se pudo crear la cuenta: ' + errorRegistro.message);
      }
      setCargando(false);
      return;
    }

    if (!data.session) {
      setAviso('Te mandamos un email para confirmar tu cuenta.');
      setCargando(false);
      return;
    }

    let perfil = await buscarPerfil(data.user.id);
    if (!perfil) {
      perfil = { id: data.user.id, nombre: form.nombre, email: email, rol: 'usuario', activo: true };
    }
    await sumarAcceso(data.user.id);
    iniciarSesion(perfil);
    navigate('/proyectos');
  }

  return (
    <div className="tarjeta tarjeta-fija caja-form">
      <h2 className="text-center mb-1">Crear cuenta</h2>
      <p className="text-center texto-gris mb-4">Registrate para ver el detalle de los proyectos</p>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      {aviso && <div className="alert alert-success py-2">{aviso}</div>}
      <form onSubmit={registrar} noValidate>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input
            name="nombre"
            className={errores.nombre ? 'form-control is-invalid' : 'form-control'}
            value={form.nombre}
            onChange={cambiar}
          />
          <div className="invalid-feedback">{errores.nombre}</div>
        </div>
        <div className="mb-3">
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
        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            name="password"
            type="password"
            className={errores.password ? 'form-control is-invalid' : 'form-control'}
            value={form.password}
            onChange={cambiar}
          />
          <div className="invalid-feedback">{errores.password}</div>
        </div>
        <div className="mb-4">
          <label className="form-label">Repetir contraseña</label>
          <input
            name="repetir"
            type="password"
            className={errores.repetir ? 'form-control is-invalid' : 'form-control'}
            value={form.repetir}
            onChange={cambiar}
          />
          <div className="invalid-feedback">{errores.repetir}</div>
        </div>
        <button type="submit" className="btn btn-celeste w-100" disabled={cargando}>
          {cargando ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>
      <p className="text-center mt-3 mb-0">
        ¿Ya tenés cuenta? <Link to="/login" className="texto-celeste">Iniciá sesión</Link>
      </p>
    </div>
  );
}

export default Registro;
