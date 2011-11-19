var cat   = document.getElementById('cat'),
    start = document.getElementById('start'),
    stop  = document.getElementById('stop'),
    id    = null,
    i     = 0;



if (document.addEventListener) {
    start.addEventListener('click', function() {
        if (id === null) {
            var interval = document.getElementById('interval');
            console.log(parseInt(interval.value, 10));
            id = setInterval(function () {
                cat.attributes.style.value += '-moz-transform: rotate('+i+'deg); -webkit-transform: rotate('+i+'deg);';
                i += 1;
            }, parseInt(interval.value, 10));
        }
    });

    stop.addEventListener('click', function() {
        clearInterval(id);
        id = null;
    });
}
