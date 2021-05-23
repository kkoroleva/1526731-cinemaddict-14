import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {renderElement, removeElement, replaceElement} from '../utils/render.js';

export default class FilmCard {
  constructor(container) {
    this._docBody = document.querySelector('body');
    this._film = null;
    this._container = container;

    this._popupCloseHandler = this._popupCloseHandler.bind(this);
    this._popupOpenHandler = this._popupOpenHandler.bind(this);
    this._addToWatchlistHandler = this._addToWatchlistHandler.bind(this);
    this._addToFavouriteHandler = this._addToFavouriteHandler.bind(this);
    this._addToWatchedHandler = this._addToWatchedHandler.bind(this);
  }

  init(filmData) {
    const prevFilmComponent = this._film;

    this._film = new FilmCardView(filmData);

    if (prevFilmComponent === null) {
      this._renderFilm(this._container);
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replaceElement(this._film, prevFilmComponent);
    }

    removeElement(this._film);
  }

  _renderFilm(filmList) {
    renderElement(this._film, filmList);
    this._film.setClickHandler(this._popupOpenHandler);

    this._controlWatchlist = this._film.getElement().querySelector('.film-card__controls-item--add-to-watchlist');
    this._controlWatched = this._film.getElement().querySelector('.film-card__controls-item--mark-as-watched');
    this._controlFavourite = this._film.getElement().querySelector('.film-card__controls-item--favorite');

    this.setControlsHandler();
  }

  _popupCloseHandler() {
    this._docBody.classList.remove('hide-overflow');
    this._docBody.removeChild(this._popup.getElement());
  }

  _popupOpenHandler() {
    if (!this._docBody.querySelector('.film-details')) {
      this._popup = new FilmDetailsView(this._film._film);
      renderElement(this._popup, this._docBody);
      this._docBody.classList.add('hide-overflow');

      this._popup.setCloseButtonHandler(this._popupCloseHandler);

      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'esc') {
          this._popupCloseHandler();
        }
      }, {once: true});
    }
  }

  _addToWatchlistHandler() {
    this._film._film.isInWatchlist = !this._film._film.isInWatchlist;
    if (this._film._film.isInWatchlist) {
      this._controlWatchlist.classList.add('film-card__controls-item--active');
    }
    else {
      this._controlWatchlist.classList.remove('film-card__controls-item--active');
    }
  }

  _addToWatchedHandler() {
    this._film._film.isWatched = !this._film._film.isWatched;
    if (this._film._film.isWatched) {
      this._controlWatched.classList.add('film-card__controls-item--active');
    }
    else {
      this._controlWatched.classList.remove('film-card__controls-item--active');
    }
  }

  _addToFavouriteHandler() {
    this._film._film.isFavourite = !this._film._film.isFavourite;
    if (this._film._film.isFavourite) {
      this._controlFavourite.classList.add('film-card__controls-item--active');
    }
    else {
      this._controlFavourite.classList.remove('film-card__controls-item--active');
    }
  }

  setControlsHandler() {
    this._controlWatchlist.addEventListener('click', this._addToWatchlistHandler);
    this._controlWatched.addEventListener('click', this._addToWatchedHandler);
    this._controlFavourite.addEventListener('click', this._addToFavouriteHandler);
  }

  removePresenter() {
    removeElement(this._film);
  }
}

