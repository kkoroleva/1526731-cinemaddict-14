import UserRangeView from './view/user-range.js';
import MainNavigationView from './view/main-navigation.js';
import SorterView from './view/sorter';
import FilmsSectionView from './view/films-section';
import FilmsListView from './view/films-list.js';
import FilmCardView from './view/film-card.js';
import FooterStatsView from './view/footer-stats.js';
//import FilmDetailsView from './view/film-details.js';
import ShowMoreButtonView from './view/show-more-button.js';
import {getFilm} from './moks.js';
import {renderElement} from './util.js';

const MOCKS_SIZE = 20;
const FILMS_IN_ROW = 5;
const FILM_LISTS_FEATURES = [
  {
    'header': 'All movies. Upcoming',
    'isExtra': false,
    'sortField': 'default',
  },
  {
    'header': 'Top rated',
    'isExtra': true,
    'sortField': 'rating',
  },
  {
    'header': 'Most commented',
    'isExtra': true,
    'sortField': 'comments.length',
  },
];

const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');

const mockData = new Array(MOCKS_SIZE).fill().map(() => getFilm());
let renderData = mockData.slice(FILMS_IN_ROW);

renderElement(new UserRangeView(mockData).getElement(), header);
renderElement(new MainNavigationView(mockData).getElement(), main);
renderElement(new SorterView().getElement(), main);
renderElement(new FilmsSectionView().getElement(), main);

const films = main.querySelector('.films');
FILM_LISTS_FEATURES.forEach((list) => {
  renderElement(new FilmsListView(list, mockData, FILMS_IN_ROW).getElement(), films);
});

const filmsList = main.querySelector('.films-list');
renderElement(new ShowMoreButtonView(mockData.length - FILMS_IN_ROW).getElement(), filmsList);
renderElement(new FooterStatsView(mockData.length).getElement(), footer);
//renderElement(new FilmDetailsView(mockData[0]).getElement(), body);

const buttonShowMore = filmsList.querySelector('.films-list__show-more');
buttonShowMore.addEventListener('click', () => {
  renderData = showMoreHandler(renderData);
});

const showMoreHandler = (data) => {
  const filmsListContainer = filmsList.querySelector('.films-list__container');
  const filmsToRender = data.slice(0, FILMS_IN_ROW);
  filmsToRender.forEach((film) => {
    renderElement(new FilmCardView(film).getElement(), filmsListContainer);
  });
  if (!data.slice(FILMS_IN_ROW).length) {
    buttonShowMore.classList.add('visually-hidden');
  }
  return data.slice(FILMS_IN_ROW);
};
