import {createDOMElement} from '../util.js';

const getMainNavigation = (filmsData) => {
  let filmsAtWatchlist = 0, filmsAtFavourites = 0, filmsWatched = 0;
  filmsData.forEach((film) => {
    film.isInWatchlist ? filmsAtWatchlist++ : '';
    film.isFavourite ? filmsAtFavourites++ : '';
    film.isWatched ? filmsWatched++ : '';
  });
  return `<nav class="main-navigation">
        <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filmsAtWatchlist}</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filmsWatched}</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filmsAtFavourites}</span></a>
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
        </nav>`;
};

export default class MainNavigation {
  constructor(filmsData) {
    this._filmsData = filmsData;
    this._element = null;
  }
  getTemplate() {
    return getMainNavigation(this._filmsData);
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
