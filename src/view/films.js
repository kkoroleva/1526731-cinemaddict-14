import {getShowMoreButton} from './show-more-button.js';
import {getCardsTogether} from './film-card.js';

const getBasicFilmsList = () => {
  return `<section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

          <div class="films-list__container">
          ${getCardsTogether(5)}
          </div>

          ${getShowMoreButton()}
          </section>`;
};

const getExtraFilmsList = () => {
  return `<section class="films-list films-list--extra">
          <h2 class="films-list__title">All movies. Upcoming</h2>

          <div class="films-list__container">
          ${getCardsTogether(2)}
          </div>
          </section>`;
};

const getFilmsList = (isExtra) => {
  return isExtra ? getExtraFilmsList() : getBasicFilmsList();
};

export const getFilmsSection = () => {
  return `<section class="films">
          ${getFilmsList(false)}
          ${getFilmsList(true)}
          ${getFilmsList(true)}
          </section>`;
};
