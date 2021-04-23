import {getShowMoreButton} from './show-more-button.js';
import {getCardsTogether} from './film-card.js';

export const getFilmsList = () => {
  return `<section class="films-list">
          <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

          <div class="films-list__container">
          ${getCardsTogether(5)}
          </div>

          ${getShowMoreButton()}
          </section>`;
};
