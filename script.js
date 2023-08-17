const API_KEY = '6ddb7299'; // Substitua pelo seu próprio chave API
const movieList = document.getElementById('movieList');
const searchInput = document.getElementById('searchInput');

function searchMovies() {
    const searchTerm = searchInput.value;

    if (searchTerm === '') {
        movieList.innerHTML = '<p>Por favor, digite um título de filme para buscar.</p>';
        return;
    }

    const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                const movies = data.Search;
                movieList.innerHTML = '';

                movies.forEach(movie => {
                    const movieCard = createMovieCard(movie);
                    movieList.appendChild(movieCard);
                });
            } else {
                movieList.innerHTML = '<p>Nenhum filme encontrado.</p>';
            }
        })
        .catch(error => {
            movieList.innerHTML = `<p>Erro: ${error.message}</p>`;
        });
}

function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    
    const poster = movie.Poster !== 'N/A' ? movie.Poster : 'no-poster.png';
    const img = document.createElement('img');
    img.src = poster;
    img.alt = `${movie.Title} Poster`;
    movieCard.appendChild(img);
    
    const title = document.createElement('h2');
    title.textContent = movie.Title;
    movieCard.appendChild(title);

    const year = document.createElement('p');
    year.textContent = `Ano: ${movie.Year}`;
    movieCard.appendChild(year);

    const type = document.createElement('p');
    type.textContent = `Tipo: ${movie.Type}`;
    movieCard.appendChild(type);

    return movieCard;
}