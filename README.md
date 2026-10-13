# Inmobiliaria SV — Landing Page

Landing page estática (HTML5 + CSS3 + JavaScript vanilla) para generación de leads inmobiliarios en El Salvador. Sin frameworks, sin backend, sin base de datos.

## Estructura del proyecto

```
inmobiliaria-sv/
├── index.html          # Página principal (HTML5 semántico + JSON-LD)
├── css/
│   └── style.css       # Estilos (tokens, layout, componentes, responsive)
├── js/
│   └── script.js       # Menú móvil, WhatsApp contextual, formulario, animaciones
├── assets/
│   └── favicon.svg     # Ícono del sitio
├── robots.txt
├── sitemap.xml
└── README.md
```

## Ejecutar localmente

No requiere instalación ni servidor. Basta con abrir `index.html` en el navegador:

- Doble clic en `index.html`, o
- Arrastrar el archivo a una pestaña del navegador.

Si prefieres un servidor local (recomendado para probar rutas y evitar restricciones de algunos navegadores con `file://`):

```bash
# Con Python
python3 -m http.server 8080

# Con Node
npx serve .
```

Luego visita `http://localhost:8080`.

## Desplegar en Netlify

**Opción A — Arrastrar y soltar:**
1. Ingresa a [app.netlify.com](https://app.netlify.com/).
2. Arrastra la carpeta completa del proyecto al panel de "Deploys".
3. Netlify publicará el sitio automáticamente.

**Opción B — Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

**Opción C — Git:**
1. Sube el proyecto a un repositorio (GitHub, GitLab, etc.).
2. En Netlify, elige "Import from Git" y selecciona el repositorio.
3. Build command: (ninguno). Publish directory: `.` (raíz).

### Antes de publicar en producción

1. Reemplaza `https://www.inmobiliariasv.com/` por el dominio real en:
   - `index.html` (`canonical`, `og:url`, JSON-LD `url`)
   - `robots.txt` (línea `Sitemap:`)
   - `sitemap.xml` (`<loc>`)
2. Agrega una imagen `og:image` (1200×630 px) si se desea vista previa al compartir en redes sociales; actualmente no se incluye una para no usar imágenes genéricas o inventadas.
3. Verifica que el número de WhatsApp (`76001135`) y teléfono sean correctos.
4. Si se define una dirección física, horario de atención, redes sociales o años de experiencia reales, agrégalos manualmente — actualmente no se muestran porque no fueron proporcionados (ver `MEMORIA_DEL_PROYECTO`).

## Desplegar en GitHub Pages (pruebas)

1. Sube el contenido de esta carpeta a un repositorio de GitHub.
2. Ve a **Settings → Pages**.
3. En "Source", selecciona la rama principal y la carpeta raíz (`/`).
4. GitHub Pages publicará el sitio en unos minutos.

## Checklist SEO

- [x] `<title>` único orientado a intención de búsqueda y marca
- [x] Meta description orientada a clics
- [x] `canonical`
- [x] `meta robots` (index, follow)
- [x] Open Graph (title, description, type, locale, site_name, url)
- [x] Twitter Card (summary)
- [x] `theme-color` y favicon
- [x] Un solo `<h1>` en toda la página
- [x] Jerarquía de encabezados H2/H3 coherente
- [x] HTML5 semántico (`header`, `main`, `section`, `footer`, `nav`)
- [x] `alt` en imágenes (los SVG decorativos usan `aria-hidden="true"`)
- [x] JSON-LD: `RealEstateAgent`, `WebSite`, `FAQPage`
- [x] `robots.txt` y `sitemap.xml`
- [x] Palabras clave integradas de forma natural (sin keyword stuffing)
- [x] Contenido local: los 14 departamentos de El Salvador mencionados de forma natural
- [x] Enlaces internos entre secciones (ancla de navegación)
- [x] Sin datos inventados (dirección, reseñas, años de experiencia, etc.)

## Checklist de pruebas

### HTML
- [x] Estructura válida, un solo `<h1>`
- [x] Etiquetas semánticas correctas
- [x] Enlaces internos (`#comprar`, `#vender`, `#alquilar`, `#formulario`, etc.) funcionando

### CSS
- [x] Responsive: móvil, tablet, escritorio, pantallas grandes
- [x] Sin desbordamientos horizontales
- [x] `prefers-reduced-motion` respetado

### JavaScript
- [x] Menú móvil (abrir/cerrar, `Esc`, `aria-expanded`)
- [x] Formulario con validación (nombre y teléfono requeridos)
- [x] Formulario genera mensaje de WhatsApp dinámico según pestaña (Comprar/Vender/Alquilar/Publicar)
- [x] Todos los botones de WhatsApp usan mensajes contextuales según la sección
- [x] Botón flotante de WhatsApp visible en móvil y escritorio

### SEO técnico
- [x] `title`, `description`, `canonical`, `robots`
- [x] `sitemap.xml`, `robots.txt`
- [x] JSON-LD válido (verificar en [Rich Results Test](https://search.google.com/test/rich-results) al publicar)
- [x] Open Graph / Twitter Cards
- [x] Encabezados y `alt` correctos

### Conversión
- [x] CTA principal: WhatsApp
- [x] CTAs secundarios: Comprar / Vender / Alquilar / Publicar / Asesoría
- [x] Todos los mensajes de WhatsApp son contextuales y distintos según el botón

### Rendimiento
- [x] Sin librerías externas de JavaScript (JS vanilla)
- [x] Sin imágenes pesadas (SVG inline, ligero)
- [x] CSS y JS en archivos separados y minificables
- [x] Fuentes cargadas con `preconnect` y `font-display: swap`

## Notas importantes

- **No se inventó ninguna información.** Dirección física, horarios, redes sociales, años de experiencia, número de clientes, certificaciones y testimonios no se muestran porque no fueron proporcionados por el negocio. Si se cuenta con esos datos, pueden añadirse fácilmente en `index.html` (footer y sección de contacto) y en el JSON-LD.
- **Imágenes de propiedades:** el proyecto no incluye fotografías reales de propiedades (no se inventó inventario). Las ilustraciones son SVG originales de carácter decorativo/arquitectónico. Cuando exista un catálogo real de propiedades o fotografías propias, pueden integrarse en las secciones de Comprar/Vender/Alquilar sin modificar la estructura del sitio.
- **Formulario sin backend:** el formulario de contacto no envía datos a ningún servidor; construye un mensaje y abre WhatsApp con el texto ya redactado (`https://wa.me/50376001135?text=...`).
