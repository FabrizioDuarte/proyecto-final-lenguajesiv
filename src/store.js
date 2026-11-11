import { useSyncExternalStore } from 'react';
import {
  proyectos,
  servicios,
  usuariosIniciales,
  mensajesIniciales,
  visitasIniciales,
  accesosIniciales
} from './datos/datos';
import { hoy } from './utilidades';

function crearStore(clave, inicial) {
  let listeners = [];
  let cache = null;

  function leer() {
    try {
      const texto = localStorage.getItem(clave);
      if (texto) {
        return JSON.parse(texto);
      }
    } catch (e) {}
    return inicial();
  }

  function avisar() {
    listeners.forEach((fn) => fn());
  }

  function get() {
    if (cache === null) {
      cache = { valor: leer() };
    }
    return cache.valor;
  }

  function set(valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (e) {
      alert('No hay más espacio para guardar datos en el navegador');
      return false;
    }
    cache = { valor: valor };
    avisar();
    return true;
  }

  function borrar() {
    localStorage.removeItem(clave);
    cache = null;
    avisar();
  }

  function suscribir(fn) {
    listeners.push(fn);
    return () => {
      listeners = listeners.filter((l) => l !== fn);
    };
  }

  window.addEventListener('storage', (e) => {
    if (e.key === clave || e.key === null) {
      cache = null;
      avisar();
    }
  });

  return { get, set, borrar, suscribir };
}

const proyectosStore = crearStore('pf:proyectos', () => proyectos.map((p) => ({ ...p, visible: true, imagen: null })));
const serviciosStore = crearStore('pf:servicios', () => servicios);
const usuariosStore = crearStore('pf:usuarios', usuariosIniciales);
const mensajesStore = crearStore('pf:mensajes', mensajesIniciales);
const visitasStore = crearStore('pf:visitas', visitasIniciales);
const accesosStore = crearStore('pf:accesos', accesosIniciales);

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

export function useVisitas() {
  return useSyncExternalStore(visitasStore.suscribir, visitasStore.get);
}

export function useAccesos() {
  return useSyncExternalStore(accesosStore.suscribir, accesosStore.get);
}

export function guardarProyecto(proyecto) {
  const lista = proyectosStore.get();
  let existe = false;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === proyecto.id) {
      existe = true;
    }
  }
  if (existe) {
    return proyectosStore.set(lista.map((p) => (p.id === proyecto.id ? proyecto : p)));
  }
  return proyectosStore.set([...lista, proyecto]);
}

export function cambiarVisible(id) {
  proyectosStore.set(proyectosStore.get().map((p) => (p.id === id ? { ...p, visible: !p.visible } : p)));
}

export function borrarProyecto(id) {
  proyectosStore.set(proyectosStore.get().filter((p) => p.id !== id));
}

export function guardarServicio(servicio) {
  const lista = serviciosStore.get();
  let existe = false;
  for (let i = 0; i < lista.length; i++) {
    if (lista[i].id === servicio.id) {
      existe = true;
    }
  }
  if (existe) {
    serviciosStore.set(lista.map((s) => (s.id === servicio.id ? servicio : s)));
  } else {
    serviciosStore.set([...lista, servicio]);
  }
}

export function borrarServicio(id) {
  serviciosStore.set(serviciosStore.get().filter((s) => s.id !== id));
}

export function registrarUsuario(usuario) {
  usuariosStore.set([...usuariosStore.get(), usuario]);
}

export function cambiarRol(id, rol) {
  usuariosStore.set(usuariosStore.get().map((u) => (u.id === id ? { ...u, rol: rol } : u)));
}

export function cambiarActivo(id) {
  usuariosStore.set(usuariosStore.get().map((u) => (u.id === id ? { ...u, activo: !u.activo } : u)));
}

export function borrarUsuario(id) {
  usuariosStore.set(usuariosStore.get().filter((u) => u.id !== id));
}

export function agregarMensaje(mensaje) {
  mensajesStore.set([mensaje, ...mensajesStore.get()]);
}

export function marcarRespondido(id) {
  mensajesStore.set(mensajesStore.get().map((m) => (m.id === id ? { ...m, estado: 'Respondido' } : m)));
}

let visitaContada = false;

export function sumarVisita() {
  if (visitaContada) {
    return;
  }
  visitaContada = true;
  const visitas = { ...visitasStore.get() };
  const dia = hoy();
  visitas[dia] = (visitas[dia] || 0) + 1;
  visitasStore.set(visitas);
}

export function sumarAcceso() {
  const accesos = { ...accesosStore.get() };
  const dia = hoy();
  accesos[dia] = (accesos[dia] || 0) + 1;
  accesosStore.set(accesos);
}

export function restaurarTodo() {
  proyectosStore.borrar();
  serviciosStore.borrar();
  usuariosStore.borrar();
  mensajesStore.borrar();
  visitasStore.borrar();
  accesosStore.borrar();
}
