# Manual de diseño y estilo

Guía visual del portfolio de **Andrew Tanenbaum**. Sitio publicado en https://proyecto-final-lenguajesiv.vercel.app

## 1. Idea general

Portfolio de un desarrollador fullstack. Estilo moderno: la parte de arriba (navbar y portada) es oscura y el contenido es claro, con un celeste como color principal y tonos de celeste claro y lavanda de acompañamiento. Se usan solo colores planos, sin degradés.

Framework CSS: **Bootstrap 5** + íconos de **Bootstrap Icons**. Los estilos propios están en `src/App.css`.

## 2. Colores

| Nombre | HEX | Dónde se usa |
|---|---|---|
| Celeste (principal) | `#2F80D0` | Botones principales, links, íconos y títulos destacados |
| Celeste oscuro | `#2468AD` | Hover de los botones y texto de los badges |
| Celeste claro | `#BFDBF7` | Badges, link activo y textos destacados sobre fondo oscuro |
| Azul oscuro | `#16263A` | Navbar, portada, footer y menú del panel |
| Lavanda (fondo) | `#E1E5F2` | Fondo general de la página |
| Blanco | `#FFFFFF` | Tarjetas y formularios |
| Texto | `#1F2A37` | Texto principal |
| Gris | `#5A6472` | Texto secundario y descripciones |
| Gris claro | `#C9D9EA` | Texto sobre fondo oscuro (footer, encabezados) |
| Rojo | `#DC3545` | Errores de validación (color de Bootstrap) |
| Amarillo | `#FFC107` | Estado "Pendiente" (color de Bootstrap) |
| Verde | `#28A745` | Punto de "datos en vivo" del dashboard |

La paleta base sale de tres colores de referencia: Pale Sky `#BFDBF7`, Lavender `#E1E5F2` y blanco `#FFFFFF`. El celeste principal es una versión más oscura del Pale Sky para que el texto blanco de los botones se lea bien.

## 3. Tipografías

Las dos se cargan desde Google Fonts en `public/index.html`.

| Fuente | Pesos | Uso |
|---|---|---|
| **Poppins** | 600, 700 | Títulos, logo, navbar y botones |
| **Inter** | 400, 500 | Texto normal, formularios y tablas |

## 4. Tamaños y jerarquía de texto

| Elemento | PC | Celular (< 768px) | Fuente |
|---|---|---|---|
| Título de la portada (h1) | 3.2rem | 2.2rem | Poppins 700 |
| Título de sección (h2) | 2rem | 1.6rem | Poppins 600 |
| Título de tarjeta (h5) | 1.25rem | 1.15rem | Poppins 600 |
| Texto normal | 1rem | 1rem | Inter 400 |
| Texto chico (badges, fechas) | 0.85rem | 0.85rem | Inter 500 |

Los títulos de sección llevan una línea celeste abajo para separarlos del contenido.

## 5. Componentes

- **Botón principal** (`.btn-celeste`): fondo celeste, texto blanco y bordes redondeados (30px). Al pasar el mouse se oscurece.
- **Botón secundario** (`.btn-borde`): fondo transparente con borde celeste. En la portada (fondo oscuro) va en celeste claro.
- **Tarjetas** (`.tarjeta`): fondo blanco, bordes de 16px y sombra suave.
- **Badges de tecnologías**: fondo celeste claro y texto celeste oscuro.
- **Formularios**: campos de Bootstrap. Si hay un error, el campo se pone en rojo y el mensaje aparece abajo.
- **Estados de consultas**: amarillo para "Pendiente", celeste para "Respondido".
- **Foto de perfil** (`.avatar`): foto circular de 260px (170px en celular) con borde celeste claro de 4px y un brillo suave alrededor. Está en la portada del inicio.
- **Mensajes de carga**: mientras llegan los datos se muestra el texto "Cargando..." en gris, sin spinners.

## 6. Animaciones

El sitio no tiene animaciones ni elementos que se muevan: todo es estático para que sea más simple y cómodo de leer. Una regla global en `App.css` desactiva las transiciones y animaciones, incluidas las de Bootstrap y las de los gráficos (`animation: false`). Al pasar el mouse sobre botones y links solo cambia el color, sin movimiento.

## 7. Pantallas

**Sitio**

| Pantalla | Ruta | Qué muestra |
|---|---|---|
| Inicio | `/` | Portada con foto, sobre mí, tecnologías, experiencia, servicios y un llamado a contactar |
| Proyectos | `/proyectos` | Tarjetas de proyectos con filtro por categoría |
| Detalle de proyecto | `/proyectos/:id` | Descripción completa y demo interactiva (**solo con sesión iniciada**) |
| Servicios | `/servicios` | Servicios que ofrece, con botón para pedir presupuesto |
| Contacto | `/contacto` | Formulario de consulta, presupuesto o asesoramiento, con adjunto opcional |
| Iniciar sesión | `/login` | Formulario de ingreso |
| Registrarse | `/registro` | Formulario de registro |
| Panel de operador | `/operador` | Mensajes recibidos, filtros, responder por email y marcar como respondido (**operador o admin**) |
| No encontrada | cualquier otra | Página 404 |

**Panel de administración**

| Pantalla | Ruta | Qué muestra |
|---|---|---|
| Login del admin | `/admin/login` | Ingreso al panel, con fondo oscuro |
| Dashboard | `/admin` | Totales, filtros por fecha y gráficos de tráfico, consultas y registros |
| Proyectos (admin) | `/admin/proyectos` | Tabla de proyectos con buscador, interruptor de visible, editar y borrar |
| Editor de proyecto | `/admin/proyectos/:id` | Formulario en dos columnas: datos a la izquierda, imagen/ícono/demo a la derecha |
| Servicios (admin) | `/admin/servicios` | Formulario a la izquierda y lista de servicios a la derecha |
| Usuarios (admin) | `/admin/usuarios` | Tabla con filtros, cambio de rol, bloquear y borrar |

El desarrollador del portfolio es **Andrew Tanenbaum**, Ingeniero en Informática (UCASAL), de Salta.

### Panel de administración

- Menú lateral azul oscuro (`#16263A`) de 240px, con la opción activa en celeste (`#2F80D0`).
- El contenido va sobre el fondo lavanda, con las mismas tarjetas blancas del sitio.
- Colores de los gráficos: celeste para visitas y registros, azul oscuro para accesos, y celeste / celeste claro (`#8EC3F0`) / azul oscuro para los tipos de consulta.
- Un punto verde fijo indica que los datos se actualizan en vivo.
- En celular el menú lateral pasa arriba y los links quedan en fila.

## 8. Navegación

**En PC (≥ 992px)**
- Navbar azul oscuro fija arriba, con el logo a la izquierda y los links a la derecha: Inicio, Proyectos, Servicios y Contacto.
- A la derecha aparecen los botones "Ingresar" y "Registrarse", o el nombre del usuario y "Salir" si ya inició sesión.
- Si el usuario es operador o admin, aparece el link "Mensajes"; si es admin, también "Admin".
- El contenido se acomoda en 2, 3 o 4 columnas según la sección.

**En celular (< 992px)**
- La navbar muestra el logo y un botón hamburguesa que despliega los links uno debajo del otro.
- Al tocar un link, el menú se cierra solo.
- Todo el contenido pasa a una sola columna y los botones de la portada quedan uno abajo del otro.
- En el panel de operador, la tabla tiene scroll horizontal.

**Flujo principal**

```
Inicio ──> Proyectos ──> Ver detalle ──┬──> (con sesión) Detalle + demo
                                       └──> (sin sesión) Login ──> Detalle + demo
Inicio / Servicios ──> Contacto ──> Mensaje enviado
Login (operador) ──> Mensajes ──> Ver mensaje ──> Responder por email / Marcar respondido
```
