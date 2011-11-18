var cat = document.getElementById('cat'),
    i   = 0;

setInterval(function () {
    cat.attributes.style.value = '-webkit-transform: rotate('+i+'deg);';
    i += 1;
}, 10);
