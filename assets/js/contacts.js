document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://my-json-server.typicode.com/melonsound/json_placeholder/company';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      
      const aboutContainer = document.getElementById('about-section');
      
      data.about.forEach(item => {
        const section = document.createElement('div');
        const title = document.createElement('h3');
        title.textContent = item.title;
        const description = document.createElement('p');
        description.textContent = item.description;
        
        section.appendChild(title);
        section.appendChild(description);
        aboutContainer.appendChild(section);
      });
      
      
      document.getElementById('phone').textContent = data.contact.phone;
      document.getElementById('address').textContent = data.contact.address;
      document.getElementById('email').textContent = data.contact.email;
    })
    .catch(error => {
      console.error('Ошибка при загрузке данных:', error);
    });
});