import {createDOMElement} from '../util.js';

const getFilmsContainer = () => {
  return `<div class="films-list__container">
          </div>`;
};

export default class FilmsContainer {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return getFilmsContainer();
  }
  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
