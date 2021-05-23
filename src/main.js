import UserRangeView from './view/user-range.js';
import MainNavigationView from './view/main-navigation.js';
import SorterView from './view/sorter';
import FilmsSectionView from './view/films-section.js';
import FooterStatsView from './view/footer-stats.js';
import {getFilm} from './moks.js';
import {renderElement} from './utils/render.js';

import FilmsSectionPresenter from './presenter/films-section.js';

const MOCKS_SIZE = 20;
const body = document.querySelector('body');
const header = body.querySelector('.header');
const main = body.querySelector('.main');
const footer = body.querySelector('.footer');


const filmsMockData = new Array(MOCKS_SIZE).fill().map(() => getFilm());

renderElement(new UserRangeView(filmsMockData), header);
renderElement(new MainNavigationView(filmsMockData), main);
renderElement(new SorterView(), main);

const films = new FilmsSectionView();
renderElement(films, main);
renderElement(new FooterStatsView(filmsMockData.length), footer);

const filmsSection = new FilmsSectionPresenter(films);
filmsSection.init(filmsMockData);
