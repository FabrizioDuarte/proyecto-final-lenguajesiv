create function visitas_por_dia(desde date, hasta date)
returns table (dia date, cantidad bigint)
language sql
stable
as $$
  select d::date, count(v.id)
  from generate_series(desde, hasta, interval '1 day') as d
  left join visitas v on v.fecha = d::date
  group by d
  order by d
$$;

create function accesos_por_dia(desde date, hasta date)
returns table (dia date, cantidad bigint)
language sql
stable
as $$
  select d::date, count(a.id)
  from generate_series(desde, hasta, interval '1 day') as d
  left join accesos a on a.fecha = d::date
  group by d
  order by d
$$;

create function registros_por_dia(desde date, hasta date)
returns table (dia date, cantidad bigint)
language sql
stable
as $$
  select d::date, count(p.id)
  from generate_series(desde, hasta, interval '1 day') as d
  left join perfiles p on p.fecha_registro = d::date
  group by d
  order by d
$$;

create function consultas_por_tipo(desde date, hasta date, filtro_estado text default null)
returns table (tipo text, cantidad bigint)
language sql
stable
as $$
  select m.tipo, count(*)
  from mensajes m
  where m.fecha between desde and hasta
    and (filtro_estado is null or m.estado = filtro_estado)
  group by m.tipo
  order by count(*) desc
$$;
