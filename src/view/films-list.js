import AbstractComponentView from './abstract-component.js';

const getFilmList = ({header, isExtra, inRow}) => {
  return `<section class="films-list ${isExtra ? 'films-list--extra' : ''}">
          <h2 class="films-list__title ${isExtra || inRow === 0 ? '' : 'visually-hidden'}">${header}</h2>

          </section>`;
};

export default class FilmsList extends AbstractComponentView {
  constructor(listFeatures) {
    super();
    this.listFeatures = listFeatures;
  }
  getTemplate() {
    return getFilmList(this.listFeatures);
  }
}
