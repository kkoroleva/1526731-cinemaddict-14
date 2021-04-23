import {
  getUserRange
} from './view/user-range.js';
import {
  getMainNavigation
} from './view/main-navigation.js';
import {
  getSorter
} from './view/sorter';
import {
  getFilmsList
} from './view/films-list.js';
import {
  getFilmsListExtra
} from './view/films-list-extra.js';
import {
  getFooterStats
} from './view/footer-stats.js';


const renderBlock = (block, place, container) => {
  container.insertAdjacentHTML(place, block);
};

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

renderBlock(getUserRange(), 'beforeend', header);
renderBlock(getMainNavigation(), 'beforeend', main);
renderBlock(getSorter(), 'beforeend', main);
renderBlock(getFilmsList(), 'beforeend', main);
renderBlock(getFilmsListExtra(), 'beforeend', main);
renderBlock(getFooterStats(), 'beforeend', footer);
