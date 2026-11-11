# Portfolio Fullstack - Proyecto Final Lenguajes IV

Demo solo de frontend, con datos de prueba (todavía no tiene backend).

## Cómo correrlo

```
npm install
npm start
```

- Sitio: http://localhost:3000
- Panel de administración: http://localhost:3000/admin

## Usuarios de prueba

- **Admin:** `admin@demo.com` / `admin123` (en `/admin/login`)
- **Operador:** `operador@demo.com` / `operador123` (en `/login`, entra al panel de operador)
- **Usuarios comunes:** `martina.diaz@gmail.com` / `demo123`, o cualquiera que se cree desde "Registrarse"

## Panel y sitio en dos pestañas

Todo se guarda en el `localStorage` del navegador. Si abrís el panel en una pestaña y el sitio en otra (mismo navegador, no en incógnito), los cambios del panel aparecen solos en el sitio y las visitas, registros y consultas del sitio aparecen solos en el panel.

El botón "Restaurar datos" del dashboard vuelve todo a los datos de ejemplo.
