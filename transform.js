var cat     = document.getElementById('cat'),
    forward = document.getElementById('forward'),
    reverse = document.getElementById('reverse'),
    stop    = document.getElementById('stop'),
    id      = null,
    i       = 0;



if (document.addEventListener) {
    forward.addEventListener('click', function() {
        if (id !== null) {
            clearInterval(id);
        }
        var interval = document.getElementById('interval');
        id = setInterval(function () {
            cat.attributes.style.value += '-moz-transform: rotate('+i+'deg); -webkit-transform: rotate('+i+'deg);';
            i += 1;
        }, parseInt(interval.value, 10));
    });

    reverse.addEventListener('click', function() {
        if (id !== null) {
            clearInterval(id); 
        }
        var interval = document.getElementById('interval');
        id = setInterval(function () {
            cat.attributes.style.value += '-moz-transform: rotate('+i+'deg); -webkit-transform: rotate('+i+'deg);';
            i -= 1;
        }, parseInt(interval.value, 10));
    });

    stop.addEventListener('click', function() {
        clearInterval(id);
        id = null;
    });
}
