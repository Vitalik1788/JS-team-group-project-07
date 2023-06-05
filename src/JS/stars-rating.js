// ! Call function starsRating(ratingValue) to connect the Script. Transmit rating value as an argument.

const starsContainer = document.querySelector('.stars-container');
const mask = document.querySelector('#star-fill--partly');

const starBg = {
  filled: '<use href="#star" fill="url(#star-fill--complete)" />',
  masked:
    '<use href="#star" mask="url(#star-fill--partly)" fill="url(#star-fill--complete)" /><use href="#star" fill="none" stroke="url(#star-stroke)" />',
  empty: '<use href="#star" fill="none" />',
};

// starsRating(-4.79);

export default function starsRating(value) {
  const starsValue = convertRatingToStars(Number(value));
  starsContainer.insertAdjacentHTML('afterbegin', markupRender(starsValue));
}

function convertRatingToStars(value) {
  if (!value || value <= 0 || value > 10) return 0;

  return Number((value / 2).toFixed(1));
}

function markupRender(starsValue) {
  if (!starsValue) return '<p class="stars-absent">Not rated yet</p>';

  const starsCountFilled = Number.parseInt(starsValue);
  const starsCountMasked = starsValue - starsCountFilled === 0 ? 0 : 1;
  const starsCountEmpty = 5 - starsCountFilled - starsCountMasked;
  const { filled, masked, empty } = starBg;

  renderMask(starsValue);

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
				<svg class="stars-list__img" viewBox="0 0 18 16">
					${starsType}
				</svg>
			</li>`;
  }

  return markup;
}

function renderMask(starsValue) {
  const maskShare = Math.floor(
    (Number.parseFloat(starsValue) - Number.parseInt(starsValue)) * 100
  );

  mask.innerHTML = `
		<rect x="0" y="0" width="18" height="16" fill="white" />
		<rect x="${maskShare}%" y="0" width="18" height="16" fill="black" />`;
}
