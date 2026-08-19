const trip = {
  title: "20-29 октября: Пекин - Чжанцзяцзе - Шанхай",
  inboundText: "Вылет 19 октября, прилет 20 октября",
  outboundText: "Вылет 29 октября или утром 30 октября",
  inboundLink: "https://www.aviasales.ru/search/MOW1910BJS1",
  outboundLink: "https://www.aviasales.ru/search/SHA2910MOW1",
  start: new Date(2026, 9, 20),
};

const days = [
  {
    city: "Пекин",
    title: "Первый вечер в Пекине",
    image: "assets/photos/beijing.png",
    items: ["Прилет и заселение", "Спокойная прогулка по хутунам", "Озера Шичахай", "Ужин с уткой по-пекински"],
  },
  {
    city: "Пекин",
    title: "Главные символы столицы",
    image: "assets/photos/beijing.png",
    items: ["Площадь Тяньаньмэнь", "Запретный город", "Парк Цзиншань с видом на дворцы", "Вечерняя прогулка по Wangfujing"],
  },
  {
    city: "Пекин",
    title: "Великая Китайская стена",
    image: "assets/photos/great-wall.png",
    items: ["Участок Мутяньюй", "Подъем на стену и прогулка по башням", "Возвращение в Пекин", "Ранний сон перед перелетом"],
  },
  {
    city: "Пекин → Чжанцзяцзе",
    title: "Перелет к горам",
    image: "assets/photos/zhangjiajie.png",
    items: ["Перелет Пекин - Чжанцзяцзе", "Заселение в Wulingyuan или рядом с входом в парк", "Легкая прогулка по району", "Ужин с видом на горы"],
  },
  {
    city: "Чжанцзяцзе",
    title: "Горы Аватара",
    image: "assets/photos/zhangjiajie.png",
    items: ["Национальный лесной парк", "Лифт Байлун", "Юаньцзяцзе и каменные столбы", "Маршрут с видовыми площадками"],
  },
  {
    city: "Чжанцзяцзе",
    title: "Тяньцзышань и прогулки без спешки",
    image: "assets/photos/zhangjiajie.png",
    items: ["Вторая часть национального парка", "Тяньцзышань", "Ручей Золотой кнут или спокойная тропа у воды", "Вечер на террасе или прогулка рядом с отелем"],
  },
  {
    city: "Чжанцзяцзе",
    title: "Тяньмэньшань и стеклянные тропы",
    image: "assets/photos/zhangjiajie.png",
    items: ["Канатная дорога на Тяньмэньшань", "Дорога 99 поворотов", "Стеклянная тропа по скале", "Вечер отдыха после активного дня"],
  },
  {
    city: "Чжанцзяцзе → Шанхай",
    title: "Перелет в современный Китай",
    image: "assets/photos/shanghai.png",
    items: ["Перелет Чжанцзяцзе - Шанхай", "Заселение", "Набережная Бунд", "Первый вид на Пудун вечером"],
  },
  {
    city: "Шанхай",
    title: "Старый город, еда и Французская концессия",
    image: "assets/photos/shanghai.png",
    items: ["Завтрак с xiaolongbao", "Сад Юйюань и старый город", "Французская концессия", "Tianzifang или Xintiandi вечером"],
  },
  {
    city: "Шанхай",
    title: "Финальный день",
    image: "assets/photos/shanghai.png",
    items: ["Свободное утро", "Музей, кофейни или шопинг", "Трансфер в аэропорт", "Вылет домой или дополнительная ночь"],
  },
];

const fallbackImage = "assets/photos/great-wall.png";
const monthNames = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
const timeline = document.querySelector("#timeline");
const detail = document.querySelector("#day-detail");
const tripTitle = document.querySelector("#trip-title");
const inboundDate = document.querySelector("#inbound-date");
const outboundDate = document.querySelector("#outbound-date");
const inboundLink = document.querySelector("#inbound-link");
const outboundLink = document.querySelector("#outbound-link");
const mapPointsContainer = document.querySelector("#map-points");
const mapCard = document.querySelector("#map-card");
let activeDay = 0;
let activeMapPoint = 0;

const mapPoints = [
  {
    place: "Пекин",
    dates: "20-23 октября",
    x: 69.6,
    y: 38.6,
    image: "assets/photos/great-wall.png",
    route: "Три дня на исторический старт: хутуны, Запретный город, Храм Неба или Летний дворец и Великая стена.",
    move: "23 октября: перелет в Чжанцзяцзе.",
  },
  {
    place: "Чжанцзяцзе",
    dates: "23-27 октября",
    x: 60.5,
    y: 68.9,
    image: "assets/photos/zhangjiajie.png",
    route: "Четыре ночи на природу и активность: национальный парк, каменные столбы, Тяньцзышань, Тяньмэньшань, канатки и стеклянные тропы.",
    move: "27 октября: перелет в Шанхай.",
  },
  {
    place: "Шанхай",
    dates: "27-29 октября",
    x: 77.8,
    y: 63,
    image: "assets/photos/shanghai.png",
    route: "Финальная база маршрута: Бунд, Пудун, сад Юйюань, Французская концессия и удобный вылет домой.",
    move: "29 октября: вылет домой или дополнительная ночь перед утренним рейсом.",
  },
];

const hotels = [
  {
    city: "Пекин",
    nights: 3,
    dates: "20-23 октября",
    area: "Dongcheng или Wangfujing",
    note: "Удобно для Запретного города, хутунов и вечерних прогулок.",
    image: "assets/photos/hotel-beijing.png",
    share: 24,
  },
  {
    city: "Чжанцзяцзе",
    nights: 4,
    dates: "23-27 октября",
    area: "Wulingyuan, рядом с входом в парк",
    note: "Главный приоритет: красивый вид из номера или террасы и пеший доступ к прогулкам, кафе и входу в парк.",
    image: "assets/photos/hotel-zhangjiajie.png",
    share: 38,
  },
  {
    city: "Шанхай",
    nights: 2,
    dates: "27-29 октября",
    area: "People's Square, Nanjing Road или French Concession",
    note: "Хорошая база для Бунда, Юйюаня, еды и вечерних прогулок.",
    image: "assets/photos/hotel-shanghai.png",
    share: 20,
  },
];

function formatDate(date) {
  return `${date.getDate()} ${monthNames[date.getMonth()]}`;
}

function getDayDate(index) {
  const date = new Date(trip.start);
  date.setDate(date.getDate() + index);
  return formatDate(date);
}

function renderTimeline() {
  timeline.innerHTML = days
    .map(
      (day, index) => `
        <button class="day-button ${index === activeDay ? "active" : ""}" type="button" data-day="${index}">
          <strong>${getDayDate(index)}</strong>
          <span>${day.city}</span>
        </button>
      `
    )
    .join("");

  timeline.querySelectorAll(".day-button").forEach((button) => {
    button.addEventListener("click", () => {
      activeDay = Number(button.dataset.day);
      renderTimeline();
      renderDetail();
    });
  });
}

function renderDetail() {
  const day = days[activeDay];
  detail.innerHTML = `
    <div class="day-detail__image">
      <img src="${day.image}" alt="${day.title}" />
    </div>
    <div class="day-detail__body">
      <span class="day-kicker">День ${activeDay + 1} / ${getDayDate(activeDay)} / ${day.city}</span>
      <h3>${day.title}</h3>
      <ul>
        ${day.items.map((item) => `<li>${item}</li>`).join("")}
      </ul>
    </div>
  `;
  attachImageFallbacks(detail);
}

function setTrip() {
  tripTitle.textContent = trip.title;
  inboundDate.textContent = trip.inboundText;
  outboundDate.textContent = trip.outboundText;
  inboundLink.href = trip.inboundLink;
  outboundLink.href = trip.outboundLink;

  renderTimeline();
  renderDetail();
}

function renderMapPoints() {
  mapPointsContainer.innerHTML = mapPoints
    .map(
      (point, index) => `
        <button
          class="map-point ${index === activeMapPoint ? "active" : ""}"
          type="button"
          style="--x: ${point.x}%; --y: ${point.y}%"
          data-point="${index}"
          aria-label="${point.place}, ${point.dates}"
        >
          <span>${index + 1}</span>
        </button>
      `
    )
    .join("");

  mapPointsContainer.querySelectorAll(".map-point").forEach((button) => {
    button.addEventListener("click", () => {
      activeMapPoint = Number(button.dataset.point);
      renderMapPoints();
      renderMapCard();
    });
  });
}

function renderMapCard() {
  const point = mapPoints[activeMapPoint];
  mapCard.innerHTML = `
    <div class="map-card__image">
      <img src="${point.image}" alt="${point.place}" />
    </div>
    <div class="map-card__body">
      <span class="day-kicker">Точка ${activeMapPoint + 1} / ${point.dates}</span>
      <h3>${point.place}</h3>
      <p>${point.route}</p>
      <p class="map-move">${point.move}</p>
    </div>
  `;
  attachImageFallbacks(mapCard);
}

function renderHotels() {
  const hotelBudget = Number(document.querySelector("#hotel-cost").value);
  const baseShareTotal = hotels.reduce((sum, hotel) => sum + hotel.share, 0);
  const maxCityCost = Math.max(...hotels.map((hotel) => (hotelBudget * hotel.share) / baseShareTotal));

  document.querySelector("#hotel-total").textContent = formatMoney(hotelBudget);
  document.querySelector("#hotel-visual").innerHTML = hotels
    .map((hotel) => {
      const cityCost = Math.round((hotelBudget * hotel.share) / baseShareTotal / 500) * 500;
      const nightCost = Math.round(cityCost / hotel.nights / 500) * 500;
      const width = Math.max(18, Math.round((cityCost / maxCityCost) * 100));

      return `
        <article class="hotel-card">
          <div class="hotel-card__image">
            <img src="${hotel.image}" alt="${hotel.city}: район для проживания" />
          </div>
          <div class="hotel-card__head">
            <div>
              <span>${hotel.dates}</span>
              <h3>${hotel.city}</h3>
            </div>
            <strong>${hotel.nights} ${hotel.nights === 2 ? "ночи" : "ночи"}</strong>
          </div>
          <div class="hotel-bar" aria-hidden="true">
            <i style="width: ${width}%"></i>
          </div>
          <dl>
            <div>
              <dt>Район</dt>
              <dd>${hotel.area}</dd>
            </div>
            <div>
              <dt>За ночь</dt>
              <dd>${formatMoney(nightCost)}</dd>
            </div>
            <div>
              <dt>Всего</dt>
              <dd>${formatMoney(cityCost)}</dd>
            </div>
          </dl>
          <p>${hotel.note}</p>
        </article>
      `;
    })
    .join("");
  attachImageFallbacks(document.querySelector("#hotel-visual"));
}

const inputs = [
  ["flight-cost", "flight-cost-value"],
  ["hotel-cost", "hotel-cost-value"],
  ["train-cost", "train-cost-value"],
  ["daily-cost", "daily-cost-value"],
];

function formatMoney(value) {
  return `${Number(value).toLocaleString("ru-RU")} ₽`;
}

function updateBudget() {
  const sum = inputs.reduce((total, [inputId]) => total + Number(document.querySelector(`#${inputId}`).value), 0);
  document.querySelector("#budget-total").textContent = formatMoney(sum);

  inputs.forEach(([inputId, outputId]) => {
    document.querySelector(`#${outputId}`).textContent = formatMoney(document.querySelector(`#${inputId}`).value);
  });

  document.querySelectorAll(".ticket-budget-value").forEach((value) => {
    value.textContent = formatMoney(document.querySelector("#flight-cost").value);
  });

  renderHotels();
}

function attachImageFallbacks(scope = document) {
  scope.querySelectorAll("img").forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        if (image.src !== fallbackImage) {
          image.src = fallbackImage;
        }
      },
      { once: true }
    );
  });
}

inputs.forEach(([inputId]) => {
  document.querySelector(`#${inputId}`).addEventListener("input", updateBudget);
});

attachImageFallbacks();
setTrip();
renderMapPoints();
renderMapCard();
updateBudget();
