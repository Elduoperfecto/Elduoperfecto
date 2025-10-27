// === EL DÚO PERFECTO | Carrito Unificado Premium v2 by JUCA ===

let carrito = [];

// 🧺 Agregar producto al carrito
function agregarAlPedido(nombre, precio) {
  const producto = carrito.find(p => p.nombre === nombre);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarYActualizar();
  animarBurbuja();
}

// 💾 Guardar en localStorage y actualizar vista
function guardarYActualizar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  mostrarBurbuja();
}

// 🚀 Inicializar al cargar
document.addEventListener("DOMContentLoaded", () => {
  const guardado = localStorage.getItem("carrito");
  if (guardado) carrito = JSON.parse(guardado);

  mostrarCarrito();
  mostrarBurbuja();

  const bubble = document.getElementById("cart-bubble");
  if (bubble) {
    bubble.addEventListener("click", () => {
      document.getElementById("cart-overlay").classList.toggle("visible");
    });
  }

  document.getElementById("btnEnviar")?.addEventListener("click", enviarPedido);
  document.getElementById("cerrarCarrito")?.addEventListener("click", () => {
    document.getElementById("cart-overlay").classList.remove("visible");
  });
});

// 🧾 Mostrar los productos en el carrito
function mostrarCarrito() {
  const cont = document.getElementById("carrito");
  const contador = document.getElementById("cart-count");
  if (!cont || !contador) return;

  if (carrito.length === 0) {
    cont.innerHTML = "<p style='text-align:center;opacity:0.8;'>🛒 Tu pedido está vacío</p>";
    contador.textContent = 0;
    return;
  }

  let total = 0;
  cont.innerHTML = carrito
    .map((p, i) => {
      total += p.precio * p.cantidad;
      return `
        <div class="item-carrito">
          <span>🍔 ${p.nombre}</span>
          <div class="item-detalle">
            <button class="cantidad-btn" onclick="cambiarCantidad(${i}, -1)">−</button>
            <span>${p.cantidad}</span>
            <button class="cantidad-btn" onclick="cambiarCantidad(${i}, 1)">+</button>
            <span>$${(p.precio * p.cantidad).toFixed(2)}</span>
            <button class="eliminar" onclick="eliminarProducto(${i})">❌</button>
          </div>
        </div>`;
    })
    .join("");

  cont.innerHTML += `
    <hr>
    <strong style="display:block;text-align:right;margin-top:8px;">Total: $${total.toFixed(2)}</strong>
  `;

  contador.textContent = carrito.reduce((acc, p) => acc + p.cantidad, 0);
}

// 🔄 Cambiar cantidad de producto
function cambiarCantidad(i, delta) {
  carrito[i].cantidad += delta;
  if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
  guardarYActualizar();
}

// ❌ Eliminar producto directamente
function eliminarProducto(i) {
  carrito.splice(i, 1);
  guardarYActualizar();
}

// 👁️ Mostrar/ocultar burbuja flotante
function mostrarBurbuja() {
  const bubble = document.getElementById("cart-bubble");
  const contador = document.getElementById("cart-count");
  const cantidad = carrito.reduce((a, p) => a + p.cantidad, 0);

  if (bubble && contador) {
    bubble.style.display = cantidad ? "flex" : "none";
    contador.textContent = cantidad;
  }
}

// ✨ Pequeña animación de la burbuja
function animarBurbuja() {
  const bubble = document.getElementById("cart-bubble");
  if (!bubble) return;
  bubble.classList.add("shake");
  setTimeout(() => bubble.classList.remove("shake"), 600);
}

// ✅ Enviar pedido por WhatsApp
function enviarPedido() {
  if (!carrito.length) return alert("Tu carrito está vacío 🍟");

  const nombre = document.getElementById("nombre").value.trim();
  const direccion = document.getElementById("direccion").value.trim();
  const metodo = document.getElementById("metodo").value.trim();
  const tipo = document.querySelector('input[name="tipo"]:checked')?.value;
  const obs = document.getElementById("observaciones").value.trim();

  if (!nombre) {
    alert("Por favor, completá tu nombre 🧾");
    return;
  }

  let msg = `Hola! Quiero hacer un pedido en *El Dúo Perfecto* 🍔\n\n`;
  carrito.forEach(p => msg += `- ${p.nombre} x${p.cantidad} ($${p.precio})\n`);
  const total = carrito.reduce((a, p) => a + p.precio * p.cantidad, 0);
  msg += `\nTotal: $${total.toFixed(2)}\n👤 Nombre: ${nombre}\n`;

  if (tipo === "envio" && direccion) msg += `📍 Dirección: ${direccion}\n`;
  msg += `💳 Pago: ${metodo}\n📝 ${obs || "Sin observaciones"}\n`;

  const url = `https://wa.me/59163430571?text=${encodeURIComponent(msg)}`;
  window.open(url, "_blank");

  carrito = [];
  localStorage.removeItem("carrito");
  mostrarCarrito();
  mostrarBurbuja();
  document.getElementById("cart-overlay").classList.remove("visible");
}
