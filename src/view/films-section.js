import AbstractComponentView from './abstract-component.js';

const getFilmSection = () => {
  return `<section class="films">

          </section>`;
};

export default class FilmsSection extends AbstractComponentView {
  getTemplate() {
    return getFilmSection();
  }
}
