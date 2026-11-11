import { diasAtras } from '../utilidades';

export const perfil = {
  nombre: 'Andrew Tanenbaum',
  iniciales: 'AT',
  titulo: 'Ingeniero en Informática - UCASAL',
  email: 'andrew.tanenbaum.dev@gmail.com',
  ciudad: 'Salta, Argentina',
  descripcion:
    'Soy desarrollador fullstack. Me gusta crear aplicaciones web rápidas, prolijas y fáciles de usar, desde el diseño de la interfaz hasta la base de datos y el servidor.',
  sobreMi:
    'Soy Ingeniero en Informática recibido en la Universidad Católica de Salta (UCASAL). Empecé a programar en la facultad y desde entonces trabajé en proyectos para comercios y clientes particulares. Trabajo con React en el frontend y con Node.js y Express en el backend, usando bases de datos SQL y NoSQL.',
  anios: 4,
  proyectos: 25,
  clientes: 15,
  github: 'https://github.com',
  linkedin: 'https://linkedin.com'
};

export const tecnologias = [
  { categoria: 'Frontend', icono: 'bi-window', items: ['HTML', 'CSS', 'JavaScript', 'React', 'Bootstrap', 'Tailwind'] },
  { categoria: 'Backend', icono: 'bi-server', items: ['Node.js', 'Express', 'PHP', 'APIs REST', 'JWT'] },
  { categoria: 'Bases de datos', icono: 'bi-database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Firebase'] },
  { categoria: 'Herramientas', icono: 'bi-tools', items: ['Git', 'GitHub', 'VS Code', 'Figma', 'Postman', 'Docker'] }
];

export const experiencia = [
  {
    fecha: '2024 - Actualidad',
    puesto: 'Desarrollador Fullstack',
    empresa: 'Freelance',
    descripcion: 'Desarrollo de sitios y sistemas web a medida para clientes de Argentina y el exterior.'
  },
  {
    fecha: '2022 - 2024',
    puesto: 'Desarrollador Frontend',
    empresa: 'Agencia Pixel Sur',
    descripcion: 'Maquetado de sitios con React, integración con APIs y mejoras de rendimiento.'
  },
  {
    fecha: '2021 - 2022',
    puesto: 'Pasante de desarrollo',
    empresa: 'Soluciones Web Salta',
    descripcion: 'Mantenimiento de sistemas en PHP y MySQL, y soporte a clientes.'
  },
  {
    fecha: '2016 - 2021',
    puesto: 'Ingeniería en Informática',
    empresa: 'Universidad Católica de Salta (UCASAL)',
    descripcion: 'Título de Ingeniero en Informática.'
  }
];

export const servicios = [
  {
    id: 1,
    titulo: 'Desarrollo web a medida',
    icono: 'bi-code-slash',
    descripcion: 'Sitios y sistemas web hechos desde cero según lo que necesite tu negocio.',
    incluye: ['Diseño adaptable a celular', 'Panel de administración', 'Base de datos', 'Publicación en la nube']
  },
  {
    id: 2,
    titulo: 'Tiendas online',
    icono: 'bi-cart3',
    descripcion: 'Tiendas con catálogo, carrito de compras y gestión de pedidos.',
    incluye: ['Catálogo de productos', 'Carrito y checkout', 'Gestión de stock', 'Integración de pagos']
  },
  {
    id: 3,
    titulo: 'APIs y backend',
    icono: 'bi-hdd-network',
    descripcion: 'Servidores y APIs REST seguras para conectar tus aplicaciones.',
    incluye: ['APIs REST con Node.js', 'Autenticación de usuarios', 'Documentación', 'Conexión con otros servicios']
  },
  {
    id: 4,
    titulo: 'Asesoramiento técnico',
    icono: 'bi-lightbulb',
    descripcion: 'Te ayudo a elegir tecnologías, revisar código o mejorar el rendimiento de tu sitio.',
    incluye: ['Revisión de código', 'Mejoras de rendimiento', 'Elección de tecnologías', 'Reuniones online']
  }
];

export const proyectos = [
  {
    id: 1,
    titulo: 'TaskFlow',
    categoria: 'Frontend',
    resumen: 'Gestor de tareas simple para organizar el día.',
    descripcion:
      'Aplicación para crear, completar y borrar tareas. Las tareas quedan guardadas en el navegador, así no se pierden al recargar la página.',
    tecnologias: ['React', 'Bootstrap', 'LocalStorage'],
    funciones: ['Agregar y borrar tareas', 'Marcar tareas como hechas', 'Guardado automático'],
    icono: 'bi-check2-square',
    demo: 'tareas'
  },
  {
    id: 2,
    titulo: 'Clima Ya',
    categoria: 'Frontend',
    resumen: 'App del clima que usa tu ubicación actual.',
    descripcion:
      'Muestra la temperatura y el viento del lugar donde estás, usando la API de geolocalización del navegador y la API pública de Open-Meteo.',
    tecnologias: ['React', 'Geolocation API', 'Fetch', 'Open-Meteo'],
    funciones: ['Detecta la ubicación', 'Clima en tiempo real', 'Funciona en el celular'],
    icono: 'bi-cloud-sun',
    demo: 'clima'
  },
  {
    id: 3,
    titulo: 'MiTienda',
    categoria: 'Fullstack',
    resumen: 'Tienda online con carrito de compras.',
    descripcion:
      'Tienda online para un comercio de ropa, con catálogo, carrito y panel para cargar productos. El backend está hecho con Node.js, Express y MySQL.',
    tecnologias: ['React', 'Node.js', 'Express', 'MySQL'],
    funciones: ['Catálogo con filtros', 'Carrito de compras', 'Panel de productos'],
    icono: 'bi-bag',
    demo: 'carrito'
  },
  {
    id: 4,
    titulo: 'TurnosMed',
    categoria: 'Fullstack',
    resumen: 'Sistema de turnos para consultorios médicos.',
    descripcion:
      'Sistema donde los pacientes sacan turnos online y los médicos ven su agenda. Incluye avisos por email y un panel para la secretaría.',
    tecnologias: ['React', 'Express', 'MongoDB', 'Nodemailer'],
    funciones: ['Reserva de turnos', 'Agenda por médico', 'Avisos por email'],
    icono: 'bi-calendar2-check',
    demo: null
  },
  {
    id: 5,
    titulo: 'GymApp',
    categoria: 'Mobile',
    resumen: 'App para seguir las rutinas del gimnasio.',
    descripcion:
      'Aplicación pensada para usar desde el celular, para ver la rutina del día y anotar los pesos de cada ejercicio.',
    tecnologias: ['React', 'PWA', 'Firebase'],
    funciones: ['Rutinas por día', 'Historial de pesos', 'Se instala en el celular'],
    icono: 'bi-phone',
    demo: null
  }
];

export const iconos = [
  'bi-code-slash', 'bi-cart3', 'bi-hdd-network', 'bi-lightbulb', 'bi-check2-square', 'bi-cloud-sun',
  'bi-bag', 'bi-calendar2-check', 'bi-phone', 'bi-globe', 'bi-palette', 'bi-graph-up', 'bi-shield-lock', 'bi-chat-dots'
];

export const demos = [
  { valor: '', nombre: 'Sin demo' },
  { valor: 'tareas', nombre: 'Lista de tareas' },
  { valor: 'clima', nombre: 'Clima' },
  { valor: 'carrito', nombre: 'Carrito de compras' }
];

export const usuarioAdmin = {
  nombre: 'Andrew (admin)',
  email: 'admin@demo.com',
  password: 'admin123'
};

export function usuariosIniciales() {
  return [
    { id: 1, nombre: 'Operador', email: 'operador@demo.com', password: 'operador123', rol: 'operador', activo: true, fechaRegistro: diasAtras(20) },
    { id: 2, nombre: 'Martina Díaz', email: 'martina.diaz@gmail.com', password: 'demo123', rol: 'usuario', activo: true, fechaRegistro: diasAtras(12) },
    { id: 3, nombre: 'Pablo Ruiz', email: 'pablo.ruiz@gmail.com', password: 'demo123', rol: 'usuario', activo: true, fechaRegistro: diasAtras(9) },
    { id: 4, nombre: 'Lucía Torres', email: 'lucia.torres@hotmail.com', password: 'demo123', rol: 'usuario', activo: true, fechaRegistro: diasAtras(9) },
    { id: 5, nombre: 'Diego Cruz', email: 'diego.cruz@gmail.com', password: 'demo123', rol: 'usuario', activo: false, fechaRegistro: diasAtras(5) },
    { id: 6, nombre: 'Camila Sosa', email: 'cami.sosa@gmail.com', password: 'demo123', rol: 'usuario', activo: true, fechaRegistro: diasAtras(2) }
  ];
}

export function mensajesIniciales() {
  return [
    {
      id: 1,
      nombre: 'María López',
      email: 'maria.lopez@gmail.com',
      tipo: 'Pedido de presupuesto',
      asunto: 'Página para mi panadería',
      mensaje: 'Hola! Quería saber cuánto saldría una página para mi panadería con un catálogo de productos.',
      fecha: diasAtras(1),
      estado: 'Pendiente'
    },
    {
      id: 2,
      nombre: 'Jorge Ramírez',
      email: 'jramirez@empresa.com',
      tipo: 'Asesoramiento técnico',
      asunto: 'Sitio muy lento',
      mensaje: 'Tenemos un sitio en WordPress que tarda mucho en cargar. ¿Podrías revisarlo?',
      fecha: diasAtras(4),
      estado: 'Respondido'
    },
    {
      id: 3,
      nombre: 'Sofía Gómez',
      email: 'sofi.gomez@hotmail.com',
      tipo: 'Consulta general',
      asunto: 'Disponibilidad',
      mensaje: '¿Tenés disponibilidad para empezar un proyecto en diciembre?',
      fecha: diasAtras(6),
      estado: 'Pendiente'
    },
    {
      id: 4,
      nombre: 'Ramiro Paz',
      email: 'ramiro.paz@gmail.com',
      tipo: 'Pedido de presupuesto',
      asunto: 'Tienda online',
      mensaje: 'Necesito una tienda online para vender ropa deportiva. ¿Cuánto saldría?',
      fecha: diasAtras(8),
      estado: 'Respondido'
    },
    {
      id: 5,
      nombre: 'Ana Medina',
      email: 'ana.medina@gmail.com',
      tipo: 'Pedido de presupuesto',
      asunto: 'Sistema de turnos',
      mensaje: 'Tengo un consultorio y quiero que los pacientes saquen turno por internet.',
      fecha: diasAtras(11),
      estado: 'Pendiente'
    }
  ];
}

export function visitasIniciales() {
  const numeros = [14, 22, 18, 9, 25, 30, 17, 12, 20, 27, 33, 19, 24, 15];
  const visitas = {};
  for (let i = 0; i < numeros.length; i++) {
    visitas[diasAtras(numeros.length - i)] = numeros[i];
  }
  return visitas;
}

export function accesosIniciales() {
  const numeros = [3, 5, 4, 1, 6, 8, 4, 2, 5, 7, 9, 4, 6, 3];
  const accesos = {};
  for (let i = 0; i < numeros.length; i++) {
    accesos[diasAtras(numeros.length - i)] = numeros[i];
  }
  return accesos;
}
