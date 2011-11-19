var cat     = document.getElementById('cat'),
    forward = document.getElementById('forward'),
    reverse = document.getElementById('reverse'),
    stop    = document.getElementById('stop'),
    id      = null,
    i       = 0;

var rotator = function (direction) { 
    return function () {
        cat.attributes.style.value += '-moz-transform: rotate('+i+'deg); -webkit-transform: rotate('+i+'deg);';
        switch (direction) {
        case 'backward':
            i -= 1;
            break;
        default:
            i += 1;
        }
    };
};

var eventCallbackMaker = function (direction) {
    return function () {
        if (id !== null) {
            clearInterval(id);
        }
        var interval = document.getElementById('interval');
        id = setInterval(rotator(direction), parseInt(interval.value, 10));
    };
};

if (document.addEventListener) {
    forward.addEventListener('click', eventCallbackMaker('forward'));
    reverse.addEventListener('click', eventCallbackMaker('backward'));
    stop.addEventListener('click', function() {
        clearInterval(id);
        id = null;
    });
}
