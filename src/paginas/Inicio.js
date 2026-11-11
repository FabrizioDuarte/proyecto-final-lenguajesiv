import { Link } from 'react-router-dom';
import { perfil, tecnologias, experiencia } from '../datos/datos';
import { useServicios } from '../store';

function Inicio() {
  const servicios = useServicios() || [];

  return (
    <div>
      <section className="portada">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-5 order-md-2">
              <div className="avatar">{perfil.iniciales}</div>
            </div>
            <div className="col-md-7 order-md-1">
              <p className="texto-cambiante mb-2">¡Hola! Soy</p>
              <h1>{perfil.nombre}</h1>
              <p className="mb-2"><i className="bi bi-mortarboard"></i> {perfil.titulo}</p>
              <h2 className="h3 mb-4">
                Desarrollador <span className="texto-cambiante">Fullstack</span>
              </h2>
              <p className="lead mb-4" style={{ color: '#C9D9EA' }}>{perfil.descripcion}</p>
              <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-md-start">
                <Link to="/proyectos" className="btn btn-celeste">Ver proyectos</Link>
                <Link to="/contacto" className="btn btn-borde">Contactame</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="container">
          <h2 className="titulo-seccion">Sobre mí</h2>
            <div className="row align-items-center g-4">
              <div className="col-lg-7">
                <p className="texto-gris fs-5">{perfil.sobreMi}</p>
                <p><i className="bi bi-geo-alt texto-celeste"></i> {perfil.ciudad}</p>
              </div>
              <div className="col-lg-5">
                <div className="row text-center g-3">
                  <div className="col-4">
                    <div className="tarjeta p-3">
                      <div className="dato-numero">{perfil.anios}+</div>
                      <small className="texto-gris">Años</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="tarjeta p-3">
                      <div className="dato-numero">{perfil.proyectos}</div>
                      <small className="texto-gris">Proyectos</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="tarjeta p-3">
                      <div className="dato-numero">{perfil.clientes}</div>
                      <small className="texto-gris">Clientes</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </section>

      <section className="seccion bg-white">
        <div className="container">
          <h2 className="titulo-seccion">Tecnologías</h2>
          <div className="row g-4">
            {tecnologias.map((grupo) => (
              <div className="col-sm-6 col-lg-3" key={grupo.categoria}>
                  <div className="tarjeta p-4 text-center">
                    <i className={'bi ' + grupo.icono + ' icono-grande'}></i>
                    <h5 className="my-3">{grupo.categoria}</h5>
                    <div>
                      {grupo.items.map((item) => (
                        <span className="badge-tec" key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion">
        <div className="container">
          <h2 className="titulo-seccion">Experiencia</h2>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="linea-tiempo">
                {experiencia.map((exp) => (
                    <div className="item-tiempo" key={exp.puesto}>
                      <small className="texto-gris">{exp.fecha}</small>
                      <h5 className="mb-1">{exp.puesto}</h5>
                      <p className="fw-medium mb-1 texto-celeste">{exp.empresa}</p>
                      <p className="texto-gris mb-0">{exp.descripcion}</p>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion bg-white">
        <div className="container">
          <h2 className="titulo-seccion">Servicios</h2>
          <div className="row g-4">
            {servicios.map((servicio) => (
              <div className="col-sm-6 col-lg-3" key={servicio.id}>
                  <div className="tarjeta p-4">
                    <i className={'bi ' + servicio.icono + ' icono-grande'}></i>
                    <h5 className="my-3">{servicio.titulo}</h5>
                    <p className="texto-gris mb-0">{servicio.descripcion}</p>
                  </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link to="/servicios" className="btn btn-borde">Ver todos los servicios</Link>
          </div>
        </div>
      </section>

      <section className="seccion banda-oscura text-center">
        <div className="container">
            <h2 className="mb-3">¿Tenés un proyecto en mente?</h2>
            <p className="mb-4" style={{ color: '#C9D9EA' }}>Contame tu idea y te paso un presupuesto sin compromiso.</p>
            <Link to="/contacto?tipo=presupuesto" className="btn btn-celeste btn-lg">Pedir presupuesto</Link>
        </div>
      </section>
    </div>
  );
}

export default Inicio;
