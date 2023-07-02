const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const checkMaxStringLength = (string, limit) => string.length <= limit;

const shuffleArray = (array) => {
  const result = [];
  const indexes = [];

  for (let i = 0; i < array.length; i++) {
    let index = getRandomInt(0, array.length - 1);
    while (indexes.includes(index)) {
      index = getRandomInt(0, array.length - 1);
    }
    indexes[i] = index;
    result[i] = array[index];
  }

  return result;
};

const getOrderedArray = (min, max) => {
  const result = [];

  for (let i = min; i <= max; i++) {
    result.push(i);
  }

  return result;
};

const getUnorderedArray = (min, max) => shuffleArray(getOrderedArray(min, max));

function removeStringInArray (array, string) {
  const fixedArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] !== string) {
      fixedArray.push(array[i]);
    }
  }
  return fixedArray;
}

export {getRandomInt, shuffleArray, getOrderedArray, getUnorderedArray, checkMaxStringLength, removeStringInArray};
