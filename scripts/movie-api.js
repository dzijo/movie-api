"use strict";
console.log("F");
var api_key = "2628d67d7605e8187e3b28f7a28b220b";
var data = "{}";
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
var response;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
        response = JSON.parse(this.responseText);
    }
});
xhr.open("GET", "https://api.themoviedb.org/3/movie/popular?page=1&api_key=" + api_key);
xhr.send(data);
var baseImageUrl = "https://image.tmdb.org/t/p/w780";
window.onload = function () {
    console.log("D!");
    var list_container = document.getElementById("list-container");
    if (list_container != null) {
        console.log("F!");
        list_container.appendChild(this.makeMovie(this.response["results"][0]));
    }
};
function makeMovie(data) {
    var imagePath = baseImageUrl + data["poster_path"], id = data["id"], language = data["original_language"], title = data["original_title"], rating = data["vote_average"];
    //Language
    var languageH = document.createElement('h3');
    languageH.innerText = "Language: " + language;
    var languageE = document.createElement('div');
    languageE.setAttribute("class", "row col-sm-12");
    languageE.appendChild(languageH);
    //Title and rating
    var titleH = document.createElement('h2');
    titleH.innerText = title;
    titleH.setAttribute("class", "col-sm-9");
    var ratingH = document.createElement('h2');
    ratingH.innerText = rating;
    ratingH.setAttribute("class", "col-sm-3");
    var tarE = document.createElement('div');
    tarE.setAttribute("class", "row");
    tarE.appendChild(titleH);
    tarE.appendChild(ratingH);
    //Image
    var image = document.createElement('img');
    image.setAttribute("class", "img img-responsive full-width");
    image.setAttribute("src", imagePath);
    var imageE = document.createElement('div');
    imageE.setAttribute("class", "image");
    imageE.appendChild(image);
    var box = document.createElement('div');
    box.setAttribute("class", "col-sm-4");
    box.setAttribute("style", "background-color:darkcyan; border-width: 8px; border-color: darkturquoise; border-style: outset");
    box.appendChild(imageE);
    box.appendChild(tarE);
    box.appendChild(languageE);
    return box;
}
//# sourceMappingURL=movie-api.js.map