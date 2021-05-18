const getRandomInteger = (max = 1, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomFloat = (max, min = 0) => {
  return Math.random() * (max - min) + min;
};

const getRandomArrayElement = (array) => {
  return array[getRandomInteger(array.length - 1)];
};

const getRandomArray = (array) => {
  const result = [];
  array.forEach((el) => {
    if (getRandomInteger()) {
      result.push(el);
    }
  });
  return result;
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray};
