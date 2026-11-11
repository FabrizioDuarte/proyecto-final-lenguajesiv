insert into proyectos (titulo, categoria, resumen, descripcion, tecnologias, funciones, icono, demo) values
(
  'TaskFlow', 'Frontend',
  'Gestor de tareas simple para organizar el día.',
  'Aplicación para crear, completar y borrar tareas. Las tareas quedan guardadas en el navegador, así no se pierden al recargar la página.',
  array['React', 'Bootstrap', 'LocalStorage'],
  array['Agregar y borrar tareas', 'Marcar tareas como hechas', 'Guardado automático'],
  'bi-check2-square', 'tareas'
),
(
  'Clima Ya', 'Frontend',
  'App del clima que usa tu ubicación actual.',
  'Muestra la temperatura y el viento del lugar donde estás, usando la API de geolocalización del navegador y la API pública de Open-Meteo.',
  array['React', 'Geolocation API', 'Fetch', 'Open-Meteo'],
  array['Detecta la ubicación', 'Clima en tiempo real', 'Funciona en el celular'],
  'bi-cloud-sun', 'clima'
),
(
  'MiTienda', 'Fullstack',
  'Tienda online con carrito de compras.',
  'Tienda online para un comercio de ropa, con catálogo, carrito y panel para cargar productos. El backend está hecho con Node.js, Express y MySQL.',
  array['React', 'Node.js', 'Express', 'MySQL'],
  array['Catálogo con filtros', 'Carrito de compras', 'Panel de productos'],
  'bi-bag', 'carrito'
),
(
  'TurnosMed', 'Fullstack',
  'Sistema de turnos para consultorios médicos.',
  'Sistema donde los pacientes sacan turnos online y los médicos ven su agenda. Incluye avisos por email y un panel para la secretaría.',
  array['React', 'Express', 'MongoDB', 'Nodemailer'],
  array['Reserva de turnos', 'Agenda por médico', 'Avisos por email'],
  'bi-calendar2-check', null
),
(
  'GymApp', 'Mobile',
  'App para seguir las rutinas del gimnasio.',
  'Aplicación pensada para usar desde el celular, para ver la rutina del día y anotar los pesos de cada ejercicio.',
  array['React', 'PWA', 'Firebase'],
  array['Rutinas por día', 'Historial de pesos', 'Se instala en el celular'],
  'bi-phone', null
);

insert into servicios (titulo, icono, descripcion, incluye) values
(
  'Desarrollo web a medida', 'bi-code-slash',
  'Sitios y sistemas web hechos desde cero según lo que necesite tu negocio.',
  array['Diseño adaptable a celular', 'Panel de administración', 'Base de datos', 'Publicación en la nube']
),
(
  'Tiendas online', 'bi-cart3',
  'Tiendas con catálogo, carrito de compras y gestión de pedidos.',
  array['Catálogo de productos', 'Carrito y checkout', 'Gestión de stock', 'Integración de pagos']
),
(
  'APIs y backend', 'bi-hdd-network',
  'Servidores y APIs REST seguras para conectar tus aplicaciones.',
  array['APIs REST con Node.js', 'Autenticación de usuarios', 'Documentación', 'Conexión con otros servicios']
),
(
  'Asesoramiento técnico', 'bi-lightbulb',
  'Te ayudo a elegir tecnologías, revisar código o mejorar el rendimiento de tu sitio.',
  array['Revisión de código', 'Mejoras de rendimiento', 'Elección de tecnologías', 'Reuniones online']
);

insert into mensajes (nombre, email, tipo, asunto, mensaje, fecha, estado) values
('María López', 'maria.lopez@gmail.com', 'Pedido de presupuesto', 'Página para mi panadería', 'Hola! Quería saber cuánto saldría una página para mi panadería con un catálogo de productos.', current_date - 1, 'Pendiente'),
('Jorge Ramírez', 'jramirez@empresa.com', 'Asesoramiento técnico', 'Sitio muy lento', 'Tenemos un sitio en WordPress que tarda mucho en cargar. ¿Podrías revisarlo?', current_date - 4, 'Respondido'),
('Sofía Gómez', 'sofi.gomez@hotmail.com', 'Consulta general', 'Disponibilidad', '¿Tenés disponibilidad para empezar un proyecto en diciembre?', current_date - 6, 'Pendiente'),
('Ramiro Paz', 'ramiro.paz@gmail.com', 'Pedido de presupuesto', 'Tienda online', 'Necesito una tienda online para vender ropa deportiva. ¿Cuánto saldría?', current_date - 8, 'Respondido'),
('Ana Medina', 'ana.medina@gmail.com', 'Pedido de presupuesto', 'Sistema de turnos', 'Tengo un consultorio y quiero que los pacientes saquen turno por internet.', current_date - 11, 'Pendiente');

insert into visitas (fecha)
select d::date
from generate_series(current_date - 14, current_date - 1, interval '1 day') as d,
lateral generate_series(1, 10 + floor(random() * 20)::int);

insert into accesos (fecha)
select d::date
from generate_series(current_date - 14, current_date - 1, interval '1 day') as d,
lateral generate_series(1, 1 + floor(random() * 8)::int);
