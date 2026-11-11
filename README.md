## Cómo correrlo

1. Copiar `.env.example` como `.env.local` y completar la URL y la key del proyecto de Supabase.
2. Correr los archivos de la carpeta `supabase` en el SQL Editor de Supabase, en orden (`01` a `04`).
3. Instalar y arrancar:

```
npm install
npm start
```

- Sitio: http://localhost:3000
- Panel de administración: http://localhost:3000/admin

## Usuarios

- Los usuarios comunes se registran desde "Registrarse".
- El admin y el operador se crean desde Supabase (Authentication → Users) y después se les cambia el rol en la tabla `perfiles`. Sus credenciales no van en el repositorio.

## Panel y sitio en tiempo real

Los datos están en Supabase. Lo que se cambia desde el panel aparece en el sitio sin recargar, y las visitas, registros y consultas del sitio aparecen solos en el dashboard.
