var query_string = window.location.search;
var search_params = new URLSearchParams(query_string);
var id = search_params.get('id');

var api_key = "2628d67d7605e8187e3b28f7a28b220b";

var data = "{}";
var response: any;

var xhr = new XMLHttpRequest();
xhr.withCredentials = false;

xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
        //console.log(this.responseText);
        response = JSON.parse(this.responseText);
    }
});

xhr.open('get', `https://api.themoviedb.org/3/movie/${id}?api_key=${this.api_key}&language=en-US`, false);
xhr.send();

var baseImageUrl = "https://image.tmdb.org/t/p/w780";

var currentRating = 0;

window.onload = function () {
    var title = <HTMLElement>document.getElementById("title"),
        poster = <HTMLElement>document.getElementById("poster"),
        description = <HTMLElement>document.getElementById("description"),
        rating = <HTMLElement>document.getElementById("rating"),
        stars = <HTMLElement>document.getElementById("stars"),
        popularity = <HTMLElement>document.getElementById("popularity"),
        language = <HTMLElement>document.getElementById("language"),
        comp = <HTMLElement>document.getElementById("comp");

    var date = new Date(this.response["release_date"]);

    title.innerHTML = `<b>${this.response["original_title"]} (${date.getFullYear()})</b>`;
    if (this.response["backdrop_path"] != null) {
        poster.setAttribute("src", this.baseImageUrl + this.response["backdrop_path"]);
    }
    else {
        poster.setAttribute("src", this.baseImageUrl + this.response["poster_path"]);
    }
    description.innerHTML = this.response["overview"];
    rating.innerHTML += this.response["vote_average"];
    loadRating();
    stars.childNodes.forEach(function (item: any, i: number) {
        item.addEventListener("click", function (this: any) {
            currentRating = fillStars(this);
            saveRating();
        });
        item.addEventListener("pointerenter", function (this: any) {
            fillStars(this);
        });
        item.addEventListener("pointerout", function (this: any) {
            clearStars();
            fillStarsDefault();
        })
    });
    popularity.innerHTML += this.response["popularity"];
    language.innerHTML += this.response["original_language"];
    var pcomps = this.response["production_companies"]
    pcomps.forEach(function (item: any, i: number) {
        comp.innerHTML += item["name"];
        if (i !== pcomps.length - 1) comp.innerHTML += ", ";
    });

}

function clearStars() {
    var stars = <HTMLElement>document.getElementById("stars");
    for (let i of stars.children) {
        i.innerHTML = "☆";
    }
}

function fillStars(item: any) {
    clearStars();
    let count = 0;
    let next;
    item.innerHTML = "★";
    if (item.nextSibling !== null) {
        count++;
        next = item.nextSibling;
        next.innerHTML = "★";
        while (next.nextSibling) {
            count++;
            next = next.nextSibling;
            next.innerHTML = "★";
        }
    }
    return count;
}

function fillStarsDefault() {
    var stars = (<HTMLElement>document.getElementById("stars")).children;
    var last = stars.length - 1;
    for (let i = last; i > last - currentRating; i--) {
        stars[i].innerHTML = "★";
    }
}

function loadRating() {
    if (typeof (Storage) !== null && id !== null) {
        let value = localStorage.getItem("rating_" + id.toString());
        if (value !== null) {
            currentRating = parseInt(value, 10);
        }
        else {
            currentRating = 0;
        }
    }
    fillStarsDefault();
}

function saveRating() {
    if (typeof (Storage) !== null && id !== null) {
        localStorage.setItem("rating_" + id.toString(), currentRating.toString());
    }
}