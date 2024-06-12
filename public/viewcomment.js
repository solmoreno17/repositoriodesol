class ViewComment {
    constructor() {
      this.commentsContainer = document.querySelector("#comments-container");
      document.querySelector("#show-comments").addEventListener("click", this.verComments.bind(this));
    }
  
    verComments() {
      if (this.commentsContainer.classList.contains("hidden")) {
        this.loadComments();
        this.commentsContainer.classList.remove("hidden");
      } else {
        this.commentsContainer.classList.add("hidden");
      }
    }
  
    loadComments() {
      fetch('/get-comments/')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            this.displayComments(data.comments);
          } else {
            console.error('Error al cargar los comentarios');
          }
        })
        .catch(error => {
          console.error('Error al cargar los comentarios:', error);
        });
    }
  
    displayComments(comments) {
      this.commentsContainer.innerHTML = "";
  
      if (comments.length === 0) {
        this.commentsContainer.innerHTML = "<p>No hay comentarios disponibles.</p>";
      } else {
        comments.forEach(({ user, comment, movie }) => {
          this.commentsContainer.innerHTML += `
            <div class="comment-card">
              <h3>${user}</h3>
              <p>${comment}</p>
              <small>Pelicula: ${movie}</small>
            </div>
          `;
        });
      }
    }
  }
  
  const viewComment = new ViewComment();