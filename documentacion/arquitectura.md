# Documentación de arquitectura

Portfolio web del desarrollador fullstack **Andrew Tanenbaum** (Ingeniero en Informática - UCASAL, Salta). El sitio muestra su perfil, proyectos y servicios, recibe consultas y tiene un panel de administración con estadísticas.

- Sitio publicado: https://proyecto-final-lenguajesiv.vercel.app
- Panel de administración: https://proyecto-final-lenguajesiv.vercel.app/admin
- Código: repositorio de GitHub `proyecto-final-lenguajesiv` (carpeta `proyecto-final-codigo`)

## 1. Infraestructura

```
 Navegador (PC / celular)
        │
        │  HTTPS
        ▼
 ┌──────────────────────┐        build automático        ┌──────────────┐
 │ Vercel               │ ◄───────────────────────────── │ GitHub       │
 │ sirve la app React   │      (cada push a master)      │ código       │
 │ (archivos estáticos) │                                └──────────────┘
 └──────────────────────┘
        │
        │  supabase-js (HTTPS + WebSocket)
        ▼
 ┌─────────────────────────────────────────────────────────┐
 │ Supabase                                                │
 │  ├─ Auth ........ registro e inicio de sesión            │
 │  ├─ PostgreSQL .. tablas, políticas RLS y funciones SQL  │
 │  ├─ Realtime .... avisa los cambios de las tablas        │
 │  └─ Storage ..... imágenes de los proyectos              │
 └─────────────────────────────────────────────────────────┘
```

| Parte | Servicio | Qué hace |
|---|---|---|
| Frontend | React con create-react-app | Toda la interfaz: sitio público, panel de operador y panel de administración |
| Hosting | Vercel (plan gratis) | Publica la app. Cada `git push` a `master` arma el build y lo sube solo. `vercel.json` manda todas las rutas a `index.html` para que funcione React Router |
| Código | GitHub | Repositorio del proyecto, conectado a Vercel |
| Base de datos | Supabase - PostgreSQL | Tablas de perfiles, proyectos, servicios, mensajes, visitas y accesos |
| Autenticación | Supabase Auth | Registro e inicio de sesión con email y contraseña. Las contraseñas las guarda Supabase hasheadas con bcrypt en `auth.users`, nunca pasan por nuestras tablas |
| Tiempo real | Supabase Realtime | Cuando cambia una tabla, avisa a todos los navegadores abiertos y la pantalla se actualiza sin recargar |
| Archivos | Supabase Storage | Bucket `proyectos` con las imágenes que sube el admin (solo JPG, PNG o WEBP de hasta 5 MB) |
| API externa | Open-Meteo | Datos del clima para la demo del clima |

No hay un servidor propio (Node/Express): el frontend habla directo con Supabase usando la **key pública** del proyecto. La seguridad la ponen las **políticas RLS** de la base de datos, que deciden qué puede leer o escribir cada usuario según su rol. La key se guarda en `.env.local` (no se sube al repositorio) y en las variables de entorno de Vercel.

## 2. Tecnologías

| Tecnología | Versión | Para qué |
|---|---|---|
| React (create-react-app) | 19 / react-scripts 5.0.1 | Interfaz con componentes |
| React Router DOM | 6 | Navegación entre pantallas |
| Bootstrap | 5.3 | Framework CSS (grilla, formularios, navbar, tablas) |
| Bootstrap Icons | 1.13 | Íconos |
| Chart.js + react-chartjs-2 | 4 / 5 | Gráficos del dashboard |
| @supabase/supabase-js | 2 | Conexión con la base de datos, el login, el tiempo real y las imágenes |
| Google Fonts | - | Tipografías Poppins e Inter |
| Jest + Testing Library | (vienen con CRA) | Test del footer |

## 3. Estructura de carpetas

```
proyecto-final-codigo/
├── documentacion/            arquitectura y manual de estilo
├── public/
│   └── index.html            página base, fuentes de Google
├── supabase/                 scripts SQL (se corren en orden en el SQL Editor)
│   ├── 01_tablas.sql         tablas, trigger de perfiles y función mi_rol()
│   ├── 02_politicas.sql      políticas RLS, tiempo real y bucket de imágenes
│   ├── 03_estadisticas.sql   funciones para los gráficos del dashboard
│   └── 04_datos_iniciales.sql proyectos y servicios de ejemplo
├── vercel.json               redirige todas las rutas a index.html
├── .env.example              variables que hay que completar
└── src/
    ├── index.js              arranca React, BrowserRouter y los CSS
    ├── App.js                rutas, layout del sitio y sesión del usuario
    ├── App.css               estilos propios (colores, portada, panel)
    ├── supabaseClient.js     crea la conexión con Supabase
    ├── store.js              lectura y escritura de datos + tiempo real
    ├── utilidades.js         fechas y achicar imágenes
    ├── imagenes/avatar.jpg   foto de la portada
    ├── datos/datos.js        perfil, tecnologías y experiencia (fijos)
    ├── admin/
    │   ├── AdminApp.js       rutas del panel y control de que sea admin
    │   ├── AdminLogin.js
    │   ├── AdminLayout.js    menú lateral
    │   ├── Dashboard.js      estadísticas y gráficos
    │   ├── ProyectosAdmin.js listado de proyectos
    │   ├── EditorProyecto.js crear / editar proyecto
    │   ├── ServiciosAdmin.js
    │   └── UsuariosAdmin.js
    ├── componentes/
    │   ├── Navbar.js         menú (con hamburguesa en celular)
    │   ├── Footer.js
    │   └── demos/            DemoTareas, DemoClima, DemoCarrito
    └── paginas/
        ├── Inicio.js
        ├── Proyectos.js
        ├── DetalleProyecto.js
        ├── Servicios.js
        ├── Contacto.js
        ├── Login.js
        ├── Registro.js
        ├── PanelOperador.js
        └── NoEncontrada.js
```

## 4. Base de datos

### Tablas

| Tabla | Campos principales | Para qué |
|---|---|---|
| `perfiles` | id (= id del usuario de Auth), nombre, email, rol, activo, fecha_registro | Datos y rol de cada usuario. Se crea sola al registrarse (trigger `al_registrarse`) |
| `proyectos` | titulo, categoria, resumen, descripcion, tecnologias[], funciones[], icono, demo, imagen, visible | Proyectos del portfolio |
| `servicios` | titulo, icono, descripcion, incluye[] | Servicios que se ofrecen |
| `mensajes` | nombre, email, tipo, asunto, mensaje, archivo, fecha, estado | Consultas del formulario de contacto |
| `visitas` | fecha | Una fila por cada visita al sitio |
| `accesos` | usuario_id, fecha | Una fila por cada inicio de sesión o registro |

Las tablas también validan los datos con `check` (por ejemplo largo mínimo del nombre, categorías y tipos permitidos, mensaje de 10 a 1000 caracteres), así que aunque alguien saltee el formulario la base no acepta datos inválidos.

### Roles

| Rol | Qué puede hacer |
|---|---|
| Visitante (sin sesión) | Ver inicio, proyectos y servicios, mandar consultas |
| `usuario` | Lo anterior + ver el detalle de los proyectos y probar las demos |
| `operador` | Lo anterior + panel de mensajes (ver, responder por email, marcar respondido) |
| `admin` | Todo + panel de administración |

El rol se guarda en `perfiles`. La función `mi_rol()` devuelve el rol del usuario conectado (y nada si está bloqueado) y la usan todas las políticas.

### Políticas de seguridad (RLS)

| Tabla | Leer | Crear | Editar / borrar |
|---|---|---|---|
| perfiles | cada uno el suyo, el admin todos | trigger al registrarse | admin |
| proyectos | todos los visibles, el admin también los ocultos | admin | admin |
| servicios | todos | admin | admin |
| mensajes | operador y admin | cualquiera (solo con estado Pendiente) | operador y admin responden, admin borra |
| visitas | admin | cualquiera | - |
| accesos | admin | cada usuario el suyo | - |
| imágenes (Storage) | todos | admin | admin |

### Consultas parametrizadas (funciones SQL)

El dashboard llama a estas funciones con `supabase.rpc(...)`, pasando las fechas como parámetros (nunca se arma SQL con texto):

| Función | Parámetros | Devuelve |
|---|---|---|
| `visitas_por_dia` | desde, hasta | Cantidad de visitas de cada día del rango (los días sin visitas dan 0) |
| `accesos_por_dia` | desde, hasta | Cantidad de accesos de usuarios por día |
| `registros_por_dia` | desde, hasta | Cantidad de usuarios nuevos por día |
| `consultas_por_tipo` | desde, hasta, filtro_estado | Cantidad de consultas de cada tipo, opcionalmente solo Pendientes o Respondidas |

## 5. Rutas

| Ruta | Página | Acceso |
|---|---|---|
| `/` | Inicio | Público |
| `/proyectos` | Proyectos | Público |
| `/proyectos/:id` | DetalleProyecto | Con sesión (si no, va a `/login`) |
| `/servicios` | Servicios | Público |
| `/contacto` | Contacto (`?tipo=presupuesto` o `?tipo=asesoramiento` elige el tipo) | Público |
| `/login` | Login | Público |
| `/registro` | Registro | Público |
| `/operador` | PanelOperador | Rol operador o admin |
| `*` | NoEncontrada | Público |
| `/admin/login` | AdminLogin | Público |
| `/admin` | Dashboard | Solo admin |
| `/admin/proyectos` | ProyectosAdmin | Solo admin |
| `/admin/proyectos/nuevo` y `/admin/proyectos/:id` | EditorProyecto | Solo admin |
| `/admin/servicios` | ServiciosAdmin | Solo admin |
| `/admin/usuarios` | UsuariosAdmin | Solo admin |

El sitio y el panel son la misma app con dos layouts: las rutas `/admin/*` usan el menú lateral del panel y el resto usan la navbar y el footer del sitio. Aunque alguien entre a una ruta protegida escribiendo la URL, React lo redirige, y aunque saltee el frontend, las políticas RLS no le devuelven los datos.

## 6. Cómo funciona

- **Sesión (`App.js`):** escucha `supabase.auth.onAuthStateChange`. Cuando hay sesión busca el perfil en `perfiles`; si el usuario está bloqueado (`activo = false`) no lo deja entrar. La sesión queda guardada aunque se cierre el navegador.
- **Registro:** `supabase.auth.signUp` con el nombre en los metadatos. El trigger `al_registrarse` crea el perfil con rol `usuario`.
- **Login:** `signInWithPassword`. Según el rol lo manda a `/proyectos`, `/operador` o `/admin`.
- **Store (`store.js`):** cada tabla tiene un store que la lee de Supabase la primera vez que algún componente la usa. Los componentes leen con hooks (`useProyectos()`, `useServicios()`, `useUsuarios()`, `useMensajes()`) hechos con `useSyncExternalStore`, y escriben con funciones (`guardarProyecto()`, `cambiarRol()`, `marcarRespondido()`, etc.). Mientras carga el hook devuelve `null` y la pantalla muestra "Cargando...".
- **Tiempo real:** cada store se suscribe a los cambios de su tabla con Supabase Realtime. Si el admin oculta un proyecto, desaparece del sitio de cualquier persona que lo tenga abierto, sin recargar. El dashboard también se actualiza solo cuando llega una visita, un registro o una consulta.
- **Visitas:** cada vez que se carga el sitio (no el panel) se inserta una fila en `visitas`. Una variable del módulo evita contar dos veces por el modo estricto de React. Navegar dentro del sitio no suma.
- **Accesos de usuarios:** se inserta una fila en `accesos` cada vez que alguien inicia sesión o se registra.
- **Contacto:** valida los campos y el adjunto y guarda el mensaje en `mensajes` con estado Pendiente.
- **Panel de operador:** lista los mensajes con filtros por tipo y estado. "Responder por email" abre el programa de correo con un `mailto:` ya armado con el destinatario y el asunto, y "Marcar como respondido" cambia el estado.
- **Imágenes de proyectos:** antes de subirlas se achican con un `canvas` (máximo 800px, JPG al 70%) y se suben al bucket `proyectos` de Storage. En la tabla se guarda la URL pública.

## 7. Panel de administración

| Sección | Qué hace |
|---|---|
| Dashboard | Totales de visitas, accesos, usuarios y consultas. Filtros por rango de fechas y por estado de consulta (consultas parametrizadas). Gráficos interactivos: tráfico por día (líneas), consultas por tipo (torta) y registros por día (barras). Se actualiza en vivo |
| Proyectos y demos | Listado con búsqueda y filtro por categoría. Crear, editar y borrar proyectos, elegir su demo, subir una imagen y mostrar u ocultar el proyecto en el sitio |
| Servicios | Crear, editar y borrar servicios |
| Usuarios | Búsqueda y filtros por rol y estado. Cambiar el rol (usuario u operador), bloquear o activar y borrar usuarios. Los admin no se pueden editar desde acá |

## 8. Validaciones

Se validan en el formulario (mensaje en rojo debajo del campo) y de nuevo en la base de datos con `check`.

| Formulario | Reglas |
|---|---|
| Registro | Nombre de 3 letras o más, email válido y no repetido, contraseña de 6 caracteres o más, las dos contraseñas iguales |
| Login | Campos completos, email y contraseña correctos, cuenta no bloqueada |
| Contacto | Nombre de 3 letras o más, email válido, asunto, mensaje de entre 10 y 1000 caracteres, adjunto opcional solo PDF/JPG/PNG de hasta 2 MB |
| Demo de tareas | Tarea no vacía, hasta 60 caracteres |
| Editor de proyecto | Título de 3 letras o más, resumen de entre 10 y 100 caracteres, descripción de 20 o más, al menos una tecnología, imagen solo JPG/PNG/WEBP de hasta 5 MB |
| Servicio | Título de 3 letras o más, descripción de 10 o más, al menos un ítem |
| Dashboard | La fecha "desde" no puede ser posterior a "hasta" |

## 9. APIs web usadas

| API | Dónde |
|---|---|
| Fetch | Conexión con Supabase y con la API del clima |
| Geolocation | Demo del clima ("Usar mi ubicación") |
| Clipboard | Copiar el email en Contacto y el link de un proyecto |
| localStorage | Guardar las tareas de la demo de tareas y la sesión de Supabase |
| Canvas | Achicar las imágenes que se suben en el panel |
| WebSocket | Actualizaciones en tiempo real de Supabase |

## 10. Cómo correrlo y publicarlo

1. Crear un proyecto en Supabase y correr los cuatro archivos de `supabase/` en el SQL Editor, en orden.
2. Copiar `.env.example` como `.env.local` y completar `REACT_APP_SUPABASE_URL` y `REACT_APP_SUPABASE_KEY` (la key pública).
3. `npm install` y `npm start` → http://localhost:3000
4. El admin y el operador se crean en Supabase (Authentication → Users) y después se les cambia el rol en la tabla `perfiles`. Sus contraseñas no están en el repositorio.
5. Para publicar: el repositorio está conectado a Vercel con las dos variables de entorno cargadas. Cada `git push` a `master` publica la nueva versión.

## 11. Limitaciones conocidas

- Del adjunto de Contacto se guarda solo el nombre del archivo (se valida tipo y tamaño, pero el archivo no se sube).
- Las respuestas del operador se mandan desde su propio programa de correo (`mailto:`), no desde el sistema.
- Borrar un usuario desde el panel borra su perfil; la cuenta de Auth queda en Supabase pero ya no puede entrar.
