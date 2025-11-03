let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  // Evita que el navegador lo muestre automáticamente
  e.preventDefault();
  deferredPrompt = e;

  // Mostramos nuestro mensaje personalizado
  const banner = document.createElement("div");
  banner.className = "instalar-banner";
  banner.innerHTML = `
    <div class="banner-content">
      <p>🍔 Instalá <strong>El Dúo Perfecto</strong> en tu pantalla de inicio</p>
      <button id="instalarBtn">Instalar</button>
    </div>
  `;
  document.body.appendChild(banner);

  document.getElementById("instalarBtn").addEventListener("click", () => {
    banner.remove();
    deferredPrompt.prompt();
  });
});
