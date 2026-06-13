import { createEditPointTemplate } from './edit-point-template';
import { createElement } from '../../render';

export default class EditPointView {
  #hidden = null;

  constructor(hidden) {
    this.#hidden = hidden;
  }

  getTemplate() {
    return createEditPointTemplate(this.#hidden);
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
