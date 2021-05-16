import {createDOMElement} from '../util.js';

const getFilmList = ({header, isExtra, inRow}) => {
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
          <h2 class="films-list__title ${isExtra || inRow === 0 ? '' : 'visually-hidden'}">${header}</h2>

          </section>`;
};

export default class FilmsList {
  constructor(listFeatures) {
    this._listFeatures = listFeatures;
    this._element = null;
  }
  getTemplate() {
    return getFilmList(this._listFeatures);
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
