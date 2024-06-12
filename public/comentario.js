class Comentario {
    constructor(usuario, comentario, pelicula) {
      this.usuario = usuario;
      this.comentario = comentario;
      this.pelicula = pelicula;
    }
  
    guardarcom() {
      const commentBody = {
        user: this.usuario,
        comment: this.comentario,
        movie: this.pelicula
      };
  
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentBody)
      };
  
      return fetch('/save/', fetchOptions)
        .then(response => {
          return response.json();
        })
        .then(data => {
          if (data.success) {
            console.log('Comentario guardado exitosamente');
          } else {
            console.error('Error al guardar el comentario');
          }
        })
        .catch(error => {
          console.error('Error al enviar el comentario:', error);
        });
    }

    

  }
  new Comentario();
