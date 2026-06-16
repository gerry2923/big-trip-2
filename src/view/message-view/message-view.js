import { createMessageTemplate } from './message-template';

export default class PointMessageView {
  #message = null;

  constructor(message) {
    this.#message = message;
  }

  getTemplate() {
    this.element = createMessageTemplate(this.#message);
  }
}
