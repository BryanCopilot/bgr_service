# BGR Service — Sitio web

Guía rápida para que entiendas cómo está armado el sitio y cómo seguir editándolo.

## 1. Estructura del proyecto

```
bgr-service/
├── index.html         → Página de inicio
├── servicios.html      → Catálogo de servicios y precios
├── referencias.html     → Fotos de trabajos + testimonios
├── contacto.html       → Formulario y datos de contacto
├── css/
│   └── style.css       → TODOS los estilos del sitio (un solo archivo)
├── js/
│   └── script.js       → TODA la interactividad (menú móvil, terminal animada, formulario)
└── images/              → Aquí van tus fotos reales (por ahora está vacía)
```

Cada `.html` es una página independiente, pero las 4 comparten el mismo
`css/style.css` y `js/script.js`. Por eso, si cambias un color en
`style.css`, cambia en las 4 páginas a la vez.

## 2. Cómo verlo funcionando en tu PC (Visual Studio Code)

1. Abre la carpeta `bgr-service` completa en VS Code (`Archivo > Abrir carpeta`).
2. Instala la extensión **"Live Server"** (de Ritwick Dey) desde el ícono de
   extensiones (el cuadrado en la barra lateral izquierda).
3. Click derecho sobre `index.html` → **"Open with Live Server"**.
4. Se abrirá tu navegador mostrando el sitio, y cada vez que guardes un
   cambio (Ctrl+S), la página se refresca sola. Así vas a poder ver en
   segundos el efecto de cada línea de código que toques.

## 3. Cómo reemplazar las imágenes de ejemplo por las tuyas

Actualmente hay recuadros con línea punteada en vez de fotos reales
(en `referencias.html`), porque no pude acceder a tu carpeta de Drive.

Para poner tus fotos:
1. Descarga las imágenes que quieras usar desde tu Drive a tu computador.
2. Cópialas dentro de la carpeta `imagenes/` del proyecto (ej: `imagenes/trabajo-1.jpg`).
3. En `referencias.html`, busca un bloque como este:
   ```html
   <div class="gallery-item">Foto: mantención de PC a domicilio</div>
   ```
   y reemplázalo por:
   ```html
   <div class="gallery-item"><img src="imagenes/trabajo-1.jpg" alt="Mantención de PC a domicilio"></div>
   ```
4. Repite para cada foto. Guarda y revisa en Live Server.

Puedes hacer lo mismo en cualquier otra página si quieres agregar fotos
reales de tu logo, tu taller, etc.

## 4. Cosas para editar seguido (y dónde están)

| Qué quiero cambiar                  | Archivo               | Qué buscar |
|--------------------------------------|------------------------|------------|
| Un precio                            | `servicios.html`       | la clase `.service-price` del servicio |
| El texto del hero (portada)          | `index.html`           | la etiqueta `<h1>` dentro de `.hero-copy` |
| El color principal (cobre) del sitio | `css/style.css`        | la variable `--copper` en `:root` |
| El número de WhatsApp                | todas las páginas + `js/script.js` | buscar `56935030713` |
| El texto que "escribe" la terminal   | `js/script.js`         | el array `DIAGNOSTIC_LINES` |

## 5. Sugerencias para cuando quieras seguir creciendo el sitio

Estas son ideas para más adelante, no hay que hacerlas todas de una:

- **Dominio propio y hosting**: hoy el sitio es solo archivos locales.
  Para que cualquiera lo vea en internet, puedes subirlo gratis a
  **GitHub Pages** o **Netlify** (arrastrando la carpeta), y comprar
  un dominio como `bgrservice.cl`.
- **Formulario que también envíe correos de verdad**: servicios como
  **Formspree** o **Web3Forms** permiten que un formulario HTML simple
  mande el correo sin que tengas que programar un servidor.
- **SEO básico**: agregar el sitio a Google Search Console, y pedirle
  a tus clientes reseñas en Google Maps (te van a ayudar mucho a
  aparecer cuando alguien busque "reparación de PC Curicó").
- **Analítica**: agregar Google Analytics o Plausible para saber
  cuánta gente visita el sitio y desde dónde.
- **Modo oscuro/claro**: ya que sabes CSS, un buen ejercicio siguiente
  es agregar un botón que cambie las variables de `:root` a una
  versión clara del sitio.
- **Blog corto de "tips"**: con tu conocimiento de hardware, podrías
  agregar una sección de artículos cortos (ej: "Cómo saber si tu PC
  necesita más RAM"), que además ayuda mucho al SEO.

## 7. Novedades de esta versión (v2)

- **Hero fijo estilo "Google Sites"**: en `index.html`, la imagen y el
  texto de portada quedan fijos en pantalla mientras el resto del
  contenido sube y los va tapando. Está explicado paso a paso en los
  comentarios de `css/style.css` (busca "HERO FIJO ESTILO GOOGLE SITES").
  Para poner tu propia foto de portada, edita en `index.html` el atributo:
  ```html
  <div class="hero-fixed" style="--hero-image:url(images/hero.jpg);">
  ```
- **Ficha técnica**: es la ex-"terminal", rediseñada como un panel
  elegante enmarcado. El texto que va "escribiendo" se controla en
  `js/script.js`, en el array `DIAGNOSTIC_LINES`.
- **Carrusel de trabajos** (Bootstrap 5, vía CDN, solo en `index.html`):
  reemplaza cada `<div class="slide-placeholder">...</div>` dentro de
  `#carouselTrabajos` por `<img src="images/trabajo-1.jpg" class="d-block w-100" alt="...">`
  cuando tengas tus fotos reales.
- **Página "Acerca de"** (`acerca.html`): tu presentación personal.
  Reemplaza el bloque `.about-photo` por tu foto real (mismo mecanismo
  que las demás imágenes) y ajusta el texto a tu propia voz — el que
  dejé es solo una propuesta de partida.
- **Nueva paleta**: crema/marfil + tinta oscura + acento bronce, con
  tipografía serif (Cormorant Garamond) para títulos. Todo sigue
  controlado desde las variables en `:root` al inicio de `style.css`.

## 6. Ideas para seguir aprendiendo con este mismo proyecto

- Intenta agregar un quinto "servicio" tú mismo copiando un bloque
  `.service-card` en `servicios.html`.
- Intenta cambiar el color `--copper` por otro y observa cómo cambia
  todo el sitio a la vez — así entiendes el poder de las variables CSS.
- Abre las Herramientas de Desarrollador del navegador (F12), pestaña
  "Elements", y toca los estilos en vivo para experimentar sin miedo
  a romper nada (los cambios ahí no se guardan en el archivo).
