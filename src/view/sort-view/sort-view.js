import { createSortTemplate } from './sort-template';

export default class SortView {
  getTemplate() {
    return createSortTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = this.getTemplate();
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
