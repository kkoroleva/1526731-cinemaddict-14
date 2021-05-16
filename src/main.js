import UserRangeView from './view/user-range.js';
import MainNavigationView from './view/main-navigation.js';
import SorterView from './view/sorter';
import FilmsSectionView from './view/films-section';
import FilmsListView from './view/films-list.js';
import FilmCardView from './view/film-card.js';
import FooterStatsView from './view/footer-stats.js';
import FilmDetailsView from './view/film-details.js';
import ShowMoreButtonView from './view/show-more-button.js';
import {getFilm} from './moks.js';
import {renderElement, sortFilmList} from './util.js';

const MOCKS_SIZE = 20;
const FILMS_IN_ROW = 5;
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

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');

const mockData = new Array(MOCKS_SIZE).fill().map(() => getFilm());

renderElement(new UserRangeView(mockData).getElement(), header);
renderElement(new MainNavigationView(mockData).getElement(), main);
renderElement(new SorterView().getElement(), main);

const films = new FilmsSectionView();
renderElement(films.getElement(), main);
renderElement(new FooterStatsView(mockData.length).getElement(), footer);

const renderFilm = (filmData, filmList) => {
  const film = new FilmCardView(filmData);
  renderElement(film.getElement(), filmList);

  const filmPoster = film.getElement().querySelector('img');
  filmPoster.addEventListener('click', () => {
    popupOpenHandler(filmData);
  });
  const filmHeader = film.getElement().querySelector('.film-card__title');
  filmHeader.addEventListener('click', () => {
    popupOpenHandler(filmData);
  });
  const filmComments = film.getElement().querySelector('.film-card__comments');
  filmComments.addEventListener('click', () => {
    popupOpenHandler(filmData);
  });
};

FILM_LISTS_FEATURES.forEach((list) => {
  const FilmListComponent = new FilmsListView(list);
  renderElement(FilmListComponent.getElement(), films.getElement());
  const filmListContainer = FilmListComponent.getElement().querySelector('.films-list__container');
  let sortedFilmList = sortFilmList(mockData, list.sortField);


  for (let i = 0; i < list.inRow; i++)
  {
    renderFilm(sortedFilmList[i], filmListContainer);
  }

  if (!list.isExtra) {
    const ShowMoreButton = new ShowMoreButtonView(sortedFilmList.length - list.inRow);
    renderElement(ShowMoreButton.getElement(), FilmListComponent.getElement());
    sortedFilmList = sortedFilmList.slice(list.inRow);
    ShowMoreButton.getElement().addEventListener('click', () => {
      sortedFilmList = showMoreHandler(sortedFilmList, filmListContainer, ShowMoreButton.getElement());
    });
  }
});

const showMoreHandler = (films, container, button) => {
  const filmsToRender = films.slice(0, FILMS_IN_ROW);
  filmsToRender.forEach((film) => {
    renderElement(new FilmCardView(film).getElement(), container);
  });
  if (!films.slice(FILMS_IN_ROW).length) {
    button.classList.add('visually-hidden');
  }
  return films.slice(FILMS_IN_ROW);
};

const popupOpenHandler = (filmData) => {
  const popup = new FilmDetailsView(filmData);
  renderElement(popup.getElement(), body);
  body.classList.add('hide-overflow');
  popup.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
    popupCloseHandler(popup);
  });
};

const popupCloseHandler = (popup) => {
  body.classList.remove('hide-overflow');
  body.removeChild(popup.getElement());
};
