var KLUK = KLUK || {};

KLUK.namespace = function(ns) {
    var parts = ns.split('.'),
        parent = KLUK,
        i;

    if (parts[0] === "KLUK") {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }
    return parent;
};

KLUK.namespace('baseurl');
KLUK.baseurl = "http://mapfilter.com:4567";

KLUK.namespace('request.create');
KLUK.request.Create = (function () {
    var Constructor;

    Constructor = function (method, url) {
        var xhr = new XMLHttpRequest(),
            fullurl = KLUK.baseurl + url;

        if ("withCredentials" in xhr) {
            // Check if the XMLHttpRequest object has a "withCredentials" property.
            // "withCredentials" only exists on XMLHTTPRequest2 objects.
            xhr.open(method, fullurl, true);

        } else if (typeof XDomainRequest != "undefined") {

            // Otherwise, check if XDomainRequest.
            // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
            xhr = new XDomainRequest();
            xhr.open(method, fullurl);
        } else {
            // Otherwise, CORS is not supported by the browser.
            xhr = null;
        }

        return xhr;
    };

    return Constructor;
}());

KLUK.namespace('request.get');
KLUK.request.get = function (url, fn) {
    var xhr = new KLUK.request.Create('GET', url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }

    xhr.onload = function () {
        fn(xhr.responseText);
    };

    xhr.onerror = function (e) {
        console.log('There was an error!');
    };

    xhr.send();
};

KLUK.namespace('request.post');
KLUK.request.post = function (url, body, fn) {
    var xhr = new KLUK.request.Create('POST', url);
    if (!xhr) {
        throw new Error('CORS not supported');
    }
    
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", body.length);
    xhr.setRequestHeader("Connection", "close");

    xhr.onload = function () {
        fn(xhr.responseText);
    };

    xhr.onerror = function (e) {
        console.log('There was an error!');
    };

    xhr.send(body);
};

KLUK.namespace('util.auth');
KLUK.util.auth = function (user, pass) {
    var ret = false;
    KLUK.request.post('/auth/', 'user='+user+'&password='+pass, function (responseText) {
        var response = JSON.parse(responseText);
        if (response.response === 'OK') {
            KLUK.token = response.token;
            KLUK.user =  user;
            ret = true;
        }
    });
    return ret;
};

KLUK.namespace('util.checkAuth');
KLUK.util.checkAuth = function () {
    var ret = false,
        token = KLUK.token,
        user  = KLUK.user;
    KLUK.request.get('/checkauth/'+user+'/'+token+'/', function (responseText) {
        var response = JSON.parse(responseText);
        if (response.response === 'OK') {
            ret = true;
        }
    });
    return ret;
};
