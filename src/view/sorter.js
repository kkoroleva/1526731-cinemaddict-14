import AbstractComponentView from './abstract-component.js';

const getSorter = () => {
  return `<ul class="sort">
          <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
          <li><a href="#" class="sort__button">Sort by date</a></li>
          <li><a href="#" class="sort__button">Sort by rating</a></li>
          </ul>`;
};

export default class Sorter extends AbstractComponentView {
  getTemplate() {
    return getSorter();
  }
}
