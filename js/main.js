function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkMaxStringLength (string, limit) {
  return string.length <= limit;
}
