import AbstractComponentView from '../view/abstract-component.js';

const createDOMElement = (template) => {
  const newElement =  document.createElement('div');
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const renderElement = (element, container, place = 'beforeend') => {
  if (container instanceof AbstractComponentView) {
    container = container.getElement();
  }

  if (element instanceof AbstractComponentView) {
    element = element.getElement();
  }

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

export {createDOMElement, renderElement, sortFilmList};
