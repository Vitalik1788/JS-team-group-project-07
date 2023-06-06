function getMovieId(button) {
  return button.dataset.movieId;
}

function playTrailer(movieId) {
  const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=41b8f9437bf3f899281f8a3f9bdc0891&language=en-US`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const videoKey = data.results[0].key;
      const videoSource = `https://www.youtube.com/embed/${videoKey}?rel=0&amp;controls=1&amp;showinfo=0`;

      const video = document.createElement('iframe');
      video.src = videoSource;
      video.width = '560';
      video.height = '315';
      video.frameBorder = '0';
      video.allow =
        'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      video.allowFullscreen = '';

      const closeButton = document.createElement('span');
      closeButton.className = 'close-button';
      closeButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 10.5" width="10.5px" height="10.5px">
            <path fill="#FFFFFF" d="M9.2,1.3L8.2,0.3L5.25,3.25L2.3,0.3L1.3,1.3L4.25,4.25L1.3,7.2L2.3,8.2L5.25,5.25L8.2,8.2L9.2,7.2L6.25,4.25z"/>
          </svg>
        `;

      closeButton.addEventListener('click', () => {
        const modal = document.getElementById('modal');
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = '';
        modal.style.display = 'none';
        video.src = ''; // Зупиняємо відтворення трейлера
      });

      const modalContent = document.querySelector('.modal-content');
      modalContent.innerHTML = '';
      modalContent.appendChild(video);
      modalContent.appendChild(closeButton);

      const modal = document.getElementById('modal');
      modal.style.display = 'block';
    })
    .catch(() => {
      showModalError();
    });
}

function showModalError() {
  const modalContent = document.querySelector('.modal-content');
  modalContent.innerHTML = `
      <div class="error-content">
        <p class="error-message">OOPS... <br>We are very sorry!<br>
        But we couldn’t find the trailer.</p>
        <img class="error-image" src='../images/IMG9881.jpeg' alt="Error image">
        <button class="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10.5 10.5" width="10.5px" height="10.5px">
            <path fill="#FFFFFF" d="M9.2,1.3L8.2,0.3L5.25,3.25L2.3,0.3L1.3,1.3L4.25,4.25L1.3,7.2L2.3,8.2L5.25,5.25L8.2,8.2L9.2,7.2L6.25,4.25z"/>
          </svg>
        </button>
      </div>
    `;

  const modal = document.getElementById('modal');
  modal.style.display = 'block';

  const closeButton = modalContent.querySelector('.close-button');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  closeButton.classList.add('close-button'); // Додати клас до кнопки

  const errorContent = modalContent.querySelector('.error-content');
  errorContent.classList.add('error-content'); // Додати клас до контейнера з текстом та картинкою
}

document.addEventListener('DOMContentLoaded', () => {
  const watchTrailerButton = document.querySelector('.watch-trailer-button');
  const closeButton = document.querySelector('.close-button');
  const modal = document.getElementById('modal');

  watchTrailerButton.addEventListener('click', function () {
    const movieId = getMovieId(this);
    playTrailer(movieId);
  });

  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});
