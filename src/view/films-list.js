import FilmCardView from './film-card.js';
import {createDOMElement} from '../util.js';

const sortFilmList = (filmsData, sortField) => {
  const filmsSorted = filmsData.slice();
  switch (sortField) {
    case 'rating':
      filmsSorted.sort((a, b) => a.rating > b.rating ? -1 : 1);
      break;
    case 'comments.length':
      filmsSorted.sort((a, b) => a.comments.length > b.comments.length ? -1 : 1);
      break;
    case 'default':
      break;
  }
  return filmsSorted;
};

const getCardsTogether = (filmsData) => {
  const cards = [];
  filmsData.forEach((film) => {
    cards.push(new FilmCardView(film).getTemplate());
  });
  return cards.join('');
};

const getFilmList = ({header, isExtra, sortField}, filmsData, slicer = 5) => {
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
          <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${header}</h2>

          <div class="films-list__container">
          ${isExtra ? getCardsTogether(sortFilmList(filmsData, sortField).slice(0,2)) : getCardsTogether(sortFilmList(filmsData, sortField).slice(0, slicer))}
          </div>

          </section>`;
};

export default class FilmsList {
  constructor(listFeatures, filmsData, filmsInRow) {
    this._listFeatures = listFeatures;
    this._filmsData = filmsData;
    this._filmsInRow = filmsInRow;
    this._element = null;
  }
  getTemplate() {
    return getFilmList(this._listFeatures, this._filmsData, this._filmsInRow);
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
