//const JSON_PATH = 'https://www.mockachino.com/5eca88b6-0077-4e/movies';


class App {
  constructor() {
    this.onJsonReady = this.onJsonReady.bind(this);
    this.onResponse = this.onResponse.bind(this); 
    this.onSubmitComment = this.onSubmitComment.bind(this);

    this.onSearch = this.onSearch.bind(this); 
    this.onSearch2 = this.onSearch2.bind(this);

    document.querySelector("#botonbuscar").addEventListener("click", this.onSearch);
    document.querySelector("#botonbuscar2").addEventListener("click", this.onSearch2);
    document.querySelector("#submit-comment").addEventListener("click", this.onSubmitComment);
  }

  loadMovies() {
    fetch('/load-movies/') // ERNESTO: hacemos el fetch al backend (server.js)
      .then(this.onResponse)
      .then(this.onJsonReady);
  }

  onJsonReady(json) {
    this.moviesList = json.movies;
    const moviesContainer = document.querySelector("#movies-container");
    
  }

  onResponse(response) {
    return response.json();
  }

  onSearch() {
    const buscarpeli = document.querySelector("#buscarpeli").value.toLowerCase();
    const moviesContainer = document.querySelector("#movies-container");
    moviesContainer.innerHTML = "";

    
    const peliculaEncontrada = this.moviesList.filter(({ titulo }) => titulo.toLowerCase().includes(buscarpeli));
    if (peliculaEncontrada.length == 0) {
        moviesContainer.innerHTML = "<p>No se encontraron películas.</p>";
    } else {
        peliculaEncontrada.forEach(({ imagen, titulo, sinopsis, duracion, genero }) => {
            moviesContainer.innerHTML += `
 <div class="movie">
<h1>Resultados:</h1>
<img src="${imagen}">
<h3>${titulo}</h3>
 <p>Sinopsis: ${sinopsis}</p>
<p>Duración: ${duracion}</p>
<p>Genero: ${genero}</p>
 </div> `;
        });
    }
}

onSearch2() {
  const buscargenero = document.querySelector("#buscargenero").value.toLowerCase();
  const moviesContainer = document.querySelector("#movies-container");
  moviesContainer.innerHTML = "";

  const peliculaEncontrada2 = this.moviesList.filter(({ genero }) => genero.toLowerCase().includes(buscargenero));
  if (peliculaEncontrada2.length === 0) {
      moviesContainer.innerHTML = "<p>No se encontraron películas.</p>";
  } else {
      peliculaEncontrada2.forEach(({ imagen, titulo, sinopsis, duracion, genero }) => {
          moviesContainer.innerHTML += `
              <div class="movie">
              <h1>Resultados:</h1>
                  <img src="${imagen}">
                  <h3>${titulo}</h3>
                  <p>Sinopsis: ${sinopsis}</p>
                  <p>Duración: ${duracion}</p>
                  <p>Género: ${genero}</p>
              </div>
          `;
      });
  }
}

onSubmitComment() {
  const usuario = document.querySelector("#usuario").value.trim();
  const comentario = document.querySelector("#comentario").value.trim();
  const pelicula = document.querySelector("#pelicula").value.trim();

  if (usuario && comentario && pelicula) {
    const nuevoComentario = new Comentario(usuario, comentario, pelicula);
    nuevoComentario.guardarcom();
  } else {
    alert('Por favor, completa todos los campos antes de enviar.');
  }
}

}
const app = new App();
app.loadMovies();