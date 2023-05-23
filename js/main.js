function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function checkMaxStringLength (string, limit) {
  return string.length <= limit;
}

function getOrderedArray (min, max) {
  const orderedArray = [];
  for (let i = min; i <= max; i++) {
    orderedArray.push(i);
  }
  return orderedArray;
}

function shuffleArray(array) {
  const shuffledArray = [];
  const usedIndexes = [];

  const arrayLength = array.length;

  for (let i = 0; i < arrayLength; i++) {
    let randomIndex = getRandomInt(0, arrayLength - 1);
    while (usedIndexes.includes(randomIndex)) {
      randomIndex = getRandomInt(0, arrayLength - 1);
    }
    usedIndexes.push(randomIndex);
    shuffledArray.push(array[randomIndex]);
  }

  return shuffledArray;
}

function getIds (quantity) {
  const orderedArray = getOrderedArray(1, quantity);
  return shuffleArray(orderedArray);
}

function genTestData () {
  const quantity = 5;
  const data = [];

  const ids = getIds(quantity);

  for (let i = 0; i < quantity; i++) {
    const photo = {
      id: ids[i],
    };

    data.push(photo);

    console.log(ids[i]);
  }

  return data;
}

console.log(genTestData());
