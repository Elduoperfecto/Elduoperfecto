let carrito = [];

// === Agregar producto al carrito ===
function agregarAlPedido(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
  alert(`${nombre} agregado al pedido 🍔`);
}

// === Cargar carrito al iniciar ===
document.addEventListener('DOMContentLoaded', () => {
  const guardado = localStorage.getItem('carrito');
  if (guardado) carrito = JSON.parse(guardado);
  mostrarCarrito();

  document.getElementById('btnHacerPedido').addEventListener('click', mostrarFormulario);
  document.getElementById('btnEnviar').addEventListener('click', enviarPedido);
});

// === Mostrar productos en el carrito ===
function mostrarCarrito() {
  const cont = document.getElementById('carrito');
  if (carrito.length === 0) {
    cont.innerHTML = "<p>🛒 Tu carrito está vacío</p>";
    return;
  }

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  cont.innerHTML = carrito
    .map(p => `<p>🍔 ${p.nombre} - $${p.precio.toFixed(2)}</p>`)
    .join('') + `<hr><strong>Total: $${total.toFixed(2)}</strong>`;
}

// === Mostrar formulario de datos ===
function mostrarFormulario() {
  if (carrito.length === 0) {
    alert("Agregá al menos un producto al pedido antes de continuar 😅");
    return;
  }
  document.getElementById('seccionCarrito').style.display = 'none';
  document.getElementById('seccionDatos').style.display = 'block';

  const radios = document.querySelectorAll('input[name="tipo"]');
  radios.forEach(r => {
    r.addEventListener('change', e => {
      document.getElementById('formEnvio').style.display =
        e.target.value === 'envio' ? 'block' : 'none';
    });
  });
}

// === Enviar pedido a WhatsApp ===
function enviarPedido() {
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  if (!tipo) {
    alert("Seleccioná si es envío o retiro 🙏");
    return;
  }

  let mensaje = 'Hola! Quiero hacer un pedido en *El Dúo Perfecto* 🍔\n\n';
  carrito.forEach(p => mensaje += `- ${p.nombre} ($${p.precio})\n`);
  const total = carrito.reduce((acc, p) => acc + p.precio, 0).toFixed(2);
  mensaje += `\nTotal: $${total}\nTipo: ${tipo}\n`;

  if (tipo === 'envio') {
    const nombre = document.getElementById('nombre').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const metodo = document.getElementById('metodo').value.trim();
    const obs = document.getElementById('observaciones').value.trim();

    if (!nombre || !direccion) {
      alert("Completá nombre y dirección para el envío 🚚");
      return;
    }

    mensaje += `📍 Dirección: ${direccion}\n👤 Nombre: ${nombre}\n💳 Pago: ${metodo}\n📝 ${obs}`;
  }

  const url = `https://wa.me/59163430571?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');

  // Vaciar carrito después de enviar
  localStorage.removeItem('carrito');
  carrito = [];
  mostrarCarrito();

  // Volver a la primera vista
  document.getElementById('seccionDatos').style.display = 'none';
  document.getElementById('seccionCarrito').style.display = 'block';
}
