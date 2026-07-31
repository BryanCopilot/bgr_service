
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  const mobilePanel = document.createElement("div");
  mobilePanel.className = "nav-mobile-panel";

  navLinks.querySelectorAll("a").forEach((link) => {
    const clone = link.cloneNode(true);
    mobilePanel.appendChild(clone);
  });

  const header = document.querySelector(".site-header");
  const navContainer = document.querySelector(".site-header .nav");

  if (header && navContainer) {
    navContainer.insertAdjacentElement("afterend", mobilePanel);
  } else {
    navToggle.insertAdjacentElement("afterend", mobilePanel);
  }

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  mobilePanel.querySelectorAll("a").forEach((link) => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

  const toggleMenu = () => {
    const isOpen = mobilePanel.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("menu-open", isOpen);
  };

  navToggle.addEventListener("click", toggleMenu);

  mobilePanel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobilePanel.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    });
  });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-links a").forEach((link) => {
  const linkPage = link.getAttribute("href");
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});


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
