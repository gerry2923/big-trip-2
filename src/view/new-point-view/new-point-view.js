import { createElement } from '../../render';
import { createNewPointTemplate } from './new-point-template';

export default class NewPointView {
  #message = null;

  constructor(message) {
    this.#message = message;
  }

  getTemplate() {
    return createNewPointTemplate(this.#message);
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
