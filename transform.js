var cat = document.getElementById('cat'),
    i   = 0;

setInterval(function () {
    cat.attributes.style.value += '-moz-transform: rotate('+i+'deg); -webkit-transform: rotate('+i+'deg);';
    i += 1;
}, 10);
