import {createDOMElement} from '../util.js';


export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent)
    {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }
    this._element = null;
    this._callback = {};
  }
  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
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
