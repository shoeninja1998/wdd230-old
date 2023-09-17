document.addEventListener('DOMContentLoaded', function() {
    currentYear=(new Date()).getFullYear();
    currentYearElement = document.getElementById('currentYear');
    currentYearElement.textContent = currentYear
    
});

document.addEventListener('DOMContentLoaded', function() {
    lastModified = document.lastModified;
    lastModifiedElement = document.getElementById('lastModified');
    lastModifiedElement.textContent = lastModified;
});