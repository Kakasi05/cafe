const toggleButton = document.getElementById('theme-toggle');

toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
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

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://my-json-server.typicode.com/melonsound/json_placeholder/popular')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('popular');
      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'popular-item';
        div.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="popular-image"/>
          <h3>${item.title}</h3>
        `;
        container.appendChild(div);
      });
    })
    .catch(console.error);
});