import { useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { buscarPerfil } from '../store';

function AdminLogin({ iniciarSesion }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

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
      setError('Datos incorrectos');
      setCargando(false);
      return;
    }

    const perfil = await buscarPerfil(data.user.id);
    if (!perfil || perfil.rol !== 'admin' || !perfil.activo) {
      await supabase.auth.signOut();
      setError('Esta cuenta no es de administrador');
      setCargando(false);
      return;
    }

    iniciarSesion(perfil);
  }

  return (
    <div className="admin-fondo-login">
      <div className="tarjeta tarjeta-fija caja-form">
        <h2 className="text-center logo-oscuro mb-1">Andrew<span>.dev</span></h2>
        <p className="text-center texto-gris mb-4">Panel de administración</p>
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
            {cargando ? 'Entrando...' : 'Entrar al panel'}
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          <Link to="/" className="texto-celeste">Volver al sitio</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
