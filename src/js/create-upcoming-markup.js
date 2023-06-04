export function careateUpcomingMarkup(film) {
  const { backdrop_path, poster_path, title, release_date } = film;

  const transformedDate = release_date.replaceAll('-', '.');

  const fragment = document.createDocumentFragment();

  const log = document.querySelector('.upcoming-card');
  const myRules =
    document.styleSheets[document.styleSheets.length - 1].cssRules;
  const mediaList = myRules[0]; // a CSSMediaRule representing the media query.
  console.log(mediaList);
  // log.textContent += ` ${mediaList.media.mediaText}`;

  //
  return `          
          <div
            class='upcoming-card__figure'
            style='
              background-image:
                linear-gradient(307.47deg, rgba(0, 0, 0, 0.2) 23.85%,
                  rgba(0, 0, 0, 0) 47.27%),
                url(https://image.tmdb.org/t/p/original${backdrop_path})'
            >
          </div>

          <div class='upcoming-card__body'>

            <h3 class="modal-film-title" id="modal-film-title">${title}</h3>
            <ul class="list modal-film-info-list">
              <li class="modal-film-info-item">
                <p class="modal-film-info-label">Release date</p>
                <p class="modal-film-info-desc" id="modal-film-popularity">${transformedDate}</p>
              </li>
              <li class="modal-film-info-item">
                <p class="modal-film-info-label">Vote / Votes</p>
                <p class="modal-film-info-desc">
                  <span
                    class="desc-voted desc-vote-average"
                    id="modal-film-vote-average"
                    >7.3</span
                  >
                  /
                  <span class="desc-voted desc-votes-count" id="modal-film-vote-count"
                    >1260</span
                  >
                </p>
              </li>
              <li class="modal-film-info-item">
                <p class="modal-film-info-label">Popularity</p>
                <p class="modal-film-info-desc" id="modal-film-popularity">100.2</p>
              </li>
              <li class="modal-film-info-item">
                <p class="modal-film-info-label">Genre</p>
                <p
                  class="modal-film-info-desc film-info__desc--normal-text"
                  id="modal-film-genre"
                >
                  Western
                </p>
              </li>
            </ul> 
            <h4 class="modal-film-info-label">ABOUT</h4>
            <div class="upcoming-card__text container-film-descr">
              <p class="film__desc film__description" id="modal-film-description">
                Four of the West’s most infamous outlaws assemble to steal a huge
                stash of gold from the most corrupt settlement of the gold rush towns.
                But not all goes to plan one is killed and the other three escapes
                with bags of gold hide out in the abandoned gold mine where they
                happen across another gang of three – who themselves were planning to
                hit the very same bank! As tensions rise, things go from bad to worse
                as they realise the bags of gold are filled with lead... they’ve been
                double crossed – but by who and how?
              </p>
            </div>
            <button class="btn--film btn_watched watched_send" type="button">Add to my library</button>

          </div>


          `;
}
