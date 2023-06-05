export function getRandomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function roundToTen(number) {
  return Math.floor(number * 10) / 10;
}
