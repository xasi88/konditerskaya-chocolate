/* Меню кондитерской Chocolate: десерты, корзина, заказ торта, связь. Данные: js/menu.js */
(function () {
  "use strict";
  var D = window.CHOC;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var KLYUCH = "choc-korzina", KLYUCH_IMYA = "choc-imya";

  /* Память браузера: без неё страница тоже работает */
  function chitat(k, zapas) { try { var v = localStorage.getItem(k); return v ? JSON.parse(v) : zapas; } catch (e) { return zapas; } }
  function pisat(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }

  var korzina = chitat(KLYUCH, {});
  var poId = {};
  D.deserty.forEach(function (t) { poId[t.id] = t; });
  Object.keys(korzina).forEach(function (id) { if (!poId[id] || !(korzina[id] > 0)) delete korzina[id]; });

  function foto(id, alt, lenivo) {
    return '<img src="img/menu/' + id + '-360.webp" srcset="img/menu/' + id + '-360.webp 360w, img/menu/' + id +
      '-720.webp 720w" sizes="(min-width:900px) 280px, 50vw" width="360" height="450" alt="' + alt + '"' +
      (lenivo ? ' loading="lazy"' : "") + ">";
  }
  function cena(t) { return t.cena ? t.cena.toLocaleString("ru-RU") + " ₽" : "Цена по запросу"; }
  function waSsylka(tekst) { return "https://wa.me/" + D.telefon + (tekst ? "?text=" + encodeURIComponent(tekst) : ""); }

  /* Данные на странице */
  $$("[data-adres]").forEach(function (el) { el.textContent = "Дуба-Юрт, ул. Кадырова, 123. " + D.chasy; });
  $$("[data-adres-1]").forEach(function (el) { el.textContent = D.adres; });
  $$("[data-chasy]").forEach(function (el) { el.textContent = D.chasy; });
  $$("[data-wa]").forEach(function (el) { el.href = waSsylka("Здравствуйте!"); el.target = "_blank"; el.rel = "noopener"; });
  var svyaz = '<a href="' + waSsylka("Здравствуйте!") + '" target="_blank" rel="noopener"><svg><use href="#i-wa"/></svg>WhatsApp</a>' +
    '<a href="tel:+' + D.telefon + '"><svg><use href="#i-tel"/></svg>Позвонить</a>' +
    '<a href="' + D.karta + '" target="_blank" rel="noopener"><svg><use href="#i-karta"/></svg>Маршрут</a>' +
    '<a href="' + D.instagram + '" target="_blank" rel="noopener"><svg><use href="#i-insta"/></svg>Instagram</a>';
  $$(".svyaz-knopki").forEach(function (el) { el.innerHTML = svyaz; });

  /* Веер тортов */
  var veer = $(".veer"), poryadok = D.veer.slice();
  veer.innerHTML = poryadok.map(function (id) { return '<img src="img/menu/' + id + '-720.webp" alt="" data-id="' + id + '">'; }).join("");
  function rasstavit() {
    $$("img", veer).forEach(function (im) { im.className = "p" + poryadok.indexOf(im.dataset.id); });
  }
  rasstavit();
  requestAnimationFrame(function () { setTimeout(function () { veer.classList.add("otkryt"); }, 150); });
  veer.addEventListener("click", function () { poryadok.push(poryadok.shift()); rasstavit(); });

  /* Десерты */
  var tovary = $(".tovary");
  function knopkaTovara(id) {
    var n = korzina[id] || 0;
    if (!n) return '<button type="button" class="v-korz" data-plus="' + id + '"><svg><use href="#i-plus"/></svg>В корзину</button>';
    return '<div class="shag"><button type="button" data-minus="' + id + '" aria-label="Меньше"><svg><use href="#i-minus"/></svg></button>' +
      '<output>' + n + ' шт.</output><button type="button" data-plus="' + id + '" aria-label="Больше"><svg><use href="#i-plus"/></svg></button></div>';
  }
  tovary.innerHTML = D.deserty.map(function (t) {
    return '<article class="tovar pojav">' + foto(t.id, t.nazv, true) + "<h3>" + t.nazv + '</h3><p class="opis">' + t.opis +
      '</p><p class="cena">' + cena(t) + '</p><div class="tovar-kn" data-kn="' + t.id + '">' + knopkaTovara(t.id) + "</div></article>";
  }).join("");

  /* Торты */
  var galereya = $(".galereya");
  galereya.innerHTML = D.torty.map(function (t) {
    return '<button type="button" class="tort pojav" data-tort="' + t.id + '">' + foto(t.id, "Торт: " + t.nazv, true) + "<span>" + t.nazv + "</span></button>";
  }).join("");

  /* Корзина */
  function vsego() { return Object.keys(korzina).reduce(function (s, id) { return s + korzina[id]; }, 0); }
  function obnovit(id, prygnut) {
    pisat(KLYUCH, korzina);
    if (id) { var m = $('[data-kn="' + id + '"]'); if (m) m.innerHTML = knopkaTovara(id); }
    var n = vsego();
    $$(".schet").forEach(function (el) {
      el.textContent = n; el.hidden = !n;
      if (prygnut) { el.classList.remove("prygnul"); void el.offsetWidth; el.classList.add("prygnul"); }
    });
    if ($("#korzina").open) risovatKorzinu();
  }
  function izmenit(id, d) {
    var n = Math.max(0, Math.min(99, (korzina[id] || 0) + d));
    if (n) korzina[id] = n; else delete korzina[id];
    obnovit(id, d > 0);
    if (d > 0 && n === 1) tost("Добавлено в корзину");
  }
  function risovatKorzinu() {
    var ids = D.deserty.map(function (t) { return t.id; }).filter(function (id) { return korzina[id]; });
    $(".korz-spisok").innerHTML = ids.length ? ids.map(function (id) {
      var t = poId[id];
      return '<div class="korz-str"><img src="img/menu/' + id + '-360.webp" alt=""><div><b>' + t.nazv + '</b><div class="mel">' + cena(t) +
        '</div></div><div class="tovar-kn" data-kn="' + id + '">' + knopkaTovara(id) + "</div></div>";
    }).join("") : '<p class="korz-pusto">Корзина пуста. Добавьте десерты из меню или закажите торт.</p>';
    $("[data-otpravit-korz]").hidden = !ids.length;
  }
  document.addEventListener("click", function (e) {
    var p = e.target.closest("[data-plus]"), m = e.target.closest("[data-minus]");
    if (p) izmenit(p.dataset.plus, 1);
    if (m) izmenit(m.dataset.minus, -1);
  });

  /* Имя одно на оба листа */
  var imya = chitat(KLYUCH_IMYA, "");
  $$('input[name="imya"]').forEach(function (el) {
    el.value = imya;
    el.addEventListener("input", function () { imya = el.value.trim(); pisat(KLYUCH_IMYA, imya); $$('input[name="imya"]').forEach(function (o) { if (o !== el) o.value = el.value; }); });
  });

  $("[data-otpravit-korz]").addEventListener("click", function () {
    var stroki = D.deserty.filter(function (t) { return korzina[t.id]; }).map(function (t) { return "• " + t.nazv + ": " + korzina[t.id] + " шт."; });
    if (!stroki.length) return;
    var tekst = "Здравствуйте! Хочу заказать:\n" + stroki.join("\n") + "\n\nЕсть ли это в наличии и сколько будет стоить?" + (imya ? "\nМеня зовут " + imya + "." : "");
    window.open(waSsylka(tekst), "_blank", "noopener");
  });

  /* Заказ на дату */
  var forma = $(".zakaz-forma"), primer = null;
  var poleData = forma.elements.data;
  var segodnya = new Date(); segodnya.setMinutes(segodnya.getMinutes() - segodnya.getTimezoneOffset());
  poleData.min = segodnya.toISOString().slice(0, 10);
  function pokazatPrimer(id) {
    primer = null;
    D.torty.forEach(function (t) { if (t.id === id) primer = t; });
    var blok = $(".primer");
    blok.hidden = !primer;
    if (primer) { $("img", blok).src = "img/menu/" + primer.id + "-360.webp"; $("b", blok).textContent = primer.nazv; }
  }
  function tipNadpis() { $("[data-nadpis]").hidden = forma.elements.tip.value === "Фуршет"; }
  $$('input[name="tip"]').forEach(function (r) { r.addEventListener("change", tipNadpis); });
  $(".primer-x").addEventListener("click", function () { pokazatPrimer(null); });
  forma.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!poleData.value) { poleData.focus(); tost("Укажите дату"); return; }
    var f = forma.elements, tip = f.tip.value;
    var data = new Date(poleData.value + "T12:00").toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" });
    var s = [tip === "Фуршет" ? "Здравствуйте! Хочу обсудить сладкий стол (фуршет)." : "Здравствуйте! Хочу заказать " + tip.toLowerCase() + "."];
    if (primer) s.push("Как на фото: https://www.instagram.com/p/" + primer.post + "/");
    s.push("Дата: " + data + (f.vremya.value ? ", к " + f.vremya.value : ""));
    if (f.gosti.value) s.push("Гостей: " + f.gosti.value);
    if (tip !== "Фуршет" && f.nadpis.value.trim()) s.push("Надпись: «" + f.nadpis.value.trim() + "»");
    if (f.pozh.value.trim()) s.push("Пожелания: " + f.pozh.value.trim());
    s.push("", tip === "Фуршет" ? "Подскажите, пожалуйста, что можно собрать и сколько это будет стоить." : "Подскажите, пожалуйста, вес, начинку и цену.");
    if (imya) s.push("Меня зовут " + imya + ".");
    window.open(waSsylka(s.join("\n")), "_blank", "noopener");
  });

  /* Листы и кнопка «назад» */
  /* Открытый лист пишет один шаг в историю (shag). «Назад» убирает только свой шаг и не уводит со страницы. */
  var otkrytyj = null, shag = false;
  function otkryt(id) {
    var l = document.getElementById(id);
    if (otkrytyj && otkrytyj !== l) { var staryj = otkrytyj; otkrytyj = null; staryj.close(); }
    if (!shag) { history.pushState({ list: 1 }, ""); shag = true; }
    if (id === "korzina") risovatKorzinu();
    if (!l.open) l.showModal();
    otkrytyj = l;
    $$(".niz [data-otkryt]").forEach(function (b) { b.classList.toggle("akt", b.dataset.otkryt === id); });
  }
  function zakryt() {
    if (!otkrytyj) return;
    var l = otkrytyj; otkrytyj = null; l.close();
    if (shag) { shag = false; history.back(); }
  }
  $$(".list").forEach(function (l) {
    l.addEventListener("close", function () { if (otkrytyj === l) otkrytyj = null; $$(".niz .akt").forEach(function (b) { b.classList.remove("akt"); }); });
    l.addEventListener("click", function (e) { if (e.target === l) zakryt(); });
    l.addEventListener("cancel", function (e) { e.preventDefault(); zakryt(); });
  });
  $$(".zakryt").forEach(function (b) { b.addEventListener("click", zakryt); });
  window.addEventListener("popstate", function () {
    if (!shag) return;
    shag = false;
    if (otkrytyj) { var l = otkrytyj; otkrytyj = null; l.close(); }
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-otkryt]"), t = e.target.closest("[data-tort]");
    if (b) {
      if (b.dataset.otkryt === "zakaz") {
        pokazatPrimer(null);
        var tip = b.dataset.tip || "Торт";
        $$('input[name="tip"]').forEach(function (r) { r.checked = r.value === tip; });
        tipNadpis();
      }
      otkryt(b.dataset.otkryt);
    }
    if (t) {
      pokazatPrimer(t.dataset.tort);
      $$('input[name="tip"]').forEach(function (r) { r.checked = r.value === (t.dataset.tort === "bento" ? "Бенто-торт" : "Торт"); });
      tipNadpis();
      otkryt("zakaz");
    }
  });

  /* Подсказка внизу */
  var tostEl = $(".tost"), tostTaimer;
  function tost(t) { tostEl.textContent = t; tostEl.classList.add("vid"); clearTimeout(tostTaimer); tostTaimer = setTimeout(function () { tostEl.classList.remove("vid"); }, 1800); }

  /* Появление при прокрутке */
  if ("IntersectionObserver" in window) {
    var nab = new IntersectionObserver(function (zap) {
      zap.forEach(function (z) { if (z.isIntersecting) { z.target.classList.add("vid"); nab.unobserve(z.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".pojav").forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 60 + "ms"; nab.observe(el); });
  } else { $$(".pojav").forEach(function (el) { el.classList.add("vid"); }); }

  obnovit();
})();
