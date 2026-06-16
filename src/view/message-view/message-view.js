import { createElement } from '../../render';
import { createMessageTemplate } from './message-template';

export default class MessageView {
  #message = null;

  constructor(message) {
    this.#message = message;
  }

  getTemplate() {
    return createMessageTemplate(this.#message);
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
