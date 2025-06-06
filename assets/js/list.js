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

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.favorite-btn');

  buttons.forEach(btn => {
      btn.addEventListener('click', () => {
          const id = btn.getAttribute('data-id');
          let favs = getFavorites();

           if (!favs.includes(id)) {
              favs.push(id);
              saveFavorites(favs);
             alert('Товар добавлен в избранное!');
           } else {
             alert('Этот товар уже в списке избранного.');
        }
     });
   });
 });

 document.addEventListener('DOMContentLoaded', () => {
  fetch('https://my-json-server.typicode.com/melonsound/json_placeholder/coffee')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('catalog-coffee');
      data.forEach(coffee => {
        const item = document.createElement('div');
        item.className = 'coffee-item';
        item.innerHTML = `
          <h3>${coffee.name}</h3>
          <p>Описание: ${coffee.description}</p>
          <p>Цена: ${coffee.price} руб.</p>
        `;
        container.appendChild(item);
      });
    })
    .catch(error => console.error('Ошибка загрузки кофе:', error));
});