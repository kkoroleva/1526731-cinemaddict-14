import AbstractComponentView from './abstract-component.js';

const getFilmsContainer = () => {
  return `<div class="films-list__container">
          </div>`;
};

export default class FilmsContainer extends AbstractComponentView {
  getTemplate() {
    return getFilmsContainer();
  }
}
