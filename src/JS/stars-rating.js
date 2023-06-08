// ! Імпортувати starsRating до головного скрипту кожної сторінки, де у Hero є зірковий рейтинг

const starsContainer = document.querySelector('.stars-container');
const lastMask = document.querySelector('#defs').lastElementChild;
const mask = document.querySelector('.mask');

let maskCounter = 0;

const starBg = {
  filled: '<use href="#star" fill="url(#star-fill--complete)"></use>',
  masked: '',
  empty: '<use href="#star" fill="none"></use>',
};

export default function starsRating({ voteAverage, isHero }) {
  const starsValue = convertRatingToStars(Number(voteAverage));

  starBg.masked = `<use href="#star" mask="url(#star-fill--partly${maskCounter})" fill="url(#star-fill--complete)"></use><use href="#star" fill="none" stroke="url(#star-stroke)"></use>`;

  addMaskId(maskCounter, starsValue);
  maskCounter++;

  return placeMarkup(starsValue, isHero);
}

function convertRatingToStars(voteAverage) {
  if (!voteAverage || voteAverage <= 0 || voteAverage > 10) {
    return 0;
  }

  return Number((voteAverage / 2).toFixed(1));
}

function addMaskId(maskId, starsValue) {
  const maskShare = Math.floor(
    (Number.parseFloat(starsValue) - Number.parseInt(starsValue)) * 100
  );

  if (maskId === 0) {
    mask.innerHTML = `
		<rect x="0" y="0" width="18" height="18" fill="white" />
		<rect x="${maskShare}%" y="0" width="18" height="18" fill="black" />`;
  } else {
    const newMask = `
		<mask id="star-fill--partly${maskId}" class="mask">
			<rect x="0" y="0" width="18" height="18" fill="white" />
			<rect x="${maskShare}%" y="0" width="18" height="18" fill="black" />
		</mask>`;

    lastMask.insertAdjacentHTML('beforebegin', newMask);
  }
}

function placeMarkup(starsValue, isHero) {
  if (!isHero) {
    return markupRender(starsValue);
  } else {
    starsContainer.insertAdjacentHTML('beforeend', markupRender(starsValue));

    const refsHero = {
      starsList: document.querySelector('.stars-list'),
      starsListImg: document.querySelectorAll('.stars-list__img'),
    };

    starsContainer.classList.add('stars-container--hero');
    refsHero.starsList.classList.add('stars-list--hero');
    refsHero.starsListImg.forEach(item =>
      item.classList.add('stars-list__img--hero')
    );
  }
}

function markupRender(starsValue) {
  if (!starsValue) {
    return '<p class="stars-absent">Not rated yet</p>';
  }

  const starsCountFilled = Number.parseInt(starsValue);
  const starsCountMasked = starsValue - starsCountFilled === 0 ? 0 : 1;
  const starsCountEmpty = 5 - starsCountFilled - starsCountMasked;
  const { filled, masked, empty } = starBg;

  const starsListStart = listRender(starsValue);
  const starsFilled = starsRender(starsCountFilled, filled);
  const starsMasked = starsRender(starsCountMasked, masked);
  const starsEmpty = starsRender(starsCountEmpty, empty);

  return starsListStart + starsFilled + starsMasked + starsEmpty + '</ul>';
}

function listRender(starsValue) {
  return `<ul class="stars-list" aria-label="Rating: ${starsValue} stars out of 5.0" title="Rating: ${starsValue} stars out of 5.0">`;
}

function starsRender(starsCount, starsType) {
  let markup = '';

  for (let i = 1; i <= starsCount; i++) {
    markup += `
			<li class="stars-list__item">
				<svg class="stars-list__img" viewBox="0 0 18 18">
					${starsType}
				</svg>
			</li>`;
  }

  return markup;
}
