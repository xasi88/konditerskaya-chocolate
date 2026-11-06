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
  function rub(n) { return n.toLocaleString("ru-RU") + " ₽"; }
  function cena(t) { return t.cena ? rub(t.cena) : "Цена по запросу"; }
  function waSsylka(tekst) { return "https://wa.me/" + D.telefon + (tekst ? "?text=" + encodeURIComponent(tekst) : ""); }
  /* Маленькое фото товара. Фото ещё нет: плашка со значком торта */
  function minifoto(t) {
    return t.foto ? '<img src="img/menu/' + t.foto + '-360.webp" width="64" height="80" alt="' + t.nazv + '" loading="lazy">' :
      '<span class="zagl"><svg aria-hidden="true"><use href="#i-tortik"/></svg></span>';
  }

  /* Данные на странице */
  $$("[data-adres]").forEach(function (el) { el.textContent = "Дуба-Юрт, ул. Кадырова, 123. " + D.chasy; });
  $$("[data-adres-1]").forEach(function (el) { el.textContent = D.adres; });
  $$("[data-chasy]").forEach(function (el) { el.textContent = D.chasy; });
  $$("[data-wa]").forEach(function (el) { el.href = waSsylka("Здравствуйте!"); el.target = "_blank"; el.rel = "noopener"; });
  $$("[data-wa-tekst]").forEach(function (el) { el.href = waSsylka(el.dataset.waTekst); el.target = "_blank"; el.rel = "noopener"; });
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

  /* Десерты: группы и строки */
  function knopkaTovara(id) {
    var n = korzina[id] || 0, nazv = poId[id].nazv;
    if (!n) return '<button type="button" class="v-korz" data-plus="' + id + '" aria-label="В корзину: ' + nazv + '"><svg><use href="#i-plus"/></svg>В корзину</button>';
    return '<div class="shag"><button type="button" data-minus="' + id + '" aria-label="Меньше: ' + nazv + '"><svg><use href="#i-minus"/></svg></button>' +
      '<output>' + n + ' шт.</output><button type="button" data-plus="' + id + '" aria-label="Больше: ' + nazv + '"><svg><use href="#i-plus"/></svg></button></div>';
  }
  function stroka(t, sFoto) {
    return '<article class="str pojav">' + (sFoto ? minifoto(t) : "") + '<div class="str-t"><h4>' + t.nazv + "</h4>" + (t.opis ? '<p class="opis">' + t.opis + "</p>" : "") +
      '<div class="str-niz"><span class="cena">' + cena(t) + '</span><div class="tovar-kn" data-kn="' + t.id + '">' + knopkaTovara(t.id) + "</div></div></div></article>";
  }
  /* В группе нет ни одного фото: короткие строки без плашек. Придёт фото: плашки вернутся сами */
  $(".gruppy").innerHTML = D.gruppy.map(function (g) {
    var ryad = D.deserty.filter(function (t) { return t.gr === g.id; });
    var sFoto = ryad.some(function (t) { return t.foto; });
    return '<div class="gruppa" id="gr-' + g.id + '"><h3>' + g.nazv + '</h3><div class="spisok' + (sFoto ? "" : " bez-foto") + '">' +
      ryad.map(function (t) { return stroka(t, sFoto); }).join("") + "</div></div>";
  }).join("");

  /* Начинки тортов: кнопка открывает заявку с этой начинкой */
  $(".nach-spisok").innerHTML = D.nachinki.map(function (n) {
    return '<article class="nach pojav"><h4>' + n.nazv + "</h4><ul>" + n.sloi.map(function (s) { return "<li>" + s + "</li>"; }).join("") + "</ul>" +
      (n.primech ? '<p class="mel">' + n.primech + "</p>" : "") +
      '<button type="button" class="kn" data-nachinka="' + n.nazv + '">Заказать с этой начинкой</button></article>';
  }).join("");
  $(".eshche-spisok").innerHTML = D.eshche.map(function (n) {
    return '<button type="button" class="pojav" data-nachinka="' + n + '"><span>' + n + '</span><svg aria-hidden="true"><use href="#i-plus"/></svg></button>';
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
  /* Сумма корзины. Есть товар без цены: null, сумму не показываем */
  function summa() {
    var s = 0, vse = true;
    Object.keys(korzina).forEach(function (id) { if (poId[id].cena) s += poId[id].cena * korzina[id]; else vse = false; });
    return vse ? s : null;
  }
  function risovatKorzinu() {
    var ids = D.deserty.map(function (t) { return t.id; }).filter(function (id) { return korzina[id]; });
    $(".korz-spisok").innerHTML = ids.length ? ids.map(function (id) {
      var t = poId[id];
      return '<div class="korz-str">' + minifoto(t) + '<div><b>' + t.nazv + '</b><div class="mel">' + cena(t) +
        '</div></div><div class="tovar-kn" data-kn="' + id + '">' + knopkaTovara(id) + "</div></div>";
    }).join("") : '<p class="korz-pusto">Корзина пуста. Добавьте десерты из меню или закажите торт.</p>';
    $("[data-otpravit-korz]").hidden = !ids.length;
    var s = summa(), itog = $(".korz-itog");
    itog.hidden = !ids.length || s === null;
    if (s !== null) $("b", itog).textContent = rub(s);
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
    var stroki = D.deserty.filter(function (t) { return korzina[t.id]; }).map(function (t) {
      return "• " + t.nazv + ": " + korzina[t.id] + " шт." + (t.cena ? ", " + rub(t.cena * korzina[t.id]) : "");
    });
    if (!stroki.length) return;
    var s = summa();
    var tekst = "Здравствуйте! Хочу заказать:\n" + stroki.join("\n") + (s !== null ? "\nИтого: " + rub(s) : "") +
      "\n\n" + (s !== null ? "Есть ли это в наличии?" : "Есть ли это в наличии и сколько будет стоить?") + (imya ? "\nМеня зовут " + imya + "." : "");
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
  var poleNach = forma.elements.nachinka;
  D.nachinki.map(function (n) { return n.nazv; }).concat(D.eshche).forEach(function (n) { poleNach.add(new Option(n, n)); });
  /* Срок и поля торта зависят от того, что заказывают */
  var SROK = { "Торт": "Торт заказывайте за день.", "Бенто-торт": "Бенто-торт готовим за 2 часа.", "Фуршет": "" };
  function tipNadpis() {
    var tip = forma.elements.tip.value;
    $$("[data-tolko-tort]").forEach(function (el) { el.hidden = tip === "Фуршет"; });
    var srok = $("[data-srok]"); srok.textContent = SROK[tip] || ""; srok.hidden = !SROK[tip];
  }
  $$('input[name="tip"]').forEach(function (r) { r.addEventListener("change", tipNadpis); });
  tipNadpis();
  $(".primer-x").addEventListener("click", function () { pokazatPrimer(null); });
  forma.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!poleData.value) { poleData.focus(); tost("Укажите дату"); return; }
    var f = forma.elements, tip = f.tip.value;
    var data = new Date(poleData.value + "T12:00").toLocaleDateString("ru-RU", { weekday: "long", day: "numeric", month: "long" });
    var s = [tip === "Фуршет" ? "Здравствуйте! Хочу обсудить сладкий стол (фуршет)." : "Здравствуйте! Хочу заказать " + tip.toLowerCase() + "."];
    if (primer) s.push("Как на фото: https://www.instagram.com/p/" + primer.post + "/");
    var nach = tip !== "Фуршет" ? f.nachinka.value : "";
    if (nach) s.push("Начинка: " + nach);
    s.push("Дата: " + data + (f.vremya.value ? ", к " + f.vremya.value : ""));
    if (f.gosti.value) s.push("Гостей: " + f.gosti.value);
    if (tip !== "Фуршет" && f.nadpis.value.trim()) s.push("Надпись: «" + f.nadpis.value.trim() + "»");
    if (f.pozh.value.trim()) s.push("Пожелания: " + f.pozh.value.trim());
    s.push("", tip === "Фуршет" ? "Подскажите, пожалуйста, что можно собрать и сколько это будет стоить." : (nach ? "Подскажите, пожалуйста, вес и цену." : "Подскажите, пожалуйста, вес, начинку и цену."));
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
    var b = e.target.closest("[data-otkryt]"), t = e.target.closest("[data-tort]"), n = e.target.closest("[data-nachinka]");
    if (n) {
      pokazatPrimer(null);
      $$('input[name="tip"]').forEach(function (r) { r.checked = r.value === "Торт"; });
      poleNach.value = n.dataset.nachinka;
      tipNadpis();
      otkryt("zakaz");
    }
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
