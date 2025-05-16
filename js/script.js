const MAX_GRAMS = 900;
const STEP = 100;               // шаг в граммах
const MIN_PORTIONS = 1;         // минимальное число «100 г»
const MAX_PORTIONS = MAX_GRAMS / STEP;  // =9

// При загрузке страницы читаем сохранённую аватарку
document.addEventListener('DOMContentLoaded', () => {
  const imgEl   = document.getElementById('account-photo-img');
  const input   = document.getElementById('photo-input');
  const delBtn  = document.getElementById('delete-photo-btn');

  // При старте: если в localStorage есть фото — показываем его и кнопку «Удалить»
  const saved = localStorage.getItem('accountPhoto');
  if (saved) {
    imgEl.src = saved;
    delBtn.style.display = 'inline-block';
  }

  // Клик по «Загрузить фото» делает инпут видимым
  window.uploadPhoto = () => {
    input.click();
  };

  // Обработчик выбора файла
  input.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение.');
      return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
      const dataUrl = e.target.result;
      // Сохраняем в localStorage
      localStorage.setItem('accountPhoto', dataUrl);
      // Ставим в <img> и показываем кнопку удаления
      imgEl.src = dataUrl;
      delBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  });

  // Обработчик удаления фото
  delBtn.addEventListener('click', () => {
    localStorage.removeItem('accountPhoto');
    imgEl.src = 'images/default-avatar.png';
    delBtn.style.display = 'none';
    // Очищаем инпут, чтобы его можно было загрузить снова тот же файл
    input.value = '';
  });
});




// === Массив продуктов ===
const products = [
  { id:1, name:"Качотта",     desc:"Полутвердый сыр, обладает мягким молочным вкусом. Состав: молоко цельное пастеризованное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 43%. Пищевая ценность (в 100 г продукта): жиров - 21 г, белков - 21 г, углеводов - 0,6 г. Энергетическая ценность - 283 ккал/1186 кДж",   price:250, weight:100, categories:["полутвердые сыры"],   image:"images/tovkach.jpeg" },
  { id:2, name:"Беллезза",     desc:"Полутвердый сыр с белой плесенью. Имеет терпкий насыщенный вкус c ореховыми нотками, консистенция меняется в зависимости от выдержки. Состав: молоко цельное пастеризованное, заквасочные микроорганизмы, микробиальный фермент, культура Penecillium Сandidum,соль. Массовая доля жира в пересчете на сухое вещество 45%. Пищевая ценность (в 100 г продукта): жира - 22 г, белка - 20г, углевода - 0,4 г. Энергетическая ценность - 345 ккал/1443 кДж",     price:230, weight:100, category:"полутвердые сыры", image:"images/tovbell.jpeg" },
  { id:3, name:"Веччио на козьем молоке",  desc:"Твердый выдержанный сыр. Обладает насыщенным сливочным вкусом с пряными нотками. Состав: молоко козье цельное пастеризованное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 50% Пищевая ценность (в 100 г продукта): жиров - 29 г, белков - 27 г, углеводов - 0,3 г. Энергетическая ценность - 396 ккал/1656 кДж.",      price:210, weight:100, category:"твердые сыры", image:"images/tovvech.jpeg" },
  { id:4, name:"Монтазио",  desc:"Полутвердый прессованный сыр из козьего молока, обладающий насыщенным молочно-ореховым вкусом. Консистенция и продукта могут меняться в зависимости от срока выдержки. Состав: молоко цельное пастеризованное,молоко козье натуральное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 51 % Пищевая ценность (в 100 г продукта): жиров - 32 г, белков - 27 г, углеводов - 0,3 г. Энергетическая ценность - 396 ккал/1656 кДж Пищевая ценность (в 100 г продукта): жира - 32 г, белка - 27 г, углевода - 0,3 г. Энергетическая ценность - 396 ккал/1656 кДж",      price:380, weight:100, category:"полутвердые сыры", image:"images/tovmont.jpeg" },
  { id:5, name:"Томм",  desc:"Полутвердый прессованный сыр из козьего молока, обладающий насыщенным молочно-ореховым вкусом. Консистенция и вкус продукта могут меняться в зависимости от срока выдержки. Состав: молоко цельное пастеризованное, молоко козье натуральное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 51 % Пищевая ценность (в 100 г продукта): жиров - 32 г, белков - 27 г, углеводов - 0,3 г. Энергетическая ценность - 396 ккал/1656 кДж",      price:280, weight:100, category:"полутвердые сыры", image:"images/tovtomm.jpeg" },
  { id:6, name:"Халлуми",  desc:"Лучший способ приготовить сыр Халуми - это обжарить его на гриле и подать со свежими овощами, мясом и листьями салата. Вкус получается просто невероятный. Пищевая ценность (в 100 г продукта): жира - 26 г, белка - 20 г, углевода - 0,6 г. Энергетическая ценность - 296 ккал/1238 кДж",      price:220, weight:100, category:"мягкие сыры", image:"images/tovhal.jpeg" },
  { id:7, name:"Шамбала",  desc:"Полутвердый сыр с семенами пажитника. Состав: молоко натуральное коровье, заквасочные микроорганизмы, микробиальный фермент, соль, пажитник. Массовая доля жира в пересчете на сухое вещество 43 % Пищевая ценность (в 100 г продукта): жира - 21 г, белка - 21 г, углевода - 0,6 г. Энергетическая ценность - 283 ккал/1186 кДж",      price:200, weight:100, category:"полутвердые сыры", image:"images/tovham.jpeg" },
  { id:8, name:"Грюйер",  desc:"Твердый сыр. Имеет плотную консистенцию и сладко-соленый насыщенный вкус. Консистенция и вкусовые качества могут меняться в зависимости от срока выдержки. Состав: молоко коровье натуральное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 48% Пищевая ценность (в 100 г продукта): жиров - 31 г, белков - 27 г, углеводов - 0,3 г. Энергетическая ценность - 396 ккал/1656 кДж",      price:340, weight:100, category:"твердые сыры", image:"images/tovgru.jpeg" },
  { id:9, name:"Страчателла",  desc:"Состав: молоко цельное пастеризованное, заквасочные микроорганизмы, молокосвертывающий фермент, соль, сливки пастеризованные. Массовая доля жира в пересчете на сухое вещество 39%. Пищевая ценность (содержание в 100 гр. продукта): жиров-33 г.,белков-18 гр.,углеводов-1,8г. Энергетическая ценность-300 ккал/1380 кДж.",      price:220, weight:100, category:"мягкие сыры", image:"images/tovstrach.jpeg" },
  { id:10, name:"Гауда",  desc:"Твердый голландский сыр. Вкус сливочный, сладко-ореховый, усиливается в зависимости от срока выдержки. Состав: молоко коровье натуральное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 45%. Пищевая ценность (в 100 г продукта): жиров - 27 г, белков - 24 г, углеводов - 0,3 г. Энергетическая ценность - 328 ккал/1372 кДж",      price:380, weight:100, category:"твердые сыры", image:"images/tovgauda.png" },
  { id:11, name:"Песанте",  desc:"Твердый прессованный сыр, имеет благородный сливочно-соленый вкус с легким намеком на остроту. Состав: молоко коровье натуральное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 46% Пищевая ценность (в 100 г продукта): жиров - 29 г, белков - 26 г, углеводов - 0,4 г. Энергетическая ценность - 370 ккал/1548 кДж",      price:320, weight:100, category:"твердые сыры", image:"images/tovpes.png" },
  { id:12, name:"Пьемонт",  desc:"Полутвердый прессованный сыр с выраженным молочным вкусом и легкой кислинкой в послевкусии. Вкусовые качества сыра могут меняться в зависимости от срока выдержки. Состав: молоко коровье натуральное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 48% Пищевая ценность (в 100 г продукта): жира - 31 г, белка - 27 г, углевода - 0,3 г. Энергетическая ценность - 396 ккал/1656 кДж",      price:400, weight:100, category:"полутвердые сыры", image:"images/tovpem.jpeg" },
  { id:13, name:"Дуетто",  desc:"Полутвердый сыр из смеси козьего и коровьего молока. Состав: молоко цельное пастеризованное, молоко козье пастеризованное, заквасочные микроорганизмы, микробиальный молокосвертывающий фермент, соль. Массовая доля жира в пересчете на сухое вещество-45%. Энергетическая ценность (содержание в 100 гр. продукта): жиров-45 г., белков-27 гр.,углеводов - 0,3 гр.Энергетическая ценность-387 ккал/1556 кДж.",      price:250, weight:100, category:"полутвердые сыры", image:"images/tovduet.jpeg" },
  { id:14, name:"Капретта",  desc:"Полутвердый сыр из козьего молока. Обладает нежным молочным вкусом с легкой козинкой. Состав: молоко козье натуральное, заквасочные микроорганизмы, микробиальный фермент, соль. Массовая доля жира в пересчете на сухое вещество 43% Пищевая ценность (содержание в 100 гр. продукта): жиров-21 гр., белков - 20 гр., углеводов - 0,3 гр. Энергетическая ценность- 245ккал/1025 кДж",      price:370, weight:100, category:"полутвердые сыры", image:"images/tovkap.jpeg" },
  { id:15, name:"Бри",  desc:"Мягкий сыр с белой плесенью, вкус нежный орехово-сливочный. Зрелый сыр может иметь легкий аммиачный запах и терпкий вкус. Состав: молоко цельное пастеризованное, заквасочные микроорганизмы, микробиальный фермент, культура Penecillium Сondidum, культура Geotrichum Сandidum. Массовая доля жира в пересчете на сухое вещество 55% Пищевая ценность (содержание в 100 г продукта): жиров -32 гр., белков -20 гр., углеводов - 0,4 гр. Энергетическая ценность - 345 ккал/1443 кДж",      price:230, weight:100, category:"мягкие сыры", image:"images/tovbri.png" },
  { id:16, name:"Томино",  desc:"Полутвёрдый сыр с белой плесенью, обладает насыщенным сливочным вкусом с нотками топленого молока и миндаля. Состав: молоко цельное пастеризованное, заквасочные микроорганизмы, микробиальный фермент, культура Penicillium Candidum, соль. Массовая доля жира в пересчете на сухое вещество 45%. Пищевая ценность (в 100 г продукта): жира - 32 г, белка - 20 г, углевода - 0,4г. Энергетическая ценность - 345 ккал/1443 кДж",      price:300, weight:100, category:"полутвердые сыры", image:"images/tovtomino.png" },
  { id:17, name:"Камамбер с трюфелем",  desc:"Мягкий сыр с белой плесенью и черным трюфелем. Обладает характерным и неповторимым вкусом и ароматом. Состав: молоко цельное пастеризованное, заквасочные микроорганизмы, микробиальный фермент, культура Penicillium Сandidum, трюфель консервированный, соль. Массовая доля жира в пересчете на сухое вещество 45% Пищевая ценность (содержание в 100 гр. продукта): жиров-28 гр., белков - 24 гр., углеводов - 0,1 гр. Энергетическая ценность- 317 ккал/1326 кДж",      price:320, weight:100, category:"мягкие сыры", image:"images/tovkamam.jpeg" },
  { id:18, name:"Белпер-мини",  desc:"Сырные шарики в обсыпке из итальянских специй. Имеют яркий, острый и одновременно пряный вкус. Консистенция сыра меняется в течении всего периода его созревания, от мягкой до очень твердой. Приблизительный вес за 1 штуку 60 грамм. Состав: молоко коровье натуральное, заквасочные микроорганизмы, микробиальный фермент, чеснок, соль, черный перец, душистый перец. Массовая доля жира в пересчете на сухое вещество 26% Пищевая ценность ( содержание в 100 гр., продукта): жира- 26 гр., белка - 22 гр., углеводов - 1 гр. Энергетическая ценность - 326 ккал/1366 кДж",      price:280, weight:100, category:"твердые сыры", image:"images/tovbelp.jpg" },
  { id:19, name:"Морбье",  desc:"Французский полутвердый прессованный сыр с золотистой мытой корочкой. Консистенция сыра мягкая и упругая. Отличительной чертой является прослойка из золы фруктовых деревьев между слоями сыра. Обладает ярко выраженным сливочным вкусом и ароматом с фруктовыми нотками. Состав: молоко коровье натуральное, заквасочные микроорганизмы, микробиальный фермент, зола фруктовых деревьев, соль. Массовая для жира в пересчете на сухое вещество 54% Пищевая ценность (содержания в 100 гр., продукта): жиров-29 гр., белков-23 гр., углеводов-1 гр. Энергетическая ценность-357 ккал/1494 кДж",      price:290, weight:100, category:"полутвердые сыры", image:"images/tovmor.jpeg" },
  { id:20, name:"Качотта в вине",  desc:"Полутвердый сыр со сладко-сливочным вкусом, выдержанный в красном сухом вине, благодаря чему имеет красивую яркую корочку и пряный аромат. Состав: молоко цельное пастеризованное, заквасочные микроорганизмы, микробиальный фермент, соль, красное сухое вино. Массовая доля жира в пересчете на сухое вещество 43% Пищевая ценность (в 100 г продукта): жира - 21 г, белка - 21 г, углевода - 0,6 г. Энергетическая ценность - 283 ккал/1186 кДж", price:300, weight:100, category:"полутвердые сыры",   image:"images/tovkachvin.png" }
];

// === Локальное хранилище ===
function setItem(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function getItem(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
if (!getItem("users"))       setItem("users", []);
if (!getItem("cart"))        setItem("cart", []);
if (!getItem("loggedInUser")) setItem("loggedInUser", null);
function isUserLoggedIn() { return getItem("loggedInUser") !== null; }
// === Инициализация localStorage ===
if (!getItem("favorites")) setItem("favorites", []);

// Утилита: проверить, в избранном ли товар
function isFavorite(id) {
  const fav = getItem("favorites") || [];
  return fav.includes(id);
}

// Добавить/убрать из избранного
function toggleFavorite(id) {
  let fav = getItem("favorites") || [];
  if (fav.includes(id)) {
    fav = fav.filter(x => x !== id);
  } else {
    fav.push(id);
  }
  setItem("favorites", fav);
}




// === showNotification ===
let notificationTimeout;

function _displayNotification(message, color) {
  const n = document.getElementById('notification');
  if (!n) return;

  // подготовка
  n.style.backgroundColor = color;
  n.textContent = message;

  // показываем
  n.classList.add('show');

  // сброс таймера
  if (notificationTimeout) clearTimeout(notificationTimeout);
  notificationTimeout = setTimeout(() => {
    n.classList.remove('show');
  }, 2000);
}

function showNotification(message) {
  const n = document.getElementById('notification');
  if (!n) return;

  // если уже показывается — сначала прячем вниз
  if (n.classList.contains('show')) {
    n.classList.remove('show');
    n.classList.add('hide-down');
    // после анимации скрытия — сразу отображаем новое
    setTimeout(() => {
      n.classList.remove('hide-down');
      _displayNotification(message, '#4CAF50');
    }, 300);
  } else {
    _displayNotification(message, '#4CAF50');
  }
}

function showErrorNotification(message) {
  const n = document.getElementById('notification');
  if (!n) return;

  if (n.classList.contains('show')) {
    n.classList.remove('show');
    n.classList.add('hide-down');
    setTimeout(() => {
      n.classList.remove('hide-down');
      _displayNotification(message, '#e74c3c');
    }, 300);
  } else {
    _displayNotification(message, '#e74c3c');
  }
}


// === Рендер карточек ===
function renderCards(containerId, items) {
  const c = document.getElementById(containerId);
  if (!c) return;

  const loggedIn = isUserLoggedIn();

  c.innerHTML = items.map(p => `
    <div class="product-card" data-id="${p.id}">
      <img src="${p.image}" alt="${p.name}">
      <button class="quick-view-btn" data-id="${p.id}">Быстрый просмотр</button>
      <div class="card-content">
        <div class="product-name">${p.name}</div>
        <div class="product-weight">${p.weight} грамм</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-bottom">
          <div class="product-price">${p.price} р.</div>
          ${loggedIn
            ? `<button class="favorite-btn${isFavorite(p.id)?' active':''}" data-id="${p.id}">&#10084;</button>`
            : ``
          }
          <button class="add-to-cart-btn"><span class="icon-cart"></span></button>
        </div>
      </div>
    </div>
  `).join('');

  // favorites
  if (loggedIn) {
    c.querySelectorAll('.favorite-btn').forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation();
        const id = parseInt(btn.dataset.id);
        toggleFavorite(id);
        btn.classList.toggle('active');
        if (document.getElementById('tab-fav').classList.contains('active')) {
          renderFavorites();
        }
      });
    });
  }

  // остальное без изменений
  c.querySelectorAll('.product-card')
    .forEach(card => card.addEventListener('click', () => openModal(card.dataset.id)));

  c.querySelectorAll('.quick-view-btn')
    .forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      openModal(btn.dataset.id);
    }));

  c.querySelectorAll('.add-to-cart-btn')
    .forEach(btn => btn.addEventListener('click', e => {
      e.stopPropagation();
      addToCart(btn.closest('.product-card').dataset.id);
    }));
}


// === Модалка ===
let currentModalId, modalQty;
function openModal(id) {
  currentModalId = id;
  modalQty = MIN_PORTIONS;
  const p = products.find(x => x.id == id);
  const m = document.getElementById('product-modal');
  if (!m) return;

  // заполняем
  document.querySelector('.modal-text h2').innerText = p.name;
  m.querySelector('img').src = p.image;
  m.querySelector('.modal-desc').innerText = p.desc;
  m.querySelector('.modal-weight').innerText = (modalQty*STEP) + ' грамм';
  m.querySelector('.modal-price').innerText = p.price + ' р.';
  document.getElementById('modal-qty').innerText = modalQty*STEP;

  // favorite-btn
  const favBtn = document.getElementById('modal-fav-btn');
  if (isUserLoggedIn()) {
    favBtn.style.display = 'inline-block';
    favBtn.dataset.id = id;
    favBtn.classList.toggle('active', isFavorite(+id));
    favBtn.replaceWith(favBtn.cloneNode(true));
    const newFavBtn = document.getElementById('modal-fav-btn');
    newFavBtn.addEventListener('click', e => {
      e.stopPropagation();
      const pid = +newFavBtn.dataset.id;
      toggleFavorite(pid);
      const isFav = isFavorite(pid);
      newFavBtn.classList.toggle('active', isFav);
      const cardFav = document.querySelector(`.product-card[data-id="${pid}"] .favorite-btn`);
      if (cardFav) cardFav.classList.toggle('active', isFav);
      renderFavorites();
    });
  } else {
    favBtn.style.display = 'none';
  }

  // кнопки количества и открытие
  const minusBtn = m.querySelector('.modal-quantity .qty-btn:first-of-type');
  const plusBtn  = m.querySelector('.modal-quantity .qty-btn:last-of-type');
  if (minusBtn) minusBtn.disabled = (modalQty <= MIN_PORTIONS);
  if (plusBtn)  plusBtn.disabled  = (modalQty >= MAX_PORTIONS);

  m.classList.add('active');
}

// === Фильтрация ===
function filterCatalog(category) {
  const list = (category==='all') ? products : products.filter(p=>p.category===category);
  renderCards('catalog-cards', list);
}

function closeModal() { const m = document.getElementById('product-modal'); if(m) m.classList.remove('active'); }

function changeModalQty(delta) {
  let newPortions = modalQty + delta;
  newPortions = Math.max(MIN_PORTIONS, Math.min(MAX_PORTIONS, newPortions));
  modalQty = newPortions;
  const grams = modalQty * STEP;
  document.getElementById('modal-qty').innerText = grams;
  const minusBtn = document.querySelector('.modal-quantity .qty-btn:first-of-type');
  const plusBtn  = document.querySelector('.modal-quantity .qty-btn:last-of-type');

  const p = products.find(x => x.id == currentModalId);
  const priceEl = document.querySelector('.modal-text .modal-price');
  if (p && priceEl) {
    priceEl.innerText = (p.price * modalQty) + ' р.';
  }

  if (minusBtn) minusBtn.disabled = (modalQty <= MIN_PORTIONS);
  if (plusBtn)  plusBtn.disabled  = (modalQty >= MAX_PORTIONS);
}

function addModalToCart() {
  addToCart(currentModalId, modalQty);
  closeModal();
}


// === Работа корзины ===
function renderCart() {
  const container = document.getElementById('cart-items');
  if (!container) return;

  const cart = getItem('cart') || [];
  const totalEl    = document.getElementById('cart-total');
  const checkoutBtn = document.querySelector('.checkout-btn');
  const totalBlock = document.querySelector('.cart-total');

  // Если корзина пуста — прячем итого и кнопку
  if (cart.length === 0) {
    container.innerHTML = '<p>Ваша корзина пуста</p>';
    if (totalBlock)   totalBlock.style.display   = 'none';
    if (checkoutBtn)  checkoutBtn.style.display  = 'none';
    return;
  }

  // Иначе показываем их
  if (totalBlock)   totalBlock.style.display   = 'flex';
  if (checkoutBtn)  checkoutBtn.style.display  = 'inline-block';

  let html = '';
  cart.forEach(item => {
    const p = products.find(x => x.id == item.id);
    if (!p) return;

    const portions = item.quantity;
    const grams = portions * STEP;
    const disableMinus = portions <= MIN_PORTIONS ? 'disabled' : '';
    const disablePlus  = portions >= MAX_PORTIONS ? 'disabled' : '';

    html += `
      <div class="cart-item">
        <button class="remove-btn" onclick="removeFromCart(${p.id})">×</button>
        <img src="${p.image}" alt="${p.name}">
        <div class="cart-item-info">
          <div>${p.name}</div>
          <div class="cart-item-price">${p.price * item.quantity} р.</div>
          <div class="quantity">
            Вес:
            <button class="qty-btn" onclick="changeQuantity(${p.id}, -1)" ${disableMinus}>−</button>
            <span>${grams}</span>
            <button class="qty-btn" onclick="changeQuantity(${p.id}, 1)" ${disablePlus}>+</button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
  updateCartTotal();
}

// Рендер списка избранного
function renderFavorites() {
  const favIds = getItem('favorites') || [];
  const favProducts = products.filter(p => favIds.includes(p.id));
  const container = document.getElementById('tab-fav');
  if (!container) return;

  if (favProducts.length === 0) {
    container.innerHTML = '<p>У вас нет товаров в избранном.</p>';
    return;
  }

  // Генерируем компактные карточки
  container.innerHTML =
    `<div class="product-cards">` +
    favProducts.map(p => `
      <div class="product-card compact-card" data-id="${p.id}">
        <img src="${p.image}" alt="${p.name}">
        <div class="card-content">
          <div class="product-name">${p.name}</div>
          <div class="product-price">${p.price} р.</div>
          <div class="action-buttons">
      <button class="add-to-cart-btn"><span class="icon-cart"></span></button>
      <button class="favorite-btn${isFavorite(p.id)?' active':''}" data-id="${p.id}">&#10084;</button>
    </div>
        </div>
      </div>
    `).join('') +
    `</div>`;

  // Повторно навешиваем обработчики
  container.querySelectorAll('.product-card.compact-card').forEach(card => {
    const id = parseInt(card.dataset.id);
    // открытие модалки по клику на карточку
    card.addEventListener('click', () => openModal(id));
  });
  container.querySelectorAll('.favorite-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.dataset.id);
      toggleFavorite(id);
      btn.classList.toggle('active');
      renderFavorites();  // чтобы убрать из избранного сразу
    });
  });
  container.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const id = parseInt(btn.closest('.product-card').dataset.id);
      addToCart(id);
    });
  });
}



// При переключении вкладок: if fav — перерисовать
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // ... ваш existing переключатель классов ...
      if (tab.dataset.tab === 'fav') {
        renderFavorites();
      }
    });
  });
});

function removeFromCart(id){ let cart=getItem('cart')||[]; cart=cart.filter(i=>i.id!=id); setItem('cart',cart); renderCart(); }
function changeQuantity(id,delta){ let cart=getItem('cart')||[]; let it=cart.find(i=>i.id==id); if(it){ it.quantity+=delta; if(it.quantity<1) cart=cart.filter(i=>i.id!=id); setItem('cart',cart); renderCart(); }}
function updateCartTotal(){ const el=document.getElementById('cart-total'); if(!el) return; const total=(getItem('cart')||[]).reduce((sum,i)=>{ const p=products.find(x=>x.id==i.id); return p?sum+p.price*i.quantity:sum; },0); el.innerText = total+' р.'; }
function checkout(){ alert('Оформление заказа (демо)'); }

// === Авторизация и регистрация ===
function registerUser(e){ e.preventDefault(); const fio=document.getElementById('reg-fio').value.trim(); const phone=document.getElementById('reg-phone').value.trim(); const email=document.getElementById('reg-email').value.trim(); const pass=document.getElementById('reg-pass').value; const pass2=document.getElementById('reg-pass2').value; if(!fio||!phone||!email||!pass||!pass2){ alert('Заполните все поля!'); return;} if(pass!==pass2){ alert('Пароли не совпадают!'); return;} let users=getItem('users')||[]; if(users.find(u=>u.email===email)){ alert('Email уже зарегистрирован!'); return;} users.push({ fio, phone, email, password: pass, isAdmin: false, orders: [] }); setItem('users', users); alert('Регистрация успешна!'); window.location.href='login.html'; }
function loginUser(e){ e.preventDefault(); const email=document.getElementById('login-email').value.trim(); const pass=document.getElementById('login-pass').value; if(!email||!pass){ alert('Введите email и пароль!'); return;} let users=getItem('users')||[]; let user=users.find(u=>u.email===email&&u.password===pass); if(!user){ if(email==='admin@site'&&pass==='admin'){ const admin={ fio:'Администратор', phone:'', email, password: pass, isAdmin:true, orders:[] }; setItem('loggedInUser', admin); alert('Вход как админ!'); window.location.href='admin.html'; return;} alert('Неверные данные!'); return;} setItem('loggedInUser', user); alert('Успешно вошли!'); window.location.href='account.html'; }

// === Личный кабинет ===
function renderAccountInfo(){ const u=getItem('loggedInUser'); if(!u) return; document.getElementById('account-fio').innerText=u.fio; document.getElementById('account-email').innerText=u.email; document.getElementById('account-phone').innerText=u.phone; }
function logoutUser(){ setItem('loggedInUser', null); setItem('cart', []); window.location.href='index.html'; }

// === Ссылки в шапке ===
function handleHeaderLinks(){ const u=getItem('loggedInUser'); const c=document.getElementById('nav-cart'); const a=document.getElementById('nav-account'); const l=document.getElementById('nav-login'); const r=document.getElementById('nav-register'); const ad=document.getElementById('nav-admin'); if(u){ if(c) c.style.display='inline-block'; if(a) a.style.display='inline-block'; if(l) l.style.display='none'; if(r) r.style.display='none'; if(ad) ad.style.display='none'; } else{ if(c) c.style.display='none'; if(a) a.style.display='none'; if(l) l.style.display='inline-block'; if(r) r.style.display='inline-block'; if(ad) ad.style.display='inline-block'; }}

// === Инициализация ===
document.addEventListener('DOMContentLoaded',()=>{
  renderCards('catalog-cards', products);
  renderCards('popular-products', products.slice(0,4));
  // Обновленная сортировка
  document.querySelectorAll('.sort-btn').forEach(btn=>btn.addEventListener('click',e=>{
    e.preventDefault();
    document.querySelectorAll('.sort-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const txt = btn.textContent.trim();
    const lower = txt.toLowerCase();
    const category = (lower === 'все товары') ? 'all' : lower;
    filterCatalog(category);
  }));
  const mc = document.getElementById('modal-close'); if(mc) mc.addEventListener('click', closeModal);
  const pm = document.getElementById('product-modal'); if(pm) pm.addEventListener('click', e=>{ if(e.target.id==='product-modal') closeModal(); });
  handleHeaderLinks();
});



// === Обновление бейджа количества в корзине ===
function updateCartCount() {
  const badge = document.getElementById('cart-count');
  if (!badge) return;
  const cart = getItem('cart') || [];
  const total = cart.reduce((sum, i) => sum + i.quantity, 0);
  badge.innerText = total;
  badge.style.display = total > 0 ? 'inline-block' : 'none';
  badge.classList.add('bounce');
  setTimeout(() => badge.classList.remove('bounce'), 200);
}

// === Добавление в корзину ===
function addToCart(productId, qty = 1) {
  if (!isUserLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  let cart = getItem('cart') || [];
  const existing = cart.find(i => i.id == productId);
  const currentPortions = existing ? existing.quantity : 0;

  // если превысит лимит
  if (currentPortions + qty > MAX_PORTIONS) {
    showErrorNotification('Превышен лимит покупки');
    return;
  }

  if (existing) existing.quantity += qty;
  else cart.push({ id: parseInt(productId), quantity: qty });
  setItem('cart', cart);
  showNotification('Товар добавлен в корзину!');
  updateCartCount();   // ← обновляем бейдж
}

// === Удаление из корзины ===
function removeFromCart(productId) {
  let cart = getItem('cart') || [];
  cart = cart.filter(i => i.id != productId);
  setItem('cart', cart);
  renderCart();
  updateCartCount();   // ← обновляем бейдж
}

// === Изменение количества ===
function changeQuantity(productId, delta) {
  let cart = getItem('cart') || [];
  const item = cart.find(i => i.id == productId);
  if (!item) return;

  let newPortions = item.quantity + delta;
  newPortions = Math.max(MIN_PORTIONS, Math.min(MAX_PORTIONS, newPortions));
  item.quantity = newPortions;
  setItem('cart', cart);
  renderCart();
  updateCartCount();
}


// === Инициализация при загрузке страницы ===
document.addEventListener('DOMContentLoaded', () => {
  // ... ваш существующий код рендера карточек, сортировки, модалки ...
  handleHeaderLinks();
  renderCart();        // на странице cart.html
  updateCartCount();   // обновляем бейдж сразу при загрузке
});



// Переключение вкладок в личном кабинете
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Снимаем активность у всех
      tabs.forEach(t => t.classList.remove('tab-active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      // Включаем у нажатой вкладки и её контента
      tab.classList.add('tab-active');
      document.getElementById('tab-' + tab.dataset.tab).classList.add('active');
    });
  });
});







// === Редактирование данных пользователя ===
document.addEventListener('DOMContentLoaded', () => {
  const form     = document.getElementById('edit-form');
  const inpFio   = document.getElementById('edit-fio');
  const inpPhone = document.getElementById('edit-phone');
  const inpEmail = document.getElementById('edit-email');
  const inpPass  = document.getElementById('edit-pass');
  const inpPass2 = document.getElementById('edit-pass2');

  // Загрузить текущие данные
  const user = getItem('loggedInUser');
  if (user) {
    inpFio.value         = user.fio   || '';
    inpFio.placeholder   = 'Иван Иванов Иванович';

    inpPhone.value       = user.phone || '';
    inpPhone.placeholder = '+7 (888) 888 88-88';

    inpEmail.value       = user.email || '';
    inpEmail.placeholder = 'example@mail.ru';
  }

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fio   = inpFio.value.trim()   || user.fio;
    const phone = inpPhone.value.trim() || user.phone;
    const email = inpEmail.value.trim() || user.email;
    const pass  = inpPass.value;
    const pass2 = inpPass2.value;

    // Валидация
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\+7 \(\d{3}\) \d{3} \d{2}-\d{2}$/;
    if (fio.length < 10)               { alert('ФИО слишком короткое'); return; }
    if (!phonePattern.test(phone)) {
      alert('Телефон должен быть в формате +7 (999) 999 99-99');
      return;
    }
    if (!emailRe.test(email))         { alert('Неверный формат email'); return; }
    if (pass.length < 6)              { alert('Пароль менее 6 символов'); return; }
    if (pass !== pass2)               { alert('Пароли не совпадают'); return; }

    // Обновить пользователя
    const updatedUser = {
      ...user,
      fio, phone, email,
      password: pass
    };
    setItem('loggedInUser', updatedUser);

    // А также обновить в общем списке users
    const users = getItem('users') || [];
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = updatedUser;
      setItem('users', users);
    }

    alert('Данные успешно сохранены!');
    // Очистим поля
     // 1) Обновить верхний блок «Личный кабинет»
  renderAccountInfo();

  // 2) Сбросить форму и поставить новые плейсхолдеры
  form.reset();
  inpFio.placeholder   = fio;
  inpPhone.placeholder = phone;
  inpEmail.placeholder = email;

  // 3) Обновить value и очистить поля пароля
  inpFio.value   = '';
  inpPhone.value = '';
  inpEmail.value = '';
  inpPass.value  = '';
  inpPass2.value = '';

  // 4) Опционально: переключиться обратно на таб «Изменить данные»,
  // если пользователь смотрел другой:
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab-active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  document.querySelector('[data-tab="edit"]').classList.add('tab-active');
  document.getElementById('tab-edit').classList.add('active');
  });
});






// Маска для телефона: +7 (999) 999 99-99
function maskPhoneInput(e) {
  // Убираем всё, кроме цифр
  let digits = e.target.value.replace(/\D/g, '');
  // Если пользователь стёр «+7», восстанавливаем
  if (!digits.startsWith('7')) digits = '7' + digits;
  // Обрезаем до 11 цифр (7 + 10 цифр номера)
  digits = digits.slice(0, 11);

  // Разбираем на части
  const country = digits[0];              // «7»
  const part1   = digits.slice(1, 4);     // XXX
  const part2   = digits.slice(4, 7);     // XXX
  const part3   = digits.slice(7, 9);     // XX
  const part4   = digits.slice(9, 11);    // XX

  // Собираем формат
  let formatted = '+' + country;
  if (part1) formatted += ' (' + part1 + (part1.length === 3 ? ')' : '');
  if (part2) formatted += ' ' + part2;
  if (part3) formatted += ' ' + part3;
  if (part4) formatted += '-' + part4;

  e.target.value = formatted;
}

document.addEventListener('DOMContentLoaded', () => {
  const inpPhone = document.getElementById('edit-phone');
  if (!inpPhone) return;

  // Ограничим длину, чтобы не вводилось больше
  inpPhone.setAttribute('maxlength', 18);

  // Запрет ввода любых символов, кроме цифр и служебных
  inpPhone.addEventListener('keypress', e => {
    // Разрешаем цифры, Backspace, Delete, стрелки и '+','(',')',' ','-'
    if (!/[0-9\+\(\)\-\s]/.test(e.key) &&
        e.key.length === 1 /* чтоб не блокировать Backspace/Delete */) {
      e.preventDefault();
    }
  });

  // Основной input: приводим к маске
  inpPhone.addEventListener('input', maskPhoneInput);
});

1111