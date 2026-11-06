/* Данные меню кондитерской Chocolate. Только факты с её страниц (кодекс, «Правила проекта»).
   Цены пока нет: поле cena пустое, на странице «Цена по запросу». Её цену писать числом в рублях.
   post: код поста Instagram, ссылка уходит в заявку «как на фото». */
window.CHOC = {
  telefon: "79380180008",
  telefonVid: "+7 938 018-00-08",
  instagram: "https://www.instagram.com/konditerskaya_chocolate/",
  adres: "с. Дуба-Юрт, ул. Кадырова, 123",
  karta: "https://yandex.ru/maps/?text=" + encodeURIComponent("Чеченская Республика, Дуба-Юрт, улица Кадырова, 123"),
  chasy: "Каждый день с 10:00 до 22:00",

  deserty: [
    { id: "moti", nazv: "Моти", opis: "Японский десерт. Всегда в наличии", cena: null, post: "Dcoukyttb-R" },
    { id: "rulet", nazv: "Меренговый рулет", opis: "С клубникой или с фруктами", cena: null, post: "DYrI9xot3V8" },
    { id: "chizkejk", nazv: "Баскский чизкейк", opis: "Кусочками, в коробке", cena: null, post: "DYpnXUONQUI" },
    { id: "pirozhnye", nazv: "Муссовые пирожные", opis: "В виде фруктов и ягод", cena: null, post: "DXR71iVNRZa" }
  ],

  torty: [
    { id: "tort-malina", nazv: "С малиной", post: "DaIgMNCDW0Q" },
    { id: "tort-golubika", nazv: "Шоколадный с голубикой", post: "DchN8EaNZcf" },
    { id: "tort-klubnika", nazv: "С ягодами в шоколаде", post: "DC9h1m_t6dw" },
    { id: "tort-frukty", nazv: "С фруктами", post: "DYrJMJntxyM" },
    { id: "tort-shokolad", nazv: "Шоколадный с фруктами", post: "DWM3XkINKqP" },
    { id: "tort-yagody", nazv: "С ягодами и шоколадом", post: "DC9hdAbNs7z" },
    { id: "bento", nazv: "Бенто-торт", post: "DXM_FalNZHJ" },
    { id: "tort-milka", nazv: "Торт «Милка»", post: "DYrIxYYNCjT" },
    { id: "tort-nadpis", nazv: "С надписью", post: "DCKVq26SqP6" },
    { id: "tort-zhemchug", nazv: "Белый с жемчугом", post: "Dcea9j-DR_m" },
    { id: "tort-detskij", nazv: "Детский", post: "DaIf-sDjU4G" },
    { id: "tort-pryamougolnyj", nazv: "Большой шоколадный с ягодами", post: "DCKWDfANYSU" }
  ],

  veer: ["tort-golubika", "tort-yagody", "tort-frukty"]
};
