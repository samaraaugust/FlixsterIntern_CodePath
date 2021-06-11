//Variables For API
const apiKey = "aa5ec2961a3f7ac76cf788d9b8482cef";
var movieUrlNP = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
var movieUrlS = "https://api.themoviedb.org/3/search/movie?api_key=";
const imageStart = "http://image.tmdb.org/t/p/w185";

//Counting Variables
var page = 1;
var pageSearch = 1;

//Elements
const movieForm = document.querySelector("form");
const movieLoad = document.querySelector("#loadMorebtn");
const movieNow = document.querySelector("#now");
const movieSection = document.querySelector("#movieInfo");
const movieSecSea = document.querySelector("#movieInfoSearch");
const nowBackB = document.querySelector("#back");

//Event Listeners
movieForm.addEventListener("submit", getSearchedResults);

//Functions
async function getSearchedResults(event2)//Accessing Search Results
{
    movieSecSea.innerHTML = ``;
    event2.preventDefault();
    const movieInput = event2.target.movieWord;
    const keyMovieIn = movieInput.value;
    searchPlay(keyMovieIn);
    const offiUrlS = movieUrlS + apiKey + "&page=" + pageSearch + "&query=" + keyMovieIn;
    const response2 = await fetch(offiUrlS);
    const responseData2 = await response2.json();
    (responseData2.results).forEach(displayResultsSearch);
    nowPlayBack();
}

async function getCurrentMovies(pageNum)//Accessing Current Movies 
{
    nowPlay();
    const offiUrlNP = movieUrlNP + apiKey + "&page=" + pageNum;
    const response = await fetch(offiUrlNP);
    const responseData = await response.json();
    (responseData.results).forEach(displayResults);
    loadMoreButton();
}

getCurrentMovies(page);

function displayResults(movieDetails)//Displaying the Results for the Movie
{
    movieSection.innerHTML += `
    <div class="card">
    <img src="${imageStart + movieDetails.poster_path}" alt="${movieDetails.title} Movie Poster">
    <div class="container">
    <h4>${movieDetails.title} \u2B50${movieDetails.vote_average}</h4>
    </div>
    </div>
    `;
}

//press the load more button increase the page count, call the function

function displayResultsSearch(movieDetails)//Displaying the Results for the Movie
{
    movieLoad.innerHTML = ``;
    movieSection.innerHTML = ``;
    movieSecSea.innerHTML += `
    <div class="card">
    <img src="${imageStart + movieDetails.poster_path}" alt="${movieDetails.title} Movie Poster">
    <h4>${movieDetails.title} \u2B50${movieDetails.vote_average}</h4>
    </div>
    `;
}

function nowPlayBack()
{
    nowBackB.innerHTML = `
    <div id="backB">
    <form class="backBtn">
        <button>Back</button>
    </form>
    </div>
    `;
    const backBtnSe = document.querySelector("form.backBtn");
    backBtnSe.addEventListener("submit", getCurrentMovies);
}

function loadMoreButton()
{
    movieLoad.innerHTML = `<div id="loadM"><form class="btn">
    <button id="loadM">Load More Movies</button>
    </form></div>
    `;
    const movieFormSec = document.querySelector("form.btn");
    movieFormSec.addEventListener("submit", getMore);
}

function getMore(event)//Acquires more movies
{
    event.preventDefault();
    page = page + 1;
    getCurrentMovies(page);
}

function nowPlay()
{
    movieNow.innerHTML = `
    <h2>Now Playing</h2>
    `;
}

function searchPlay(value)
{
    movieNow.innerHTML = `
    <h2>Search Results For "${value}"</h2>
    `;
}