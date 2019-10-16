"use strict";
var api_key = "2628d67d7605e8187e3b28f7a28b220b";
var data = "{}";
var i;
var xhr = new XMLHttpRequest();
xhr.withCredentials = false;
xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        console.log(this.responseText);
        response = JSON.parse(this.responseText);
    }
});
var response;
var baseImageUrl = "https://image.tmdb.org/t/p/w780";
window.onload = function () {
    console.log("D!");
    var list_container = document.getElementById("list-container");
    var load_button = document.getElementById("buttonLoad");
    if (load_button != null) {
        load_button.addEventListener("click", function () {
            console.log("I'm in!");
            let movies_to_load = 48;
            for (let j = i; j < i + movies_to_load; j++) {
                if (j % 20 == 0) {
                    xhr.open('get', `https://api.themoviedb.org/3/movie/popular?page=${Math.floor(j / 20) + 1}&api_key=${api_key}`, false);
                    xhr.send();
                    console.log(response);
                }
                var row;
                if (j % 3 == 0) {
                    row = document.createElement('div');
                    row.setAttribute("class", "row");
                    list_container.appendChild(row);
                }
                if (row != undefined) {
                    row.appendChild(makeMovie(response["results"][j % 20]));
                }
            }
            i += movies_to_load;
        });
    }
    if (list_container != null) {
        console.log("F!");
        for (i = 0; i < 48; i++) {
            if (i % 20 == 0) {
                xhr.open('get', `https://api.themoviedb.org/3/movie/popular?page=${Math.floor(i / 20) + 1}&api_key=${api_key}`, false);
                xhr.send();
                console.log(response);
            }
            var row;
            if (i % 3 == 0) {
                row = document.createElement('div');
                row.setAttribute("class", "row");
                list_container.appendChild(row);
            }
            if (row != undefined) {
                row.appendChild(makeMovie(response["results"][i % 20]));
            }
        }
    }
};
function makeMovie(data) {
    let imagePath = baseImageUrl + data["poster_path"], id = data["id"], language = data["original_language"], title = data["title"], rating = data["vote_average"];
    //Language
    let languageH = document.createElement('h3');
    languageH.innerText = `Language: ${language}`;
    let languageE = document.createElement('div');
    languageE.setAttribute("class", "row col-sm-12");
    languageE.appendChild(languageH);
    //Title and rating
    let titleH = document.createElement('h2');
    titleH.innerText = title;
    titleH.setAttribute("class", "col-sm-9");
    let ratingH = document.createElement('h2');
    ratingH.innerText = rating;
    ratingH.setAttribute("class", "col-sm-3");
    let tarE = document.createElement('div');
    tarE.setAttribute("class", "row");
    tarE.appendChild(titleH);
    tarE.appendChild(ratingH);
    //Image
    let image = document.createElement('img');
    image.setAttribute("class", "img img-responsive full-width");
    image.setAttribute("src", imagePath);
    let imageE = document.createElement('div');
    imageE.setAttribute("class", "image");
    imageE.appendChild(image);
    let box = document.createElement('div');
    box.setAttribute("class", "col-sm-4");
    box.setAttribute("style", "background-color:darkcyan; border-width: 8px; border-color: darkturquoise; border-style: outset");
    box.appendChild(imageE);
    box.appendChild(tarE);
    box.appendChild(languageE);
    box.setAttribute("id", id);
    box.addEventListener("click", function () {
        console.log(this.id);
        window.open("/movie-display.html?id=" + this.id, "_self");
    });
    return box;
}
//# sourceMappingURL=movie-api.js.map