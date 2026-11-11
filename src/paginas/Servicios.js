import { Link } from 'react-router-dom';
import Aparecer from '../componentes/Aparecer';
import { useServicios } from '../store';

function Servicios() {
  const servicios = useServicios() || [];

  return (
    <div>
      <div className="encabezado-pagina">
        <div className="container">
          <h1>Servicios</h1>
          <p className="mb-0" style={{ color: '#c9c9d6' }}>Lo que puedo hacer por tu proyecto</p>
        </div>
      </div>

      <div className="container seccion">
        <div className="row g-4">
          {servicios.map((servicio) => {
            const esAsesoramiento = servicio.titulo.toLowerCase().includes('asesor');
            return (
              <div className="col-md-6" key={servicio.id}>
                <Aparecer className="h-100">
                  <div className="tarjeta p-4 d-flex flex-column">
                    <i className={'bi ' + servicio.icono + ' icono-grande'}></i>
                    <h5 className="my-3">{servicio.titulo}</h5>
                    <p className="texto-gris">{servicio.descripcion}</p>
                    <ul className="list-unstyled">
                      {servicio.incluye.map((item) => (
                        <li key={item} className="mb-1">
                          <i className="bi bi-check-circle-fill" style={{ color: '#00C9A7' }}></i> {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto">
                      <Link
                        to={esAsesoramiento ? '/contacto?tipo=asesoramiento' : '/contacto?tipo=presupuesto'}
                        className="btn btn-violeta"
                      >
                        {esAsesoramiento ? 'Pedir asesoramiento' : 'Pedir presupuesto'}
                      </Link>
                    </div>
                  </div>
                </Aparecer>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Servicios;
