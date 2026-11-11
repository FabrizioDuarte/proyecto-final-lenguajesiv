alter table perfiles enable row level security;
alter table proyectos enable row level security;
alter table servicios enable row level security;
alter table mensajes enable row level security;
alter table visitas enable row level security;
alter table accesos enable row level security;

create policy "cada uno ve su perfil y el admin ve todos" on perfiles
for select using (id = auth.uid() or public.mi_rol() = 'admin');

create policy "el admin edita perfiles" on perfiles
for update using (public.mi_rol() = 'admin');

create policy "el admin borra perfiles" on perfiles
for delete using (public.mi_rol() = 'admin');

create policy "todos ven los proyectos visibles" on proyectos
for select using (visible = true or public.mi_rol() = 'admin');

create policy "el admin crea proyectos" on proyectos
for insert with check (public.mi_rol() = 'admin');

create policy "el admin edita proyectos" on proyectos
for update using (public.mi_rol() = 'admin');

create policy "el admin borra proyectos" on proyectos
for delete using (public.mi_rol() = 'admin');

create policy "todos ven los servicios" on servicios
for select using (true);

create policy "el admin crea servicios" on servicios
for insert with check (public.mi_rol() = 'admin');

create policy "el admin edita servicios" on servicios
for update using (public.mi_rol() = 'admin');

create policy "el admin borra servicios" on servicios
for delete using (public.mi_rol() = 'admin');

create policy "cualquiera manda un mensaje" on mensajes
for insert with check (estado = 'Pendiente');

create policy "operador y admin ven los mensajes" on mensajes
for select using (public.mi_rol() in ('operador', 'admin'));

create policy "operador y admin responden mensajes" on mensajes
for update using (public.mi_rol() in ('operador', 'admin'));

create policy "el admin borra mensajes" on mensajes
for delete using (public.mi_rol() = 'admin');

create policy "cualquiera suma una visita" on visitas
for insert with check (true);

create policy "el admin ve las visitas" on visitas
for select using (public.mi_rol() = 'admin');

create policy "cada usuario suma su acceso" on accesos
for insert to authenticated with check (usuario_id = auth.uid());

create policy "el admin ve los accesos" on accesos
for select using (public.mi_rol() = 'admin');

alter publication supabase_realtime add table perfiles, proyectos, servicios, mensajes, visitas, accesos;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('proyectos', 'proyectos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']);

create policy "el admin sube imagenes" on storage.objects
for insert to authenticated with check (bucket_id = 'proyectos' and public.mi_rol() = 'admin');

create policy "el admin cambia imagenes" on storage.objects
for update to authenticated using (bucket_id = 'proyectos' and public.mi_rol() = 'admin');

create policy "el admin borra imagenes" on storage.objects
for delete to authenticated using (bucket_id = 'proyectos' and public.mi_rol() = 'admin');
