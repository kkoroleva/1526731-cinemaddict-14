import {createDOMElement} from '../util.js';

const getFilmSection = () => {
  return `<section class="films">

          </section>`;
};

export default class FilmsSection {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return getFilmSection();
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
