import { useState, useEffect } from 'react';
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
import { supabase } from '../supabaseClient';
import { hoy, diasAtras } from '../utilidades';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Filler, Tooltip, Legend);

const tipos = ['Consulta general', 'Pedido de presupuesto', 'Asesoramiento técnico'];

function sumar(lista) {
  let total = 0;
  for (let i = 0; i < lista.length; i++) {
    total = total + Number(lista[i]);
  }
  return total;
}

function Dashboard() {
  const [desde, setDesde] = useState(diasAtras(13));
  const [hasta, setHasta] = useState(hoy());
  const [estado, setEstado] = useState('Todos');
  const [version, setVersion] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [datos, setDatos] = useState({
    visitas: [],
    accesos: [],
    registros: [],
    porTipo: [],
    visitasTotales: 0,
    usuariosTotales: 0
  });

  const fechasMal = desde === '' || hasta === '' || desde > hasta;

  useEffect(() => {
    const canal = supabase
      .channel('dashboard-' + Math.random())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'visitas' }, () => setVersion((v) => v + 1))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'accesos' }, () => setVersion((v) => v + 1))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'perfiles' }, () => setVersion((v) => v + 1))
      .on('postgres_changes', { event: '*', schema: 'public', table: 'mensajes' }, () => setVersion((v) => v + 1))
      .subscribe();

    return () => {
      supabase.removeChannel(canal);
    };
  }, []);

  useEffect(() => {
    if (desde === '' || hasta === '' || desde > hasta) {
      return;
    }
    let cancelado = false;

    async function cargar() {
      const filtroEstado = estado === 'Todos' ? null : estado;
      const respuestas = await Promise.all([
        supabase.rpc('visitas_por_dia', { desde: desde, hasta: hasta }),
        supabase.rpc('accesos_por_dia', { desde: desde, hasta: hasta }),
        supabase.rpc('registros_por_dia', { desde: desde, hasta: hasta }),
        supabase.rpc('consultas_por_tipo', { desde: desde, hasta: hasta, filtro_estado: filtroEstado }),
        supabase.from('visitas').select('*', { count: 'exact', head: true }),
        supabase.from('perfiles').select('*', { count: 'exact', head: true })
      ]);

      if (cancelado) {
        return;
      }

      setDatos({
        visitas: respuestas[0].data || [],
        accesos: respuestas[1].data || [],
        registros: respuestas[2].data || [],
        porTipo: respuestas[3].data || [],
        visitasTotales: respuestas[4].count || 0,
        usuariosTotales: respuestas[5].count || 0
      });
      setCargando(false);
    }

    cargar();

    return () => {
      cancelado = true;
    };
  }, [desde, hasta, estado, version]);

  const etiquetas = datos.visitas.map((d) => d.dia.slice(8, 10) + '/' + d.dia.slice(5, 7));
  const visitasPorDia = datos.visitas.map((d) => Number(d.cantidad));
  const accesosPorDia = datos.accesos.map((d) => Number(d.cantidad));
  const registrosPorDia = datos.registros.map((d) => Number(d.cantidad));
  const cantidadesPorTipo = tipos.map((t) => {
    const fila = datos.porTipo.find((p) => p.tipo === t);
    return fila ? Number(fila.cantidad) : 0;
  });
  const consultasEnPeriodo = sumar(cantidadesPorTipo);

  const datosLinea = {
    labels: etiquetas,
    datasets: [
      {
        label: 'Visitas',
        data: visitasPorDia,
        borderColor: '#2F80D0',
        backgroundColor: 'rgba(47, 128, 208, 0.15)',
        fill: true,
        tension: 0.3
      },
      {
        label: 'Accesos de usuarios',
        data: accesosPorDia,
        borderColor: '#16263A',
        backgroundColor: '#16263A',
        tension: 0.3
      }
    ]
  };

  const datosTorta = {
    labels: tipos,
    datasets: [
      {
        data: cantidadesPorTipo,
        backgroundColor: ['#2F80D0', '#8EC3F0', '#16263A']
      }
    ]
  };

  const datosBarras = {
    labels: etiquetas,
    datasets: [
      {
        label: 'Usuarios registrados',
        data: registrosPorDia,
        backgroundColor: '#2F80D0',
        borderRadius: 6
      }
    ]
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
  };

  return (
    <div>
      <h2 className="mb-2">Dashboard</h2>
      <p className="texto-gris">
        <span className="punto-vivo"></span> Los datos se actualizan solos cuando alguien visita el sitio, se registra o manda una consulta.
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

      {cargando ? (
        <div className="text-center my-5">
          <p className="texto-gris">Cargando...</p>
        </div>
      ) : (
        <>
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
                <div className="dato-numero">{datos.visitasTotales}</div>
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
                <div className="dato-numero">{datos.usuariosTotales}</div>
              </div>
            </div>
            <div className="col-12 col-lg">
              <div className="tarjeta tarjeta-fija p-3">
                <small className="texto-gris">Consultas en el período</small>
                <div className="dato-numero">{consultasEnPeriodo}</div>
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
                {consultasEnPeriodo === 0 ? (
                  <p className="texto-gris text-center my-5">No hay consultas en este período</p>
                ) : (
                  <div className="grafico">
                    <Doughnut data={datosTorta} options={{ responsive: true, maintainAspectRatio: false, animation: false }} />
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
        </>
      )}
    </div>
  );
}

export default Dashboard;
