/* ============================================================
   BGR SERVICE — script.js
   ------------------------------------------------------------
   Este archivo se carga al final de cada página (justo antes
   de </body>). Eso es importante: así nos aseguramos de que
   todo el HTML ya existe en la página ANTES de que JavaScript
   intente buscarlo con document.querySelector().
   ============================================================ */

/* ------------------------------------------------------------
   1) MENÚ MÓVIL
   El botón hamburguesa (.nav-toggle) muestra/oculta el menú
   (.nav-links) agregando o quitando la clase "open".
   Fíjate que primero comprobamos que el botón exista en la
   página ("if (navToggle)") porque no todas las páginas tienen
   por qué tener exactamente el mismo HTML.
------------------------------------------------------------ */
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  const overlay = document.createElement("div");
  overlay.className = "nav-overlay";
  document.body.appendChild(overlay);

  const closeButton = document.createElement("button");
  closeButton.className = "nav-close";
  closeButton.setAttribute("aria-label", "Cerrar menú");
  navLinks.prepend(closeButton);

  const toggleMenu = () => {
    const isOpen = navLinks.classList.toggle("open");
    overlay.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
  };

  navToggle.addEventListener("click", toggleMenu);
  closeButton.addEventListener("click", toggleMenu);
  overlay.addEventListener("click", toggleMenu);

  // Si el usuario toca un link del menú, lo cerramos automáticamente.
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      overlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    });
  });
}

/* ------------------------------------------------------------
   2) MARCAR EL LINK ACTIVO DEL MENÚ
   Comparamos el nombre del archivo actual (ej: "servicios.html")
   contra el "href" de cada link del menú, y le agregamos la
   clase "active" al que coincide. Así el usuario siempre sabe
   en qué página está.
------------------------------------------------------------ */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

/* ------------------------------------------------------------
   3) FICHA TÉCNICA (efecto "máquina de escribir")
   Esto solo corre en index.html, donde existe el elemento
   con id="tech-card-body". Genera línea por línea, como si la
   página estuviera revisando el equipo en tiempo real.

   Para cambiar el texto del "diagnóstico", solo edita el
   array DIAGNOSTIC_LINES de más abajo.
------------------------------------------------------------ */
const techCardBody = document.getElementById("tech-card-body");

if (techCardBody) {
  const DIAGNOSTIC_LINES = [
    { prompt: "bgr@service:~$", text: "iniciar --diagnostico", isCommand: true },
    { text: "Revisando disipador y pasta térmica", status: "OK" },
    { text: "Verificando memoria RAM", status: "OK" },
    { text: "Analizando disco (HDD/SSD)", status: "OK" },
    { text: "Revisando temperaturas de CPU/GPU", status: "OK" },
    { prompt: "bgr@service:~$", text: "Listo. Tu equipo está en buenas manos.", isFinal: true },
  ];

  let lineIndex = 0;

  function renderNextLine() {
    if (lineIndex >= DIAGNOSTIC_LINES.length) {
      setTimeout(() => {
        techCardBody.innerHTML = "";
        lineIndex = 0;
        renderNextLine();
      }, 3200);
      return;
    }

    const item = DIAGNOSTIC_LINES[lineIndex];
    const row = document.createElement("div");
    row.className = "tech-line";

    if (item.isCommand) {
      row.innerHTML = `<span class="prompt">${item.prompt}</span><span>${item.text}</span>`;
    } else if (item.isFinal) {
      row.innerHTML = `<span class="prompt">${item.prompt}</span><span>${item.text}</span><span class="cursor"></span>`;
    } else {
      row.innerHTML = `<span class="status">[${item.status}]</span><span>${item.text}</span>`;
    }

    techCardBody.appendChild(row);
    lineIndex += 1;

    setTimeout(renderNextLine, item.isCommand ? 500 : 480);
  }

  renderNextLine();
}

/* ------------------------------------------------------------
   4) FORMULARIO DE CONTACTO (contacto.html)
   IMPORTANTE PARA APRENDER: este formulario todavía NO envía
   correos de verdad. HTML/CSS/JS que corren en el navegador
   ("front-end") no pueden mandar un email por sí solos por
   razones de seguridad. Por ahora, armamos el mensaje y
   abrimos WhatsApp con el texto ya escrito, que es 100%
   funcional sin necesitar un servidor.

   Más adelante, cuando quieras que también llegue por correo
   o quede guardado en una base de datos, vas a necesitar un
   "backend" (por ejemplo un formulario con Formspree, o un
   pequeño servidor con Node.js). Te dejo la sugerencia en el
   mensaje de chat.
------------------------------------------------------------ */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault(); // evita que la página se recargue

    const nombre = document.getElementById("nombre").value.trim();
    const equipo = document.getElementById("equipo").value;
    const mensaje = document.getElementById("mensaje").value.trim();

    if (!nombre || !mensaje) {
      alert("Por favor completa al menos tu nombre y el mensaje.");
      return;
    }

    const textoWhatsapp =
      `Hola BGR Service! Soy ${nombre}.%0A` +
      `Equipo: ${equipo}%0A` +
      `Mensaje: ${mensaje}`;

    const numero = "56935030713"; // sin el "+" para el link de wa.me
    const url = `https://wa.me/${numero}?text=${textoWhatsapp}`;

    window.open(url, "_blank");
  });
}
