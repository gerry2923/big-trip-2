import { createPointListItemTemplate } from '../point-list-item-view/point-list-item-template';
import { createElement } from '../../render';

export default class PointListItemView {
  getTemplate() {
    return createPointListItemTemplate();
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
