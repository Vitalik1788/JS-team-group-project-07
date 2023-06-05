export function careateUpcomingMarkup(film) {
  const {
    backdrop_path,
    poster_path,
    title,
    release_date,
    popularity,
    vote_count,
    vote_average,
    genre_ids,
    overview,
  } = film;

  const transformedDate = release_date.replaceAll('-', '.');
  const roundedPopularity = roundToTen(popularity);
  const imgPath = window.screen.width < 768 ? poster_path : backdrop_path;

  const trimedGenres = trimGenres(['comedy', 'action', 'thriller']);

  function trimGenres(genres) {
    if (genres.length > 2) {
      return `${genres.slice(0, 2).join(', ')}, ...`;
    }
    return `${genres.join(', ')}`;
  }

  //
  const fragment = document.createDocumentFragment();

  const log = document.querySelector('.upcoming-card');
  const myRules =
    document.styleSheets[document.styleSheets.length - 1].cssRules;
  const mediaList = myRules[0]; // a CSSMediaRule representing the media query.
  // console.log(mediaList);
  // log.textContent += ` ${mediaList.media.mediaText}`;

  return `
        <div class='upcoming-card__figure'>
          <div class='upcoming-card__layout'></div>
          <img
            src="https://image.tmdb.org/t/p/original${imgPath}"
            alt="${title}"
            loading='lazy'
            class='upcoming-card__img'
          > 
          </div>
        </div>

          <div class='upcoming-card__body'>
            <h3 class="upcoming-card__title">${title}</h3>

            <div class='metrics-list__main-container'>
                <ul class="list metrics-list">
                  <li class="metrics-list__item">
                    <p class="metrics-text">Release date</p>
                    <p class="metrics-text metrics-text--date">${transformedDate}</p>
                  </li>
                  <li class="metrics-list__item">
                    <p class="metrics-text">Vote / Votes</p>
                    <p class="metrics-text metrics-text--vote">
                      <span class="vote-wrapper">${vote_average}</span>
                      /
                      <span class="vote-wrapper">${vote_count}</span>
                    </p>
                  </li>
                  <li class="metrics-list__item">
                    <p class="metrics-text">Popularity</p>
                    <p class="metrics-text">${roundedPopularity}</p>
                  </li>
                  <li class="metrics-list__item">
                    <p class="metrics-text">Genre</p>
                    <p class="metrics-text">
                      ${trimedGenres}
                    </p>
                  </li>
                </ul>
            </div>
            <h4 class="upcoming-card__subtitle metrics-text">ABOUT</h4>
              <p class="upcoming-card__text" >
              ${overview}
              </p>
            <button class="btn" type="button">Add to my library</button>
          </div>`;
}

function roundToTen(number) {
  return Math.floor(number * 10) / 10;
}
