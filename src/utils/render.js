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

const removeElement = (element) => {
  if (!(element instanceof AbstractComponentView)) {
    throw new Error('Removing element has to be a component');
  }

  element.getElement().remove();
  element.removeElement();
};

const replaceElement = (oldElement, newElement) => {
  if (oldElement instanceof AbstractComponentView) {
    oldElement = oldElement.getElement();
  }

  if (newElement instanceof AbstractComponentView) {
    newElement = newElement.getElement();
  }

  const container = oldElement.parentElement;

  if (newElement === null || oldElement === null || container === null) {
    throw new Error ('One of the elements in replace process does not exist.');
  }

  container.replaceChild(newElement, oldElement);
};

export {createDOMElement, renderElement, removeElement, replaceElement};
