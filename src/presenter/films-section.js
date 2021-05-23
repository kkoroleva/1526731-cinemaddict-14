import FilmsContainerView from '../view/films-container.js';
import FilmsListView from '../view/films-list.js';
import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import ShowMoreButtonView from '../view/show-more-button.js';
import FilmsCardPresenter from './film-card.js';
import {renderElement} from '../utils/render.js';

const FILM_LISTS_FEATURES = [
  {
    'header': 'All movies. Upcoming',
    'isExtra': false,
    'sortField': 'default',
    'inRow': 5,
  },
  {
    'header': 'Top rated',
    'isExtra': true,
    'sortField': 'rating',
    'inRow': 2,
  },
  {
    'header': 'Most commented',
    'isExtra': true,
    'sortField': 'comments.length',
    'inRow': 2,
  },
];
const EMPTY_LIST_FEATURES = [
  {
    'header': 'There are no movies in our database',
    'isExtra': false,
    'inRow': 0,
  },
];

const body = document.querySelector('body');

const renderFilm = (filmData, filmList) => {
  const film = new FilmCardView(filmData);
  renderElement(film, filmList);

  const popupCloseHandler = (popup) => {
    body.classList.remove('hide-overflow');
    body.removeChild(popup.getElement());
  };

  const popupOpenHandler = () => {
    if (!body.querySelector('.film-details')) {
      const popup = new FilmDetailsView(filmData);
      renderElement(popup, body);
      body.classList.add('hide-overflow');

      popup.setCloseButtonHandler(popupCloseHandler);
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'esc') {
          popupCloseHandler(popup);
        }
      }, {once: true});
    }
  };

  film.setClickHandler(popupOpenHandler);
};

export default class FilmsSection {
  constructor(sectionContainer) {
    this._element = sectionContainer;
    this._filmData = [];

    this._listFeatures = EMPTY_LIST_FEATURES;

    this._filmsLists = [];
    this._filmPresenters = {};
  }

  init(filmsMockData) {
    this._filmData = filmsMockData;

    this._isEmptyData(this._filmData) ? '' : this._listFeatures = FILM_LISTS_FEATURES;
    this._filmsLists = new Array(this._listFeatures.length).fill().map(() => {
      return {
        sortedData: [],
        listView: null,
      };
    });

    this._renderSection();
  }

  _isEmptyData(filmsData) {
    return filmsData.length === 0 ?  true : false;
  }

  _sortFilmList(filmsData, sortField) {
    const filmsSorted = filmsData.slice();
    switch (sortField) {
      case 'rating':
        filmsSorted.sort((a, b) => a.rating > b.rating ? -1 : 1);
        break;
      case 'comments.length':
        filmsSorted.sort((a, b) => a.comments.length > b.comments.length ? -1 : 1);
        break;
      case 'date':
        filmsSorted.sort((a, b) => a.release > b.release ? -1 : 1);
        break;
      case 'default':
        break;
    }
    return filmsSorted;
  }

  _renderSection() {
    this._listFeatures.forEach((list) => {
      const count = this._listFeatures.indexOf(list);
      this._filmsLists[count].listView = new FilmsListView(list);
      this._filmsLists[count].sortedData = this._sortFilmList(this._filmData, this._filmsLists[count].listView.listFeatures.sortField);
      renderElement(this._filmsLists[count].listView, this._element);
    });

    if (!this._isEmptyData(this._filmData)) {
      this._filmsLists.forEach((list) => {
        this._renderContainer(list);
      });
    }
  }

  _renderContainer({listView, sortedData}) {
    const filmsContainerComponent = new FilmsContainerView();
    renderElement(filmsContainerComponent, listView);

    const listFeatures = listView.listFeatures;
    if (listFeatures.inRow > sortedData.length) {
      listFeatures.inRow = sortedData.length;
    }

    for (let i = 0; i < listFeatures.inRow; i++)
    {
      this._renderFilmCard(filmsContainerComponent, sortedData[i]);
    }

    if (!listFeatures.isExtra && sortedData.length > listFeatures.inRow) {
      this._renderShowMore(sortedData, listFeatures.inRow);
    }
  }

  _renderFilmCard (container, filmData) {
    const filmPresenter = new FilmsCardPresenter(container);
    filmPresenter.init(filmData);
    this._filmPresenters[filmData.id] = filmPresenter; //перезаписываются каждый список.
  }

  _renderShowMore(sortedFilmList, inRow) {
    this._showMoreButton = new ShowMoreButtonView(sortedFilmList.length - inRow);
    renderElement(this._showMoreButton, this._filmsLists[0].listView);
    sortedFilmList = sortedFilmList.slice(inRow);

    const showMoreHandler = () => {
      const filmsToRender = sortedFilmList.slice(0, inRow);
      filmsToRender.forEach((film) => {
        const container = this._filmsLists[0].listView.getElement().querySelector('.films-list__container');
        renderFilm(film, container);
      });
      if (!sortedFilmList.slice(inRow).length) {
        this._showMoreButton.getElement().classList.add('visually-hidden');
        this._showMoreButton.getElement().removeEventListener('click', showMoreHandler);
      }
      sortedFilmList = sortedFilmList.slice(inRow);
    };
    this._showMoreButton.setClickHandler(showMoreHandler);
  }
}
