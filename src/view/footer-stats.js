import {createDOMElement} from '../util.js';

const getFooterStats = (num = 130291) => {
  return `<section class="footer__statistics">
          <p>${num} movies inside</p>
          </section>`;
};

export default class FooterStats {
  constructor(filmsAmount) {
    this._filmsAmount = filmsAmount;
    this._element = null;
  }
  getTemplate() {
    return getFooterStats(this._filmsAmount);
  }
  getElement() {
    if (!this._element) {
      this._element = createDOMElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
