import AbstractComponentView from './abstract-component.js';

const getShowMoreButton = (filmsCount) => {
  return filmsCount > 0 ? '<button class="films-list__show-more">Show more</button>': '';
};

export default class ShowMoreButton extends AbstractComponentView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
    this._clickHandler = this._clickHandler.bind(this);
  }
  getTemplate() {
    return getShowMoreButton(this._filmsCount);
  }
  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
