document.addEventListener('DOMContentLoaded', function() {
  const searchButton = document.querySelector('.search-box button');
  const navItems = document.querySelector('.nav-items');

  searchButton.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent form submission

    // Toggle visibility of navigation items
    if (navItems.style.display === 'none') {
      navItems.style.display = 'block'; // or 'flex', depending on your layout
    } else {
      navItems.style.display = 'none';
    }
  });
});
