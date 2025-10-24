let carrito = [];

function agregarAlPedido(nombre, precio) {
  carrito.push({ nombre, precio });
  alert(`${nombre} agregado al pedido.`);
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

document.addEventListener('DOMContentLoaded', () => {
  const guardado = localStorage.getItem('carrito');
  if (guardado) carrito = JSON.parse(guardado);
  mostrarCarrito();

  const envioRadios = document.querySelectorAll('input[name="tipo"]');
  envioRadios.forEach(r => {
    r.addEventListener('change', e => {
      document.getElementById('formEnvio').style.display =
        e.target.value === 'envio' ? 'block' : 'none';
    });
  });

  document.getElementById('btnEnviar').addEventListener('click', enviarPedido);
});

function mostrarCarrito() {
  const cont = document.getElementById('carrito');
  cont.innerHTML = carrito.map(p => `<p>🍔 ${p.nombre} - $${p.precio.toFixed(2)}</p>`).join('');
}

function enviarPedido() {
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  let mensaje = 'Hola! Quiero hacer un pedido en El Dúo Perfecto 🍔\n';

  carrito.forEach(p => mensaje += `- ${p.nombre} ($${p.precio})\n`);
  const total = carrito.reduce((acc, p) => acc + p.precio, 0).toFixed(2);
  mensaje += `\nTotal: $${total}\nTipo: ${tipo}\n`;

  if (tipo === 'envio') {
    const nombre = document.getElementById('nombre').value;
    const direccion = document.getElementById('direccion').value;
    const metodo = document.getElementById('metodo').value;
    const obs = document.getElementById('observaciones').value;
    mensaje += `📍 Dirección: ${direccion}\n👤 Nombre: ${nombre}\n💳 Pago: ${metodo}\n📝 ${obs}`;
  }

  const url = `https://wa.me/59163430571?text=${encodeURIComponent(mensaje)}`;
  window.open(url, '_blank');
}
