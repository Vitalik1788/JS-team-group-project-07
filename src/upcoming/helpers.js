export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function roundToTen(number) {
  return Math.floor(number * 10) / 10;
}

export function findFilmAtStorage(key, id) {
  const savedFilms = JSON.parse(localStorage.getItem(key));
  return savedFilms?.find(film => film.id === id) || null;
}
