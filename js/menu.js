/* Данные меню кондитерской Chocolate. Только факты от кондитерской (кодекс, «Правила проекта»).
   Цены, начинки и сроки прислала хозяйка Амнат 2026-11-06. Цена числом в рублях; пусто (null): «Цена по запросу».
   foto: имя картинки в img/menu/ (без -360.webp). Нет фото: на странице плашка со значком торта.
   post: код поста Instagram, ссылка уходит в заявку «как на фото». */
window.CHOC = {
  telefon: "79380180008",
  telefonVid: "+7 938 018-00-08",
  instagram: "https://www.instagram.com/konditerskaya_chocolate/",
  adres: "с. Дуба-Юрт, ул. Кадырова, 123",
  karta: "https://yandex.ru/maps/?text=" + encodeURIComponent("Чеченская Республика, Дуба-Юрт, улица Кадырова, 123"),
  chasy: "Каждый день с 10:00 до 22:00",

  gruppy: [
    { id: "deserty", nazv: "Десерты" },
    { id: "pirozhnye", nazv: "Пирожные" },
    { id: "k-chayu", nazv: "К чаю" }
  ],

  deserty: [
    { id: "moti", gr: "deserty", nazv: "Моти", opis: "Японский десерт. Всегда в наличии", cena: 200, foto: "moti" },
    { id: "chizkejk", gr: "deserty", nazv: "Чизкейк Сан-Себастьян", opis: "Кусочками, в коробке", cena: 350, foto: "chizkejk" },
    { id: "rulet", gr: "deserty", nazv: "Меренговый рулет", opis: "С клубникой или с фруктами", cena: 1500, foto: "rulet" },
    { id: "trajfl-malina", gr: "deserty", nazv: "Трайфл с малиной", cena: 400 },
    { id: "trajfl-banan", gr: "deserty", nazv: "Трайфл с бананом", cena: 400 },

    { id: "shokoladnoe", gr: "pirozhnye", nazv: "Шоколадное пирожное", cena: 150 },
    { id: "krasnyj-barhat", gr: "pirozhnye", nazv: "Красный бархат", cena: 150 },
    { id: "malinovyj", gr: "pirozhnye", nazv: "Малиновый", cena: 150 },
    { id: "bananovyj", gr: "pirozhnye", nazv: "Банановый", cena: 150 },
    { id: "milka", gr: "pirozhnye", nazv: "Милка", cena: 150 },
    { id: "rafaello", gr: "pirozhnye", nazv: "Рафаэлло", cena: 150 },
    { id: "pavlova", gr: "pirozhnye", nazv: "Павлова", cena: 150 },
    { id: "korzinki", gr: "pirozhnye", nazv: "Корзинки белковые", cena: 150 },
    { id: "tart-malina", gr: "pirozhnye", nazv: "Малиновый тарт", cena: 150 },
    { id: "eklery", gr: "pirozhnye", nazv: "Эклеры", cena: 150 },
    { id: "ptiche-moloko", gr: "pirozhnye", nazv: "Птичье молоко", cena: 200 },
    { id: "korolevskij", gr: "pirozhnye", nazv: "Королевский", cena: 200 },
    { id: "brauni", gr: "pirozhnye", nazv: "Брауни", cena: 200 },
    { id: "ispanskij", gr: "pirozhnye", nazv: "Испанский", cena: 250 },

    { id: "kolca", gr: "k-chayu", nazv: "Творожные кольца", cena: 100 },
    { id: "shariki", gr: "k-chayu", nazv: "Кокосовые шарики", cena: 100 }
  ],

  /* Начинки тортов: состав от кондитерской. eshche: торты без описания состава. */
  nachinki: [
    { nazv: "Сникерс", sloi: ["Шоколадный шифоновый бисквит", "Крем-чиз", "Карамель", "Арахис", "Сверху молочный шоколад"], primech: "Украшаем ягодами и делаем любую надпись" },
    { nazv: "Фруктовый", sloi: ["Классический белый бисквит", "Крем: сливки со сгущёнкой", "Начинка: банан и малина"] },
    { nazv: "Ореховый", sloi: ["Ореховые коржи", "Масляный крем"] },
    { nazv: "Испанский", sloi: ["Медовые шоколадные коржи", "Крем-чиз на основе маскарпоне"] }
  ],
  eshche: ["Карамельный пирог", "Малиновый тарт с белым шоколадом", "Малиновый тарт с молочным шоколадом", "Королевский", "Птичье молоко", "Красный бархат"],

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
