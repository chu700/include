function includeHTML(callback) {
    var elements = document.querySelectorAll('[data-include]');
    var count = elements.length;
    
    elements.forEach(function(el) {
        var file = el.getAttribute('data-include');
        if (file) {
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        el.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        el.innerHTML = "Page not found.";
                    }
                    el.removeAttribute('data-include');
                    count--;
                    if (count === 0 && typeof callback === 'function') {
                        callback();
                    }
                }
            };
            xhr.open("GET", file, true);
            xhr.send();
        }
    });
}

includeHTML(activateMenu);

function activateMenu() {
    var currentPath = window.location.pathname.split('/').pop();
    var menuItems = document.querySelectorAll('#header nav ul li a');

    menuItems.forEach(function(item) {
        if (item.getAttribute('href') === currentPath || (currentPath === '' && item.getAttribute('href') === 'index.html')) {
            item.classList.add('active');
        }
    });
}
