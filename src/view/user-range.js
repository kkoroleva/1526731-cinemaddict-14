import {createDOMElement} from '../util.js';

const countWatched = (filmsData) => {
  let counter = 0;
  filmsData.forEach((film) => {
    if (film.isWatched) {
      counter++;
    }
  });
  return counter;
};

const getRangeName = (num) => {
  let range = '';
  num === 0 ? '': num < 10 ? range = 'Novice' : num < 20 ? range = 'Fan' : range = 'Movie buff';
  return range;
};

const getUserRange = (filmsData) => {
  const temp = getRangeName(countWatched(filmsData));
  return `<section class="header__profile profile">
          <p class="profile__rating ${temp === ''? 'visually-hidden' : ''}">${temp}</p>
          <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
          </section>`;
};

export default class UserRange {
  constructor(filmsData) {
    this._filmsData = filmsData;
    this._element = null;
  }
  getTemplate() {
    return getUserRange(this._filmsData);
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
