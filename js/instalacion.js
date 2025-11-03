// ==========================
// 🍔 Banner de instalación personalizado
// ==========================

let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Evita que el navegador lo muestre automáticamente
  e.preventDefault();
  deferredPrompt = e;

  // Creamos el banner visual
  const banner = document.createElement("div");
  banner.className = "instalar-banner";
  banner.innerHTML = `
    <div class="banner-content">
      <p>🍔 Instalá <strong>El Dúo Perfecto</strong> en tu pantalla de inicio</p>
      <button id="instalarBtn">Instalar</button>
      <span id="cerrarBanner">✖</span>
    </div>
  `;

  document.body.appendChild(banner);

  // Acción al hacer clic en "Instalar"
  document.getElementById("instalarBtn").addEventListener("click", () => {
    banner.remove();
    deferredPrompt.prompt();
  });

  // Permitir cerrar el banner manualmente
  document.getElementById("cerrarBanner").addEventListener("click", () => {
    banner.remove();
  });
});
