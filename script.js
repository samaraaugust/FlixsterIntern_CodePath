//Variables For API
const apiKey = "aa5ec2961a3f7ac76cf788d9b8482cef";
var movieUrlNP = "https://api.themoviedb.org/3/movie/now_playing?api_key=";
var movieUrlS = "https://api.themoviedb.org/3/search/movie?api_key=";
const imageStart = "http://image.tmdb.org/t/p/w185";

//Counting Variables
var page = 1;
var pageSearch = 1;
var count = 0;
var indicate = 0;

//Elements
const movieForm = document.querySelector("form");
const movieLoad = document.querySelector("#loadMorebtn");
const movieSection = document.querySelector("#movieInfo");
const movieSecSea = document.querySelector("#movieInfoSearch");
const nowBackB = document.querySelector("#back");
//Event Listeners

movieForm.addEventListener("submit", getSearchedResults);

//filter current movies to 2021 since its current movies, i dont know if its required

//Console Logs
//console.log("form: ", movieFormSec);
console.log("form: ", movieForm);
console.log("Its connected");



//Notes:
//const movieForm2 = document.querySelector("form");
//document.querySelector("form").getElementsByClassName("sure")
//http://image.tmdb.org/t/p/w185/A0knvX7rlwTyZSKj8H5NiARb45.jpg
//https://api.themoviedb.org/3/search/movie?api_key=aa5ec2961a3f7ac76cf788d9b8482cef&language=en-US&page=1&include_adult=false&query=cruella

//Functions
async function getSearchedResults(event2)//Accessing Search Results
{
    movieSecSea.innerHTML = ``;
    indicate = 1;
    event2.preventDefault();
    const movieInput = event2.target.movieWord;
    console.log("in this spot");
    console.log("movieInputfirst: ", movieInput);
    const keyMovieIn = movieInput.value;
    console.log("movieInput", keyMovieIn);
    const offiUrlS = movieUrlS + apiKey + "&page=" + pageSearch + "&query=" + keyMovieIn;
    console.log("movieSearch: ", offiUrlS);
    const response2 = await fetch(offiUrlS);
    const responseData2 = await response2.json();
    console.log("response2: ", responseData2);
    (responseData2.results).forEach(displayResultsSearch);
    nowPlayBack();
}

async function getCurrentMovies(pageNum)//Accessing Current Movies 
{
    indicate = 0;
    const offiUrlNP = movieUrlNP + apiKey + "&page=" + pageNum;
    console.log("Url", offiUrlNP);
    const response = await fetch(offiUrlNP);
    const responseData = await response.json();
    console.log("response: ", responseData);
    (responseData.results).forEach(displayResults);
    loadMoreButton();
    //displayResults(forEach(responseData));
}

getCurrentMovies(page);

function displayResults(movieDetails)//Displaying the Results for the Movie
{
    movieSection.innerHTML += `
    <div class="card">
    <img src="${imageStart + movieDetails.poster_path}">
    <h4>${movieDetails.title}</h4>
    <h4>${movieDetails.vote_average}</h4>
    </div>
    `;
    count = count + 1;
    //style="font-size:5vw"
    //console.log("Count: ", count);  <img src="goldstar.png" width="10%">
}
//press the load more button increase the page count, call the function

function displayResultsSearch(movieDetails)//Displaying the Results for the Movie
{
    movieLoad.innerHTML = ``;
    movieSection.innerHTML = ``;
    movieSecSea.innerHTML += `
    <div class="card">
    <img src="${imageStart + movieDetails.poster_path}">
    <h4>${movieDetails.title}</h4>
    <h4>${movieDetails.vote_average}</h4>
    </div>
    `;
    count = count + 1;
    //style="font-size:5vw"
    //console.log("Count: ", count);  <img src="goldstar.png" width="10%">
}

function nowPlayBack()
{
    nowBackB.innerHTML = `
    <form class="backBtn">
        <button>Back</button>
    </form>
    `
    const backBtnSe = document.querySelector("form.backBtn");
    backBtnSe.addEventListener("submit", getCurrentMovies);
}

function loadMoreButton()
{
    movieLoad.innerHTML = `<form class="btn">
    <button>Load More Movies</button>
    </form>
    `;
    const movieFormSec = document.querySelector("form.btn");
    movieFormSec.addEventListener("submit", getMore);
}

function getMore(event)//Acquires more movies
{
    event.preventDefault();
    
    if (indicate == 0)
    {
        console.log("indicate1: ", indicate);
        page = page + 1;
        getCurrentMovies(page);
    }
    else if (indicate == 1)
    {
        console.log("indicate: ", indicate);
        pageSearch = pageSearch + 1;
        getSearchedResults(event);
    }
}



//Need to distiniguish From Current Movies to Searched Movies

/*
async function getResults(event){
    event.preventDefault();
    console.log("In here");
}
*/
