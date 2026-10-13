/* =========================================================
   INMOBILIARIA SV — script.js
   Vanilla JS. Sin dependencias externas.
   ========================================================= */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "50376001135";

  var WA_MESSAGES = {
    general: "Hola, me gustaría recibir información sobre los servicios de Inmobiliaria SV.",
    comprar: "Hola, estoy interesado(a) en comprar una propiedad en El Salvador. Me gustaría recibir información sobre las propiedades disponibles.",
    vender: "Hola, quiero vender mi propiedad en El Salvador y me gustaría recibir asesoría.",
    alquilar: "Hola, estoy interesado(a) en alquilar una propiedad en El Salvador. Me gustaría conocer las opciones disponibles.",
    publicar: "Hola, quiero publicar mi propiedad para venta o alquiler. Me gustaría recibir información."
  };

  function buildWaUrl(message) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
  }

  /* ---------- Enlaces WhatsApp contextuales ---------- */
  function initWhatsAppLinks() {
    var links = document.querySelectorAll(".js-wa[data-wa-context]");
    links.forEach(function (link) {
      var context = link.getAttribute("data-wa-context") || "general";
      var message = WA_MESSAGES[context] || WA_MESSAGES.general;
      link.setAttribute("href", buildWaUrl(message));
    });
  }

  /* ---------- Año en el footer ---------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) { el.textContent = new Date().getFullYear(); }
  }

  /* ---------- Menú móvil ---------- */
  function initMobileMenu() {
    var toggle = document.getElementById("nav-toggle");
    var menu = document.getElementById("mobile-menu");
    if (!toggle || !menu) { return; }

    function closeMenu() {
      menu.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
    function openMenu() {
      menu.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    }

    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.contains("is-open");
      if (isOpen) { closeMenu(); } else { openMenu(); }
    });

    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeMenu(); }
    });
  }

  /* ---------- Header offset para anchors (evita que el header sticky tape el título) ---------- */
  function initAnchorOffset() {
    var header = document.querySelector(".site-header");
    if (!header) { return; }
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        var id = link.getAttribute("href");
        if (!id || id === "#") { return; }
        var target = document.querySelector(id);
        if (!target) { return; }
        e.preventDefault();
        var headerHeight = header.offsetHeight;
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 12;
        window.scrollTo({ top: top, behavior: "smooth" });
        history.pushState(null, "", id);
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) { return; }

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { observer.observe(el); });

    // Salvaguarda: si por alguna razón un elemento nunca entra en el
    // viewport (ej. layouts poco comunes), se revela igualmente tras un
    // tiempo prudente para que el contenido nunca quede oculto.
    window.setTimeout(function () {
      items.forEach(function (el) { el.classList.add("is-visible"); });
    }, 2500);
  }

  /* ---------- Formulario de contacto (tabs + WhatsApp) ---------- */
  var TAB_FIELD_LABEL = {
    comprar: "Comprar",
    vender: "Vender",
    alquilar: "Alquilar",
    publicar: "Publicar propiedad"
  };

  function initLeadForm() {
    var form = document.getElementById("lead-form");
    if (!form) { return; }

    var tabButtons = document.querySelectorAll(".tab-btn[data-tab]");
    var fieldGroups = form.querySelectorAll("[data-field-group]");
    var currentTab = "comprar";

    function applyTab(tab) {
      currentTab = tab;
      tabButtons.forEach(function (btn) {
        var active = btn.getAttribute("data-tab") === tab;
        btn.setAttribute("aria-selected", active ? "true" : "false");
      });
      fieldGroups.forEach(function (group) {
        var groups = (group.getAttribute("data-field-group") || "").split(" ");
        if (groups.indexOf(tab) !== -1) {
          group.classList.add("is-active");
        } else {
          group.classList.remove("is-active");
        }
      });
    }

    tabButtons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        applyTab(btn.getAttribute("data-tab"));
      });
    });

    applyTab(currentTab);

    // Permitir que enlaces externos (hero, secciones) preseleccionen la pestaña
    document.querySelectorAll("[data-form-tab]").forEach(function (el) {
      el.addEventListener("click", function () {
        applyTab(el.getAttribute("data-form-tab"));
      });
    });

    var nombreInput = document.getElementById("f-nombre");
    var telefonoInput = document.getElementById("f-telefono");
    var errNombre = document.getElementById("err-nombre");
    var errTelefono = document.getElementById("err-telefono");

    function validate() {
      var valid = true;
      errNombre.textContent = "";
      errTelefono.textContent = "";
      nombreInput.removeAttribute("aria-invalid");
      telefonoInput.removeAttribute("aria-invalid");

      if (!nombreInput.value.trim()) {
        errNombre.textContent = "Por favor ingresa tu nombre.";
        nombreInput.setAttribute("aria-invalid", "true");
        valid = false;
      }

      var phoneDigits = telefonoInput.value.replace(/\D/g, "");
      if (!phoneDigits || phoneDigits.length < 8) {
        errTelefono.textContent = "Ingresa un número de teléfono válido.";
        telefonoInput.setAttribute("aria-invalid", "true");
        valid = false;
      }

      return valid;
    }

    function buildMessage() {
      var nombre = nombreInput.value.trim();
      var telefono = telefonoInput.value.trim();
      var zona = (document.getElementById("f-zona").value || "").trim();
      var mensaje = (document.getElementById("f-mensaje").value || "").trim();
      var tipoPropiedad = "";
      var presupuesto = "";
      var operacionPublicar = "";

      var tipoField = document.getElementById("f-tipo");
      var presupuestoField = document.getElementById("f-presupuesto");
      var operacionField = document.getElementById("f-operacion");

      if (tipoField) { tipoPropiedad = tipoField.value; }
      if (presupuestoField) { presupuesto = presupuestoField.value.trim(); }
      if (operacionField) { operacionPublicar = operacionField.value; }

      var operacionLabel = TAB_FIELD_LABEL[currentTab] || "Consulta";

      var partes = [];
      partes.push("Hola, soy " + nombre + ".");

      if (currentTab === "comprar") {
        partes.push("Estoy interesado(a) en comprar una propiedad en El Salvador.");
      } else if (currentTab === "vender") {
        partes.push("Quiero vender mi propiedad en El Salvador y me gustaría recibir asesoría.");
      } else if (currentTab === "alquilar") {
        partes.push("Estoy interesado(a) en alquilar una propiedad en El Salvador.");
      } else if (currentTab === "publicar") {
        partes.push("Quiero publicar mi propiedad para venta o alquiler.");
      }

      if (tipoPropiedad) { partes.push("Tipo de propiedad: " + tipoPropiedad + "."); }
      if (currentTab === "publicar" && operacionPublicar) { partes.push("Operación: " + operacionPublicar + "."); }
      if (zona) { partes.push("Zona de interés: " + zona + "."); }
      if (presupuesto) { partes.push("Presupuesto aproximado: " + presupuesto + "."); }
      partes.push("Mi teléfono es " + telefono + ".");
      if (mensaje) { partes.push("Mensaje adicional: " + mensaje); }

      return partes.join(" ");
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) {
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) { firstInvalid.focus(); }
        return;
      }
      var message = buildMessage();
      var url = buildWaUrl(message);
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    initWhatsAppLinks();
    initYear();
    initMobileMenu();
    initAnchorOffset();
    initReveal();
    initLeadForm();
  });
})();
