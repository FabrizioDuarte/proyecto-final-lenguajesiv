import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usuarioAdmin } from '../datos/datos';

function AdminLogin({ entrar }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function ingresar(e) {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Completá todos los campos');
      return;
    }
    if (email !== usuarioAdmin.email || password !== usuarioAdmin.password) {
      setError('Datos incorrectos');
      return;
    }
    entrar({ nombre: usuarioAdmin.nombre, email: usuarioAdmin.email });
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
          <button type="submit" className="btn btn-violeta w-100">Entrar al panel</button>
        </form>
        <p className="text-center mt-3 mb-0">
          <Link to="/" className="texto-violeta">Volver al sitio</Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;
