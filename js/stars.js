document.querySelectorAll('.star').forEach(star => {
    star.style.setProperty('--random', Math.random());
});

const toggleButton = document.getElementById('toggle-trails');
toggleButton.addEventListener('click', () => {
    const starContainer = document.querySelector('.star-container');
    starContainer.classList.toggle('active');
});