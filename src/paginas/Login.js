import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { buscarPerfil, sumarAcceso } from '../store';

function Login({ iniciarSesion }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  async function ingresar(e) {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Completá todos los campos');
      return;
    }

    setCargando(true);
    setError('');
    const { data, error: errorLogin } = await supabase.auth.signInWithPassword({ email: email, password: password });

    if (errorLogin) {
      setError('Email o contraseña incorrectos');
      setCargando(false);
      return;
    }

    const perfil = await buscarPerfil(data.user.id);
    if (!perfil || !perfil.activo) {
      await supabase.auth.signOut();
      setError('Tu cuenta está bloqueada');
      setCargando(false);
      return;
    }

    await sumarAcceso(data.user.id);
    iniciarSesion(perfil);

    if (perfil.rol === 'operador') {
      navigate('/operador');
    } else if (perfil.rol === 'admin') {
      navigate('/admin');
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
        <button type="submit" className="btn btn-celeste w-100" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>
      <p className="text-center mt-3 mb-0">
        ¿No tenés cuenta? <Link to="/registro" className="texto-celeste">Registrate</Link>
      </p>
    </div>
  );
}

export default Login;
