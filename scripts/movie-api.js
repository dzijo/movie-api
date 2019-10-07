"use strict";
console.log("F");
var data = "{}";
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
    }
});
xhr.open("GET", "https://api.themoviedb.org/3/movie/popular?page=1&api_key=2628d67d7605e8187e3b28f7a28b220b");
xhr.send(data);
//# sourceMappingURL=movie-api.js.map