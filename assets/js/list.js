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