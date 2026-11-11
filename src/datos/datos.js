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
