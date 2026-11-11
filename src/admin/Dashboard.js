import { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { useVisitas, useAccesos, useUsuarios, useMensajes, restaurarTodo } from '../store';
import { hoy, diasAtras, fechaTexto } from '../utilidades';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

const tipos = ['Consulta general', 'Pedido de presupuesto', 'Asesoramiento técnico'];

function sumar(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total = total + lista[i];
  }
  return total;
}

function Dashboard() {
  const visitas = useVisitas();
  const accesos = useAccesos();
  const usuarios = useUsuarios();
  const mensajes = useMensajes();
  const [desde, setDesde] = useState(diasAtras(13));
  const [hasta, setHasta] = useState(hoy());
  const [estado, setEstado] = useState('Todos');

  const fechasMal = desde === '' || hasta === '' || desde > hasta;

  const dias = [];
  if (!fechasMal) {
    const fecha = new Date(desde + 'T00:00:00');
    while (fechaTexto(fecha) <= hasta && dias.length < 366) {
      dias.push(fechaTexto(fecha));
      fecha.setDate(fecha.getDate() + 1);
    }
  }

  const etiquetas = dias.map((d) => d.slice(8, 10) + '/' + d.slice(5, 7));
  const visitasPorDia = dias.map((d) => visitas[d] || 0);
  const accesosPorDia = dias.map((d) => accesos[d] || 0);
  const registrosPorDia = dias.map((d) => usuarios.filter((u) => u.fechaRegistro === d).length);

  let mensajesFiltrados = mensajes.filter((m) => m.fecha >= desde && m.fecha <= hasta);
  if (estado !== 'Todos') {
    mensajesFiltrados = mensajesFiltrados.filter((m) => m.estado === estado);
  }
  const porTipo = tipos.map((t) => mensajesFiltrados.filter((m) => m.tipo === t).length);

  const visitasTotales = sumar(Object.values(visitas));

  const datosLinea = {
    labels: etiquetas,
    datasets: [
      {
        label: 'Visitas',
        data: visitasPorDia,
        borderColor: '#6C63FF',
        backgroundColor: 'rgba(108, 99, 255, 0.15)',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Accesos de usuarios',
        data: accesosPorDia,
        borderColor: '#00C9A7',
        backgroundColor: '#00C9A7',
        tension: 0.3
      }
    ]
  };

  const datosTorta = {
    labels: tipos,
    datasets: [
      {
        data: porTipo,
        backgroundColor: ['#6C63FF', '#00C9A7', '#FFC107']
      }
    ]
  };

  const datosBarras = {
    labels: etiquetas,
    datasets: [
      {
        label: 'Usuarios registrados',
        data: registrosPorDia,
        backgroundColor: '#6C63FF',
        borderRadius: 6
      }
    ]
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
  };

  function restaurar() {
    if (window.confirm('Se van a borrar todos los cambios y volver a los datos de ejemplo. ¿Seguro?')) {
      restaurarTodo();
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
        <h2 className="mb-0">Dashboard</h2>
        <button className="btn btn-outline-danger btn-sm" onClick={restaurar}>
          <i className="bi bi-arrow-counterclockwise"></i> Restaurar datos
        </button>
      </div>
      <p className="texto-gris">
        <span className="punto-vivo"></span> Los datos se actualizan solos. Abrí el sitio en otra pestaña y mirá cómo cambian.
      </p>

      <div className="tarjeta tarjeta-fija p-3 mb-4">
        <div className="row g-2 align-items-end">
          <div className="col-6 col-md-3">
            <label className="form-label small">Desde</label>
            <input type="date" className="form-control" value={desde} max={hasta} onChange={(e) => setDesde(e.target.value)} />
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label small">Hasta</label>
            <input type="date" className="form-control" value={hasta} min={desde} onChange={(e) => setHasta(e.target.value)} />
          </div>
          <div className="col-6 col-md-3">
            <label className="form-label small">Estado de consultas</label>
            <select className="form-select" value={estado} onChange={(e) => setEstado(e.target.value)}>
              <option>Todos</option>
              <option>Pendiente</option>
              <option>Respondido</option>
            </select>
          </div>
          <div className="col-6 col-md-3">
            <button className="btn btn-borde w-100" onClick={() => { setDesde(diasAtras(13)); setHasta(hoy()); setEstado('Todos'); }}>
              Últimos 14 días
            </button>
          </div>
        </div>
        {fechasMal && <div className="alert alert-warning mt-3 mb-0 py-2">La fecha "desde" tiene que ser anterior a "hasta"</div>}
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-lg">
          <div className="tarjeta tarjeta-fija p-3">
            <small className="texto-gris">Visitas en el período</small>
            <div className="dato-numero">{sumar(visitasPorDia)}</div>
          </div>
        </div>
        <div className="col-6 col-lg">
          <div className="tarjeta tarjeta-fija p-3">
            <small className="texto-gris">Visitas totales</small>
            <div className="dato-numero">{visitasTotales}</div>
          </div>
        </div>
        <div className="col-6 col-lg">
          <div className="tarjeta tarjeta-fija p-3">
            <small className="texto-gris">Accesos de usuarios</small>
            <div className="dato-numero">{sumar(accesosPorDia)}</div>
          </div>
        </div>
        <div className="col-6 col-lg">
          <div className="tarjeta tarjeta-fija p-3">
            <small className="texto-gris">Usuarios registrados</small>
            <div className="dato-numero">{usuarios.length}</div>
          </div>
        </div>
        <div className="col-12 col-lg">
          <div className="tarjeta tarjeta-fija p-3">
            <small className="texto-gris">Consultas en el período</small>
            <div className="dato-numero">{mensajesFiltrados.length}</div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12">
          <div className="tarjeta tarjeta-fija p-4">
            <h5>Tráfico del sitio</h5>
            <div className="grafico">
              <Line data={datosLinea} options={opciones} />
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="tarjeta tarjeta-fija p-4">
            <h5>Consultas por tipo</h5>
            {mensajesFiltrados.length === 0 ? (
              <p className="texto-gris text-center my-5">No hay consultas en este período</p>
            ) : (
              <div className="grafico">
                <Doughnut data={datosTorta} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            )}
          </div>
        </div>
        <div className="col-lg-7">
          <div className="tarjeta tarjeta-fija p-4">
            <h5>Registros de usuarios</h5>
            <div className="grafico">
              <Bar data={datosBarras} options={opciones} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
