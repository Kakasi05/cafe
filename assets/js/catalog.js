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



function getFavorites() {
    const favs = localStorage.getItem('favorites');
    return favs ? JSON.parse(favs) : [];
}

function saveFavorites(favs) {
    localStorage.setItem('favorites', JSON.stringify(favs));
}

document.addEventListener('click', (event) => {
  if (event.target.classList.contains('favorite-btn')) {
    const id = event.target.getAttribute('data-id');
    let favs = getFavorites();

    if (!favs.includes(id)) {
      favs.push(id);
      saveFavorites(favs);
      alert('Товар добавлен в избранное!');
    } else {
      alert('Этот товар уже в списке избранного.');
    }
  }
});

 document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://my-json-server.typicode.com/melonsound/json_placeholder/coffee';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const aboutContainer = document.getElementById('coffee-catalog');

      data.forEach(item => {

        const coffeeItem = document.createElement('div');
        coffeeItem.className = 'coffee-item';

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;

        const title = document.createElement('h3');
        title.textContent = item.title;

        const rating = document.createElement('p');
        rating.textContent = `Рейтинг: ${item.rating}`;

        const description = document.createElement('p');
        description.textContent = item.description;


        aboutContainer.appendChild(coffeeItem);
        const favButton = document.createElement('button');
        favButton.className = 'favorite-btn';
        favButton.setAttribute('data-id', item.id);
        favButton.textContent = 'Добавить в избранное';


        coffeeItem.appendChild(img);
        coffeeItem.appendChild(title);
        coffeeItem.appendChild(rating);
        coffeeItem.appendChild(description);
        coffeeItem.appendChild(favButton);
      });
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
});
