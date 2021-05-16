import {getFilmCard} from './film-card.js';

const filmListsParameters = [
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

const getFilmList = ({header, isExtra, sortField}, filmsData, slicer = 5) => {
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
          <h2 class="films-list__title ${isExtra ? '' : 'visually-hidden'}">${header}</h2>

          <div class="films-list__container">
          ${isExtra ? getCardsTogether(sortFilmList(filmsData, sortField).slice(0,2)) : getCardsTogether(sortFilmList(filmsData, sortField).slice(0, slicer))}
          </div>

          </section>`;
};

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
  const cardsStr = [];
  filmsData.forEach((film) => {
    cardsStr.push(getFilmCard(film));
  });
  return cardsStr.join('');
};

const getFilmsSection = (filmsData) => {
  return `<section class="films">
          ${getFilmList(filmListsParameters[0], filmsData)}
          ${getFilmList(filmListsParameters[1], filmsData)}
          ${getFilmList(filmListsParameters[2], filmsData)}
          </section>`;
};

export {getFilmsSection, getCardsTogether};
