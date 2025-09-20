let casasData = [];

async function cargarCasas(categoriaInicial = null) {
  try {
    const response = await fetch("casasdb.json");
    casasData = await response.json();

    if (categoriaInicial) {
      mostrarCasas(casasData.filter((c) => c.categoria === categoriaInicial));
    } else {
      mostrarCasas(casasData);
    }
  } catch (error) {
    console.error("Error cargando casas:", error);
  }
}

async function cargarCasas() {
  const response = await fetch("casassbd.json");
  casasData = await response.json();
  mostrarCasas(casasData);
}

function mostrarCasas(casas) {
  const casasGrid = document.querySelector(".casas-grid");
  casasGrid.innerHTML = "";
  casas.forEach((casas) => {
    const casasItem = document.createElement("div");
    casasItem.className = "casas-item";

    casasItem.style.cursor = "pointer";
    casasItem.setAttribute("data-casas-id", casas.id);

    casasItem.innerHTML = `
      <img src="${casas.image}" alt="${casas.title}" />
      <div class="casas-info">
        <h3>${casas.title}</h3>
        <p>${casas.description}</p>
        <div class="casas-details">
          <span class="Ciudad">${casas.ciudad}</span>
          <span class="Nombre">${casas.nombre}</span>
          <span class="Image">${casas.image}</span>
          <span class="Categoria">${casas.categoria}</span>
          <span class="Precio_actual">${casas.precioactual}</span>
          <span class="Precio_anterio">${casas.precioanterior}</span>
          <span class="Baños">${casas.baños}</span>
          <span class="Habitaciones">${casas.habitaciones}</span>
          <span class="Parqueros">${casas.parqueros}</span>
          <span class="Latitud">${casas.latitud}</span>
          <span class="Longitud">${casas.longitud}</span>
          <span class="Reparto">${casas.reparto}</span>
          <span class="Sipnosis">${casas.sipnosis}</span>
        </div>
      </div>
    `;

    casasItem.addEventListener("click", () => {
      mostrarDetallesCasas(casas.id);
    });

    casasGrid.appendChild(casasItem);
  });
}

function mostrarDetallesCasas(casasId) {
  const casas = casasData.find((p) => p.id === casasId);

  // Rellenar el modal con los datos de la película
  document.getElementById("modalImagen").src = casas.image;
  document.getElementById("modalImagen").alt = casas.title;
  document.getElementById("modalCiudad").textContent = casas.Ciudad;
  document.getElementById("modalNombre").textContent = casas.Nombre;
  document.getElementById("modalCategoria").textContent = casas.Categoria;
  document.getElementById("modalPrecioactual").textContent = casas.Precioactual;
  document.getElementById("modalPrecioanterior").textContent =
    casas.Precioanterior;
  document.getElementById("modalArea").textContent = casas.Area;
  document.getElementById("modalHabitaciones").textContent = casas.Habitaciones;
  document.getElementById("modalBaños").textContent = casas.Baños;
  document.getElementById("modalParqueros").textContent = casas.Parqueros;
  document.getElementById("modalLatitud").textContent = casas.Latitud;
  document.getElementById("modalLongitud").textContent = casas.Longitud;
  document.getElementById("modalCast").textContent = casas.Cast;
  document.getElementById("modalSynopsis").textContent = casas.sipnosis;

  // Mostrar el reparto
  const castContainer = document.getElementById("modalCast");
  castContainer.innerHTML = "";
  casa.cast.forEach((actor) => {
    const castSpan = document.createElement("span");
    castSpan.className = "cast-member";
    castSpan.textContent = actor;
    castContainer.appendChild(castSpan);
  });

  // Mostrar el modal
  document.getElementById("casasModal").classList.remove("hidden");
  document.body.style.overflow = "hidden"; // Prevenir scroll del body
}

// Función para cerrar el modal
function cerrarModal() {
  document.getElementById("casasModal").classList.add("hidden");
  document.body.style.overflow = "auto"; // Restaurar scroll del body
}

document.addEventListener("DOMContentLoaded", function () {
  // Cargar películas
  cargarCasas();

  // Evento para cerrar el modal al hacer clic en el botón de cerrar
  document.querySelector(".close-btn").addEventListener("click", cerrarModal);

  // Opcional: cerrar el modal al hacer clic fuera del contenido
  document.getElementById("casasModal").addEventListener("click", function (e) {
    if (e.target === this) {
      cerrarModal();
    }
  });
});
