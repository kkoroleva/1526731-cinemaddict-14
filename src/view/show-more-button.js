import {createDOMElement} from '../util.js';

const getShowMoreButton = (filmsCount) => {
  return filmsCount > 0 ? '<button class="films-list__show-more">Show more</button>': '';
};

export default class ShowMoreButton {
  constructor(filmsCount) {
    this._filmsCount = filmsCount;
    this._element = null;
  }
  getTemplate() {
    return getShowMoreButton(this._filmsCount);
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
