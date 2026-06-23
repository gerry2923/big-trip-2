import AbstractView from '../../framework/view/abstract-view';
import { createNewPointTemplate } from './new-point-template';

export default class NewPointView extends AbstractView{
  #message = null;

  constructor(message) {
    super();
    this.#message = message;
  }

  get template() {
    return createNewPointTemplate(this.#message);
  }

}
