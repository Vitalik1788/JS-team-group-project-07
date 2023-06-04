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
  } = film;

  const transformedDate = release_date.replaceAll('-', '.');
  const roundedPopularity = roundToTen(popularity);
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
  console.log(mediaList);
  // log.textContent += ` ${mediaList.media.mediaText}`;

  // style='
  //               background-image:
  //                 linear-gradient(307.47deg, rgba(0, 0, 0, 0.2) 23.85%,
  //                   rgba(0, 0, 0, 0) 47.27%),
  //                 url(https://image.tmdb.org/t/p/original${backdrop_path})'

  //
  return `
  
        <div class='upcoming-card__header'>
          <div class='upcoming-card__layout'></div>
          <div class='upcoming-card__figure'>
            <img
              src="https://image.tmdb.org/t/p/original${backdrop_path}"
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
                  <li class="metrics-list__item modal-film-info-item">
                    <p class="metrics-text">Release date</p>
                    <p class="metrics-text metrics-text--date">${transformedDate}</p>
                  </li>
                  <li class="metrics-list__item modal-film-info-item">
                    <p class="metrics-text">Vote / Votes</p>
                    <p class="metrics-text metrics-text--vote">
                      <span class="vote-wrapper">${vote_average}</span>
                      /
                      <span class="vote-wrapper">${vote_count}</span>
                    </p>
                  </li>
                  <li class="metrics-list__item modal-film-info-item">
                    <p class="metrics-text">Popularity</p>
                    <p class="metrics-text">${roundedPopularity}</p>
                  </li>
                  <li class="metrics-list__item modal-film-info-item">
                    <p class="metrics-text">Genre</p>
                    <p class="metrics-text film-info__desc--normal-text">
                      ${trimedGenres}
                    </p>
                  </li>
                </ul>
            </div>
            <h4 class="upcoming-card__subtitle metrics-text">ABOUT</h4>
              <p class="upcoming-card__text" >
                Four of the West’s most infamous outlaws assemble to steal a huge
                stash of gold from the most corrupt settlement of the gold rush towns.
                But not all goes to plan one is killed and the other three escapes
                with bags of gold hide out in the abandoned gold mine where they
                happen across another gang of three – who themselves were planning to
                hit the very same bank! As tensions rise, things go from bad to worse
                as they realise the bags of gold are filled with lead... they’ve been
                double crossed – but by who and how?
              </p>
            <button class="btn--film btn_watched watched_send" type="button">Add to my library</button>
          </div>`;
}

function roundToTen(number) {
  return Math.floor(number * 10) / 10;
}
