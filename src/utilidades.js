export function fechaTexto(fecha) {
  const anio = fecha.getFullYear();
  let mes = fecha.getMonth() + 1;
  let dia = fecha.getDate();
  if (mes < 10) {
    mes = '0' + mes;
  }
  if (dia < 10) {
    dia = '0' + dia;
  }
  return anio + '-' + mes + '-' + dia;
}

export function hoy() {
  return fechaTexto(new Date());
}

export function diasAtras(cantidad) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() - cantidad);
  return fechaTexto(fecha);
}

export function achicarImagen(archivo) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(archivo);
    const img = new Image();
    img.onload = () => {
      let escala = 800 / Math.max(img.width, img.height);
      if (escala > 1) {
        escala = 1;
      }
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(img.width * escala);
      canvas.height = Math.round(img.height * escala);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.7));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('No se pudo leer la imagen'));
    };
    img.src = url;
  });
}
