import {getUserRange} from './view/user-range.js';
import {getMainNavigation} from './view/main-navigation.js';
import {getSorter} from './view/sorter';
import {getFilmsSection, getCardsTogether} from './view/films.js';
import {getFooterStats} from './view/footer-stats.js';
import {getFilmDetails} from './view/film-details.js';
import {getShowMoreButton} from './view/show-more-button.js';
import {getFilm} from './moks.js';

const renderBlock = (block, container, place = 'beforeend') => {
  container.insertAdjacentHTML(place, block);
};


const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');


const mockData = new Array(20).fill().map(() => getFilm());
let renderData = mockData.slice(5);

renderBlock(getUserRange(), header);
renderBlock(getMainNavigation(mockData), main);
renderBlock(getSorter(), main);
renderBlock(getFilmsSection(mockData), main);
const filmsList = main.querySelector('.films-list');
renderBlock(getShowMoreButton(mockData.length-5), filmsList);

renderBlock(getFooterStats(), footer);

//renderBlock(getFilmDetails(mockData[0]), footer, 'afterend');
const buttonShowMore = filmsList.querySelector('.films-list__show-more');
buttonShowMore.addEventListener('click', () => {
  renderData = showMoreHandler(renderData);
});

const showMoreHandler = (data) => {
  buttonShowMore.remove();
  const filmsListContainer = filmsList.querySelector('.films-list__container');
  renderBlock(getCardsTogether(data.slice(0,5)), filmsListContainer);
  renderBlock(getShowMoreButton(data.length-5), filmsList);
  return data.slice(5);
};


