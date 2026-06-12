import { createElement } from '../../render';
import { createButtonNewTemplate } from './button-new-template';

export default class ButtonNewView {

  getTemplate() {
    return createButtonNewTemplate();
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
