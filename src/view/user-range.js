import AbstractComponentView from './abstract-component.js';

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

export default class UserRange extends AbstractComponentView {
  constructor(filmsData) {
    super ();
    this._filmsData = filmsData;
  }
  getTemplate() {
    return getUserRange(this._filmsData);
  }
}
