import {getUserRange} from './view/user-range.js';
import {getMainNavigation} from './view/main-navigation.js';
import {getSorter} from './view/sorter';
import {getFilmsSection} from './view/films.js';
import {getFooterStats} from './view/footer-stats.js';


const renderBlock = (block, container, place = 'beforeend') => {
  container.insertAdjacentHTML(place, block);
};

const header = document.querySelector('.header');
const main = document.querySelector('.main');
const footer = document.querySelector('.footer');

renderBlock(getUserRange(), header);
renderBlock(getMainNavigation(), main);
renderBlock(getSorter(), main);
renderBlock(getFilmsSection(), main);
renderBlock(getFooterStats(), footer);
