const api = "api_key=8f7797baa051c1b8c6a8facc15379ec8";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w300";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?${api}&language=en-US`,
    fetchNetflixOrignals: `${base_url}/discover/tv?${api}&with_networks=213`,
    fetchPopular: `${base_url}/movie/top_rated?${api}&language=en-US`,
    fetchActionMovies: `${base_url}/discover/movie?${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?${api}&with_genres=99`,
};

function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

fetch(requests.fetchNetflixOrignals)
    .then((res) => res.json())
    .then((data) => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
        var banner = document.getElementById("banner");
        var banner_title = document.getElementById("banner__title");
        var banner_desc = document.getElementById("banner__description");

        if (setMovie) {
            banner.style.backgroundImage = "url(" + banner_url + setMovie.backdrop_path + ")";
            banner_desc.innerText = truncate(setMovie.overview, 150);
            banner_title.innerText = setMovie.name || setMovie.title;
        }
    });

// Helper function to create a row of movies
function createRow(data, rowTitle) {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row";

    const title = document.createElement("h2");
    title.className = "row__title";
    title.innerText = rowTitle;
    row.appendChild(title);

    const row_posters = document.createElement("div");
    row_posters.className = "row__posters";
    row.appendChild(row_posters);

    data.results.forEach((movie) => {
        if (movie.poster_path) {
            const poster = document.createElement("img");
            poster.className = "row__poster";
            poster.src = img_url + movie.poster_path;
            row_posters.appendChild(poster);
        }
    });

    headrow.appendChild(row);
}

// Fetch and display categories
fetch(requests.fetchPopular).then((res) => res.json()).then((data) => createRow(data, "Top Rated"));
fetch(requests.fetchActionMovies).then((res) => res.json()).then((data) => createRow(data, "Action Movies"));
fetch(requests.fetchComedyMovies).then((res) => res.json()).then((data) => createRow(data, "Comedy Movies"));
fetch(requests.fetchHorrorMovies).then((res) => res.json()).then((data) => createRow(data, "Horror Movies"));
fetch(requests.fetchRomanceMovies).then((res) => res.json()).then((data) => createRow(data, "Romance Movies"));
fetch(requests.fetchDocumentaries).then((res) => res.json()).then((data) => createRow(data, "Documentaries"));
