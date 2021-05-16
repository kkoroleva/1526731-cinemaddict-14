import UserRangeView from './view/user-range.js';
import MainNavigationView from './view/main-navigation.js';
import SorterView from './view/sorter';
import FilmsSectionView from './view/films-section.js';
import FilmsContainerView from './view/films-container.js';
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
const EMPTY_LIST_FEATURES = {
  'header': 'There are no movies in our database',
  'isExtra': false,
  'inRow': 0,
};

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');

const filmsMockData = new Array(MOCKS_SIZE).fill().map(() => getFilm());

renderElement(new UserRangeView(filmsMockData).getElement(), header);
renderElement(new MainNavigationView(filmsMockData).getElement(), main);
renderElement(new SorterView().getElement(), main);

const films = new FilmsSectionView();
renderElement(films.getElement(), main);
renderElement(new FooterStatsView(filmsMockData.length).getElement(), footer);


const renderFilm = (filmData, filmList) => {
  const film = new FilmCardView(filmData);
  renderElement(film.getElement(), filmList);

  const popupOpenHandler = () => {
    if (!body.querySelector('.film-details')) {
      const popup = new FilmDetailsView(filmData);
      renderElement(popup.getElement(), body);
      body.classList.add('hide-overflow');
      popup.getElement().querySelector('.film-details__close-btn').addEventListener('click', () => {
        popupCloseHandler(popup);
      }, {once: true});
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape' || evt.key === 'esc') {
          popupCloseHandler(popup);
        }
      }, {once: true});
    }
  };

  const popupCloseHandler = (popup) => {
    body.classList.remove('hide-overflow');
    body.removeChild(popup.getElement());
  };

  const filmPoster = film.getElement().querySelector('img');
  filmPoster.addEventListener('click', popupOpenHandler);
  const filmHeader = film.getElement().querySelector('.film-card__title');
  filmHeader.addEventListener('click', popupOpenHandler);
  const filmComments = film.getElement().querySelector('.film-card__comments');
  filmComments.addEventListener('click', popupOpenHandler);
};

if (filmsMockData.length === 0) {
  const FilmListComponent = new FilmsListView(EMPTY_LIST_FEATURES);
  renderElement(FilmListComponent.getElement(), films.getElement());
}
else {
  FILM_LISTS_FEATURES.forEach((list) => {
    const FilmListComponent = new FilmsListView(list);
    renderElement(FilmListComponent.getElement(), films.getElement());
    const filmsContainerComponent = new FilmsContainerView();
    renderElement(filmsContainerComponent.getElement(), FilmListComponent.getElement());
    let sortedFilmList = sortFilmList(filmsMockData, list.sortField);

    for (let i = 0; i < list.inRow; i++)
    {
      renderFilm(sortedFilmList[i], filmsContainerComponent.getElement());
    }

    if (!list.isExtra) {
      const ShowMoreButton = new ShowMoreButtonView(sortedFilmList.length - list.inRow);
      renderElement(ShowMoreButton.getElement(), FilmListComponent.getElement());
      sortedFilmList = sortedFilmList.slice(list.inRow);
      ShowMoreButton.getElement().addEventListener('click', () => {
        showMoreHandler();
      });

      const showMoreHandler = () => {
        const filmsToRender = sortedFilmList.slice(0, FILMS_IN_ROW);
        filmsToRender.forEach((film) => {
          renderFilm(film, filmsContainerComponent.getElement());
        });
        if (!sortedFilmList.slice(FILMS_IN_ROW).length) {
          ShowMoreButton.getElement().classList.add('visually-hidden');
          ShowMoreButton.getElement().removeEventListener('click');
        }
        sortedFilmList = sortedFilmList.slice(FILMS_IN_ROW);
      };
    }
  });
}
