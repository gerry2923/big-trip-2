import { createFilterTemplate } from './filter-template';
import { createElement } from '../../render';

export default class FilterView {

  getTemplate() {
    return createFilterTemplate();
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
