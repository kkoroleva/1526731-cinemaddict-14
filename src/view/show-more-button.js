import {createDOMElement} from '../util.js';

const getShowMoreButton = (dataLength) => {
  return dataLength > 0 ? '<button class="films-list__show-more">Show more</button>': '';
};

export default class ShowMoreButton {
  constructor(dataLength) {
    this._dataLength = dataLength;
    this._element = null;
  }
  getTemplate() {
    return getShowMoreButton(this._dataLength);
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
