currentYear=(new Date()).getFullYear();
currentYearElement = document.getElementById('currentYear');
currentYearElement.textContent = currentYear

lastModified = document.lastModified;
lastModifiedElement = document.getElementById('lastModified');
lastModifiedElement.textContent = lastModified;

const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});