import { createEditPointTemplate } from './edit-point-template';
import { createElement } from '../../render';

export default class EditPointView {
  #hidden = null;
  #point = null;

  constructor({point, isHidden}) {
    this.#hidden = isHidden;
    this.#point = point;
  }

  getTemplate() {
    return createEditPointTemplate(this.#point, this.#hidden);
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
