// Selecciona el elemento con el id "menu-icon" y agrega un evento de clic
document.getElementById("menu-icon").addEventListener("click", function () {
  // Dentro del evento de clic, selecciona el elemento con el id "menu"
  const menu = document.getElementById("menu");

  // Alterna la clase "hidden" en el elemento "menu"
  // Si la clase "hidden" está presente, la elimina; si no está, la agrega
  menu.classList.toggle("hidden");
});
