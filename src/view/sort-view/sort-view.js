import { createSortTemplate } from './sort-template';
import { createElement } from '../../render';

export default class SortView {
  getTemplate() {
    return createSortTemplate();
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
