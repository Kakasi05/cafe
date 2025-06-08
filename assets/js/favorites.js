function getFavorites() {
    const favs = localStorage.getItem('favorites');
    return favs ? JSON.parse(favs) : [];
}
//получаю код

function saveFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
}
//сохраняю в лклстр

const productsData = {
    "2": {
        name: "Эспрессо",
        description: "Крепкий и насыщенный кофе.",
        image: "./assets/images/espresso.jpg"
    },
    "1": {
        name: "Капучино",
        description: "Кофе с молочной пеной.",
        image: "./assets/images/cappuccino.jpg"
    },
    "5": {
        name: "Латте",
        description: "Мягкий кофе с молоком.",
        image: "./assets/images/latte.jpg"
    },
    "3": {
        name: "Американо",
        description: "Эспрессо с водой.",
        image: "./assets/images/americano.jpg"
    },
    "4": {
        name: "Раф",
        description: "Кофе со сливками и ванилью.",
        image: "./assets/images/raf.jpg"
    }
};


document.getElementById('favorites-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const idToRemove = event.target.getAttribute('id');
    const favsUpdated = getFavorites().filter(id => id !== idToRemove);
    saveFavorites(favsUpdated);
    renderFavorites();
  }
});

function renderFavorites() {
  const favs = getFavorites();
  const container = document.getElementById('favorites-list');
  container.innerHTML = '';

  if (favs.length === 0) {
      container.innerHTML = '<p>Ваш список избранных пуст.</p>';
      return;
 }

 favs.forEach(id => {
    const product = productsData[id];
    if (product) {
        const div = document.createElement('div');
        div.className = 'favorite-item';

        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}"/>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <button class="remove-btn" id="${id}">Удалить</button>
        `;
        container.appendChild(div);
    }
 });
}

document.addEventListener('DOMContentLoaded', () => {
  renderFavorites();
});


    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const idToRemove = btn.getAttribute('id');
            let favsUpdated = getFavorites().filter(id => id !== idToRemove);
            saveFavorites(favsUpdated);
            renderFavorites(); 
        });
    });



document.addEventListener('DOMContentLoaded', () => {
    renderFavorites();
});

const dropdown = document.querySelector('.dropdown');
const menu = document.querySelector('.dropdown-menu');

let hideTimeout;

function showList() {
  if (menu) {
    menu.style.display = 'block';
  }
}

function hideList() {
  if (menu) {
    menu.style.display = 'none';
  }
}

function startHideTimer() {
  hideTimeout = setTimeout(hideList, 1000); 
}

function clearHideTimer() {
  clearTimeout(hideTimeout);
}

if (dropdown && menu) {
  dropdown.addEventListener('mouseenter', () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
    showList();
  });
  
  dropdown.addEventListener('mouseleave', () => {
    startHideTimer();
  });
}