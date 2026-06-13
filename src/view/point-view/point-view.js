import { createPointTemplate } from './point-template';
import { createElement } from '../../render';

export default class PointView {
  getTemplate() {
    return createPointTemplate();
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
