import { useState } from 'react';

const productos = [
  { id: 1, nombre: 'Remera básica', precio: 12000 },
  { id: 2, nombre: 'Buzo con capucha', precio: 35000 },
  { id: 3, nombre: 'Jean clásico', precio: 42000 },
  { id: 4, nombre: 'Gorra', precio: 9500 }
];

function DemoCarrito() {
  const [carrito, setCarrito] = useState([]);

  function agregar(producto) {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(carrito.map((item) => (item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item)));
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  }

  function quitar(id) {
    setCarrito(carrito.filter((item) => item.id !== id));
  }

  let total = 0;
  carrito.forEach((item) => {
    total = total + item.precio * item.cantidad;
  });

  return (
    <div className="row g-3">
      <div className="col-md-6">
        <h6>Productos</h6>
        {productos.map((p) => (
          <div className="d-flex justify-content-between align-items-center bg-white rounded p-2 mb-2" key={p.id}>
            <div>
              <div>{p.nombre}</div>
              <small className="texto-gris">${p.precio.toLocaleString('es-AR')}</small>
            </div>
            <button className="btn btn-sm btn-celeste" onClick={() => agregar(p)}>
              <i className="bi bi-plus"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="col-md-6">
        <h6><i className="bi bi-cart3"></i> Carrito</h6>
        {carrito.length === 0 && <p className="texto-gris">El carrito está vacío</p>}
        {carrito.map((item) => (
          <div className="d-flex justify-content-between align-items-center mb-2" key={item.id}>
            <span>{item.cantidad} x {item.nombre}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={() => quitar(item.id)}>
              <i className="bi bi-x"></i>
            </button>
          </div>
        ))}
        <hr />
        <div className="d-flex justify-content-between fw-bold">
          <span>Total</span>
          <span>${total.toLocaleString('es-AR')}</span>
        </div>
      </div>
    </div>
  );
}

export default DemoCarrito;
