import { refs } from './catalog/components/refs';

let errorMarkupCreated = false;

export const createErrorMarkup = () => {
  if (errorMarkupCreated) {
    return; // Если функция уже вызвана, выходим из неё
  }

  const errorMarkup = `<p class="error-information">OOPS...</p>
  <p class="error-information">We are very sorry!</p>
  <p class="error-information">
    We don’t have any results matching your search.
  </p>`;

  const newErrorContainer = document.createElement('div');
  newErrorContainer.innerHTML = errorMarkup;

  refs.errorContainer.appendChild(newErrorContainer);
  errorMarkupCreated = true;
};
