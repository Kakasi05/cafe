const dropdownMenu = document.querySelector('.dropdown');
const dropdownList = document.querySelector('.dropdown-menu');
const themeButton = document.getElementById('theme-toggle');

let timerId;
let coffeeList = [];

function openMenu() {
  if (dropdownList) {
    dropdownList.style.display = 'block';
  }
}

function closeMenu() {
  if (dropdownList) {
    dropdownList.style.display = 'none';
  }
}

function startTimer() {
  timerId = setTimeout(closeMenu, 1000);
}

function stopTimer() {
  if (timerId) {
    clearTimeout(timerId);
    timerId = null;
  }
}

if (dropdownMenu && dropdownList) {
  dropdownMenu.addEventListener('mouseenter', function() {
    stopTimer();
    openMenu();
  });

  dropdownMenu.addEventListener('mouseleave', function() {
    startTimer();
  });
}

if (themeButton) {
  themeButton.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
  });
}

function getFavorites() {
  let favStr = localStorage.getItem('favorites');
  if (favStr) {
    return JSON.parse(favStr);
  } else {
    return [];
  }
}

function setFavorites(favorites) {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

//about
function loadCompany() {
  fetch('https://my-json-server.typicode.com/melonsound/json_placeholder/company')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let aboutSection = document.getElementById('about-section');
      if (aboutSection && data.about) {
        aboutSection.innerHTML = '';
        for (let i = 0; i < data.about.length; i++) {
          let block = document.createElement('div');
          let title = document.createElement('h3');
          title.textContent = data.about[i].title;
          let descr = document.createElement('p');
          descr.textContent = data.about[i].description;
          block.appendChild(title);
          block.appendChild(descr);
          aboutSection.appendChild(block);
        }
      }

      if (data.contact) {
        let phoneEl = document.getElementById('phone');
        let addressEl = document.getElementById('address');
        let emailEl = document.getElementById('email');

        if (phoneEl) phoneEl.textContent = data.contact.phone;
        if (addressEl) addressEl.textContent = data.contact.address;
        if (emailEl) emailEl.textContent = data.contact.email;
      }
    })
    .catch(function(err) {
      console.log('Ошибка загрузки компании:', err);
    });
}

//catalog
function loadCoffee() {
  fetch('https://my-json-server.typicode.com/melonsound/json_placeholder/coffee')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      coffeeList = data;

      let catalog = document.getElementById('coffee-catalog');
      if (!catalog) return;

      catalog.innerHTML = '';

      let favorites = getFavorites();

      for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let isFavorite = favorites.includes(String(item.id));

        let card = document.createElement('div');
        card.className = 'coffee-item';

        let img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;

        let h3 = document.createElement('h3');
        h3.textContent = item.title;

        let rating = document.createElement('p');
        rating.textContent = 'Рейтинг: ' + item.rating;

        let desc = document.createElement('p');
        desc.textContent = item.description;

        let btn = document.createElement('button');
        btn.textContent = isFavorite ? 'В избранном' : 'Добавить в избранное';
        btn.className = 'favorite-btn';
        btn.setAttribute('data-id', item.id);

        card.appendChild(img);
        card.appendChild(h3);
        card.appendChild(rating);
        card.appendChild(desc);
        card.appendChild(btn);

        catalog.appendChild(card);
      }

      updateCatalogButtons();

      renderFavorites();
    })
    .catch(function(err) {
      console.log('Ошибка загрузки кофе:', err);
    });
}

//favorites
function loadCoffeeForFavorites() {
  fetch('https://my-json-server.typicode.com/melonsound/json_placeholder/coffee')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      coffeeList = data;
      renderFavorites();
    })
    .catch(function(err) {
      console.log('Ошибка загрузки кофе для избранного:', err);
    });
}

//popular index
function loadPopular() {
  fetch('https://my-json-server.typicode.com/melonsound/json_placeholder/popular')
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      let popularDiv = document.getElementById('popular');
      if (!popularDiv) return;

      popularDiv.innerHTML = '';

      for (let i = 0; i < data.length; i++) {
        let item = data[i];

        let itemDiv = document.createElement('div');
        itemDiv.className = 'popular-item';

        let img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.className = 'popular-image';

        let h3 = document.createElement('h3');
        h3.textContent = item.title;

        itemDiv.appendChild(img);
        itemDiv.appendChild(h3);

        popularDiv.appendChild(itemDiv);
      }
    })
    .catch(function(err) {
      console.log('Ошибка загрузки популярных товаров:', err);
    });
}

//favorites
function renderFavorites() {
  let favorites = getFavorites();
  let favContainer = document.getElementById('favorites-list');
  if (!favContainer) return;
  favContainer.innerHTML = '';

  if (favorites.length === 0) {
    favContainer.innerHTML = '<p>Избранное пусто.</p>';
    return;
  }

  let favItems = coffeeList.filter(function(item) {
    return favorites.includes(String(item.id));
  });

  for (let i = 0; i < favItems.length; i++) {
    let product = favItems[i];

    let favDiv = document.createElement('div');
    favDiv.className = 'favorite-item';

    let img = document.createElement('img');
    img.src = product.image;
    img.alt = product.title;

    let h3 = document.createElement('h3');
    h3.textContent = product.title;

    let p = document.createElement('p');
    p.textContent = product.description;

    let btn = document.createElement('button');
    btn.textContent = 'Удалить';
    btn.className = 'remove-btn';
    btn.setAttribute('data-id', product.id);

    favDiv.appendChild(img);
    favDiv.appendChild(h3);
    favDiv.appendChild(p);
    favDiv.appendChild(btn);

    favContainer.appendChild(favDiv);
  }
}

function updateCatalogButtons() {
  let favorites = getFavorites();
  let buttons = document.querySelectorAll('.favorite-btn');
  buttons.forEach(function(btn) {
    let id = btn.getAttribute('data-id');
    if (favorites.includes(id)) {
      btn.textContent = 'Добавить в избранное';
    } else {
      btn.textContent= 'Уже в избранном!'
    }
  });
}

//remove btn
let favList = document.getElementById('favorites-list');
if (favList) {
  favList.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-btn')) {
      let idToRemove = event.target.getAttribute('data-id');
      let favorites = getFavorites();
      let newFavs = favorites.filter(function(favId) {
        return favId !== idToRemove;
      });

      setFavorites(newFavs);
      renderFavorites();
      updateCatalogButtons();
    }
  });
}

//add btn
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('favorite-btn')) {
    let id = event.target.getAttribute('data-id');
    let favorites = getFavorites();

    if (favorites.indexOf(id) === -1) {
      favorites.push(id);
      setFavorites(favorites);
      alert('Товар добавлен в избранное!');
      renderFavorites();
      updateCatalogButtons();
    } else {
      alert('Товар уже в избранном.');
    }
  }
});
document.addEventListener('DOMContentLoaded', function() {
  loadCompany();
  if (document.getElementById('coffee-catalog')) {
    loadCoffee();
  } else if (document.getElementById('favorites-list')) {
    loadCoffeeForFavorites();
  }

  loadPopular();
});
