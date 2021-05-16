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

const createDOMElement = (template) => {
  const newElement =  document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const renderElement = (element, container, place = 'beforeend') => {
  switch (place) {
    case 'beforeend':
      container.append(element);
      break;
    case 'afterbegin':
      container.prepend(element);
      break;
  }
};

const sortFilmList = (filmsData, sortField) => {
  const filmsSorted = filmsData.slice();
  switch (sortField) {
    case 'rating':
      filmsSorted.sort((a, b) => a.rating > b.rating ? -1 : 1);
      break;
    case 'comments.length':
      filmsSorted.sort((a, b) => a.comments.length > b.comments.length ? -1 : 1);
      break;
    case 'default':
      break;
  }
  return filmsSorted;
};

export {getRandomInteger, getRandomFloat, getRandomArrayElement, getRandomArray, createDOMElement, renderElement, sortFilmList};
