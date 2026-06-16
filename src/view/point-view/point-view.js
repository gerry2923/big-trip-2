import { createPointTemplate } from './point-template';
import { createElement } from '../../render';

export default class PointView {
  #point = null;
  constructor(point) {
    this.#point = point;
  }

  getTemplate() {
    return createPointTemplate(this.#point);
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
