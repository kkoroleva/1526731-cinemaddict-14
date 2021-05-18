import AbstractComponentView from './abstract-component.js';

const getFooterStats = (num = 130291) => {
  return `<section class="footer__statistics">
          <p>${num} movies inside</p>
          </section>`;
};

export default class FooterStats extends AbstractComponentView {
  constructor(filmsAmount) {
    super();
    this._filmsAmount = filmsAmount;
  }
  getTemplate() {
    return getFooterStats(this._filmsAmount);
  }
}
