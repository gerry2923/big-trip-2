import { createEditPointTemplate } from './edit-point-template';
import { createElement } from '../../render';

export default class EditPointView {
  #point = null;

  constructor(point) {
    this.#point = point;
  }

  getTemplate() {
    return createEditPointTemplate(this.#point);
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
