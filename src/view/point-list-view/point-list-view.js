import { createElement } from '../../render';
import { createPointListTemplate } from './point-list-template';

export default class PointListView {

  getTemplate() {
    return createPointListTemplate();
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
