// === El Dúo Perfecto 🍔 ===
// Activar efecto de scroll en el header
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 80) {
    header.style.background = "rgba(43, 29, 20, 0.95)";
  } else {
    header.style.background = "linear-gradient(rgba(43, 29, 20, 0.9) 0%, rgba(43, 29, 20, 0.6) 50%, rgba(43, 29, 20, 0) 100%)";
  }
});

console.log("El Dúo Perfecto funcionando 🍔");
