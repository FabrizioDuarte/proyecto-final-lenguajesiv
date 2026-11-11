import { useSyncExternalStore } from 'react';
import { supabase } from './supabaseClient';
import { hoy } from './utilidades';

const stores = [];

function crearStore(tabla, consulta) {
  let valor = null;
  let listeners = [];
  let iniciado = false;

  async function recargar() {
    const { data, error } = await consulta();
    if (error) {
      console.log('Error cargando ' + tabla + ': ' + error.message);
      if (valor === null) {
        valor = [];
      }
    } else {
      valor = data;
    }
    listeners.forEach((fn) => fn());
  }

  function get() {
    return valor;
  }

  function suscribir(fn) {
    listeners.push(fn);
    if (!iniciado) {
      iniciado = true;
      recargar();
      supabase
        .channel('cambios-' + tabla)
        .on('postgres_changes', { event: '*', schema: 'public', table: tabla }, () => recargar())
        .subscribe();
    }
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }

  function estaIniciado() {
    return iniciado;
  }

  const store = { get, suscribir, recargar, estaIniciado };
  stores.push(store);
  return store;
}

const proyectosStore = crearStore('proyectos', () => supabase.from('proyectos').select('*').order('id'));
const serviciosStore = crearStore('servicios', () => supabase.from('servicios').select('*').order('id'));
const usuariosStore = crearStore('perfiles', () =>
  supabase.from('perfiles').select('*').order('fecha_registro', { ascending: false })
);
const mensajesStore = crearStore('mensajes', () =>
  supabase.from('mensajes').select('*').order('fecha', { ascending: false }).order('id', { ascending: false })
);

supabase.auth.onAuthStateChange(() => {
  setTimeout(() => {
    stores.forEach((s) => {
      if (s.estaIniciado()) {
        s.recargar();
      }
    });
  }, 0);
});

export function useProyectos() {
  return useSyncExternalStore(proyectosStore.suscribir, proyectosStore.get);
}

export function useServicios() {
  return useSyncExternalStore(serviciosStore.suscribir, serviciosStore.get);
}

export function useUsuarios() {
  return useSyncExternalStore(usuariosStore.suscribir, usuariosStore.get);
}

export function useMensajes() {
  return useSyncExternalStore(mensajesStore.suscribir, mensajesStore.get);
}

export async function buscarPerfil(id) {
  const { data } = await supabase.from('perfiles').select('*').eq('id', id).maybeSingle();
  return data;
}

export async function subirImagen(dataUrl) {
  const blob = await fetch(dataUrl).then((r) => r.blob());
  const nombre = Date.now() + '.jpg';
  const { error } = await supabase.storage.from('proyectos').upload(nombre, blob, { contentType: 'image/jpeg' });
  if (error) {
    console.log('Error subiendo imagen: ' + error.message);
    return null;
  }
  return supabase.storage.from('proyectos').getPublicUrl(nombre).data.publicUrl;
}

export async function guardarProyecto(proyecto, id) {
  let respuesta;
  if (id) {
    respuesta = await supabase.from('proyectos').update(proyecto).eq('id', id);
  } else {
    respuesta = await supabase.from('proyectos').insert(proyecto);
  }
  if (respuesta.error) {
    return respuesta.error.message;
  }
  proyectosStore.recargar();
  return null;
}

export async function cambiarVisible(proyecto) {
  await supabase.from('proyectos').update({ visible: !proyecto.visible }).eq('id', proyecto.id);
  proyectosStore.recargar();
}

export async function borrarProyecto(id) {
  await supabase.from('proyectos').delete().eq('id', id);
  proyectosStore.recargar();
}

export async function guardarServicio(servicio, id) {
  let respuesta;
  if (id) {
    respuesta = await supabase.from('servicios').update(servicio).eq('id', id);
  } else {
    respuesta = await supabase.from('servicios').insert(servicio);
  }
  if (respuesta.error) {
    return respuesta.error.message;
  }
  serviciosStore.recargar();
  return null;
}

export async function borrarServicio(id) {
  await supabase.from('servicios').delete().eq('id', id);
  serviciosStore.recargar();
}

export async function cambiarRol(id, rol) {
  await supabase.from('perfiles').update({ rol: rol }).eq('id', id);
  usuariosStore.recargar();
}

export async function cambiarActivo(usuario) {
  await supabase.from('perfiles').update({ activo: !usuario.activo }).eq('id', usuario.id);
  usuariosStore.recargar();
}

export async function borrarUsuario(id) {
  await supabase.from('perfiles').delete().eq('id', id);
  usuariosStore.recargar();
}

export async function agregarMensaje(mensaje) {
  const { error } = await supabase.from('mensajes').insert(mensaje);
  if (error) {
    return error.message;
  }
  return null;
}

export async function marcarRespondido(id) {
  await supabase.from('mensajes').update({ estado: 'Respondido' }).eq('id', id);
  mensajesStore.recargar();
}

let visitaContada = false;

export function sumarVisita() {
  if (visitaContada) {
    return;
  }
  visitaContada = true;
  supabase.from('visitas').insert({ fecha: hoy() }).then(({ error }) => {
    if (error) {
      console.log('Error sumando visita: ' + error.message);
    }
  });
}

export async function sumarAcceso(usuarioId) {
  await supabase.from('accesos').insert({ usuario_id: usuarioId, fecha: hoy() });
}
