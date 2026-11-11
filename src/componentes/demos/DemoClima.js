import { useState } from 'react';

function DemoClima() {
  const [clima, setClima] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState('');
  const [lugar, setLugar] = useState('');

  function buscarClima(lat, lon, nombre) {
    setCargando(true);
    setError('');
    fetch('https://api.open-meteo.com/v1/forecast?latitude=' + lat + '&longitude=' + lon + '&current_weather=true')
      .then((res) => res.json())
      .then((datos) => {
        setClima(datos.current_weather);
        setLugar(nombre);
        setCargando(false);
      })
      .catch(() => {
        setError('No se pudo obtener el clima');
        setCargando(false);
      });
  }

  function usarUbicacion() {
    if (!navigator.geolocation) {
      setError('Tu navegador no tiene geolocalización');
      return;
    }
    setCargando(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        buscarClima(pos.coords.latitude, pos.coords.longitude, 'Tu ubicación');
      },
      () => {
        setCargando(false);
        setError('No diste permiso para usar tu ubicación. Probá con Salta.');
      }
    );
  }

  return (
    <div className="text-center">
      <div className="d-flex gap-2 justify-content-center flex-wrap">
        <button className="btn btn-celeste" onClick={usarUbicacion}>
          <i className="bi bi-geo-alt"></i> Usar mi ubicación
        </button>
        <button className="btn btn-borde" onClick={() => buscarClima(-24.79, -65.41, 'Salta')}>
          Ver Salta
        </button>
      </div>

      {cargando && <p className="texto-gris mt-4 mb-0">Cargando...</p>}
      {error && <div className="alert alert-warning mt-3 mb-0">{error}</div>}

      {clima && !cargando && (
        <div className="mt-4">
          <p className="texto-gris mb-1">{lugar}</p>
          <div className="dato-numero" style={{ fontSize: '3rem' }}>{clima.temperature}°C</div>
          <p className="mb-0">
            <i className="bi bi-wind"></i> Viento: {clima.windspeed} km/h
          </p>
        </div>
      )}
    </div>
  );
}

export default DemoClima;
