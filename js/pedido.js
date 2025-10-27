// === 🧾 SISTEMA DE PEDIDOS "EL DÚO PERFECTO" ===
let carrito = [];

// 🧺 Agregar producto
function agregarAlPedido(nombre, precio) {
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  mostrarBurbuja();
}

// 🚀 Inicialización al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("carrito");
  if (guardado) carrito = JSON.parse(guardado);

  mostrarCarrito();
  mostrarBurbuja();

  const bubble = document.getElementById("cart-bubble");
  const popup = document.getElementById("cart-popup");
  const hacerPedidoBtn = document.getElementById("btnHacerPedido");

  if (bubble) {
    bubble.addEventListener("click", () => {
      popup.style.display = popup.style.display === "flex" ? "none" : "flex";
    });
  }

  if (hacerPedidoBtn) {
    hacerPedidoBtn.addEventListener("click", mostrarModal);
  }
});

// 🧾 Mostrar productos dentro del carrito
function mostrarCarrito() {
  const cont = document.getElementById("carrito");
  const contador = document.getElementById("cart-count");
  if (!cont || !contador) return;

  if (!carrito.length) {
    cont.innerHTML = "<p>Vacío por ahora 🍟</p>";
    contador.textContent = 0;
    return;
  }

  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  cont.innerHTML =
    carrito
      .map((p) => `<p>🍔 ${p.nombre} - $${p.precio.toFixed(2)}</p>`)
      .join("") + `<strong>Total: $${total.toFixed(2)}</strong>`;

  contador.textContent = carrito.length;
}

// 👁️ Mostrar u ocultar la burbuja según haya productos
function mostrarBurbuja() {
  const bubble = document.getElementById("cart-bubble");
  const contador = document.getElementById("cart-count");
  if (!bubble || !contador) return;

  bubble.style.display = carrito.length ? "flex" : "none";
  contador.textContent = carrito.length;
}

// 📦 Mostrar modal de datos del cliente
function mostrarModal() {
  const modal = document.getElementById("modalDatos");
  const popup = document.getElementById("cart-popup");
  if (!modal) return;

  popup.style.display = "none";
  modal.style.display = "flex";

  const radios = document.querySelectorAll('input[name="tipo"]');
  radios.forEach((r) =>
    r.addEventListener("change", (e) => {
      document.getElementById("formEnvio").style.display =
        e.target.value === "envio" ? "block" : "none";
    })
  );

  const enviarBtn = document.getElementById("btnEnviar");
  const cerrarBtn = document.getElementById("cerrarModal");

  if (enviarBtn) enviarBtn.onclick = enviarPedido;
  if (cerrarBtn)
    cerrarBtn.onclick = () => {
      modal.style.display = "none";
    };
}

// ✅ Enviar pedido por WhatsApp
function enviarPedido() {
  if (!carrito.length) {
    alert("Tu carrito está vacío 🍔");
    return;
  }

  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  if (!tipo) {
    alert("Seleccioná si es envío o retiro 🙏");
    return;
  }

  let mensaje = "Hola! Quiero hacer un pedido en *El Dúo Perfecto* 🍔\n\n";
  carrito.forEach((p) => (mensaje += `- ${p.nombre} ($${p.precio})\n`));
  const total = carrito.reduce((acc, p) => acc + p.precio, 0);
  mensaje += `\nTotal: $${total.toFixed(2)}\nTipo: ${tipo}\n`;

  if (tipo === "envio") {
    const nombre = document.getElementById("nombre").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const metodo = document.getElementById("metodo").value.trim();
    const obs = document.getElementById("observaciones").value.trim();

    if (!nombre || !direccion) {
      alert("Completá nombre y dirección 🚚");
      return;
    }

    mensaje += `📍 Dirección: ${direccion}\n👤 Nombre: ${nombre}\n💳 Pago: ${metodo}\n📝 ${obs}`;
  }

  // ⚡ Enviar por WhatsApp
  const url = `https://wa.me/59163430571?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");

  // 🔄 Limpiar carrito después de enviar
  localStorage.removeItem("carrito");
  carrito = [];
  mostrarCarrito();
  mostrarBurbuja();

  document.getElementById("modalDatos").style.display = "none";
}
