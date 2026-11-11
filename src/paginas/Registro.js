import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuarios, registrarUsuario, sumarAcceso } from '../store';
import { hoy } from '../utilidades';

function Registro({ iniciarSesion }) {
  const usuarios = useUsuarios();
  const [form, setForm] = useState({ nombre: '', email: '', password: '', repetir: '' });
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  function cambiar(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function registrar(e) {
    e.preventDefault();
    const email = form.email;
    const nuevos = {};

    if (form.nombre.length < 3) {
      nuevos.nombre = 'El nombre tiene que tener al menos 3 letras';
    }
    if (!email.includes('@') || !email.includes('.')) {
      nuevos.email = 'Ingresá un email válido';
    }
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email) {
        nuevos.email = 'Ya existe una cuenta con ese email';
      }
    }
    if (form.password.length < 6) {
      nuevos.password = 'La contraseña tiene que tener al menos 6 caracteres';
    }
    if (form.password !== form.repetir) {
      nuevos.repetir = 'Las contraseñas no coinciden';
    }

    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) {
      return;
    }

    const nuevo = {
      id: Date.now(),
      nombre: form.nombre,
      email: email,
      password: form.password,
      rol: 'usuario',
      activo: true,
      fechaRegistro: hoy()
    };
    registrarUsuario(nuevo);
    sumarAcceso();
    iniciarSesion({ nombre: nuevo.nombre, email: nuevo.email, rol: nuevo.rol });
    navigate('/proyectos');
  }

  return (
    <div className="tarjeta tarjeta-fija caja-form">
      <h2 className="text-center mb-1">Crear cuenta</h2>
      <p className="text-center texto-gris mb-4">Registrate para ver el detalle de los proyectos</p>
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
        <button type="submit" className="btn btn-violeta w-100">Registrarme</button>
      </form>
      <p className="text-center mt-3 mb-0">
        ¿Ya tenés cuenta? <Link to="/login" className="texto-violeta">Iniciá sesión</Link>
      </p>
    </div>
  );
}

export default Registro;
