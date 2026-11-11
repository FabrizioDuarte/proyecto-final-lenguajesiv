import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUsuarios, sumarAcceso } from '../store';

function Login({ iniciarSesion }) {
  const usuarios = useUsuarios();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  function ingresar(e) {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Completá todos los campos');
      return;
    }

    let encontrado = null;
    for (let i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email && usuarios[i].password === password) {
        encontrado = usuarios[i];
      }
    }

    if (encontrado == null) {
      setError('Email o contraseña incorrectos');
      return;
    }

    if (!encontrado.activo) {
      setError('Tu cuenta está bloqueada');
      return;
    }

    sumarAcceso();
    iniciarSesion({ nombre: encontrado.nombre, email: encontrado.email, rol: encontrado.rol });

    if (encontrado.rol === 'operador') {
      navigate('/operador');
    } else {
      navigate('/proyectos');
    }
  }

  return (
    <div className="tarjeta tarjeta-fija caja-form">
      <h2 className="text-center mb-1">Iniciar sesión</h2>
      <p className="text-center texto-gris mb-4">Ingresá para ver los proyectos y las demos</p>
      {error && <div className="alert alert-danger py-2">{error}</div>}
      <form onSubmit={ingresar}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-violeta w-100">Ingresar</button>
      </form>
      <p className="text-center mt-3 mb-0">
        ¿No tenés cuenta? <Link to="/registro" className="texto-violeta">Registrate</Link>
      </p>
    </div>
  );
}

export default Login;
