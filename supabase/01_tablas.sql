create table perfiles (
  id uuid primary key references auth.users(id) on delete cascade,
  nombre text not null check (char_length(nombre) >= 3),
  email text not null,
  rol text not null default 'usuario' check (rol in ('usuario', 'operador', 'admin')),
  activo boolean not null default true,
  fecha_registro date not null default (now() at time zone 'America/Argentina/Salta')::date
);

create table proyectos (
  id bigint generated always as identity primary key,
  titulo text not null check (char_length(titulo) >= 3),
  categoria text not null check (categoria in ('Frontend', 'Fullstack', 'Mobile')),
  resumen text not null check (char_length(resumen) between 10 and 100),
  descripcion text not null check (char_length(descripcion) >= 20),
  tecnologias text[] not null default '{}',
  funciones text[] not null default '{}',
  icono text not null default 'bi-code-slash',
  demo text check (demo in ('tareas', 'clima', 'carrito')),
  imagen text,
  visible boolean not null default true,
  creado timestamptz not null default now()
);

create table servicios (
  id bigint generated always as identity primary key,
  titulo text not null check (char_length(titulo) >= 3),
  icono text not null default 'bi-code-slash',
  descripcion text not null check (char_length(descripcion) >= 10),
  incluye text[] not null default '{}',
  creado timestamptz not null default now()
);

create table mensajes (
  id bigint generated always as identity primary key,
  nombre text not null check (char_length(nombre) >= 3),
  email text not null check (email like '%_@_%._%'),
  tipo text not null check (tipo in ('Consulta general', 'Pedido de presupuesto', 'Asesoramiento técnico')),
  asunto text not null check (char_length(asunto) >= 3),
  mensaje text not null check (char_length(mensaje) between 10 and 1000),
  archivo text,
  fecha date not null default (now() at time zone 'America/Argentina/Salta')::date,
  estado text not null default 'Pendiente' check (estado in ('Pendiente', 'Respondido'))
);

create table visitas (
  id bigint generated always as identity primary key,
  fecha date not null default (now() at time zone 'America/Argentina/Salta')::date,
  creado timestamptz not null default now()
);

create table accesos (
  id bigint generated always as identity primary key,
  usuario_id uuid references auth.users(id) on delete set null,
  fecha date not null default (now() at time zone 'America/Argentina/Salta')::date,
  creado timestamptz not null default now()
);

create function public.crear_perfil()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.perfiles (id, nombre, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'nombre', 'Usuario'), new.email);
  return new;
end;
$$;

create trigger al_registrarse
after insert on auth.users
for each row execute function public.crear_perfil();

create function public.mi_rol()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select rol from public.perfiles where id = auth.uid() and activo = true
$$;
