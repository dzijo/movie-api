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
        console.log(this.responseText);
        response = JSON.parse(this.responseText);
    }
});

xhr.open('get', `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`, false);
xhr.send();

var baseImageUrl = "https://image.tmdb.org/t/p/w780";

window.onload = function () {
    var title = <HTMLElement>document.getElementById("title"),
        poster = <HTMLElement>document.getElementById("poster"),
        description = <HTMLElement>document.getElementById("description"),
        rating = <HTMLElement>document.getElementById("rating"),
        popularity = <HTMLElement>document.getElementById("popularity"),
        language = <HTMLElement>document.getElementById("language"),
        comp = <HTMLElement>document.getElementById("comp");

    var date = new Date(this.response["release_date"]);

    title.innerHTML = `<b>${this.response["original_title"]} (${date.getFullYear()})</b>`;
    poster.setAttribute("src", this.baseImageUrl + this.response["backdrop_path"]);
    description.innerHTML = this.response["overview"];
    rating.innerHTML += this.response["vote_average"];
    popularity.innerHTML += this.response["popularity"];
    language.innerHTML += this.response["original_language"];
    var pcomps = this.response["production_companies"]
    pcomps.forEach(function (item: any, i: number) {
        comp.innerHTML += item["name"];
        console.log(i);
        console.log(pcomps.length)
        if (i !== pcomps.length - 1) comp.innerHTML += ", ";
    });
}