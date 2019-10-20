"use strict";
var api_key = "2628d67d7605e8187e3b28f7a28b220b";
var data = "{}";
var i = 0;
var currentGenre = 0;
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
    loadGenres();
    resetRoulette();
    var list_container = document.getElementById("list-container");
    var load_button = document.getElementById("button-load");
    if (load_button != null) {
        load_button.addEventListener("click", function () {
            loadMovies(currentGenre);
        });
    }
    if (list_container != null) {
        loadMovies(0);
    }
    var rouletteButton = document.getElementById("button-roulette");
    if (rouletteButton !== null) {
        rouletteButton.addEventListener("click", toggleRouletteDialog);
    }
    var rollButton = document.getElementById("button-roll");
    if (rollButton !== null) {
        rollButton.addEventListener("click", roulette);
    }
};
function makeMovie(data) {
    let imagePath = baseImageUrl + data["poster_path"], id = data["id"], language = data["original_language"], title = data["title"], rating = data["vote_average"], date = new Date(data["release_date"]);
    //Language
    let languageH = document.createElement('h3');
    languageH.innerText = `Language: ${language}`;
    let languageE = document.createElement('div');
    languageE.setAttribute("class", "row col-sm-12");
    languageE.appendChild(languageH);
    //Title and rating
    let titleH = document.createElement('h2');
    titleH.innerText = `${title} (${date.getFullYear()})`;
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
    image.style.cursor = "pointer";
    image.style.borderRadius = "10px";
    image.addEventListener("click", function () {
        if (this.parentElement !== null) {
            if (this.parentElement.parentElement !== null) {
                window.open("/movie-display.html?id=" + this.parentElement.parentElement.id, "_self");
            }
        }
    });
    let imageE = document.createElement('div');
    imageE.setAttribute("class", "image");
    imageE.appendChild(image);
    let box = document.createElement('div');
    box.setAttribute("class", "col-sm-4");
    box.setAttribute("style", "background-color: #2B2D42; border-width: 8px; border-color: #3E4053; border-style: outset; color: #8D99AE;");
    box.appendChild(imageE);
    box.appendChild(tarE);
    box.appendChild(languageE);
    box.setAttribute("id", id);
    return box;
}
function toggleRouletteDialog() {
    let dialog = document.getElementById("genre-dialog-box");
    if (dialog !== null) {
        if (dialog.style.visibility === "hidden") {
            dialog.style.visibility = "visible";
        }
        else {
            dialog.style.visibility = "hidden";
        }
    }
}
function roulette() {
    var form = document.forms[0];
    for (let i = 0; i < form.length; i++) {
        let button = form[i];
        if (button.checked) {
            saveRouletteGenre(button.value);
            toggleRouletteDialog();
            openRandomMovie(parseInt(button.value, 10));
        }
    }
}
function loadMovies(genre) {
    var baseUrl;
    var list_container = document.getElementById("list-container");
    if (currentGenre !== genre) {
        i = 0;
        currentGenre = genre;
        while (list_container.firstChild) {
            list_container.removeChild(list_container.firstChild);
        }
    }
    if (genre === 0) {
        baseUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&page=`;
    }
    else {
        baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&with_genres=${genre}&page=`;
    }
    let movies_to_load = 48;
    for (let j = i; j < i + movies_to_load; j++) {
        if (j % 20 == 0) {
            xhr.open('get', baseUrl + Math.floor(j / 20) + 1, false);
            xhr.send();
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
}
function openRandomMovie(genre) {
    var baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&with_genres=${genre}&page=`;
    var movies = [];
    for (let j = 0; j < 100; j++) {
        if (j % 20 == 0) {
            xhr.open('get', baseUrl + Math.floor(j / 20) + 1, false);
            xhr.send();
        }
        movies.push(response["results"][j % 20]);
    }
    var id = movies[Math.floor(Math.random() * 100)]["id"];
    window.open("/movie-display.html?id=" + id, "_self");
}
function resetRoulette() {
    var form = document.forms[0];
    var genre = loadRouletteGenre();
    for (let i = 0; i < form.length; i++) {
        let button = form[i];
        if (parseInt(button.value, 10) === genre) {
            button.checked = true;
        }
        else {
            button.checked = false;
        }
    }
}
function saveRouletteGenre(genre) {
    if (typeof (Storage) !== null) {
        localStorage.setItem("rouletteGenre", genre);
    }
}
function loadRouletteGenre() {
    var genre = 28;
    if (typeof (Storage) !== null) {
        let value = localStorage.getItem("rouletteGenre");
        if (value !== null) {
            genre = parseInt(value, 10);
        }
        else {
            genre = 28;
        }
    }
    return genre;
}
function loadGenres() {
    xhr.open('get', `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`, false);
    xhr.send();
    var genres = response["genres"];
    var form = document.forms[0];
    for (let i of genres) {
        var input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("name", "genre");
        input.setAttribute("value", i["id"]);
        //input.value = i["name"];
        var br = document.createElement("br");
        var div = document.createElement("div");
        div.setAttribute("class", "radio-button");
        div.appendChild(input);
        div.innerHTML += `${i["name"]} <br>`;
        form.appendChild(div);
    }
}
//# sourceMappingURL=movie-api.js.map