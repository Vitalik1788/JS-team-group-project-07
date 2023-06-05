export function handleUpcomingImg({ poster_path, backdrop_path, title }) {
  // const imgContainerEl = document.querySelector('.upcoming-card__figure');
  // if (!imgContainerEl) return console.log('no upcoming section');

  // const imgIsPresent = imgContainerEl.firstElementChild?.nodeName === 'IMG';
  // console.log(imgIsPresent);

  const mediaWidth = window.matchMedia('(max-width: 767px)');
  // mediaWidth.onchange(() => console.log('change media'));
  // console.log(mediaWidth);

  const img = document.querySelector('.upcoming-card__img');
  if (!img) return console.log('no upcoming section');

  const posterLink = `https://image.tmdb.org/t/p/original${poster_path}`;
  const backdropLink = `https://image.tmdb.org/t/p/original${backdrop_path}`;

  if (window.screen.width < 768 && img.src !== posterLink) {
    return (img.src = posterLink);
  }

  if (window.screen.width >= 768 && img.src !== backdropLink) {
    return (img.src = backdropLink);
  }

  // if (imgIsPresent && !mediaWidth.matches) {
  //   clearElement(imgContainerEl);
  // }

  // if (imgIsPresent) return;

  // if (mediaWidth.matches) {
  //   const img = document.createElement('img');

  //   const link = poster_path
  //     ? `https://image.tmdb.org/t/p/original${poster_path}`
  //     : defaultImg;

  //   img.src = link;
  //   img.alt = title;
  //   img.loading = 'lazy';
  //   img.classList.add('upcoming-card__poster');

  //   console.log(img);
  //   imgContainerEl.append(img);
  // }
}

function checkMedia(url) {
  x = window.matchMedia('(max-width: 767px)');
  if (x.matches) return console.log(url);
  console.log('more');
}
