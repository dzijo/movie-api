"use strict";
var query_string = window.location.search;
var search_params = new URLSearchParams(query_string);
var id = search_params.get('id');
var api_key = "2628d67d7605e8187e3b28f7a28b220b";
var data = "{}";
var response;
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
        response = JSON.parse(this.responseText);
    }
});
xhr.open('get', `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`, false);
xhr.send();
console.log(id);
//# sourceMappingURL=movie-display.js.map